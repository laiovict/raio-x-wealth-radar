
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowUp,
  TrendingUp,
  Calendar,
  ArrowDown
} from "lucide-react";

interface WrappedModuleProps {
  fullWidth?: boolean;
}

const WrappedModule = ({ fullWidth = false }: WrappedModuleProps) => {
  const { data } = useRaioX();
  const { wrapped } = data;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Curiosidades Wrapped
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${fullWidth ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"} gap-4 mb-4`}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ArrowUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Maior Aporte</p>
            </div>
            <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
              {formatCurrency(wrapped.biggestContribution.amount)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDate(wrapped.biggestContribution.date)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Sequência Positiva</p>
            </div>
            <p className="text-lg font-bold text-green-800 dark:text-green-300">
              {wrapped.longestPositiveStreak} meses
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Consecutivos de rendimento
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ArrowDown className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Maior Drawdown</p>
            </div>
            <p className="text-lg font-bold text-amber-800 dark:text-amber-300">
              {wrapped.largestDrawdown.percentage}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {wrapped.largestDrawdown.period}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Ativo Mais Rentável</p>
            </div>
            <p className="text-lg font-bold text-purple-800 dark:text-purple-300">
              {wrapped.mostProfitableAsset.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +{wrapped.mostProfitableAsset.return}% de retorno
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            {wrapped.summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WrappedModule;
