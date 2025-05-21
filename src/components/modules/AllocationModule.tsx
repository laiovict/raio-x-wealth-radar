
import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { formatPercentage } from '@/utils/raioXUtils';
import { Allocation, DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

// Define the props for the base component
interface AllocationModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<Allocation>;
}

// Define colors for our allocation chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AllocationModuleBase = ({ fullWidth = false, dataState }: AllocationModuleProps) => {
  const allocation = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  
  // Transform allocation data for the chart
  const prepareChartData = (allocation: Allocation | undefined) => {
    if (!allocation || !allocation.current) return [];
    
    // Filter out the 'total' property which isn't part of the actual allocation
    return Object.entries(allocation.current)
      .filter(([key]) => key !== 'total')
      .map(([key, value]) => ({
        name: key,
        value: Number(value)
      }));
  };
  
  const chartData = prepareChartData(allocation);
  
  // Prepare a comparison of current vs recommended allocation
  const prepareComparisonData = (allocation: Allocation | undefined) => {
    if (!allocation || !allocation.current || !allocation.recommended) {
      return [];
    }
    
    // Collect all unique asset classes from both current and recommended
    const assetClasses = new Set([
      ...Object.keys(allocation.current).filter(key => key !== 'total'),
      ...Object.keys(allocation.recommended)
    ]);
    
    // Create comparison data
    return Array.from(assetClasses).map(key => ({
      name: key,
      current: allocation.current[key] || 0,
      recommended: allocation.recommended[key] || 0,
      difference: (allocation.recommended[key] || 0) - (allocation.current[key] || 0)
    }));
  };
  
  const comparisonData = prepareComparisonData(allocation);
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Alocação Atual
          </CardTitle>
          <TypeSafeDataSourceTag source={dataSource as DataSourceType} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="space-y-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {comparisonData.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Comparação com Alocação Recomendada</h3>
                <div className="space-y-2">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.current}%</span>
                        <span className="text-gray-500">{'->'}</span>
                        <span className={`text-sm font-medium ${
                          item.difference > 0 ? 'text-green-400' : 
                          item.difference < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {item.recommended}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>Dados de alocação não disponíveis.</p>
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

// Define how to extract real allocation data from the RaioX context
const getRealAllocationData = (props: AllocationModuleProps) => {
  const { data } = useRaioX();
  return data?.allocation;
};

// Define synthetic allocation data to be used as a fallback
const getSyntheticAllocationData = (props: AllocationModuleProps): Allocation => {
  return {
    current: {
      "Renda Fixa": 45,
      "Ações BR": 25,
      "Fundos": 20,
      "Caixa": 10,
      total: 100
    },
    recommended: {
      "Renda Fixa": 30,
      "Ações BR": 30,
      "Fundos": 15,
      "Internacional": 15,
      "Caixa": 10
    },
    dataSource: 'synthetic'
  };
};

// Create the enhanced module with data safety
const AllocationModule = withSafeData(
  AllocationModuleBase,
  getRealAllocationData,
  getSyntheticAllocationData,
  'supabase'
);

export default AllocationModule;
