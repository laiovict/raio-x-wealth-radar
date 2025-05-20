
import React from 'react';
import { LineChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from './dividendUtils';

interface DividendChartProps {
  chartData: Array<{
    month: string;
    amount: number;
    count: number;
  }>;
  dataSource?: 'supabase' | 'synthetic';
}

const DividendChart: React.FC<DividendChartProps> = ({ chartData, dataSource = 'synthetic' }) => {
  // Chart colors
  const barColors = ['#4CAF50', '#2196F3', '#FFC107', '#FF9800', '#9C27B0', '#673AB7'];
  
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="font-medium text-white mb-4 flex items-center">
        <LineChart className="h-5 w-5 mr-2 text-green-400" />
        Dividendos por Mês
        {dataSource === 'supabase' && (
          <span className="ml-1 text-green-400">
            <span className="inline-block h-3 w-3">✓</span>
          </span>
        )}
      </h3>
      
      <div className="h-64">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Sem dados suficientes para exibir o gráfico
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#ccc', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tick={{ fill: '#ccc', fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value as number)}`, 'Valor Recebido']}
                labelFormatter={(label) => `Mês: ${label}`}
                contentStyle={{ backgroundColor: '#1c1c2e', borderColor: '#333', color: '#fff' }}
              />
              <Bar dataKey="amount" name="Valor Recebido">
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DividendChart;
