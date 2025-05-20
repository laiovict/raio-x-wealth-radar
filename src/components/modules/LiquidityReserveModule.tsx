
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StreamingText from "@/components/StreamingText";
import { useStreamingContent } from "@/hooks/use-streaming-content";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LiquidityReserveModuleProps {
  fullWidth?: boolean;
}

const LiquidityReserveModule = ({ fullWidth = false }: LiquidityReserveModuleProps) => {
  const { data } = useRaioX();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set loaded state after 500ms to ensure UI is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Ensure liquidity exists with default values if not
  const liquidity = data?.liquidity || {
    currentIdle: 25000,
    idealReserve: 60000,
    monthlyExpenses: 10000,
    idealMonths: 6,
    summary: "Sua reserva de emergência está abaixo do ideal de 6 meses de despesas."
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (liquidity.currentIdle / liquidity.idealReserve) * 100);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
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
                  {formatCurrency(liquidity.currentIdle)}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Reserva Ideal</span>
                <span className="text-sm font-medium">
                  {formatCurrency(liquidity.idealReserve)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Despesas Mensais</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-200">
                  {formatCurrency(liquidity.monthlyExpenses)}
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-1">Meses Ideais</p>
                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-200">
                  {`${liquidity.idealMonths} meses`}
                </p>
              </div>
            </div>
            
            <div className={`grid ${fullWidth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Situação</p>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-200">
                  {progressPercentage < 100 
                    ? `Faltam ${formatCurrency(liquidity.idealReserve - liquidity.currentIdle)}` 
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
                {liquidity.summary}
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
