
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RecommendationsModuleProps {
  fullWidth?: boolean;
}

const RecommendationsModule = ({ fullWidth = false }: RecommendationsModuleProps) => {
  const { data } = useRaioX();
  const { recommendations } = data;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "médio":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "baixo":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "alto":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "médio":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "baixo":
        return "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Recomendações Prioritárias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {index + 1}. {recommendation.action}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getUrgencyColor(recommendation.urgency)}>
                    Urgência: {recommendation.urgency}
                  </Badge>
                  <Badge className={getImpactColor(recommendation.impact)}>
                    Impacto: {recommendation.impact}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {recommendation.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto flex items-center justify-center"
              >
                Executar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {fullWidth && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {data.summary}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsModule;
