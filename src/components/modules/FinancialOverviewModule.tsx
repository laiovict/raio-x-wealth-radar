
import { useRaioX, FinancialSummary } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, AlertTriangle, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const FinancialOverviewModule = ({ fullWidth = false }: FinancialOverviewModuleProps) => {
  const { data, hasOpenFinance, financialSummary, isAIAnalysisLoading, refreshAIAnalysis, selectedClient } = useRaioX();

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "R$ 0";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Enhanced synthetic data based on client profiles
  const getSyntheticData = (): EnhancedFinancialSummary => {
    // Default synthetic values
    let netWorth = 1250000;
    let totalAssets = 1450000;
    let totalLiabilities = 200000;
    let liquidAssets = 210000;
    let monthlyIncome = 42000;
    let monthlyExpenses = 28000;
    let savingsRate = 33.3;
    let monthlyTrend = "+4.3%";
    let savingsRateTrend = "+2.1%";
    
    // Customize based on selected client
    if (selectedClient) {
      switch (selectedClient) {
        // Laio Santos (240275) - High net worth client
        case 240275:
          netWorth = 4800000;
          totalAssets = 5300000;
          totalLiabilities = 500000;
          liquidAssets = 780000;
          monthlyIncome = 95000;
          monthlyExpenses = 48000;
          savingsRate = 49.5;
          monthlyTrend = "+5.7%";
          savingsRateTrend = "+3.2%";
          break;
          
        // Ana Oliveira (316982) - Aggressive profile
        case 316982:
          netWorth = 1850000;
          totalAssets = 2200000;
          totalLiabilities = 350000;
          liquidAssets = 140000;
          monthlyIncome = 38000;
          monthlyExpenses = 29000;
          savingsRate = 23.7;
          monthlyTrend = "+7.2%";
          savingsRateTrend = "-1.3%";
          break;
          
        // Marcos Santos (327272) - Conservative profile
        case 327272:
          netWorth = 980000;
          totalAssets = 995000;
          totalLiabilities = 15000;
          liquidAssets = 420000;
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
      // Required properties from the base FinancialSummary interface
      investmentBalance: totalAssets * 0.85, // 85% of assets are investments
      cashReserves: liquidAssets,
      debtTotal: totalLiabilities,
      riskProfile: "Moderado",
      creditScore: 750,
      allocationSummary: {
        stocks: 30,
        bonds: 40,
        cash: 10,
        realEstate: 10,
        alternatives: 10
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
        amount: startValue
      });
    }
    
    // Ensure the final value matches our target
    result[11].amount = currentValue;
    
    return result;
  };
  
  // Use synthetic data when financial summary is missing
  const finData = hasOpenFinance 
    ? financialSummary || getSyntheticData() 
    : getSyntheticData();
    
  // Get historical net worth data
  const netWorthHistory = generateNetWorthHistory(finData.netWorth);

  // Default trend values when not available
  const defaultTrend = "+3.5%";

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Meu Panorama Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Limited Net Worth Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg text-white">Patrimônio de Investimentos</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(finData.netWorth)}
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>{(finData as EnhancedFinancialSummary).monthlyTrend || defaultTrend} este mês</span>
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
                <div className="text-sm text-gray-400 mb-1">Total Investido</div>
                <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
                <div className="text-sm text-gray-400 mb-1">Retorno Acumulado</div>
                <div className="text-xl font-bold text-white">+12.3%</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
                <div className="text-sm text-gray-400 mb-1">Dividendos Anuais</div>
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
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Net Worth Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg text-white">Patrimônio Líquido</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(finData.netWorth)}
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>{(finData as EnhancedFinancialSummary).monthlyTrend || defaultTrend} este mês</span>
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
              <div className="text-sm text-gray-400 mb-1">Total de Ativos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/20">
              <div className="text-sm text-gray-400 mb-1">Total de Passivos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.totalLiabilities)}</div>
            </div>
          </div>
          
          {/* Financial Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
              <div className="text-sm text-gray-400 mb-1">Taxa de Poupança</div>
              <div className="text-xl font-bold text-white">{finData.savingsRate}%</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>{(finData as EnhancedFinancialSummary).savingsRateTrend || "+2.0%"} vs. média</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
              <div className="text-sm text-gray-400 mb-1">Liquidez Imediata</div>
              <div className="text-xl font-bold text-white">{formatCurrency(finData.liquidAssets)}</div>
              <div className="flex items-center text-xs text-amber-400 mt-1">
                <span>Cobertura de {(finData.liquidAssets / finData.monthlyExpenses).toFixed(1)} meses</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20">
              <div className="text-sm text-gray-400 mb-1">Fluxo Líquido Mensal</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(finData.monthlyIncome - finData.monthlyExpenses)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span>Receita: {formatCurrency(finData.monthlyIncome)}</span>
              </div>
            </div>
          </div>
          
          {/* Top Risks - Add null check for topRisks */}
          <div>
            <h3 className="font-medium text-white mb-2">Principais Riscos</h3>
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
                    <div className="font-medium text-sm text-white">{risk.name}</div>
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
