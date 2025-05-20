import { useRaioX, FinancialSummary } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, AlertTriangle, RefreshCw, Lock, Shield, TrendingUp, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip as UITooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FinancialOverviewModuleProps {
  fullWidth?: boolean;
}

// Extended financial summary type with our synthetic data properties
interface EnhancedFinancialSummary extends Omit<FinancialSummary, 'topRisks'> {
  monthlyTrend?: string;
  savingsRateTrend?: string;
  topRisks?: {
    name: string;
    severity: "high" | "medium" | "low";
    impact: string;
  }[];
}

// Data source tag component
const DataSourceTag = ({ dataSource }: { dataSource: 'supabase' | 'synthetic' | undefined }) => {
  if (!dataSource) return null;
  
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>
          <span className={`ml-1 ${dataSource === 'supabase' ? 'text-green-400' : 'text-amber-400'}`}>
            {dataSource === 'supabase' ? <CheckCircle className="inline-block h-3 w-3" /> : '*'}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{dataSource === 'supabase' ? 'Dado real do Supabase' : 'Dado sintético'}</p>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
};

const FinancialOverviewModule = ({ fullWidth = false }: FinancialOverviewModuleProps) => {
  const { data, hasOpenFinance, financialSummary, isAIAnalysisLoading, refreshAIAnalysis, selectedClient } = useRaioX();
  const [showBehavioralInsights, setShowBehavioralInsights] = useState(false);
  const [showDataSourceInfo, setShowDataSourceInfo] = useState(false);

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "R$ 0";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get client portfolio summary from real data if available
  const getPortfolioSummary = () => {
    if (data.portfolioSummary) {
      return {
        totalPortfolioValue: parseFloat(data.portfolioSummary.total_portfolio_value || "0"),
        fixedIncomeValue: data.portfolioSummary.fixed_income_value || 0,
        stocksValue: parseFloat(data.portfolioSummary.stocks_value || "0"),
        realEstateValue: data.portfolioSummary.real_estate_value || 0,
        investmentFundValue: data.portfolioSummary.investment_fund_value || 0,
        treasureValue: parseFloat(data.portfolioSummary.treasure_value || "0"),
        investmentInternationalValue: parseFloat(data.portfolioSummary.investment_international_value || "0"),
        dataSource: data.portfolioSummary.dataSource
      };
    }
    
    return null;
  };

  // Enhanced synthetic data based on client profiles, fallback if real data isn't available
  const getSyntheticData = (): EnhancedFinancialSummary => {
    // Get real portfolio summary if available
    const portfolioSummary = getPortfolioSummary();
    
    // Default synthetic values
    let netWorth = portfolioSummary?.totalPortfolioValue || 1250000;
    let totalAssets = portfolioSummary?.totalPortfolioValue || 1450000;
    let totalLiabilities = 200000; // Not provided in portfolio summary
    let liquidAssets = portfolioSummary?.fixedIncomeValue || 210000;
    let monthlyIncome = 42000; // Not provided in portfolio summary
    let monthlyExpenses = 28000; // Not provided in portfolio summary
    let savingsRate = 33.3; // Calculated if both income and expenses are available
    let monthlyTrend = "+4.3%";
    let savingsRateTrend = "+2.1%";
    
    // Customize based on selected client
    if (selectedClient) {
      switch (selectedClient) {
        // Laio Santos (240275) - High net worth client
        case 240275:
          if (!portfolioSummary) {
            netWorth = 4800000;
            totalAssets = 5300000;
            totalLiabilities = 500000;
            liquidAssets = 780000;
          }
          monthlyIncome = 95000;
          monthlyExpenses = 48000;
          savingsRate = 49.5;
          monthlyTrend = "+5.7%";
          savingsRateTrend = "+3.2%";
          break;
          
        // Ana Oliveira (316982) - Aggressive profile
        case 316982:
          if (!portfolioSummary) {
            netWorth = 1850000;
            totalAssets = 2200000;
            totalLiabilities = 350000;
            liquidAssets = 140000;
          }
          monthlyIncome = 38000;
          monthlyExpenses = 29000;
          savingsRate = 23.7;
          monthlyTrend = "+7.2%";
          savingsRateTrend = "-1.3%";
          break;
          
        // Marcos Santos (327272) - Conservative profile
        case 327272:
          if (!portfolioSummary) {
            netWorth = 980000;
            totalAssets = 995000;
            totalLiabilities = 15000;
            liquidAssets = 420000;
          }
          monthlyIncome = 26000;
          monthlyExpenses = 19500;
          savingsRate = 25.0;
          monthlyTrend = "+1.8%";
          savingsRateTrend = "+1.5%";
          break;
          
        default:
          // Keep default values
      }
    }
    
    // Flag all synthetic data
    const dataSource = 'synthetic';
    
    // Create synthetic financial summary with all required properties from FinancialSummary
    return {
      netWorth,
      totalAssets,
      totalLiabilities,
      liquidAssets,
      monthlyIncome,
      monthlyExpenses,
      savingsRate,
      monthlyTrend,
      savingsRateTrend,
      dataSource,
      // Required properties from the base FinancialSummary interface
      investmentBalance: totalAssets * 0.85, // 85% of assets are investments
      cashReserves: liquidAssets,
      debtTotal: totalLiabilities,
      riskProfile: "Moderado",
      creditScore: 750,
      allocationSummary: {
        stocks: portfolioSummary ? parseFloat(data.portfolioSummary.stocks_representation || "0") : 30,
        bonds: portfolioSummary ? data.portfolioSummary.fixed_income_representation || 0 : 40,
        cash: 10,
        realEstate: portfolioSummary ? data.portfolioSummary.real_estate_representation || 0 : 10,
        alternatives: portfolioSummary ? data.portfolioSummary.investment_fund_representation || 0 : 10
      },
      riskMetrics: [
        { name: "Volatilidade", value: 45, color: "#4CAF50" },
        { name: "Exposição a Renda Variável", value: 35, color: "#FFC107" },
        { name: "Concentração", value: 25, color: "#2196F3" }
      ],
      topRisks: [
        {
          name: "Concentração em Poucos Ativos",
          severity: "high",
          impact: "68% do patrimônio em apenas 4 ativos"
        },
        {
          name: "Baixa Reserva de Emergência",
          severity: "medium",
          impact: `Cobertura de ${(liquidAssets / monthlyExpenses).toFixed(1)} meses de despesas`
        },
        {
          name: "Exposição Cambial",
          severity: "medium",
          impact: "30% do patrimônio sem proteção cambial"
        }
      ]
    };
  };

  // Generate synthetic history data for net worth chart
  const generateNetWorthHistory = (currentValue: number) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const result = [];
    
    // Start with a value 12% lower than current
    let startValue = currentValue * 0.88;
    
    // Generate monthly data with slight randomness
    for (let i = 0; i < 12; i++) {
      // Add some randomness to growth
      const monthlyGrowth = 1 + (0.005 + Math.random() * 0.01);
      startValue = Math.round(startValue * monthlyGrowth);
      
      result.push({
        month: months[i],
        amount: startValue,
        dataSource: 'synthetic' as const // Use const assertion to fix the type
      });
    }
    
    // Ensure the final value matches our target
    result[11].amount = currentValue;
    
    return result;
  };
  
  // Use real data when financial summary is available, otherwise use synthetic data
  const finData = hasOpenFinance 
    ? financialSummary || getSyntheticData() 
    : getSyntheticData();
    
  // Get historical net worth data
  const netWorthHistory = generateNetWorthHistory(finData.netWorth);

  // Default trend values when not available
  const defaultTrend = "+3.5%";
  
  // Financial behavior data from images - this is all synthetic
  const financialBehaviorData = {
    investmentConsistency: {
      grade: "A+",
      description: "Investiu consistentemente nos últimos 24 meses",
      dataSource: 'synthetic' as const
    },
    spendingDiscipline: {
      grade: "B",
      description: "Excedeu o orçamento em 18% em 3 dos últimos 6 meses",
      dataSource: 'synthetic' as const
    },
    financialResilience: {
      grade: "A",
      description: "Reserva de emergência cobre 8 meses de despesas",
      dataSource: 'synthetic' as const
    }
  };
  
  // Cross-institutional analysis data - this is all synthetic
  const crossInstitutionalData = {
    bankComparisons: [
      { name: "Banco A", rate: 2.1, color: "#FF6B6B", dataSource: 'synthetic' as const },
      { name: "Banco B", rate: 1.4, color: "#FFD166", dataSource: 'synthetic' as const },
      { name: "Reinvent", rate: 0.8, color: "#06D6A0", dataSource: 'synthetic' as const }
    ],
    potentialSavings: 8750,
    dataSource: 'synthetic' as const
  };
  
  // Financial history highlights data - this is all synthetic
  const financialHistoryData = [
    {
      id: 1,
      title: "Você viveu no limite?",
      description: "Em março, você gastou R$ 15.800, o equivalente a 3 iPhones Pro Max ou 1 mês num apê no Jardins. Foi seu recorde do ano.",
      progress: 85,
      color: "#FFD166",
      dataSource: 'synthetic' as const
    },
    {
      id: 2,
      title: "Dinheiro que escorreu pelo ralo",
      description: "Só com assinaturas não utilizadas, você gastou R$ 4.320 no último ano. Se tivesse colocado metade disso num CDB, teria hoje R$ 2.376 adicionais.",
      progress: 60,
      color: "#FF6B6B",
      dataSource: 'synthetic' as const
    },
    {
      id: 3,
      title: "O que você mais comprou?",
      description: "Top 3 categorias do seu cartão: Delivery (R$ 12.840), Assinaturas (R$ 8.620) e Eletrônicos (R$ 7.980). Spoiler: você pediu 98 vezes no iFood.",
      progress: 75,
      color: "#4D96FF",
      dataSource: 'synthetic' as const
    },
    {
      id: 4,
      title: "A hora que você brilhou",
      description: "Seu melhor investimento foi HGLG11, com 22% de rentabilidade. Se tivesse colocado o dobro, teria ganho R$ 28.600 adicionais.",
      progress: 100,
      color: "#06D6A0",
      dataSource: 'synthetic' as const
    },
    {
      id: 5,
      title: "E se você focasse de verdade?",
      description: "Se reduzir 15% dos seus gastos com restaurantes, dá pra investir R$ 960 todo mês. Isso pode virar R$ 1.470.000 em 25 anos.",
      progress: 50,
      color: "#9C27B0",
      dataSource: 'synthetic' as const
    }
  ];
  
  // Recommended next steps - this is all synthetic
  const recommendedSteps = [
    {
      id: 1,
      title: "Otimizar sua alocação atual",
      description: "Realoque 12% dos seus investimentos de renda fixa para um mix mais diversificado de FIIs e multimercados.",
      impact: "+R$ 24.600/ano",
      dataSource: 'synthetic' as const
    },
    {
      id: 2,
      title: "Revisar custos fixos mensais",
      description: "Consolidar assinaturas duplicadas e renegociar pacotes bancários pode liberar até R$ 780/mês para investimentos.",
      impact: "+R$ 9.360/ano",
      dataSource: 'synthetic' as const
    }
  ];

  // Informações dos indicadores de fonte de dados
  const dataSourceInfo = {
    supabase: "Dados provenientes do Supabase, representando informações reais do cliente.",
    synthetic: "Dados sintéticos gerados para demonstração, não representam valores reais do cliente."
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Meu Panorama Financeiro
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDataSourceInfo(!showDataSourceInfo)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              <span className="text-xs">Legenda</span>
            </Button>
          </div>
          {showDataSourceInfo && (
            <div className="mt-2 p-2 bg-gray-800/50 rounded-md text-xs">
              <div className="flex items-center mb-1">
                <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
                <span>{dataSourceInfo.supabase}</span>
              </div>
              <div className="flex items-center">
                <span className="text-amber-400 mr-1">*</span>
                <span>{dataSourceInfo.synthetic}</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Limited Net Worth Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg text-white">
                  Patrimônio de Investimentos
                  <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(finData.netWorth)}
                    <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>
                      {(finData as EnhancedFinancialSummary).monthlyTrend || defaultTrend} este mês
                      <DataSourceTag dataSource="synthetic" />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={netWorthHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis 
                      stroke="#666"
                      tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Valor"]}
                      labelFormatter={(label) => `Mês: ${label}`}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 p-2 border border-gray-700 rounded-md">
                              <p className="text-gray-300">{`Mês: ${label}`}</p>
                              <p className="text-white font-medium">{`Valor: ${formatCurrency(payload[0].value as number)}`}</p>
                              <p className="text-amber-400 text-xs">* Dados sintéticos</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      dot={false}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* OpenFinance needed banner */}
            <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-900/10">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-900/30 rounded-full">
                  <Lock className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Visão 360° Limitada</h3>
                  <p className="text-gray-300 mb-4">
                    Você está visualizando apenas seus dados de investimentos. Para acessar seu panorama financeiro completo, 
                    incluindo despesas, contas bancárias e uma visão 360° do seu patrimônio, ative o OpenFinance.
                  </p>
                  <Button 
                    variant="purpleGradient"
                    onClick={() => {
                      const event = new CustomEvent('activate-openfinance');
                      document.dispatchEvent(event);
                    }}
                  >
                    Ativar OpenFinance
                  </Button>
                </div>
              </div>
            </div>

            {/* Investment Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
                <div className="text-sm text-gray-400 mb-1">
                  Total Investido
                  <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
                </div>
                <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
                <div className="text-sm text-gray-400 mb-1">
                  Retorno Acumulado
                  <DataSourceTag dataSource={data.profitability?.dataSource || 'synthetic'} />
                </div>
                <div className="text-xl font-bold text-white">
                  {data.profitability ? `${data.profitability.ytd?.toFixed(2)}%` : "+12.3%"}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
                <div className="text-sm text-gray-400 mb-1">
                  Dividendos Anuais
                  <DataSourceTag dataSource="synthetic" />
                </div>
                <div className="text-xl font-bold text-white">{formatCurrency(finData.monthlyIncome * 0.15 * 12)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAIAnalysisLoading) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Meu Panorama Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Atualizando seu panorama financeiro...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Meu Panorama Financeiro
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDataSourceInfo(!showDataSourceInfo)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              <span className="text-xs">Legenda</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Atualizar</span>
            </Button>
          </div>
        </div>
        {showDataSourceInfo && (
          <div className="mt-2 p-2 bg-gray-800/50 rounded-md text-xs">
            <div className="flex items-center mb-1">
              <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
              <span>{dataSourceInfo.supabase}</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-400 mr-1">*</span>
              <span>{dataSourceInfo.synthetic}</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Financial Overview Section */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-white/5">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-lg text-blue-400">Seu panorama financeiro</h2>
                <p className="text-sm text-gray-400">Uma visão completa da sua jornada financeira</p>
              </div>
              <div className="text-sm text-right">
                <div className="text-gray-400">Data do diagnóstico</div>
                <div className="text-white font-medium">19 de Maio, 2025</div>
                {hasOpenFinance && (
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30 mt-1">
                    OpenFinance
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400">
                  Patrimônio total
                  <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
                </div>
                <div className="text-2xl font-bold text-white">{formatCurrency(finData.netWorth)}</div>
                <div className="text-sm text-green-400">
                  +12,5% desde o último trimestre
                  <DataSourceTag dataSource="synthetic" />
                </div>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400">
                  Score de diversificação
                  <DataSourceTag dataSource="synthetic" />
                </div>
                <div className="text-2xl font-bold text-white">73/100</div>
                <div className="text-sm text-blue-400">
                  Melhor que 65% dos investidores
                  <DataSourceTag dataSource="synthetic" />
                </div>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <div className="text-sm text-gray-400">
                  Potencial de otimização
                  <DataSourceTag dataSource="synthetic" />
                </div>
                <div className="text-2xl font-bold text-white">+R$ 37.500/ano</div>
                <div className="text-sm text-gray-400">
                  Com ajustes na alocação atual
                  <DataSourceTag dataSource="synthetic" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Net Worth Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg text-white">
                Patrimônio Líquido
                <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(finData.netWorth)}
                  <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>
                    {(finData as EnhancedFinancialSummary).monthlyTrend || defaultTrend} este mês
                    <DataSourceTag dataSource="synthetic" />
                  </span>
                </div>
              </div>
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={netWorthHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis 
                    stroke="#666"
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                      return value.toString();
                    }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-800 p-2 border border-gray-700 rounded-md">
                            <p className="text-gray-300">{`Mês: ${label}`}</p>
                            <p className="text-white font-medium">{`Valor: ${formatCurrency(payload[0].value as number)}`}</p>
                            <p className="text-amber-400 text-xs">* Dados sintéticos</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    dot={false}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Assets & Liabilities Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
              <div className="text-sm text-gray-400 mb-1">
                Total de Ativos
                <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
              </div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/20">
              <div className="text-sm text-gray-400 mb-1">
                Total de Passivos
                <DataSourceTag dataSource="synthetic" />
              </div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.totalLiabilities)}</div>
            </div>
          </div>
          
          {/* Financial Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
              <div className="text-sm text-gray-400 mb-1">
                Taxa de Poupança
                <DataSourceTag dataSource="synthetic" />
              </div>
              <div className="text-xl font-bold text-white">{finData.savingsRate}%</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>
                  {(finData as EnhancedFinancialSummary).savingsRateTrend || "+2.0%"} vs. média
                  <DataSourceTag dataSource="synthetic" />
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
              <div className="text-sm text-gray-400 mb-1">
                Liquidez Imediata
                <DataSourceTag dataSource={getPortfolioSummary()?.dataSource || 'synthetic'} />
              </div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.liquidAssets)}</div>
              <div className="flex items-center text-xs text-amber-400 mt-1">
                <span>
                  Cobertura de ${(finData.liquidAssets / finData.monthlyExpenses).toFixed(1)} meses
                  <DataSourceTag dataSource="synthetic" />
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20">
              <div className="text-sm text-gray-400 mb-1">
                Fluxo Líquido Mensal
                <DataSourceTag dataSource="synthetic" />
              </div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(finData.monthlyIncome - finData.monthlyExpenses)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span>
                  Receita: {formatCurrency(finData.monthlyIncome)}
                  <DataSourceTag dataSource="synthetic" />
                </span>
              </div>
            </div>
          </div>
          
          {/* OpenFinance Insights - New Section */}
          {hasOpenFinance && (
            <div className="mt-6">
              <div className="mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center text-lg font-medium text-white gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Dados OpenFinance</span>
                  <DataSourceTag dataSource="synthetic" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Financial Behavior */}
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-white">
                    Seu Comportamento Financeiro
                    <DataSourceTag dataSource="synthetic" />
                  </h4>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Recorrência de Investimentos
                        <DataSourceTag dataSource={financialBehaviorData.investmentConsistency.dataSource} />
                      </div>
                      <div className="text-xs text-gray-400">{financialBehaviorData.investmentConsistency.description}</div>
                    </div>
                    <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.investmentConsistency.grade}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Disciplina de Gastos
                        <DataSourceTag dataSource={financialBehaviorData.spendingDiscipline.dataSource} />
                      </div>
                      <div className="text-xs text-gray-400">{financialBehaviorData.spendingDiscipline.description}</div>
                    </div>
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">{financialBehaviorData.spendingDiscipline.grade}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Resiliência Financeira
                        <DataSourceTag dataSource={financialBehaviorData.financialResilience.dataSource} />
                      </div>
                      <div className="text-xs text-gray-400">{financialBehaviorData.financialResilience.description}</div>
                    </div>
                    <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.financialResilience.grade}</Badge>
                  </div>
                </div>
                
                {/* Cross-Institutional Analysis */}
                <div className="space-y-4">
                  <h4 className="text-base font-medium text-white">
                    Análise Cross-Institucional
                    <DataSourceTag dataSource="synthetic" />
                  </h4>
                  
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="mb-2 text-sm font-medium text-white">
                      Comparação de taxas em diferentes instituições:
                      <DataSourceTag dataSource="synthetic" />
                    </div>
                    
                    {crossInstitutionalData.bankComparisons.map((bank) => (
                      <div key={bank.name} className="mb-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>
                            {bank.name}
                            <DataSourceTag dataSource={bank.dataSource} />
                          </span>
                          <span>{bank.rate}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{
                              width: `${(bank.rate/3)*100}%`,
                              backgroundColor: bank.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-3 text-sm">
                      <div className="text-gray-400">
                        Economia potencial anual:
                        <DataSourceTag dataSource={crossInstitutionalData.dataSource} />
                      </div>
                      <div className="font-medium text-green-400">R$ {crossInstitutionalData.potentialSavings}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Financial History Highlights - New Section */}
          {hasOpenFinance && (
            <div className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-lg font-medium text-white">
                  Sua história financeira em 2025
                  <DataSourceTag dataSource="synthetic" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-400" 
                  onClick={() => setShowBehavioralInsights(!showBehavioralInsights)}
                >
                  {showBehavioralInsights ? "Mostrar menos" : "Mostrar mais"}
                </Button>
              </div>
              
              {showBehavioralInsights && (
                <div className="space-y-4">
                  {financialHistoryData.map((item) => (
                    <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                          {item.id}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-white mb-1">
                            {item.title}
                            <DataSourceTag dataSource={item.dataSource} />
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: item.color
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Recommended Next Steps - New Section */}
          {hasOpenFinance && (
            <div className="mt-6">
              <div className="mb-4 border-b border-white/10 pb-2">
                <div className="text-lg font-medium text-white">
                  Próximos Passos Recomendados
                  <DataSourceTag dataSource="synthetic" />
                </div>
              </div>
              
              <div className="space-y-4">
                {recommendedSteps.map((step) => (
                  <div key={step.id} className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-medium text-white">
                        {step.id}. {step.title}
                        <DataSourceTag dataSource={step.dataSource} />
                      </h4>
                      <Badge className="bg-green-600">{step.impact}</Badge>
                    </div>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Top Risks - Add null check for topRisks */}
          <div>
            <h3 className="font-medium text-white mb-2">
              Principais Riscos
              <DataSourceTag dataSource="synthetic" />
            </h3>
            <div className="space-y-3">
              {(finData as EnhancedFinancialSummary).topRisks?.map((risk, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge className={`
                    ${risk.severity === 'high' ? 'bg-red-600' : 
                      risk.severity === 'medium' ? 'bg-amber-600' : 'bg-green-600'}
                  `}>
                    {risk.severity === 'high' ? 'Alto' : 
                      risk.severity === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm text-white">
                      {risk.name}
                      <DataSourceTag dataSource="synthetic" />
                    </div>
                    <div className="text-xs text-gray-400">{risk.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewModule;
