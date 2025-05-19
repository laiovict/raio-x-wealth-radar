
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown,
  ArrowUp,
  Calendar,
  Coins, 
  DollarSign,
  PiggyBank,
  Wallet
} from "lucide-react";
import { useState } from "react";

interface FinancialInsightsModuleProps {
  fullWidth?: boolean;
}

const FinancialInsightsModule = ({ fullWidth = false }: FinancialInsightsModuleProps) => {
  const { data } = useRaioX();
  const { financialInsights } = data;
  const [currentDate] = useState(new Date());
  
  // If client doesn't have financial insights data
  if (!financialInsights) {
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

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Insights Financeiros Detalhados
          </CardTitle>
          <span className="text-sm text-gray-400">
            {formatDate(currentDate)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 19, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.highestSpendingMonth.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 19, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.wastedMoney.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 19, 2025</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {financialInsights.topCategories.categories.map((category, index) => (
                      <Badge key={index} className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.topCategories.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 19, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.negativeMonths.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 17, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.investmentGrowth.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 17, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.potentialSavings.summary}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300" 
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 17, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.bestInvestment.summary}
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
                    </h3>
                    <span className="text-xs text-gray-400">Mai 17, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.retirementReadiness.summary}
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
      </CardContent>
    </Card>
  );
};

export default FinancialInsightsModule;
