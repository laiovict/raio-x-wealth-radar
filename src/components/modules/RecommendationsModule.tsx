
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";

interface RecommendationsModuleProps {
  fullWidth?: boolean;
}

const RecommendationsModule = ({ fullWidth = false }: RecommendationsModuleProps) => {
  const { data, hasOpenFinance } = useRaioX();
  const { recommendations } = data;
  const isMobile = useMobileBreakpoint();
  const { t } = useLanguage();

  // Function to handle recommendation execution by sending a message to the chat
  const handleExecute = (recommendation: any) => {
    // Create a message to send to the chat
    const messageText = `Nicolas, preciso executar a recomendação: ${recommendation.action}. ${recommendation.description}`;
    
    // Create custom event to pre-load message in the chat
    const event = new CustomEvent('load-chat-message', { 
      detail: { message: messageText }
    });
    document.dispatchEvent(event);
    
    // Navigate to chat tab
    const tabsEvent = new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'chat' }
    });
    document.dispatchEvent(tabsEvent);
  };

  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return "bg-red-900/30 text-red-400 border-red-500/30";
      case "médio":
        return "bg-amber-900/30 text-amber-400 border-amber-500/30";
      case "baixo":
        return "bg-green-900/30 text-green-400 border-green-500/30";
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-500/30";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "médio":
        return <Clock className="h-4 w-4 text-amber-400" />;
      case "baixo":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "alto":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30";
      case "médio":
        return "bg-indigo-900/30 text-indigo-400 border-indigo-500/30";
      case "baixo":
        return "bg-violet-900/30 text-violet-400 border-violet-500/30";
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism h-full`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          {t('priorityRecommendations')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations?.map((recommendation, index) => (
          <div 
            key={index} 
            className="bg-black/20 rounded-lg border border-white/5 overflow-hidden transition-all hover:border-white/10"
          >
            <div className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                <span className="text-base md:text-lg font-medium text-white">
                  {recommendation.action}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`flex items-center gap-1 py-1 ${getUrgencyColor(recommendation.urgency)}`}>
                    {getUrgencyIcon(recommendation.urgency)}
                    <span>{t('urgencyLabel')} {recommendation.urgency}</span>
                  </Badge>
                  <Badge className={`py-1 ${getImpactColor(recommendation.impact)}`}>
                    {t('impactLabel')} {recommendation.impact}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {recommendation.description}
              </p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 border border-blue-500/20"
                  onClick={() => handleExecute(recommendation)}
                >
                  {t('executeButton')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {recommendations?.length === 0 && (
          <div className="bg-black/20 rounded-lg border border-white/5 p-6 text-center">
            <p className="text-gray-400">Nenhuma recomendação disponível.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsModule;
