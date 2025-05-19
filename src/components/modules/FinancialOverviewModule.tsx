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

const FinancialOverviewModule = ({ fullWidth = false }: FinancialOverviewModuleProps) => {
  const { data, hasOpenFinance, financialSummary, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Mock data for net worth chart
  const mockNetWorthHistory = [
    { month: 'Jan', amount: 980000 },
    { month: 'Feb', amount: 995000 },
    { month: 'Mar', amount: 1010000 },
    { month: 'Apr', amount: 1030000 },
    { month: 'May', amount: 1060000 },
    { month: 'Jun', amount: 1090000 },
    { month: 'Jul', amount: 1120000 },
    { month: 'Aug', amount: 1150000 },
    { month: 'Sep', amount: 1170000 },
    { month: 'Oct', amount: 1200000 },
    { month: 'Nov', amount: 1230000 },
    { month: 'Dec', amount: hasOpenFinance ? (financialSummary?.netWorth || 1250000) : 1250000 },
  ];

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
                    {formatCurrency(1250000)}
                  </div>
                  <div className="flex items-center text-sm text-green-400">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+4.3% este mês</span>
                  </div>
                </div>
              </div>
              
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockNetWorthHistory}>
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
                <div className="text-xl font-bold text-white">{formatCurrency(1450000)}</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
                <div className="text-sm text-gray-400 mb-1">Retorno Acumulado</div>
                <div className="text-xl font-bold text-white">+12.3%</div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
                <div className="text-sm text-gray-400 mb-1">Dividendos Anuais</div>
                <div className="text-xl font-bold text-white">{formatCurrency(42000)}</div>
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
                  {formatCurrency(financialSummary?.netWorth)}
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+4.3% este mês</span>
                </div>
              </div>
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockNetWorthHistory}>
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
              <div className="text-xl font-bold text-white">{formatCurrency(financialSummary?.totalAssets)}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/20">
              <div className="text-sm text-gray-400 mb-1">Total de Passivos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(financialSummary?.totalLiabilities)}</div>
            </div>
          </div>
          
          {/* Financial Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
              <div className="text-sm text-gray-400 mb-1">Taxa de Poupança</div>
              <div className="text-xl font-bold text-white">{financialSummary?.savingsRate}%</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+2.1% vs. média</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
              <div className="text-sm text-gray-400 mb-1">Liquidez Imediata</div>
              <div className="text-xl font-bold text-white">{formatCurrency(financialSummary?.liquidAssets)}</div>
              <div className="flex items-center text-xs text-amber-400 mt-1">
                <span>Cobertura de {((financialSummary?.liquidAssets || 0) / (financialSummary?.monthlyExpenses || 1)).toFixed(1)} meses</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20">
              <div className="text-sm text-gray-400 mb-1">Fluxo Líquido Mensal</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency((financialSummary?.monthlyIncome || 0) - (financialSummary?.monthlyExpenses || 0))}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span>Receita: {formatCurrency(financialSummary?.monthlyIncome)}</span>
              </div>
            </div>
          </div>
          
          {/* Top Risks */}
          <div>
            <h3 className="font-medium text-white mb-2">Principais Riscos</h3>
            <div className="space-y-3">
              {financialSummary?.topRisks.map((risk, index) => (
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
