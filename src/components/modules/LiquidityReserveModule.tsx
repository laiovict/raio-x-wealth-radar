
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toNumber, arithmeticOperation, fixLiquidityDefaults } from "@/utils/typeConversionHelpers";

interface LiquidityReserveModuleProps {
  fullWidth?: boolean;
}

const LiquidityReserveModule = ({ fullWidth = false }: LiquidityReserveModuleProps) => {
  const { data } = useRaioX();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  const liquidityData = useMemo(() => {
    // Start with default values
    const defaultLiquidity = {
      currentIdle: 25000,
      idealReserve: 60000,
      monthlyExpenses: 10000,
      idealMonths: 6,
      recommended: 60000,
      difference: -35000,
      currentIdleMonths: 2.5,
      recommendedMonths: 6,
      summary: "Sua reserva de emergência está abaixo do ideal de 6 meses de despesas."
    };
    
    // If we have real data from Supabase, calculate liquidity values
    if (data.portfolioSummary) {
      try {
        // Use fixed income value as current idle (emergency reserve)
        const currentIdle = toNumber(data.portfolioSummary.fixed_income_value, defaultLiquidity.currentIdle);
        
        // Calculate monthly expenses - if financial summary exists, use it
        const monthlyExpenses = data.financialSummary?.monthlyExpenses || 
          (toNumber(data.portfolioSummary.total_portfolio_value, 0) * 0.006); // Estimate as 0.6% of portfolio
        
        // Calculate ideal reserve (6 months of expenses)
        const idealMonths = 6;
        const idealReserve = monthlyExpenses * idealMonths;
        
        // Calculate how many months the current idle covers
        const coveredMonths = Math.floor(currentIdle / monthlyExpenses);
        
        // Create summary based on coverage
        let summary = "";
        if (coveredMonths >= idealMonths) {
          summary = `Sua reserva de emergência cobre ${coveredMonths} meses de despesas, o que está adequado ao ideal de ${idealMonths} meses.`;
        } else {
          summary = `Sua reserva de emergência cobre ${coveredMonths} meses de despesas, recomendamos aumentar para ${idealMonths} meses.`;
        }
        
        return fixLiquidityDefaults({
          currentIdle,
          idealReserve,
          recommended: idealReserve,
          difference: currentIdle - idealReserve,
          currentIdleMonths: coveredMonths,
          recommendedMonths: idealMonths,
          idealMonths,
          monthlyExpenses,
          summary,
          dataSource: 'supabase' as const
        });
      } catch (error) {
        console.error("Error calculating liquidity data:", error);
        return fixLiquidityDefaults(defaultLiquidity);
      }
    }
    
    // Fallback to using data from context if available
    return fixLiquidityDefaults(data.liquidity || defaultLiquidity);
  }, [data.portfolioSummary, data.financialSummary, data.liquidity]);
  
  useEffect(() => {
    // Set loaded state after 500ms to ensure UI is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (toNumber(liquidityData.currentIdle) / toNumber(liquidityData.idealReserve)) * 100);
  
  // Format currency
  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  // Handle action button click - redirects to chat with pre-loaded message
  const handleActionClick = (action: string) => {
    // Create custom event to pre-load message in the chat
    const messageText = action === 'plan' 
      ? "Nicolas, preciso de ajuda para planejar minha reserva de emergência. Pode me orientar?"
      : "Nicolas, quais são as melhores estratégias para otimizar minha reserva de liquidez?";
    
    // Dispatch custom event that will be caught by ChatInterface
    const event = new CustomEvent('load-chat-message', { 
      detail: { message: messageText }
    });
    document.dispatchEvent(event);
    
    // Navigate to chat tab
    const tabsEvent = new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'chat' }
    });
    document.dispatchEvent(tabsEvent);
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Reserva & Liquidez Dinâmica
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoaded ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Reserva Atual</span>
                <span className="text-sm font-medium">
                  {formatCurrency(liquidityData.currentIdle)}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Reserva Ideal</span>
                <span className="text-sm font-medium">
                  {formatCurrency(liquidityData.idealReserve)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Despesas Mensais</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-200">
                  {formatCurrency(liquidityData.monthlyExpenses)}
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-1">Meses Ideais</p>
                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-200">
                  {`${liquidityData.idealMonths} meses`}
                </p>
              </div>
            </div>
            
            <div className={`grid ${fullWidth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Situação</p>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-200">
                  {progressPercentage < 100 
                    ? `Faltam ${formatCurrency(arithmeticOperation(liquidityData.idealReserve, liquidityData.currentIdle, '-'))}` 
                    : "Reserva Adequada"}
                </p>
              </div>
              
              {fullWidth && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Recomendação</p>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    "Aumente sua reserva com aplicações de alta liquidez como CDBs diários."
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {liquidityData.summary}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleActionClick('plan')}
                className="bg-indigo-600/80 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center"
              >
                Planejar reserva →
              </button>
              <button
                onClick={() => handleActionClick('strategy')}
                className="bg-blue-600/80 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center"
              >
                Ver estratégias →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiquidityReserveModule;
