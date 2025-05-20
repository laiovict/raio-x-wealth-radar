import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleAlert, Info } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { toNumber } from "@/utils/typeConversionHelpers";
import { formatCurrency } from "@/utils/formattingUtils";
import DataSourceTag from "@/components/common/DataSourceTag";
import { DataSourceType, Liquidity } from "@/types/raioXTypes";

interface LiquidityReserveModuleProps {
  fullWidth?: boolean;
}

const LiquidityReserveModule = ({ fullWidth = false }: LiquidityReserveModuleProps) => {
  const { data } = useRaioX();
  const isMobile = useMobileBreakpoint();
  const [liquidityData, setLiquidityData] = useState<Liquidity>({
    currentIdle: 30000,
    recommended: 60000,
    difference: -30000,
    currentIdleMonths: 3,
    recommendedMonths: 6,
    idealReserve: 60000,
    monthlyExpenses: 10000,
    idealMonths: 6,
    summary: "Sua reserva de emergência cobre 3 meses de despesas, recomendamos aumentar para 6 meses.",
    dataSource: 'synthetic' as DataSourceType
  });

  useEffect(() => {
    // If we have liquidity data in the context, use it
    if (data.liquidity) {
      try {
        const liquidity = data.liquidity;
        
        // Apply default values if needed
        setLiquidityData({
          currentIdle: toNumber(liquidity.currentIdle),
          recommended: liquidity.recommended || 60000,
          difference: liquidity.difference || -30000,
          currentIdleMonths: liquidity.currentIdleMonths || 3,
          recommendedMonths: liquidity.recommendedMonths || 6,
          idealReserve: liquidity.idealReserve || 60000,
          monthlyExpenses: liquidity.monthlyExpenses || 10000,
          idealMonths: liquidity.idealMonths || 6,
          summary: liquidity.summary || "Sua reserva de emergência precisa ser ajustada para garantir segurança financeira.",
          dataSource: liquidity.dataSource || 'synthetic'
        });
      } catch (error) {
        console.error("Error processing liquidity data:", error);
        // Keep default values if error occurs
      }
    }
  }, [data.liquidity]);

  // Calculate progress percentage
  const progress = Math.min(100, (toNumber(liquidityData.currentIdle) / liquidityData.recommended) * 100);
  
  // Determine status color based on progress
  const getStatusColor = () => {
    if (progress >= 100) return "text-green-500";
    if (progress >= 75) return "text-blue-500";
    if (progress >= 50) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Generate appropriate message based on liquidity status
  const getMessage = () => {
    if (progress >= 100) {
      return "Sua reserva de emergência está adequada. Continue mantendo este nível de segurança.";
    } else if (progress >= 75) {
      return "Você está quase lá! Faltam apenas alguns aportes para atingir a reserva ideal.";
    } else if (progress >= 50) {
      return "Você está no caminho certo, mas ainda precisa de um esforço adicional para atingir a segurança financeira ideal.";
    } else if (progress >= 25) {
      return "Sua reserva de emergência está abaixo do recomendado. Considere aumentar seus aportes mensais.";
    } else {
      return "Atenção! Sua reserva de emergência está muito abaixo do recomendado. Priorize este objetivo financeiro.";
    }
  };
  
  // Generate tailored actions based on liquidity status
  const getActions = () => {
    if (progress >= 100) {
      return ["Considere investir o excedente em ativos de maior retorno", "Reavalie periodicamente o valor ideal da sua reserva"];
    } else if (progress >= 50) {
      return ["Continue economizando para atingir a meta", "Reduza gastos não essenciais temporariamente"];
    } else {
      return ["Crie um plano de aportes mensais", "Revise e corte despesas não essenciais", "Considere uma fonte de renda extra temporária"];
    }
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center justify-between">
          <span className="flex items-center">
            Reserva de Emergência
            <DataSourceTag source={liquidityData.dataSource} />
          </span>
          <span 
            className={`text-sm font-normal ${progress >= 100 ? 'text-green-500' : 'text-amber-500'}`}
          >
            {liquidityData.currentIdleMonths} meses
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reserva Atual</p>
              <p className="text-2xl font-semibold">{formatCurrency(String(liquidityData.currentIdle))}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ideal</p>
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                {formatCurrency(String(liquidityData.recommended))}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className={getStatusColor()}>
                {Math.round(progress)}% do ideal
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Meta: {liquidityData.recommendedMonths} meses
              </span>
            </div>
            <Progress
              value={progress}
              className={`h-2 ${
                progress >= 100
                  ? "bg-gray-200 dark:bg-gray-700 [&>div]:bg-green-500"
                  : progress >= 75
                  ? "bg-gray-200 dark:bg-gray-700 [&>div]:bg-blue-500"
                  : progress >= 50
                  ? "bg-gray-200 dark:bg-gray-700 [&>div]:bg-yellow-500"
                  : "bg-gray-200 dark:bg-gray-700 [&>div]:bg-red-500"
              }`}
            />
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md flex gap-3 items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">{getMessage()}</p>
              </div>
            </div>
            
            {liquidityData.difference < 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md flex gap-3 items-start">
                <CircleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                    Valor em falta
                  </p>
                  <p className="text-sm">
                    Você precisa de mais {formatCurrency(String(Math.abs(liquidityData.difference)))} para atingir o valor ideal de reserva.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="font-medium text-sm">Ações recomendadas:</p>
              <ul className="space-y-1">
                {getActions().map((action, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span>•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiquidityReserveModule;
