
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMobileBreakpoint } from "@/hooks/use-mobile";

interface FutureProjectionModuleProps {
  fullWidth?: boolean;
}

const FutureProjectionModule = ({ fullWidth = false }: FutureProjectionModuleProps) => {
  const { data } = useRaioX();
  const { projection } = data;
  const isMobile = useMobileBreakpoint();
  
  // Format data for the chart
  const chartData = [
    {
      name: "Hoje",
      base: projection.currentTotal,
      stress: projection.currentTotal,
    },
    {
      name: "1 ano",
      base: projection.scenarios.base["1 ano"],
      stress: projection.scenarios.stress["1 ano"],
    },
    {
      name: "3 anos",
      base: projection.scenarios.base["3 anos"],
      stress: projection.scenarios.stress["3 anos"],
    },
    {
      name: "5 anos",
      base: projection.scenarios.base["5 anos"],
      stress: projection.scenarios.stress["5 anos"],
    },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 pb-2 rounded-t-lg">
        <CardTitle className="text-xl flex items-center justify-between flex-wrap">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300">
            Projeção Futuro Próximo
          </span>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Aporte: {formatCurrency(projection.monthlyContribution)}/mês
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className={`${fullWidth && !isMobile ? "h-80" : isMobile ? "h-48" : "h-64"} mb-4`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                stroke="rgba(148, 163, 184, 0.5)"
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value;
                }}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 30 : 40}
                stroke="rgba(148, 163, 184, 0.5)"
              />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ 
                  fontSize: isMobile ? 10 : 12,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "6px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(226, 232, 240, 1)"
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="base" 
                stroke="#4f46e5" 
                strokeWidth={2} 
                name="Cenário Base" 
                activeDot={{ r: isMobile ? 6 : 8 }} 
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Cenário Stress" 
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2 mb-3">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/10 p-3 rounded-lg border border-green-100 dark:border-green-800/30 shadow-sm">
            <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Cenário Base (5 anos)</p>
            <p className={`${isMobile ? "text-base" : "text-lg"} font-bold text-green-700 dark:text-green-200`}>
              {formatCurrency(projection.scenarios.base["5 anos"])}
            </p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50/70 dark:from-amber-900/20 dark:to-yellow-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-800/30 shadow-sm">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Cenário Stress (5 anos)</p>
            <p className={`${isMobile ? "text-base" : "text-lg"} font-bold text-amber-700 dark:text-amber-200`}>
              {formatCurrency(projection.scenarios.stress["5 anos"])}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 dark:from-blue-900/30 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {projection.summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureProjectionModule;
