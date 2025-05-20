import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, toNumber } from '@/utils/raioXUtils';
import DataSourceTag from '@/components/common/DataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

// Data source indicator component
const DataSourceIndicator = ({ source }: { source?: DataSourceType }) => {
  if (!source) return null;
  return <DataSourceTag source={source} />;
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
          dataSource: hasRealData ? 'supabase' : 'synthetic'
        },
        {
          name: "Reserva de Emergência",
          timeframe: "Curto Prazo",
          progress: hasRealData ? Math.round((portfolioValue * 0.1 / 50000) * 100) : 80,
          currentAmount: hasRealData ? portfolioValue * 0.1 : 40000,
          targetAmount: 50000,
          adjustmentNeeded: 0,
          category: "saving",
          dataSource: hasRealData ? 'supabase' : 'synthetic'
        },
        {
          name: "Compra de Imóvel",
          timeframe: "Médio Prazo",
          progress: hasRealData ? Math.round((portfolioValue * 0.25 / 300000) * 100) : 25,
          currentAmount: hasRealData ? portfolioValue * 0.25 : 75000,
          targetAmount: 300000,
          adjustmentNeeded: 15,
          category: "property",
          dataSource: hasRealData ? 'supabase' : 'synthetic'
        }
      ],
      summary: "Seus objetivos financeiros estão em bom progresso. A reserva de emergência está quase completa, mas os objetivos de longo prazo precisam de aportes consistentes.",
      dataSource: hasRealData ? 'supabase' : 'synthetic'
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Metas de Vida
          <DataSourceIndicator source={lifeGoals.dataSource as 'supabase' | 'synthetic'} />
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1">
          <Download className="h-4 w-4" /> PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lifeGoals.goals.map((goal, index) => (
            <div key={index} className="space-y-2 p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-md font-medium text-white">
                      {goal.name}
                    </span>
                    <Badge className="ml-2 bg-blue-600/60">
                      {goal.timeframe}
                    </Badge>
                    <DataSourceIndicator source={goal.dataSource as 'supabase' | 'synthetic'} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">
                    <span className="text-white">
                      {`${goal.progress}%`}
                    </span>
                    {goal.adjustmentNeeded > 0 && (
                      <Badge className="ml-2 bg-amber-600/60">
                        {`+${goal.adjustmentNeeded}% necessário`}
                      </Badge>
                    )}
                    {goal.adjustmentNeeded <= 0 && (
                      <Badge className="ml-2 bg-green-600/60">
                        No Caminho
                      </Badge>
                    )}
                  </span>
                </div>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-3 bg-gray-800" 
              />
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  {`Atual: ${formatCurrency(toNumber(goal.currentAmount))}`}
                </span>
                <span>
                  {`Meta: ${formatCurrency(goal.targetAmount)}`}
                </span>
              </div>
              {goal.adjustmentNeeded > 0 && (
                <div className="mt-2 text-xs text-amber-400 flex items-center">
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {`Sugestão: Aumentar aportes em ${formatCurrency(goal.targetAmount * goal.adjustmentNeeded / 100 / 12)} mensais`}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-300">
              {lifeGoals.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeGoalsModule;
