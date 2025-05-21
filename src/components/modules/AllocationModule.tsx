
import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { Allocation, DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { ensureNumber } from '@/utils/typeConversionHelpers';
import { defaultRaioXData } from '@/data/mockRaioXData';

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
  const prepareChartData = (allocationData: Allocation | undefined) => {
    if (!allocationData || !allocationData.current) return [];
    
    // Filter out the 'total' property if it exists
    return Object.entries(allocationData.current)
      .filter(([key]) => key !== 'total')
      .map(([key, value]) => ({
        name: key,
        value: Number(value) // Value should already be a number
      }));
  };
  
  const chartData = prepareChartData(allocation);
  
  // Prepare a comparison of current vs recommended allocation
  const prepareComparisonData = (allocationData: Allocation | undefined) => {
    if (!allocationData || !allocationData.current || !allocationData.recommended) {
      return [];
    }
    
    // Collect all unique asset classes from both current and recommended
    const assetClasses = new Set([
      ...Object.keys(allocationData.current).filter(key => key !== 'total'),
      ...Object.keys(allocationData.recommended)
    ]);
    
    // Create comparison data
    return Array.from(assetClasses).map(key => ({
      name: key,
      current: allocationData.current[key] || 0,
      recommended: allocationData.recommended[key] || 0,
      difference: (allocationData.recommended[key] || 0) - (allocationData.current[key] || 0)
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
const getRealAllocationData = (props: AllocationModuleProps): Allocation | null => {
  const { data } = useRaioX();
  const portfolioSummary = data?.portfolioSummary;

  if (!portfolioSummary) {
    console.log("AllocationModule: No portfolioSummary in context, using synthetic data for allocation.");
    return null;
  }

  const currentAllocation: { [key: string]: number } = {};
  let hasValidData = false;

  // Mapping from investor_portfolio_summary _representation fields to display names
  const representationMapping: { [key: string]: string } = {
    fixed_income_representation: "Renda Fixa",
    stocks_representation: "Ações BR",
    investment_fund_representation: "Fundos",
    real_estate_representation: "FIIs",
    private_pension_representation: "Previdência",
    treasure_representation: "Tesouro Direto",
    coe_representation: "COE",
    investment_international_representation: "Internacional",
  };

  for (const key in portfolioSummary) {
    if (key.endsWith("_representation") && representationMapping[key]) {
      const assetName = representationMapping[key];
      const value = ensureNumber(portfolioSummary[key as keyof typeof portfolioSummary]);
      
      if (value > 0) { // Only include asset classes with a non-zero percentage
        currentAllocation[assetName] = value;
        hasValidData = true;
      }
    }
  }

  if (!hasValidData) {
    console.log("AllocationModule: portfolioSummary processed, but no valid _representation fields found or all are zero. Using synthetic for current allocation.");
    return null; // Fallback to synthetic if no valid _representation fields are found
  }
  
  const recommendedAllocation = data.allocation?.recommended || defaultRaioXData.allocation.recommended;

  return {
    current: currentAllocation,
    recommended: recommendedAllocation, // Keep recommended consistent
    dataSource: portfolioSummary.dataSource || 'supabase', // Pass the dataSource
  };
};

// Define synthetic allocation data to be used as a fallback
const getSyntheticAllocationData = (props: AllocationModuleProps): Allocation => {
  // Using the defaultRaioXData for consistency in synthetic recommended allocation
  return {
    current: {
      "Renda Fixa": 45,
      "Ações BR": 25,
      "Fundos": 20,
      "Caixa": 10,
      // total: 100 // 'total' is not strictly needed for chart data preparation
    },
    recommended: defaultRaioXData.allocation.recommended,
    dataSource: 'synthetic'
  };
};

// Create the enhanced module with data safety
const AllocationModule = withSafeData(
  AllocationModuleBase,
  getRealAllocationData,
  getSyntheticAllocationData,
  'supabase' // Default source type if not overridden by data
);

export default AllocationModule;
