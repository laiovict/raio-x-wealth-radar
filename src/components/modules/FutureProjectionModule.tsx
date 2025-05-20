
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { TrendingUp } from "lucide-react";

interface FutureProjectionModuleProps {
  fullWidth?: boolean;
}

const FutureProjectionModule = ({ fullWidth = false }: FutureProjectionModuleProps) => {
  const { data } = useRaioX();
  // Ensure projection exists with default values if not
  const projection = data?.projection || {
    currentTotal: 100000,
    monthlyContribution: 2000,
    scenarios: {
      base: { "1 ano": 120000, "3 anos": 180000, "5 anos": 250000 },
      stress: { "1 ano": 110000, "3 anos": 150000, "5 anos": 200000 }
    }
  };
  
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-indigo-700 to-blue-700 pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600/50 p-2">
              <TrendingUp className="h-5 w-5 text-indigo-100" />
            </div>
            <CardTitle className="text-xl text-white">
              Projeção Futuro Próximo
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-indigo-600/30 text-indigo-100 border-indigo-500/40">
            Aporte: {formatCurrency(projection.monthlyContribution)}/mês
          </Badge>
        </div>
        <p className="text-indigo-200 mt-1 text-sm">
          Estimativa de crescimento patrimonial baseado em diferentes cenários
        </p>
      </CardHeader>

      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 pt-4">
        <div className={`${fullWidth && !isMobile ? "h-72" : isMobile ? "h-48" : "h-60"} mb-4`}>
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
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  border: "1px solid rgba(66, 85, 122, 0.3)"
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="base" 
                stroke="#6366f1" 
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
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="bg-indigo-900/20 backdrop-blur-md p-4 rounded-lg border border-indigo-800/30">
            <p className="text-sm font-medium text-indigo-300 mb-1">Cenário Base (5 anos)</p>
            <p className="text-lg font-bold text-white">
              {formatCurrency(projection.scenarios.base["5 anos"])}
            </p>
          </div>
          <div className="bg-amber-900/20 backdrop-blur-md p-4 rounded-lg border border-amber-800/30">
            <p className="text-sm font-medium text-amber-300 mb-1">Cenário Stress (5 anos)</p>
            <p className="text-lg font-bold text-white">
              {formatCurrency(projection.scenarios.stress["5 anos"])}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureProjectionModule;
