
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from '@/utils/formattingUtils';

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
}

// Define types for our life goals
interface LifeGoal {
  name: string;
  timeframe: string;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  adjustmentNeeded: number;
  category: string;
}

interface LifeGoals {
  goals: LifeGoal[];
  summary: string;
}

const LifeGoalsModule = ({ fullWidth = false, useSyntheticData = false }: LifeGoalsModuleProps) => {
  const [moduleLoaded, setModuleLoaded] = useState(false);
  
  // Simplified synthetic data directly in the component
  const lifeGoals: LifeGoals = {
    goals: [
      {
        name: "Aposentadoria",
        timeframe: "Longo Prazo",
        progress: 45,
        currentAmount: 360000,
        targetAmount: 800000,
        adjustmentNeeded: 10,
        category: "investment"
      },
      {
        name: "Reserva de Emergência",
        timeframe: "Curto Prazo",
        progress: 80,
        currentAmount: 40000,
        targetAmount: 50000,
        adjustmentNeeded: 0,
        category: "saving"
      },
      {
        name: "Compra de Imóvel",
        timeframe: "Médio Prazo",
        progress: 25,
        currentAmount: 75000,
        targetAmount: 300000,
        adjustmentNeeded: 15,
        category: "property"
      }
    ],
    summary: "Seus objetivos financeiros estão em bom progresso. A reserva de emergência está quase completa, mas os objetivos de longo prazo precisam de aportes consistentes."
  };
  
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} border-2 border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-slate-900/80 to-slate-800/80`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg">
        <CardTitle className="text-xl text-white font-bold">
          Metas de Vida
        </CardTitle>
        <Button variant="secondary" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1 bg-slate-700/90 hover:bg-slate-600 text-slate-200">
          <Download className="h-4 w-4" /> PDF
        </Button>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-6">
          {lifeGoals.goals.map((goal, index) => (
            <div key={index} className="space-y-2 p-5 bg-slate-800/70 dark:bg-slate-800/70 rounded-lg border-2 border-slate-700/50 shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-slate-200">
                      {goal.name}
                    </span>
                    <Badge className="ml-2 bg-slate-700 hover:bg-slate-600">
                      {goal.timeframe}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">
                    <span className="text-slate-300">
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
                className="h-3"
                style={{
                  background: "rgba(51, 65, 85, 0.5)",
                }}
              />
              <div className="flex justify-between items-center text-sm text-slate-400 font-medium">
                <span>
                  {`Atual: ${formatCurrency(goal.currentAmount.toString())}`}
                </span>
                <span>
                  {`Meta: ${formatCurrency(goal.targetAmount.toString())}`}
                </span>
              </div>
              {goal.adjustmentNeeded > 0 && (
                <div className="mt-2 text-sm text-amber-400 flex items-center bg-amber-900/20 p-2 rounded-md">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {`Sugestão: Aumentar aportes em ${formatCurrency(((goal.targetAmount * goal.adjustmentNeeded / 100) / 12).toString())} mensais`}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-gradient-to-r from-slate-800/70 to-slate-700/70 p-5 rounded-lg border-2 border-slate-600/40 shadow-md">
            <p className="text-slate-300 font-medium">
              {lifeGoals.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeGoalsModule;
