
import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from '@/utils/raioXUtils';
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { Liquidity, DataSourceType } from '@/types/raioXTypes';
import { Info, AlertCircle, CheckCircle } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

// Define the props for the base component
interface LiquidityReserveModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<Liquidity>;
}

const LiquidityReserveModuleBase = ({ fullWidth = false, dataState }: LiquidityReserveModuleProps) => {
  const liquidity = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  
  // Calculate the percentage of current idle cash vs recommended amount
  const getReservePercentage = () => {
    if (!liquidity) return 0;
    if (liquidity.recommended <= 0) return 100; // Avoid division by zero
    
    // Calculate percentage but cap it at 100%
    const percentage = (liquidity.currentIdle / liquidity.recommended) * 100;
    return Math.min(percentage, 100);
  };
  
  // Determine the status of the liquidity reserve
  const getReserveStatus = () => {
    if (!liquidity) return 'unknown';
    
    const percentage = (liquidity.currentIdle / liquidity.recommended) * 100;
    
    if (percentage >= 90) return 'optimal';
    if (percentage >= 50) return 'adequate';
    return 'insufficient';
  };
  
  const reserveStatus = getReserveStatus();
  const reservePercentage = getReservePercentage();
  
  const statusMessages = {
    optimal: {
      title: "Reserva Ótima",
      description: "Sua reserva de emergência está adequada para cobrir gastos por pelo menos 6 meses.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    adequate: {
      title: "Reserva Adequada",
      description: "Sua reserva está bem encaminhada, mas recomendamos continuar acumulando para mais segurança.",
      icon: <Info className="h-5 w-5 text-yellow-500" />
    },
    insufficient: {
      title: "Reserva Insuficiente",
      description: "Sua reserva está abaixo do recomendado. Considere aumentá-la para maior segurança financeira.",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />
    },
    unknown: {
      title: "Status Desconhecido",
      description: "Não foi possível determinar o status de sua reserva de liquidez.",
      icon: <Info className="h-5 w-5 text-gray-500" />
    }
  };
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Reserva de Liquidez
          </CardTitle>
          <TypeSafeDataSourceTag source={dataSource as DataSourceType} />
        </div>
      </CardHeader>
      <CardContent>
        {liquidity ? (
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-300">
                  Reserva Atual
                </span>
                <span className="text-sm font-medium text-gray-300">
                  {formatCurrency(liquidity.currentIdle)}
                </span>
              </div>
              <Progress value={reservePercentage} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">
                  {liquidity.currentIdleMonths} meses
                </span>
                <span className="text-xs text-gray-400">
                  Meta: {formatCurrency(liquidity.recommended)} ({liquidity.recommendedMonths} meses)
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-md p-4 flex items-start space-x-3">
              {statusMessages[reserveStatus].icon}
              <div>
                <h4 className="font-medium text-sm">
                  {statusMessages[reserveStatus].title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {statusMessages[reserveStatus].description}
                </p>
                {liquidity.difference < 0 && (
                  <p className="text-xs text-red-400 mt-2">
                    Você precisa de mais {formatCurrency(Math.abs(liquidity.difference))} para atingir a reserva ideal.
                  </p>
                )}
                {liquidity.difference > 0 && (
                  <p className="text-xs text-green-400 mt-2">
                    Sua reserva está {formatCurrency(Math.abs(liquidity.difference))} acima do recomendado.
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-gray-800/30 p-3 rounded-md">
                <span className="text-xs text-gray-400">Despesas Mensais Estimadas</span>
                <div className="text-lg font-medium mt-1">
                  {formatCurrency(liquidity.monthlyExpenses || liquidity.recommended / liquidity.recommendedMonths)}
                </div>
              </div>
              <div className="bg-gray-800/30 p-3 rounded-md">
                <span className="text-xs text-gray-400">Meses Cobertos</span>
                <div className="text-lg font-medium mt-1">
                  {liquidity.currentIdleMonths} de {liquidity.recommendedMonths}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>Dados de reserva de liquidez não disponíveis.</p>
            {dataState?.isSynthetic ? (
              <p className="mt-2 text-sm text-gray-500">Visualizando dados sintéticos (Versão Full)</p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">Visualizando dados reais disponíveis (RaioX Beta)</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Define how to extract real liquidity data from the RaioX context
const getRealLiquidityData = (props: LiquidityReserveModuleProps) => {
  const { data } = useRaioX();
  return data?.liquidity;
};

// Define synthetic liquidity data to be used as a fallback
const getSyntheticLiquidityData = (props: LiquidityReserveModuleProps): Liquidity => {
  return {
    currentIdle: 50000,
    recommended: 60000,
    difference: -10000,
    currentIdleMonths: 4,
    recommendedMonths: 6,
    monthlyExpenses: 10000,
    idealReserve: 60000,
    idealMonths: 6,
    dataSource: 'synthetic'
  };
};

// Create the enhanced module with data safety
const LiquidityReserveModule = withSafeData(
  LiquidityReserveModuleBase,
  getRealLiquidityData,
  getSyntheticLiquidityData,
  'supabase'
);

export default LiquidityReserveModule;
