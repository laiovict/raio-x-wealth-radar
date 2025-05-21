import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleAlert, Info, ShieldCheck, Gauge, TrendingUp } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { toNumber } from "@/utils/typeConversionHelpers";
import { formatCurrency } from "@/utils/formattingUtils";
import { DataSourceType, Liquidity } from "@/types/raioXTypes";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

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
  
  // Determine visual elements based on progress
  const getProgressGradient = () => {
    if (progress >= 100) return "linear-gradient(90deg, #34d399, #10b981)";
    if (progress >= 75) return "linear-gradient(90deg, #60a5fa, #3b82f6)";
    if (progress >= 50) return "linear-gradient(90deg, #fcd34d, #f59e0b)";
    return "linear-gradient(90deg, #f87171, #ef4444)";
  };
  
  const getProgressBackgroundClass = () => {
    if (progress >= 100) return "bg-gradient-to-r from-slate-800/70 to-slate-700/70";
    if (progress >= 75) return "bg-gradient-to-r from-slate-800/70 to-slate-700/70";
    if (progress >= 50) return "bg-gradient-to-r from-slate-800/70 to-slate-700/70";
    return "bg-gradient-to-r from-slate-800/70 to-slate-700/70";
  };
  
  const getStatusColor = () => {
    if (progress >= 100) return "text-green-500 dark:text-green-400";
    if (progress >= 75) return "text-blue-500 dark:text-blue-400";
    if (progress >= 50) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };
  
  const getStatusIcon = () => {
    if (progress >= 100) return <ShieldCheck className="h-10 w-10 text-green-500" />;
    if (progress >= 50) return <Gauge className="h-10 w-10 text-yellow-500" />;
    return <CircleAlert className="h-10 w-10 text-red-500" />;
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
      return [
        "Considere investir o excedente em ativos de maior retorno", 
        "Reavalie periodicamente o valor ideal da sua reserva"
      ];
    } else if (progress >= 50) {
      return [
        "Continue economizando para atingir a meta", 
        "Reduza gastos não essenciais temporariamente"
      ];
    } else {
      return [
        "Crie um plano de aportes mensais", 
        "Revise e corte despesas não essenciais", 
        "Considere uma fonte de renda extra temporária"
      ];
    }
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} shadow-lg hover:shadow-xl transition-all border-2 border-slate-700/50 ${getProgressBackgroundClass()}`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg">
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span>Reserva de Emergência</span>
            <TypeSafeDataSourceTag source={liquidityData.dataSource} />
          </div>
          <div className="flex items-center gap-2">
            <span 
              className={`text-lg font-bold ${progress >= 100 ? 'text-green-400' : 'text-amber-400'} bg-slate-800/50 px-3 py-1 rounded-full`}
            >
              {liquidityData.currentIdleMonths} meses
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 bg-slate-900/80 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-end gap-4 p-4 bg-slate-800/70 rounded-xl shadow-md border border-slate-700/50">
            <div>
              <p className="text-sm text-slate-400">Reserva Atual</p>
              <p className="text-3xl font-bold text-slate-200">
                {formatCurrency(String(liquidityData.currentIdle))}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Ideal</p>
              <p className="text-2xl font-bold text-slate-500">
                {formatCurrency(String(liquidityData.recommended))}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 p-4 bg-slate-800/70 rounded-xl shadow-md border border-slate-700/50">
            <div className="flex justify-between items-center text-sm">
              <span className={`${getStatusColor()} font-bold text-base`}>
                {Math.round(progress)}% do ideal
              </span>
              <span className="text-slate-400 font-medium">
                Meta: {liquidityData.recommendedMonths} meses
              </span>
            </div>
            <Progress
              value={progress}
              className="h-3 rounded-full overflow-hidden"
              style={{
                background: 'rgba(51, 65, 85, 0.5)',
              }}
            >
              <div 
                className="h-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${progress}%`,
                  background: getProgressGradient(),
                }}
              ></div>
            </Progress>
            
            <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className={`p-5 rounded-xl flex gap-4 items-start shadow-md bg-slate-800/70 border border-slate-700/50`}>
              <Info className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-base font-medium text-slate-300">{getMessage()}</p>
              </div>
            </div>
            
            {liquidityData.difference < 0 && (
              <div className="bg-amber-900/20 p-5 rounded-xl flex gap-4 items-start border border-amber-800/30 shadow-md">
                <CircleAlert className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-base font-medium text-amber-400 mb-2">
                    Valor em falta
                  </p>
                  <p className="text-base text-slate-300">
                    Você precisa de mais {formatCurrency(String(Math.abs(liquidityData.difference)))} para atingir o valor ideal de reserva.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3 bg-slate-800/70 p-5 rounded-xl border border-slate-700/50 shadow-md">
              <p className="font-bold text-lg text-slate-200 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                Ações recomendadas
              </p>
              <ul className="space-y-2 mt-2">
                {getActions().map((action, index) => (
                  <li key={index} className="flex gap-3 items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <div className="bg-indigo-800/40 text-indigo-400 w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-slate-300 font-medium">{action}</span>
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
