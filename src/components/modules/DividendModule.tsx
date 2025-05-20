
import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CoinIcon, TrendingUp, Calendar, LineChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DividendModuleProps {
  fullWidth?: boolean;
}

const DividendModule = ({ fullWidth = false }: DividendModuleProps) => {
  const { dividendHistory, totalDividends, averageMonthlyDividends } = useRaioX();
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Group dividends by month for chart display
  const groupDividendsByMonth = () => {
    if (!dividendHistory || !dividendHistory.length) return [];
    
    const monthlyData: Record<string, { month: string, amount: number, count: number }> = {};
    
    dividendHistory.forEach(item => {
      if (!item.payment_date) return;
      
      // Extract month and year
      const parts = item.payment_date.split(/[\s-]/); // Split by space or dash
      if (parts.length < 2) return;
      
      const year = parts[0];
      const month = parts[1];
      const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      
      const monthName = `${monthNames[parseInt(month) - 1]}/${year.slice(2)}`;
      
      // Parse value
      const value = parseFloat(item.value?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
      
      if (!monthlyData[monthName]) {
        monthlyData[monthName] = {
          month: monthName,
          amount: 0,
          count: 0
        };
      }
      
      monthlyData[monthName].amount += (isNaN(value) ? 0 : value);
      monthlyData[monthName].count += 1;
    });
    
    // Convert to array and sort by date
    return Object.values(monthlyData)
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split('/');
        const [bMonth, bYear] = b.month.split('/');
        
        if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
        
        const monthOrder: Record<string, number> = {
          'Jan': 1, 'Fev': 2, 'Mar': 3, 'Abr': 4, 'Mai': 5, 'Jun': 6,
          'Jul': 7, 'Ago': 8, 'Set': 9, 'Out': 10, 'Nov': 11, 'Dez': 12
        };
        
        return monthOrder[aMonth] - monthOrder[bMonth];
      })
      .slice(-12); // Get last 12 months
  };

  // Get recent dividends (limited to 5)
  const recentDividends = dividendHistory && dividendHistory.length > 0 
    ? dividendHistory.slice(0, 5) 
    : [];

  // Chart colors
  const barColors = ['#4CAF50', '#2196F3', '#FFC107', '#FF9800', '#9C27B0', '#673AB7'];
  
  // Get chart data
  const chartData = groupDividendsByMonth();

  // Check if we have real data from Supabase
  const hasRealData = dividendHistory && dividendHistory.length > 0;
  
  if (!hasRealData) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Histórico de Dividendos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <CoinIcon className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-gray-400 max-w-md">
            Dados de dividendos não disponíveis para este cliente.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent flex items-center justify-between flex-wrap">
          <span>Histórico de Dividendos</span>
          <span className="text-sm font-normal text-green-500 flex items-center">
            <span className="ml-1 text-green-400">
              <span className="inline-block h-3 w-3">✓</span>
            </span> Dados reais
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Total Recebido (12 meses)</h3>
              <CoinIcon className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-semibold text-green-400 mt-2">{formatCurrency(totalDividends || 0)}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/10 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Média Mensal</h3>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-2xl font-semibold text-blue-400 mt-2">{formatCurrency(averageMonthlyDividends || 0)}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/10 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Eventos de Pagamento</h3>
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-semibold text-purple-400 mt-2">{dividendHistory?.length || 0}</p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="font-medium text-white mb-4 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-green-400" />
            Dividendos por Mês
          </h3>
          
          <div className="h-64">
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
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="font-medium text-white mb-4">Pagamentos Recentes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left pb-2 text-gray-400 text-sm">Data</th>
                  <th className="text-left pb-2 text-gray-400 text-sm">Ativo</th>
                  <th className="text-left pb-2 text-gray-400 text-sm">Tipo</th>
                  <th className="text-right pb-2 text-gray-400 text-sm">Quantidade</th>
                  <th className="text-right pb-2 text-gray-400 text-sm">Valor</th>
                </tr>
              </thead>
              <tbody>
                {recentDividends.map((dividend, index) => {
                  // Format the date
                  const dateParts = dividend.payment_date?.split(' ')[0].split('-') || [];
                  const formattedDate = dateParts.length >= 3 
                    ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` 
                    : dividend.payment_date;
                  
                  return (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">{formattedDate}</td>
                      <td className="py-3 text-gray-300">{dividend.asset || '-'}</td>
                      <td className="py-3 text-gray-300">{dividend.type || 'Dividend'}</td>
                      <td className="py-3 text-gray-300 text-right">{dividend.quantity || '-'}</td>
                      <td className="py-3 text-green-400 text-right font-medium">{dividend.value || '-'}</td>
                    </tr>
                  );
                })}
                
                {recentDividends.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-3 text-center text-gray-400">Nenhum pagamento recente encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DividendModule;
