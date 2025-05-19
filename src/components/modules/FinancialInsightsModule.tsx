
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

interface FinancialInsightsModuleProps {
  fullWidth?: boolean;
}

const FinancialInsightsModule = ({ fullWidth = false }: FinancialInsightsModuleProps) => {
  const { data } = useRaioX();
  const { financialInsights } = data;
  
  // If client doesn't have financial insights data
  if (!financialInsights) {
    return (
      <Card className={fullWidth ? "w-full" : "w-full"}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
            Insights Financeiros Detalhados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <PiggyBank className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-center">
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

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Insights Financeiros Detalhados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Highest Spending Month */}
          {financialInsights.highestSpendingMonth && (
            <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full">
                  <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                    Você viveu no limite?
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.highestSpendingMonth.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wasted Money */}
          {financialInsights.wastedMoney && (
            <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-800 p-2 rounded-full">
                  <ArrowDown className="w-5 h-5 text-red-600 dark:text-red-300" />
                </div>
                <div>
                  <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">
                    Dinheiro que escorreu pelo ralo
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.wastedMoney.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Top Categories */}
          {financialInsights.topCategories && (
            <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                  <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                    O que você mais comprou?
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {financialInsights.topCategories.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.topCategories.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Negative Months */}
          {financialInsights.negativeMonths && (
            <div className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                </div>
                <div>
                  <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                    E quando o dinheiro só... sumiu?
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.negativeMonths.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Investment Growth */}
          {financialInsights.investmentGrowth && (
            <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                  <ArrowUp className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">
                    Mas teve coisa boa também
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.investmentGrowth.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Potential Savings */}
          {financialInsights.potentialSavings && (
            <div className="border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full">
                  <PiggyBank className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-800 dark:text-indigo-300 mb-1">
                    E se você focasse de verdade?
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.potentialSavings.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Best Investment */}
          {financialInsights.bestInvestment && (
            <div className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                  <Coins className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-1">
                    A hora que você brilhou
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.bestInvestment.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Retirement Specific Insights */}
          {financialInsights.retirementReadiness && (
            <div className="border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 dark:bg-teal-800 p-2 rounded-full">
                  <PiggyBank className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                </div>
                <div>
                  <h3 className="font-medium text-teal-800 dark:text-teal-300 mb-1">
                    Preparação para Aposentadoria
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {financialInsights.retirementReadiness.summary}
                  </p>
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
