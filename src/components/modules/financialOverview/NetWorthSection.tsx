
import React from 'react';
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "@/utils/raioXUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DataSourceTag from './DataSourceTag';
import { ensureString } from '@/utils/typeConversionHelpers';

interface NetWorthSectionProps {
  finData: any;
  netWorthHistory: any[];
  getPortfolioSummary: () => any;
  defaultTrend: string;
}

const NetWorthSection = ({ finData, netWorthHistory, getPortfolioSummary, defaultTrend }: NetWorthSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-white">
          Patrimônio Líquido
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatCurrency(finData.netWorth)}
            <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
          </div>
          <div className="flex items-center text-sm text-green-400">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>
              {finData.monthlyTrend || defaultTrend} este mês
              <DataSourceTag dataSource="synthetic" />
            </span>
          </div>
        </div>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={netWorthHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis 
              stroke="#666"
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return ensureString(value);
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-800 p-2 border border-gray-700 rounded-md">
                      <p className="text-gray-300">{`Mês: ${label}`}</p>
                      <p className="text-white font-medium">{`Valor: ${formatCurrency(payload[0].value as number)}`}</p>
                      <p className="text-amber-400 text-xs">* Dados sintéticos</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8884d8" 
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetWorthSection;
