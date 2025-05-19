
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

const LifeGoalsModule = ({ fullWidth = false }: LifeGoalsModuleProps) => {
  const { data } = useRaioX();
  const { lifeGoals } = data;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Gaps de Metas de Vida
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lifeGoals.goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    ({goal.timeframe})
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {goal.progress}% 
                  <span className={`ml-1 ${goal.adjustmentNeeded > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                    {goal.adjustmentNeeded > 0 ? `+${goal.adjustmentNeeded}%` : 'No Caminho'}
                  </span>
                </span>
              </div>
              <Progress value={goal.progress} className="h-3" />
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>Atual: {formatCurrency(goal.currentAmount)}</span>
                <span>Meta: {formatCurrency(goal.targetAmount)}</span>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {lifeGoals.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeGoalsModule;
