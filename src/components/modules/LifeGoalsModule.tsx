
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreamingText from "@/components/StreamingText";
import { useStreamingContent } from "@/hooks/use-streaming-content";

interface LifeGoalsModuleProps {
  fullWidth?: boolean;
}

const LifeGoalsModule = ({ fullWidth = false }: LifeGoalsModuleProps) => {
  const { data, hasOpenFinance } = useRaioX();
  const { isStreaming, isComplete } = useStreamingContent(false, 1500);
  
  // Ensure lifeGoals exists with default values if not
  const lifeGoals = data?.lifeGoals || { goals: [], summary: "" };
  
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

  if (!hasOpenFinance) {
    // Show limited version when OpenFinance is not enabled
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Metas de Vida
          </CardTitle>
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
                          {isStreaming ? (
                            <StreamingText 
                              text={goal.name}
                              speed={30}
                              delay={300 + index * 200}
                            />
                          ) : '...'}
                        </span>
                        <Badge className="ml-2 bg-blue-600/60">
                          {isStreaming ? (
                            <StreamingText 
                              text={goal.timeframe}
                              speed={40}
                              delay={500 + index * 200}
                            />
                          ) : '...'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        <span className="text-white">
                          {isStreaming ? (
                            <StreamingText 
                              text={`${goal.progress}%`}
                              speed={40}
                              delay={700 + index * 200}
                            />
                          ) : '...'}
                        </span>
                        {goal.adjustmentNeeded > 0 && (
                          <Badge className="ml-2 bg-amber-600/60">
                            {isStreaming ? (
                              <StreamingText 
                                text={`+${goal.adjustmentNeeded}% necessário`}
                                speed={30}
                                delay={900 + index * 200}
                              />
                            ) : '...'}
                          </Badge>
                        )}
                        {goal.adjustmentNeeded <= 0 && (
                          <Badge className="ml-2 bg-green-600/60">
                            {isStreaming ? (
                              <StreamingText 
                                text="No Caminho"
                                speed={30}
                                delay={900 + index * 200}
                              />
                            ) : '...'}
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
                      {isStreaming ? (
                        <StreamingText 
                          text={`Atual: ${formatCurrency(goal.currentAmount)}`}
                          speed={30}
                          delay={1100 + index * 200}
                        />
                      ) : '...'}
                    </span>
                    <span>
                      {isStreaming ? (
                        <StreamingText 
                          text={`Meta: ${formatCurrency(goal.targetAmount)}`}
                          speed={30}
                          delay={1300 + index * 200}
                        />
                      ) : '...'}
                    </span>
                  </div>
                  {goal.adjustmentNeeded > 0 && (
                    <div className="mt-2 text-xs text-amber-400 flex items-center">
                      <ArrowUp className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {isStreaming ? (
                          <StreamingText 
                            text={`Sugestão: Aumentar aportes em ${formatCurrency(goal.targetAmount * goal.adjustmentNeeded / 100 / 12)} mensais`}
                            speed={15}
                            delay={1500 + index * 200}
                          />
                        ) : '...'}
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
                  {isStreaming ? (
                    <StreamingText 
                      text="Ative o OpenFinance para acessar todas as suas metas de vida e receber recomendações personalizadas para alcançá-las."
                      speed={15}
                      delay={1800}
                    />
                  ) : '...'}
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
                    <span className="text-md font-medium text-white">
                      {isStreaming ? (
                        <StreamingText 
                          text={goal.name}
                          speed={30}
                          delay={300 + index * 200}
                        />
                      ) : '...'}
                    </span>
                    <Badge className="ml-2 bg-blue-600/60">
                      {isStreaming ? (
                        <StreamingText 
                          text={goal.timeframe}
                          speed={40}
                          delay={500 + index * 200}
                        />
                      ) : '...'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">
                    <span className="text-white">
                      {isStreaming ? (
                        <StreamingText 
                          text={`${goal.progress}%`}
                          speed={40}
                          delay={700 + index * 200}
                        />
                      ) : '...'}
                    </span>
                    {goal.adjustmentNeeded > 0 && (
                      <Badge className="ml-2 bg-amber-600/60">
                        {isStreaming ? (
                          <StreamingText 
                            text={`+${goal.adjustmentNeeded}% necessário`}
                            speed={30}
                            delay={900 + index * 200}
                          />
                        ) : '...'}
                      </Badge>
                    )}
                    {goal.adjustmentNeeded <= 0 && (
                      <Badge className="ml-2 bg-green-600/60">
                        {isStreaming ? (
                          <StreamingText 
                            text="No Caminho"
                            speed={30}
                            delay={900 + index * 200}
                          />
                        ) : '...'}
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
                  {isStreaming ? (
                    <StreamingText 
                      text={`Atual: ${formatCurrency(goal.currentAmount)}`}
                      speed={30}
                      delay={1100 + index * 200}
                    />
                  ) : '...'}
                </span>
                <span>
                  {isStreaming ? (
                    <StreamingText 
                      text={`Meta: ${formatCurrency(goal.targetAmount)}`}
                      speed={30}
                      delay={1300 + index * 200}
                    />
                  ) : '...'}
                </span>
              </div>
              {goal.adjustmentNeeded > 0 && (
                <div className="mt-2 text-xs text-amber-400 flex items-center">
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {isStreaming ? (
                      <StreamingText 
                        text={`Sugestão: Aumentar aportes em ${formatCurrency(goal.targetAmount * goal.adjustmentNeeded / 100 / 12)} mensais`}
                        speed={15}
                        delay={1500 + index * 200}
                      />
                    ) : '...'}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-300">
              {isStreaming ? (
                <StreamingText 
                  text={lifeGoals.summary}
                  speed={10}
                  delay={1800}
                />
              ) : '...'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeGoalsModule;
