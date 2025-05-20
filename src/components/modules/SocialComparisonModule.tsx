
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useMemo } from "react";

interface SocialComparisonModuleProps {
  fullWidth?: boolean;
}

const SocialComparisonModule = ({ fullWidth = false }: SocialComparisonModuleProps) => {
  const { data } = useRaioX();
  
  // Calculate social comparison data based on real data
  const socialComparisonData = useMemo(() => {
    // Default data to fall back to
    const defaultData = {
      peerGroup: "30-40 anos | Moderado",
      percentileRank: 75,
      returnVsPeers: 3.2,
      diversificationScore: 82,
      summary: "Seu desempenho está superior a 75% dos investidores com perfil similar ao seu. Sua estratégia de diversificação está contribuindo positivamente para resultados acima da média.",
      dataSource: 'synthetic' as const
    };
    
    // If we have portfolio data from Supabase, calculate comparisons
    if (data.portfolioSummary && data.profitability) {
      try {
        // Calculate peer group based on age and portfolio composition
        const clientAge = data.clientAge || 35;
        const ageGroup = clientAge < 30 ? "20-30 anos" : 
                        clientAge < 40 ? "30-40 anos" : 
                        clientAge < 50 ? "40-50 anos" : "50+ anos";
        
        // Determine risk profile based on asset allocation
        const fixedIncomePerc = data.portfolioSummary.fixed_income_representation || 0;
        const riskProfile = fixedIncomePerc > 60 ? "Conservador" : 
                           fixedIncomePerc > 40 ? "Moderado" : "Arrojado";
        
        const peerGroup = `${ageGroup} | ${riskProfile}`;
        
        // Calculate percentile rank based on portfolio diversity
        let diversificationScore = 0;
        let assetClasses = 0;
        
        if (data.portfolioSummary.fixed_income_value > 0) assetClasses++;
        if (parseFloat(data.portfolioSummary.stocks_value || "0") > 0) assetClasses++;
        if (data.portfolioSummary.real_estate_value > 0) assetClasses++;
        if (data.portfolioSummary.investment_fund_value > 0) assetClasses++;
        if (parseFloat(data.portfolioSummary.investment_international_value || "0") > 0) assetClasses++;
        
        diversificationScore = Math.min(100, Math.round(assetClasses * 20));
        
        // Estimate percentile rank based on diversification and portfolio size
        const totalPortfolio = parseFloat(data.portfolioSummary.total_portfolio_value || "0");
        const portfolioSizeScore = Math.min(50, Math.round(totalPortfolio / 200000));
        
        const percentileRank = 100 - Math.min(99, Math.max(1, Math.round(
          (diversificationScore * 0.4) + 
          (portfolioSizeScore * 0.3) + 
          (Math.min(100, data.profitability.ytd * 10) * 0.3)
        )));
        
        // Calculate return vs peers
        const returnVsPeers = parseFloat((data.profitability.ytd - 5.6).toFixed(1)); // Assuming 5.6% is average
        
        // Generate summary
        let summary = "";
        if (percentileRank < 25) {
          summary = `Seu desempenho está entre os top ${percentileRank}% dos investidores com perfil similar ao seu. `;
        } else if (percentileRank < 50) {
          summary = `Seu desempenho está superior a ${100-percentileRank}% dos investidores com perfil similar ao seu. `;
        } else {
          summary = `Seu desempenho está próximo da mediana dos investidores com perfil similar ao seu. `;
        }
        
        if (diversificationScore > 70) {
          summary += "Sua estratégia de diversificação está contribuindo positivamente para resultados acima da média.";
        } else {
          summary += "Melhorar sua diversificação entre classes de ativos poderia potencializar seus resultados.";
        }
        
        return {
          peerGroup,
          percentileRank: Math.max(1, Math.min(99, percentileRank)), // Ensure between 1-99
          returnVsPeers,
          diversificationScore,
          summary,
          dataSource: 'supabase' as const
        };
      } catch (error) {
        console.error("Error calculating social comparison data:", error);
        return defaultData;
      }
    }
    
    // If no data from Supabase or calculation failed, use the existing data or default
    return data.socialComparison || defaultData;
  }, [data.portfolioSummary, data.profitability, data.socialComparison, data.clientAge]);

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-xl text-white flex items-center">
          <span>Comparativo Social</span>
          <Badge className="ml-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
            Grupo: {socialComparisonData.peerGroup}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white dark:bg-gray-900 pt-4">
        <div className="space-y-5 h-full flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Users className="w-4 h-4 mr-1" /> 
                Ranking Percentil
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Top {socialComparisonData.percentileRank}%
              </span>
            </div>
            <Progress value={100 - socialComparisonData.percentileRank} className="h-3" />
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <span>Top 100%</span>
              <span>Top 1%</span>
            </div>
          </div>
          
          <div className={`grid ${fullWidth ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
            <div className="bg-green-50 dark:bg-green-900/40 p-3 rounded-lg border border-green-200 dark:border-green-800/50">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                Retorno vs Pares
              </p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                {socialComparisonData.returnVsPeers > 0 ? "+" : ""}{socialComparisonData.returnVsPeers}% {socialComparisonData.returnVsPeers >= 0 ? "acima" : "abaixo"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Em relação à mediana
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                Score de Diversificação
              </p>
              <div className="flex items-center">
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {socialComparisonData.diversificationScore}/100
                </p>
                <Badge className="ml-2 bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100" variant={socialComparisonData.diversificationScore > 70 ? "default" : "secondary"}>
                  {socialComparisonData.diversificationScore > 70 ? "Bom" : "Média"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {socialComparisonData.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparisonModule;
