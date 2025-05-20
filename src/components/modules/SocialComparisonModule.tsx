
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
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

  // Generate meaningful data from portfolio when possible
  const generateComparisonData = () => {
    // If we already have socialComparison data, use it
    if (socialComparison) return socialComparison;
    
    // If we don't have socialComparison but have portfolio data, create insights
    if (data.portfolioSummary) {
      // Calculate percentile rank based on portfolio diversity
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-xl text-blue-800 dark:text-blue-200 flex items-center">
          Comparação Social
          <TypeSafeDataSourceTag source={comparisonData.dataSource} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Grupo de Pares
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {comparisonData.peerGroup || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ranking Percentual
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {comparisonData.percentileRank ? `${comparisonData.percentileRank}%` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Retorno vs. Pares
              </span>
              <span className="text-lg font-semibold">
                {formatCurrency(comparisonData.returnVsPeers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pontuação de Diversificação
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {comparisonData.diversificationScore || "N/A"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Nível de Pontuação
            </h4>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {getScoreLevel(comparisonData.overallScore)}
              </span>
            </div>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-300">
              {comparisonData.summary || "Dados adicionais disponíveis ao conectar mais fontes financeiras."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparisonModule;
