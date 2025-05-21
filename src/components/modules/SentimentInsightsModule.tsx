
import { useRaioX } from "@/context/RaioXContext";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';
import { BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';

// Type for sentiment data
interface SentimentData {
  currentSentiment: string;
  historicalSentiment: Array<{ date: string; value: number }>;
  insights: string[];
  dataSource: DataSourceType;
}

interface SentimentInsightsModuleProps extends BaseModuleProps {
  // Additional props specific to this module
}

// Base component implementation
const SentimentInsightsModuleBase = ({ 
  fullWidth = false, 
  dataState 
}: SentimentInsightsModuleProps & { 
  dataState: { 
    data: SentimentData; 
    dataSource: DataSourceType; 
    isSynthetic: boolean; 
  } 
}) => {
  const isMobile = useMobileBreakpoint();
  const marketSentiment = dataState.data;
  
  // Determine sentiment color and icon
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "bullish":
        return "text-green-500";
      case "bearish":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "bullish":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "bearish":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Format the chart data
  const chartData = marketSentiment.historicalSentiment.map(item => ({
    ...item,
    sentiment: item.value
  }));

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2">
            Sentimento de Mercado
            <TypeSafeDataSourceTag source={marketSentiment.dataSource} />
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${getSentimentColor(marketSentiment.currentSentiment)} border-${getSentimentColor(marketSentiment.currentSentiment).replace('text-', '')}/30`}
          >
            <div className="flex items-center gap-1">
              {getSentimentIcon(marketSentiment.currentSentiment)}
              <span className="capitalize">{marketSentiment.currentSentiment}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`${fullWidth ? "h-64" : "h-48"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: isMobile ? 10 : 12, fill: 'rgba(255, 255, 255, 0.6)' }}
                  stroke="rgba(255, 255, 255, 0.2)"
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: isMobile ? 10 : 12, fill: 'rgba(255, 255, 255, 0.6)' }}
                  stroke="rgba(255, 255, 255, 0.2)"
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Sentimento']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sentiment" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Insights de Mercado:</h3>
            <ul className="space-y-2">
              {marketSentiment.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5"></div>
                  <span className="text-sm text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Create synthetic data for sentiment
const getSyntheticSentimentData = (): SentimentData => {
  return {
    currentSentiment: "neutral",
    historicalSentiment: [
      { date: "Jan", value: 65 },
      { date: "Fev", value: 70 },
      { date: "Mar", value: 60 },
      { date: "Abr", value: 45 },
      { date: "Mai", value: 50 },
      { date: "Jun", value: 55 },
      { date: "Jul", value: 40 },
      { date: "Ago", value: 45 },
      { date: "Set", value: 60 },
      { date: "Out", value: 65 },
      { date: "Nov", value: 70 },
      { date: "Dez", value: 75 },
    ],
    insights: [
      "Mercado em tendência de alta após período de consolidação",
      "Expectativa de redução da taxa de juros nos próximos meses",
      "Setores defensivos perdendo força relativa"
    ],
    dataSource: 'synthetic'
  };
};

// Get real sentiment data from context
const getRealSentimentData = (props: SentimentInsightsModuleProps) => {
  const { data } = useRaioX();
  return data.marketSentiment || null;
};

// Create the safe module using the HOC
const SentimentInsightsModule = withSafeData<SentimentInsightsModuleProps, SentimentData>(
  SentimentInsightsModuleBase,
  getRealSentimentData,
  getSyntheticSentimentData
);

export default SentimentInsightsModule;
