
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
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 bg-white bg-opacity-5 backdrop-blur-sm`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-blue-300">
            Insights Financeiros Detalhados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <PiggyBank className="w-16 h-16 text-gray-600 mb-4" />
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 bg-white bg-opacity-5 backdrop-blur-sm`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-blue-300">
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-800 p-2 rounded-full">
                  <DollarSign className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-amber-300 mb-1">
                      Você viveu no limite?
                    </h3>
                    <span className="text-xs text-gray-400">Mai 19, 2025</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.highestSpendingMonth.summary}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-900 p-2 rounded-full">
                  <ArrowDown className="w-5 h-5 text-red-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-900 p-2 rounded-full">
                  <Wallet className="w-5 h-5 text-blue-400" />
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
                      <Badge key={index} className="bg-blue-900 text-blue-200 hover:bg-blue-800">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {financialInsights.topCategories.summary}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-900 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-orange-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-900 p-2 rounded-full">
                  <ArrowUp className="w-5 h-5 text-green-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-900 p-2 rounded-full">
                  <PiggyBank className="w-5 h-5 text-indigo-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-900 p-2 rounded-full">
                  <Coins className="w-5 h-5 text-purple-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
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
            <div className="border border-white/10 bg-white bg-opacity-5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-900 p-2 rounded-full">
                  <PiggyBank className="w-5 h-5 text-teal-400" />
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
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500" 
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
