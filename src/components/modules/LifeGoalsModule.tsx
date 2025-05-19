
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, AlertTriangle } from "lucide-react";

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

const LifeGoalsModule = ({ fullWidth = false }: LifeGoalsModuleProps) => {
  const { data, hasOpenFinance } = useRaioX();
  const { lifeGoals } = data;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Metas de Vida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Metas de Vida Indisponíveis</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Ative o OpenFinance para visualizar o progresso detalhado de suas metas de vida e receber recomendações personalizadas.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Metas de Vida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lifeGoals.goals.map((goal, index) => (
            <div key={index} className="space-y-2 p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-md font-medium text-white">{goal.name}</span>
                    <Badge className="ml-2 bg-blue-600/60">
                      {goal.timeframe}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">
                    <span className="text-white">{goal.progress}%</span>
                    {goal.adjustmentNeeded > 0 && (
                      <Badge className="ml-2 bg-amber-600/60">
                        +{goal.adjustmentNeeded}% necessário
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
                <span>Atual: {formatCurrency(goal.currentAmount)}</span>
                <span>Meta: {formatCurrency(goal.targetAmount)}</span>
              </div>
              {goal.adjustmentNeeded > 0 && (
                <div className="mt-2 text-xs text-amber-400 flex items-center">
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  <span>Sugestão: Aumentar aportes em {formatCurrency(goal.targetAmount * goal.adjustmentNeeded / 100 / 12)} mensais</span>
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
