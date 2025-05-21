
import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import sub-components
import EmptyDividendState from './dividends/EmptyDividendState';
import DividendStats from './dividends/DividendStats';
import DividendChart from './dividends/DividendChart';
import RecentDividendsTable from './dividends/RecentDividendsTable';

// Import utilities
import { groupDividendsByMonth } from './dividends/dividendUtils';

interface DividendModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
}

const DividendModule = ({ fullWidth = false, useSyntheticData = false }: DividendModuleProps) => {
  const { dividendHistory, totalDividends, averageMonthlyDividends } = useRaioX();
  
  // Get recent dividends (limited to 5)
  const recentDividends = dividendHistory && dividendHistory.length > 0 
    ? dividendHistory.slice(0, 5) 
    : [];
  
  // Get chart data
  const chartData = groupDividendsByMonth(dividendHistory || []);

  // Check if we have real data from Supabase
  const hasRealData = !useSyntheticData && dividendHistory && dividendHistory.length > 0;
  
  // Determine data source
  const dataSource = hasRealData ? 'supabase' : 'synthetic';
  
  // If we have no real data and synthetic data is not allowed, show empty state
  if (!hasRealData && !useSyntheticData) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism h-full`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Histórico de Dividendos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyDividendState />
        </CardContent>
      </Card>
    );
  }

  // For real data or synthetic data
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism h-full`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent flex items-center justify-between flex-wrap">
          <span>Histórico de Dividendos</span>
          <span className="text-sm font-normal text-green-500 flex items-center">
            <span className="ml-1 text-green-400">
              {dataSource === 'supabase' ? (
                <span className="inline-block h-3 w-3">✓</span>
              ) : (
                <span className="text-yellow-400 text-xs ml-1">Exemplo</span>
              )}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Cards */}
        <DividendStats 
          totalDividends={totalDividends || 0} 
          averageMonthlyDividends={averageMonthlyDividends || 0}
          dividendCount={dividendHistory?.length || 0}
          dataSource={dataSource}
        />
        
        {/* Chart */}
        <DividendChart chartData={chartData} dataSource={dataSource} />
        
        {/* Recent Dividends Table */}
        <RecentDividendsTable recentDividends={recentDividends} dataSource={dataSource} />
      </CardContent>
    </Card>
  );
};

export default DividendModule;
