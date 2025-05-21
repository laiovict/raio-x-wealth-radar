
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from '@/utils/formattingUtils';
import { toNumber, ensureString, toSafeString } from '@/utils/typeConversionHelpers';
import { DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

// Data source indicator component - updated to accept any type of source
const DataSourceIndicator = ({ source }: { source?: DataSourceType | string | number }) => {
  if (source === undefined || source === null) return null;
  // TypeSafeDataSourceTag now accepts string | number | DataSourceType
  return <TypeSafeDataSourceTag source={source} />;
};

const LifeGoalsModule = ({ fullWidth = false }: LifeGoalsModuleProps) => {
  const { data, portfolioSummary } = useRaioX();
  const [moduleLoaded, setModuleLoaded] = useState(false);
  
  // Default goals in case data is missing
  const lifeGoals = useMemo(() => {
    // Get the portfolio total value from Supabase data if available
    const portfolioValue = portfolioSummary ? parseFloat(portfolioSummary.total_portfolio_value || "0") : 0;
    const hasRealData = portfolioSummary && portfolioValue > 0;
    
    // If we have data from the context, use that
    if (data?.lifeGoals) {
      return {
        ...data.lifeGoals,
        dataSource: hasRealData ? 'supabase' : 'synthetic'
      };
    }
    
    // Otherwise, provide default goals, but enhanced with real data if available
    return {
      goals: [
        {
          name: "Aposentadoria",
          timeframe: "Longo Prazo",
          progress: hasRealData ? Math.round((portfolioValue * 0.6 / 800000) * 100) : 45,
          currentAmount: hasRealData ? portfolioValue * 0.6 : 360000,
          targetAmount: 800000,
          adjustmentNeeded: 10,
          category: "investment",
          dataSource: hasRealData ? 'supabase' as const : 'synthetic' as const
        },
        {
          name: "Reserva de Emergência",
          timeframe: "Curto Prazo",
          progress: hasRealData ? Math.round((portfolioValue * 0.1 / 50000) * 100) : 80,
          currentAmount: hasRealData ? portfolioValue * 0.1 : 40000,
          targetAmount: 50000,
          adjustmentNeeded: 0,
          category: "saving",
          dataSource: hasRealData ? 'supabase' as const : 'synthetic' as const
        },
        {
          name: "Compra de Imóvel",
          timeframe: "Médio Prazo",
          progress: hasRealData ? Math.round((portfolioValue * 0.25 / 300000) * 100) : 25,
          currentAmount: hasRealData ? portfolioValue * 0.25 : 75000,
          targetAmount: 300000,
          adjustmentNeeded: 15,
          category: "property",
          dataSource: hasRealData ? 'supabase' as const : 'synthetic' as const
        }
      ],
      summary: "Seus objetivos financeiros estão em bom progresso. A reserva de emergência está quase completa, mas os objetivos de longo prazo precisam de aportes consistentes.",
      dataSource: hasRealData ? 'supabase' as const : 'synthetic' as const
    };
  }, [data?.lifeGoals, portfolioSummary]);
  
  useEffect(() => {
    // Set module as loaded immediately to avoid streaming delay issues
    setModuleLoaded(true);
  }, []);

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    toast({
      title: "PDF sendo gerado",
      description: "Seu relatório de metas de vida está sendo preparado para download.",
    });
    
    // Simulating PDF download - in a real application this would call an API
    setTimeout(() => {
      toast({
        title: "PDF gerado com sucesso",
        description: "Seu relatório de metas de vida está pronto.",
      });
    }, 2000);
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border-2 border-indigo-100 dark:border-indigo-800/30 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
        <CardTitle className="text-xl text-white font-bold">
          Metas de Vida
          <DataSourceIndicator source={lifeGoals.dataSource} />
        </CardTitle>
        <Button variant="secondary" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1 bg-white/90 text-indigo-700">
          <Download className="h-4 w-4" /> PDF
        </Button>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-6">
          {lifeGoals.goals.map((goal, index) => (
            <div key={index} className="space-y-2 p-5 bg-white/70 dark:bg-indigo-900/30 rounded-lg border-2 border-indigo-100 dark:border-indigo-800/30 shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                      {goal.name}
                    </span>
                    <Badge className="ml-2 bg-indigo-500 hover:bg-indigo-600">
                      {goal.timeframe}
                    </Badge>
                    <DataSourceIndicator source={goal.dataSource} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">
                    <span className="text-indigo-700 dark:text-indigo-300">
                      {`${goal.progress}%`}
                    </span>
                    {goal.adjustmentNeeded > 0 && (
                      <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">
                        {`+${goal.adjustmentNeeded}% necessário`}
                      </Badge>
                    )}
                    {goal.adjustmentNeeded <= 0 && (
                      <Badge className="ml-2 bg-green-500 hover:bg-green-600">
                        No Caminho
                      </Badge>
                    )}
                  </span>
                </div>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-3 bg-gray-200 dark:bg-gray-700"
                style={{
                  background: "linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(99, 102, 241, 0.2))",
                }}
              />
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 font-medium">
                <span>
                  {`Atual: ${formatCurrency(goal.currentAmount.toString())}`}
                </span>
                <span>
                  {`Meta: ${formatCurrency(goal.targetAmount.toString())}`}
                </span>
              </div>
              {goal.adjustmentNeeded > 0 && (
                <div className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {`Sugestão: Aumentar aportes em ${formatCurrency(((goal.targetAmount * goal.adjustmentNeeded / 100) / 12).toString())} mensais`}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800/40 shadow-md">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              {lifeGoals.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeGoalsModule;
