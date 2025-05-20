
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StreamingText from "@/components/StreamingText";
import { useStreamingContent } from "@/hooks/use-streaming-content";

interface LiquidityReserveModuleProps {
  fullWidth?: boolean;
}

const LiquidityReserveModule = ({ fullWidth = false }: LiquidityReserveModuleProps) => {
  const { data } = useRaioX();
  const { isStreaming, isComplete } = useStreamingContent(false, 800);
  
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

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Reserva & Liquidez Dinâmica
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Reserva Atual</span>
              <span className="text-sm font-medium">
                {isStreaming ? (
                  <StreamingText 
                    text={formatCurrency(liquidity.currentIdle)}
                    speed={30}
                    delay={200}
                  />
                ) : '...'}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Reserva Ideal</span>
              <span className="text-sm font-medium">
                {isStreaming ? (
                  <StreamingText 
                    text={formatCurrency(liquidity.idealReserve)}
                    speed={30}
                    delay={600}
                  />
                ) : '...'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Despesas Mensais</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-200">
                {isStreaming ? (
                  <StreamingText 
                    text={formatCurrency(liquidity.monthlyExpenses)}
                    speed={30}
                    delay={800}
                  />
                ) : '...'}
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-1">Meses Ideais</p>
              <p className="text-lg font-bold text-indigo-700 dark:text-indigo-200">
                {isStreaming ? (
                  <StreamingText 
                    text={`${liquidity.idealMonths} meses`}
                    speed={30}
                    delay={1000}
                  />
                ) : '...'}
              </p>
            </div>
          </div>
          
          <div className={`grid ${fullWidth ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Situação</p>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-200">
                {isStreaming ? (
                  <StreamingText 
                    text={progressPercentage < 100 
                      ? `Faltam ${formatCurrency(liquidity.idealReserve - liquidity.currentIdle)}` 
                      : "Reserva Adequada"}
                    speed={30}
                    delay={1200}
                  />
                ) : '...'}
              </p>
            </div>
            
            {fullWidth && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Recomendação</p>
                <p className="text-sm text-green-700 dark:text-green-200">
                  {isStreaming ? (
                    <StreamingText 
                      text="Aumente sua reserva com aplicações de alta liquidez como CDBs diários."
                      speed={15}
                      delay={1400}
                    />
                  ) : '...'}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {isStreaming ? (
                <StreamingText 
                  text={liquidity.summary}
                  speed={15}
                  delay={1600}
                />
              ) : '...'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiquidityReserveModule;
