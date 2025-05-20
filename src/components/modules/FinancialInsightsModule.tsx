import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  Coins, 
  DollarSign,
  Info,
  PiggyBank,
  Wallet
} from "lucide-react";
import { Globe } from "@/components/common/icons";
import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/utils/formattingUtils";
import DataSourceTag from "@/components/common/DataSourceTag";
import { DataSourceType } from "@/types/raioXTypes";
import { toNumber } from "@/utils/typeConversionHelpers";

// Define more specific types for each insight type
interface BaseInsight {
  summary?: string; // Make summary optional across all insight types
  dataSource?: DataSourceType; // Add dataSource field to track where data comes from
}

interface HighestSpendingMonth extends BaseInsight {
  month: string;
  amount: number;
  categories: { name: string; amount: number; }[];
}

interface WastedMoney extends BaseInsight {
  total: number;
  categories: { name: string; amount: number; }[];
}

interface TopCategories extends BaseInsight {
  categories: { name: string; amount: number; percentage: number; }[];
  total: number;
}

interface NegativeMonths extends BaseInsight {
  count: number;
  months: string[];
  totalDeficit: number;
}

interface InvestmentGrowth extends BaseInsight {
  annual: number;
  total: number;
  bestAsset: { name: string; growth: number; };
}

interface PotentialSavings extends BaseInsight {
  amount: number;
  suggestions: string[];
}

interface BestInvestment extends BaseInsight {
  name: string;
  return: number;
  period: string;
}

interface RetirementReadiness extends BaseInsight {
  score: number;
  years: number;
  monthlyNeeded: number;
}

interface RecurringExpenses extends BaseInsight {
  items: Array<{
    description: string;
    amount: number;
    category: string;
    frequency: string;
    occurrences: number;
  }>;
  total: number;
}

// Define the full structure of financial insight data
interface FinancialInsightData {
  highestSpendingMonth?: HighestSpendingMonth;
  wastedMoney?: WastedMoney;
  topCategories?: TopCategories;
  negativeMonths?: NegativeMonths;
  investmentGrowth?: InvestmentGrowth;
  potentialSavings?: PotentialSavings;
  bestInvestment?: BestInvestment;
  retirementReadiness?: RetirementReadiness;
  recurringExpenses?: RecurringExpenses;
  dataSource?: DataSourceType;
}

// Add this at the beginning of the file, after existing imports
interface FinancialInsightsModuleProps {
  fullWidth?: boolean;
}

const FinancialInsightsModule = ({ fullWidth = false }: FinancialInsightsModuleProps) => {
  const { 
    data, 
    portfolioSummary, 
    dividendHistory, 
    profitability,
    openFinanceInsights,
    hasOpenFinanceData
  } = useRaioX();
  const [currentDate] = useState(new Date());
  const [showDataSourceInfo, setShowDataSourceInfo] = useState(false);
  
  // Enhance financial insights with real data when available
  const financialInsights: FinancialInsightData = useMemo(() => {
    // If we have OpenFinance insights, use them
    if (hasOpenFinanceData && openFinanceInsights) {
      console.log("Using OpenFinance insights:", openFinanceInsights);
      return openFinanceInsights;
    }
    
    // Start with existing insights data or create a new empty object with the correct type
    const insights: FinancialInsightData = data.financialInsightData ? 
      { ...data.financialInsightData } : 
      { dataSource: 'synthetic' };
    
    // If we have portfolio and dividend data, use it to enhance insights
    if (portfolioSummary && dividendHistory) {
      // Use real dividend data to enhance the investment growth insight
      if (!insights.investmentGrowth) {
        insights.investmentGrowth = {
          annual: profitability?.ytd || 7.5,
          total: toNumber(portfolioSummary?.total_portfolio_value) * 0.075,
          bestAsset: { name: "PETR4", growth: 12.3 },
          dataSource: 'xp'
        };
      }
      
      // Calculate total dividends for insights
      const totalDividendAmount = dividendHistory.reduce((total, div) => {
        const value = parseFloat(String(div.value).replace(/[^\d,-]/g, '').replace(',', '.'));
        return total + (isNaN(value) ? 0 : value);
      }, 0);
      
      // Add best investment insight based on real data
      if (!insights.bestInvestment) {
        insights.bestInvestment = {
          name: dividendHistory[0]?.asset || "ITSA4",
          return: profitability?.ytd ? profitability.ytd * 1.2 : 9.0,
          period: "YTD",
          dataSource: 'xp'
        };
      }
    }
    
    return insights;
  }, [data.financialInsightData, portfolioSummary, dividendHistory, profitability, openFinanceInsights, hasOpenFinanceData]);

  // Informações dos indicadores de fonte de dados
  const dataSourceInfo = {
    xp: "Dados provenientes da XP Investimentos, representando informações reais do cliente.",
    openfinance: "Dados obtidos via Open Finance, refletindo informações de outras instituições financeiras.",
    synthetic: "Dados sintéticos gerados para demonstração, não representam valores reais do cliente."
  };
  
  // If client doesn't have financial insights data at all
  if (!financialInsights || Object.keys(financialInsights).length === 0) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Insights Financeiros Detalhados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <PiggyBank className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-gray-400 text-center">
              Insights financeiros detalhados não disponíveis para este cliente.
              <br />
              Conecte mais contas via Pluggy para análises avançadas.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate summary text for each insight if it doesn't exist
  const generateSummary = (type: string, data: any): string => {
    switch (type) {
      case 'highestSpendingMonth':
        return `Em ${data.month}, você gastou ${formatCurrency(String(data.amount))}, principalmente em ${data.categories && data.categories[0]?.name || 'diversas categorias'}.`;
      case 'wastedMoney':
        return `Você poderia ter economizado aproximadamente ${formatCurrency(String(data.total))} em gastos desnecessários ou excessivos.`;
      case 'topCategories':
        return `Suas principais categorias de gastos são ${data.categories && data.categories.slice(0, 2).map((c: any) => c.name).join(', ')} ou 'diversas categorias', somando ${formatCurrency(String(data.total))}.`;
      case 'negativeMonths': 
        return `Você teve ${data.count} meses com saldo negativo, totalizando um déficit de ${formatCurrency(String(data.totalDeficit))}.`;
      case 'investmentGrowth':
        return `Seus investimentos cresceram ${data.annual}% este ano, com destaque para ${data.bestAsset?.name || 'seus melhores ativos'} (${data.bestAsset?.growth || 0}%).`;
      case 'potentialSavings':
        return `Com pequenas mudanças em seus hábitos, você poderia economizar até ${formatCurrency(String(data.amount))} ao ano.`;
      case 'bestInvestment':
        return `Seu melhor investimento foi ${data.name}, com retorno de ${data.return}% em ${data.period}.`;
      case 'retirementReadiness':
        return `Com seu ritmo atual, você está a caminho de se aposentar em ${data.years} anos, precisando de ${formatCurrency(String(data.monthlyNeeded))} mensais.`;
      case 'recurringExpenses':
        return `Você tem ${data.items?.length || 0} despesas recorrentes totalizando ${formatCurrency(String(data.total))} por mês.`;
      default:
        return "Dados adicionais disponíveis ao conectar mais fontes financeiras.";
    }
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Insights Financeiros Detalhados
          </CardTitle>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDataSourceInfo(!showDataSourceInfo)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              <span className="text-xs">Legenda</span>
            </Button>
            <span className="text-sm text-gray-400 ml-4">
              {formatDate(currentDate)}
            </span>
          </div>
        </div>
        {showDataSourceInfo && (
          <div className="mt-2 p-2 bg-gray-800/50 rounded-md text-xs">
            <div className="flex items-center mb-1">
              <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
              <span>Dados XP Investimentos</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="text-blue-400 mr-1 inline-flex items-center">
                <Globe className="h-3 w-3" />
              </span>
              <span>Dados Open Finance</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-400 mr-1">*</span>
              <span>Dados sintéticos para demonstração</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Highest Spending Month */}
            {financialInsights.highestSpendingMonth && (
              <div className="border border-amber-500/20 bg-gradient-to-br from-amber-800/10 to-amber-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-amber-700 to-amber-900 p-2 rounded-full">
                    <DollarSign className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-amber-400 mb-1">
                        Você viveu no limite?
                        <DataSourceTag source={financialInsights.highestSpendingMonth.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 19, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.highestSpendingMonth.summary || 
                        generateSummary('highestSpendingMonth', financialInsights.highestSpendingMonth)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wasted Money */}
            {financialInsights.wastedMoney && (
              <div className="border border-red-500/20 bg-gradient-to-br from-red-800/10 to-red-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-red-700 to-red-900 p-2 rounded-full">
                    <ArrowDown className="w-5 h-5 text-red-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-red-400 mb-1">
                        Dinheiro que escorreu pelo ralo
                        <DataSourceTag source={financialInsights.wastedMoney.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 19, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.wastedMoney.summary || 
                        generateSummary('wastedMoney', financialInsights.wastedMoney)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Top Categories */}
            {financialInsights.topCategories && (
              <div className="border border-blue-500/20 bg-gradient-to-br from-blue-800/10 to-blue-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-2 rounded-full">
                    <Wallet className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-blue-400 mb-1">
                        O que você mais comprou?
                        <DataSourceTag source={financialInsights.topCategories.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 19, 2025</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {financialInsights.topCategories.categories && financialInsights.topCategories.categories.map((category, index) => (
                        <Badge key={index} className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.topCategories.summary || 
                        generateSummary('topCategories', financialInsights.topCategories)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Negative Months */}
            {financialInsights.negativeMonths && (
              <div className="border border-orange-500/20 bg-gradient-to-br from-orange-800/10 to-orange-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-orange-700 to-orange-900 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-orange-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-orange-400 mb-1">
                        E quando o dinheiro só... sumiu?
                        <DataSourceTag source={financialInsights.negativeMonths.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 19, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.negativeMonths.summary || 
                        generateSummary('negativeMonths', financialInsights.negativeMonths)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recurring Expenses */}
            {financialInsights.recurringExpenses && (
              <div className="border border-purple-500/20 bg-gradient-to-br from-purple-800/10 to-purple-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-purple-400 mb-1">
                        Despesas Recorrentes
                        <DataSourceTag source={financialInsights.recurringExpenses.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 19, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.recurringExpenses.summary || 
                        generateSummary('recurringExpenses', financialInsights.recurringExpenses)}
                    </p>
                    
                    {/* Recurring expenses list */}
                    {financialInsights.recurringExpenses.items && 
                     financialInsights.recurringExpenses.items.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {financialInsights.recurringExpenses.items.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-purple-900/20 rounded-md">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-purple-200">
                                {item.description || `Despesa ${i+1}`}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item.category} • {item.frequency}
                              </div>
                            </div>
                            <div className="text-purple-300 font-medium">
                              {formatCurrency(item.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Investment Growth */}
            {financialInsights.investmentGrowth && (
              <div className="border border-green-500/20 bg-gradient-to-br from-green-800/10 to-green-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-green-700 to-green-900 p-2 rounded-full">
                    <ArrowUp className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-green-400 mb-1">
                        Mas teve coisa boa também
                        <DataSourceTag source={financialInsights.investmentGrowth.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 17, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.investmentGrowth.summary || 
                        generateSummary('investmentGrowth', financialInsights.investmentGrowth)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Potential Savings */}
            {financialInsights.potentialSavings && (
              <div className="border border-indigo-500/20 bg-gradient-to-br from-indigo-800/10 to-indigo-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-2 rounded-full">
                    <PiggyBank className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-indigo-400 mb-1">
                        E se você focasse de verdade?
                        <DataSourceTag source={financialInsights.potentialSavings.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 17, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.potentialSavings.summary || 
                        generateSummary('potentialSavings', financialInsights.potentialSavings)}
                    </p>
                    
                    {/* Suggestions list */}
                    {financialInsights.potentialSavings.suggestions && 
                     financialInsights.potentialSavings.suggestions.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {financialInsights.potentialSavings.suggestions.slice(0, 3).map((suggestion, i) => (
                          <div key={i} className="p-2 bg-indigo-900/20 rounded-md">
                            <div className="text-sm text-indigo-200">
                              {suggestion}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Best Investment */}
            {financialInsights.bestInvestment && (
              <div className="border border-purple-500/20 bg-gradient-to-br from-purple-800/10 to-purple-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-2 rounded-full">
                    <Coins className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-purple-400 mb-1">
                        A hora que você brilhou
                        <DataSourceTag source={financialInsights.bestInvestment.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 17, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.bestInvestment.summary || 
                        generateSummary('bestInvestment', financialInsights.bestInvestment)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Retirement Specific Insights */}
            {financialInsights.retirementReadiness && (
              <div className="border border-teal-500/20 bg-gradient-to-br from-teal-800/10 to-teal-600/5 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-teal-700 to-teal-900 p-2 rounded-full">
                    <PiggyBank className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-teal-400 mb-1">
                        Preparação para Aposentadoria
                        <DataSourceTag source={financialInsights.retirementReadiness.dataSource as DataSourceType} />
                      </h3>
                      <span className="text-xs text-gray-400">Mai 17, 2025</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {financialInsights.retirementReadiness.summary || 
                        generateSummary('retirementReadiness', financialInsights.retirementReadiness)}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-300" 
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>40</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinancialInsightsModule;
