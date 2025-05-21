
import { useRaioX } from "@/context/RaioXContext";
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  Badge,
  Progress
} from "@/components/ui";
import { 
  Users, 
  Award, 
  TrendingUp, 
  BarChart4 
} from "lucide-react";
import { BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from "@/types/raioXTypes";
import { useLegacyComponentAdapter } from "@/hooks/useLegacyComponentsAdapter";
import { toNumber } from '@/utils/typeConversionHelpers';
import { formatCurrency } from '@/utils/formattingUtils';

interface SocialComparisonModuleProps extends BaseModuleProps {
  // Additional props specific to this module
}

// Helper function for comparison metrics
const compareToNumber = (userValue: number, avgValue: number): string => {
  if (userValue > avgValue * 1.5) return "muito acima";
  if (userValue > avgValue * 1.2) return "acima";
  if (userValue < avgValue * 0.8) return "abaixo";
  if (userValue < avgValue * 0.5) return "muito abaixo";
  return "similar";
};

const SocialComparisonModuleBase = ({ fullWidth = false, dataState }: SocialComparisonModuleProps & { dataState: any }) => {
  const { data } = useRaioX();
  const adaptedData = useLegacyComponentAdapter(data);
  
  // Use synthetic data if provided, otherwise calculate from real data
  const getComparisonData = () => {
    if (dataState.isSynthetic) {
      return {
        netWorthComparison: {
          userValue: 600000,
          avgValue: 450000,
          percentile: 73
        },
        savingsRateComparison: {
          userValue: 32,
          avgValue: 22,
          percentile: 81
        },
        investmentComparison: {
          userValue: 420000,
          avgValue: 280000,
          percentile: 68
        },
        diversificationComparison: {
          userValue: 78,
          avgValue: 62,
          percentile: 85
        },
        dataSource: "synthetic" as DataSourceType
      };
    }
    
    // Calculate from real data
    // This is a very simplified calculation for demonstration
    const totalAssets = toNumber(adaptedData.portfolioSummary?.total_value) || 0;
    
    return {
      netWorthComparison: {
        userValue: totalAssets,
        avgValue: 380000,
        percentile: totalAssets > 380000 ? 65 : 45
      },
      savingsRateComparison: {
        userValue: 25,
        avgValue: 22,
        percentile: 58
      },
      investmentComparison: {
        userValue: totalAssets,
        avgValue: 280000,
        percentile: totalAssets > 280000 ? 62 : 48
      },
      diversificationComparison: {
        userValue: 60,
        avgValue: 58,
        percentile: 55
      },
      dataSource: "calculated" as DataSourceType
    };
  };
  
  const comparisonData = getComparisonData();

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            <span>Comparativo Social</span>
          </CardTitle>
          <TypeSafeDataSourceTag source={comparisonData.dataSource} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Top percentile summary */}
          <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-medium text-white">Seu Desempenho</h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-900/30 text-blue-400 border-blue-600/20">
                Faixa etária: 30-40 anos
              </Badge>
              <Badge className="bg-purple-900/30 text-purple-400 border-purple-600/20">
                Renda similar
              </Badge>
            </div>
            <p className="text-gray-300">
              Suas finanças estão melhor estruturadas que <span className="text-green-400 font-medium">{comparisonData.savingsRateComparison.percentile}%</span> das pessoas com perfil similar ao seu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Net Worth Comparison */}
            <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-white">Patrimônio Líquido</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">
                    {comparisonData.netWorthComparison.percentile}º percentil
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Seu valor</span>
                <span className="text-white font-medium">{formatCurrency(comparisonData.netWorthComparison.userValue)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Média do grupo</span>
                <span className="text-gray-300">{formatCurrency(comparisonData.netWorthComparison.avgValue)}</span>
              </div>
              <div className="mt-3">
                <Progress 
                  value={comparisonData.netWorthComparison.percentile} 
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-green-500"
                />
              </div>
            </div>
            
            {/* Savings Rate Comparison */}
            <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-white">Taxa de Poupança</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">
                    {comparisonData.savingsRateComparison.percentile}º percentil
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Seu valor</span>
                <span className="text-white font-medium">{comparisonData.savingsRateComparison.userValue}%</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Média do grupo</span>
                <span className="text-gray-300">{comparisonData.savingsRateComparison.avgValue}%</span>
              </div>
              <div className="mt-3">
                <Progress 
                  value={comparisonData.savingsRateComparison.percentile} 
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-green-500"
                />
              </div>
            </div>
            
            {/* Investment Amount Comparison */}
            <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-white">Volume de Investimentos</h3>
                <div className="flex items-center gap-2">
                  <BarChart4 className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">
                    {comparisonData.investmentComparison.percentile}º percentil
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Seu valor</span>
                <Badge className="bg-blue-900/30 text-blue-300 border-blue-600/20">
                  {formatCurrency(comparisonData.investmentComparison.userValue)}
                </Badge>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Média do grupo</span>
                <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                  {formatCurrency(comparisonData.investmentComparison.avgValue)}
                </Badge>
              </div>
              <div className="mt-3">
                <Progress 
                  value={comparisonData.investmentComparison.percentile} 
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-blue-500"
                />
              </div>
            </div>
            
            {/* Diversification Score Comparison */}
            <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium text-white">Diversificação</h3>
                <span className="text-sm text-purple-400 font-medium">
                  {comparisonData.diversificationComparison.percentile}º percentil
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Sua pontuação</span>
                <span className="text-white font-medium">{comparisonData.diversificationComparison.userValue}/100</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Média do grupo</span>
                <span className="text-gray-300">{comparisonData.diversificationComparison.avgValue}/100</span>
              </div>
              <div className="mt-3">
                <Progress 
                  value={comparisonData.diversificationComparison.percentile} 
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Get real data function
const getRealComparisonData = (props: SocialComparisonModuleProps) => {
  return null; // For now just return null
};

// Get synthetic data function
const getSyntheticComparisonData = (props: SocialComparisonModuleProps) => {
  return {
    isSynthetic: true
  };
};

// Create the safe module
const SocialComparisonModule = withSafeData(
  SocialComparisonModuleBase,
  getRealComparisonData,
  getSyntheticComparisonData
);

export default SocialComparisonModule;
