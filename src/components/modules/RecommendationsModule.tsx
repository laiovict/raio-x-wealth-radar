
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";

interface RecommendationsModuleProps {
  fullWidth?: boolean;
}

const RecommendationsModule = ({ fullWidth = false }: RecommendationsModuleProps) => {
  const { data } = useRaioX();
  const { recommendations } = data;
  const isMobile = useMobileBreakpoint();

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

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "médio":
        return <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "baixo":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      default:
        return null;
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 pb-4 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300">
            Recomendações Prioritárias
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800/40 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="p-4">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {recommendation.action}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`flex items-center gap-1 px-2 py-1 ${getUrgencyColor(recommendation.urgency)}`}>
                      {getUrgencyIcon(recommendation.urgency)}
                      <span>Urgência: {recommendation.urgency}</span>
                    </Badge>
                    <Badge className={`px-2 py-1 ${getImpactColor(recommendation.impact)}`}>
                      Impacto: {recommendation.impact}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {recommendation.description}
                </p>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors"
                  >
                    Executar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {fullWidth && (
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 mt-4">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
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
