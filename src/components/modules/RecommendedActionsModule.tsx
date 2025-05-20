import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Lightbulb } from "lucide-react";
import { useRaioX } from "@/context/RaioXContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const RecommendedActionsModule = ({ fullWidth = false }) => {
  const { data } = useRaioX();
  const { t } = useLanguage();
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleActionCompletion = (actionId: string) => {
    if (completedActions.includes(actionId)) {
      setCompletedActions(completedActions.filter((id) => id !== actionId));
    } else {
      setCompletedActions([...completedActions, actionId]);
    }
  };

  return (
    <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{t('recommendedActions')}</h2>
        <div className="flex items-center text-blue-300">
          <Lightbulb className="h-4 w-4 mr-2" />
          {t('aiSuggestions')}
        </div>
      </div>
      
      <ul className="space-y-4">
        {data.recommendedActions.map((action) => (
          <li 
            key={action.id} 
            className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-white">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-300">
                    {t('impact')}: {action.impact}
                  </span>
                  <span className="text-xs text-blue-300">
                    {t('effort')}: {action.effort}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => toggleActionCompletion(action.id)}
                className="p-1 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                {completedActions.includes(action.id) ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="gradient" 
                size="sm"
                className="recommended-action-button"
                asChild
              >
                <a href={action.buttonLink} className="w-full block">
                  {action.buttonText}
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RecommendedActionsModule;
