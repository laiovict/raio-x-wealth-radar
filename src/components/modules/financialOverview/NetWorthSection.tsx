
import React from 'react';
import { ArrowUp } from "lucide-react";
import { formatCurrency } from "@/utils/raioXUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DataSourceTag from './DataSourceTag'; // This is the old one, should be TypeSafeDataSourceTag or similar from common
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag'; // Use the common one
import { ensureString, toNumber } from '@/utils/typeConversionHelpers';
import { cssClasses } from '@/utils/style-themes';
import { DataSourceType } from '@/types/raioXTypes';

interface NetWorthSectionProps {
  finData: any;
  netWorthHistory: { month: string; amount: number }[];
  netWorthHistoryDataSource: DataSourceType; // New prop
  getPortfolioSummary: () => any;
  defaultTrend: string;
}

const NetWorthSection = ({ finData, netWorthHistory, netWorthHistoryDataSource, getPortfolioSummary, defaultTrend }: NetWorthSectionProps) => {
  const currentPortfolioDataSource = getPortfolioSummary()?.dataSource || 'synthetic';
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-white">
          Patrimônio Líquido
          <TypeSafeDataSourceTag source={currentPortfolioDataSource} />
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatCurrency(ensureNumber(finData.netWorth))} {/* Ensure finData.netWorth is number */}
            <TypeSafeDataSourceTag source={currentPortfolioDataSource} />
          </div>
          <div className="flex items-center text-sm text-green-400">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>
              {finData.monthlyTrend || defaultTrend} este mês
              <TypeSafeDataSourceTag source={finData.dataSource || "synthetic"} /> {/* dataSource for trend itself */}
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={netWorthHistory} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#666" tick={{ fontSize: 10 }} />
            <YAxis 
              stroke="#666"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => {
                const numValue = toNumber(value);
                if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)}M`;
                if (numValue >= 1000) return `${(numValue / 1000).toFixed(0)}K`;
                return ensureString(numValue);
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="reinvent-stat-card p-2">
                      <p className="text-gray-300">{`Mês: ${label}`}</p>
                      <p className="text-white font-medium">{`Valor: ${formatCurrency(payload[0].value as number)}`}</p>
                      <div className="text-xs mt-1">
                        <TypeSafeDataSourceTag source={netWorthHistoryDataSource} />
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#6680FF" 
              dot={false}
              strokeWidth={3}
              connectNulls={true} // Good for potentially sparse historical data
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetWorthSection;

