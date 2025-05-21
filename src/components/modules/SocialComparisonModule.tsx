
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Award, TrendingUp, BarChart4 } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/utils/formattingUtils";
import { toNumber, compareToNumber, toString, ensureString, toSafeString, toParseableString } from '@/utils/typeConversionHelpers';
import { DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface SocialComparisonModuleProps {
  fullWidth?: boolean;
}

const SocialComparisonModule = ({ fullWidth = false }: SocialComparisonModuleProps) => {
  const { data } = useRaioX();
  const { socialComparison } = data;

  const getScoreLevel = (score?: string | number) => {
    const numScore = toNumber(score);
    if (compareToNumber(score, 75)) return "Excelente";
    if (compareToNumber(score, 50)) return "Bom";
    if (compareToNumber(score, 25)) return "Regular";
    return "Abaixo da média";
  };

  const getScoreBadgeColor = (score?: string | number) => {
    const numScore = toNumber(score);
    if (numScore >= 75) return "bg-green-500 hover:bg-green-600";
    if (numScore >= 50) return "bg-blue-500 hover:bg-blue-600";
    if (numScore >= 25) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-red-500 hover:bg-red-600";
  };

  // Generate meaningful data from portfolio when possible
  const generateComparisonData = () => {
    // If we already have socialComparison data, use it
    if (socialComparison) return socialComparison;
    
    // If we don't have socialComparison but have portfolio data, create insights
    if (data.portfolioSummary) {
      // Calculate percentile rank based on portfolio diversity
      // Parse safely ensuring we handle both string and number types
      const diversityScore = 
        data.portfolioSummary.fixed_income_representation > 0 ? 25 : 0 +
        parseFloat(toParseableString(data.portfolioSummary.stocks_representation)) > 0 ? 25 : 0 +
        data.portfolioSummary.real_estate_representation > 0 ? 25 : 0 +
        data.portfolioSummary.investment_fund_representation > 0 ? 25 : 0;
      
      // Create estimated peer comparison
      return {
        peerGroup: "Investidores brasileiros",
        percentileRank: data.profitability?.ytd ? Math.min(90, Math.max(10, Math.round(data.profitability.ytd * 5))) : 55,
        returnVsPeers: data.profitability?.ytd ? data.profitability.ytd * 1000 : 2500,
        diversificationScore: Math.min(100, Math.max(10, diversityScore)),
        overallScore: data.profitability?.ytd ? Math.round(data.profitability.ytd * 10) : 68,
        summary: `Sua carteira tem desempenho ${data.profitability?.ytd && data.profitability.ytd > 0.08 ? "acima" : "próximo"} da média dos investidores em seu grupo. Diversificação e consistência são seus principais diferenciais.`,
        dataSource: 'supabase' as DataSourceType
      };
    }
    
    // Default synthetic data if no real data is available
    return {
      peerGroup: "Investidores brasileiros",
      percentileRank: 65,
      returnVsPeers: 2500,
      diversificationScore: 72,
      overallScore: 68,
      summary: "Seus investimentos têm desempenho acima da média dos investidores em seu grupo. Continue com sua estratégia de diversificação.",
      dataSource: 'synthetic' as DataSourceType
    };
  };

  // Get comparison data (real or synthetic)
  const comparisonData = socialComparison || generateComparisonData();

  return (
    <Card className="w-full border-2 border-blue-100 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/20">
      <CardHeader className="flex flex-row justify-between items-center pb-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-lg">
        <CardTitle className="text-xl text-white flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Comparação Social
          <TypeSafeDataSourceTag source={comparisonData.dataSource} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md space-y-4 border-2 border-blue-50 dark:border-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-bold text-gray-800 dark:text-gray-200">Ranking Percentual</span>
              </div>
              <Badge className={`text-white ${getScoreBadgeColor(comparisonData.percentileRank)}`}>
                {comparisonData.percentileRank ? `${comparisonData.percentileRank}%` : "N/A"}
              </Badge>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Você está aqui</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{comparisonData.percentileRank}%</span>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  style={{width: `${comparisonData.percentileRank}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Grupo de Pares
              </span>
              <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
                {comparisonData.peerGroup || "N/A"}
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md space-y-4 border-2 border-blue-50 dark:border-blue-900/20">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Seu Desempenho</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Retorno vs. Pares
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(comparisonData.returnVsPeers)}
              </span>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Diversificação
                </span>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
                  {comparisonData.diversificationScore}/100
                </span>
              </div>
              <Progress
                value={comparisonData.diversificationScore}
                className="h-2"
                style={{
                  background: 'rgba(209, 213, 219, 0.5)',
                }}
              >
                <div 
                  className="h-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${comparisonData.diversificationScore}%`,
                    background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                  }}
                ></div>
              </Progress>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md space-y-4 border-2 border-blue-50 dark:border-blue-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart4 className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Pontuação Geral</span>
            </div>
            <Badge className={`text-white ${getScoreBadgeColor(comparisonData.overallScore)}`}>
              {getScoreLevel(comparisonData.overallScore)}
            </Badge>
          </div>
          
          <div className="pt-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Score
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {comparisonData.overallScore}/100
              </span>
            </div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full"
                style={{
                  width: `${comparisonData.overallScore}%`,
                  background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 p-5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800/50 shadow-md">
          <p className="text-gray-800 dark:text-gray-100 font-medium">
            {comparisonData.summary || "Dados adicionais disponíveis ao conectar mais fontes financeiras."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparisonModule;
