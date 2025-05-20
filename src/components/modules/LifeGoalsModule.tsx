
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, AlertTriangle, Lock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

// Using the Goal interface from RaioXContext to avoid type conflicts
// Note: We're not defining our own Goal interface anymore

interface LifeGoals {
  goals: Array<{
    name: string;
    timeframe: string;
    progress: number;
    currentAmount: number;
    targetAmount: number;
    adjustmentNeeded: number;
    category?: string; // Making category optional to match RaioXContext
  }>;
  summary: string;
}

const LifeGoalsModule = ({ fullWidth = false }: LifeGoalsModuleProps) => {
  const { data, hasOpenFinance } = useRaioX();
  const [moduleLoaded, setModuleLoaded] = useState(false);
  
  // Default goals in case data is missing
  const defaultGoals: LifeGoals = {
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
  
  // Use data from context or fallback to default values
  const lifeGoals: LifeGoals = data?.lifeGoals || defaultGoals;
  
  useEffect(() => {
    // Set module as loaded immediately to avoid streaming delay issues
    setModuleLoaded(true);
  }, []);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };

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

  if (!hasOpenFinance) {
    // Show limited version when OpenFinance is not enabled
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Metas de Vida
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1">
            <Download className="h-4 w-4" /> PDF
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Show only investment-related goals */}
            {lifeGoals.goals
              .filter(goal => goal.category === 'investment' || goal.name.toLowerCase().includes('investimento') || goal.name.toLowerCase().includes('aposentadoria'))
              .map((goal, index) => (
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
                      {`Atual: ${formatCurrency(goal.currentAmount)}`}
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
            
            <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-900/10 flex items-start gap-4">
              <div className="p-2 bg-blue-900/30 rounded-full">
                <Lock className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Metas adicionais disponíveis</h3>
                <p className="text-xs text-gray-300 mb-2">
                  Ative o OpenFinance para acessar todas as suas metas de vida e receber recomendações personalizadas para alcançá-las.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={handleActivateOpenFinance}
                >
                  Ativar OpenFinance
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Metas de Vida
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
                  {`Atual: ${formatCurrency(goal.currentAmount)}`}
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
