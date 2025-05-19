
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SentimentInsightsModuleProps {
  fullWidth?: boolean;
}

const SentimentInsightsModule = ({ fullWidth = false }: SentimentInsightsModuleProps) => {
  const { data } = useRaioX();
  const { sentiment } = data;

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getSentimentBg = (score: number) => {
    if (score >= 70) return "bg-green-50 dark:bg-green-900/20";
    if (score >= 50) return "bg-amber-50 dark:bg-amber-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-600 dark:text-green-400";
    if (impact === 0) return "text-gray-600 dark:text-gray-400";
    return "text-red-600 dark:text-red-400";
  };

  const getImpactPrefix = (impact: number) => {
    if (impact > 0) return "+";
    return "";
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Insights de Sentimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentiment.assets.map((asset, index) => (
            <div 
              key={index} 
              className={`${getSentimentBg(asset.sentiment)} p-3 rounded-lg`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="font-medium">{asset.ticker}</span>
                  <Badge className="ml-2" variant="outline">
                    <span className={getSentimentColor(asset.sentiment)}>
                      {asset.sentiment}/100
                    </span>
                  </Badge>
                </div>
                <span className={getImpactColor(asset.impact)}>
                  {getImpactPrefix(asset.impact)}{asset.impact}%
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {asset.recentNews}
              </p>
            </div>
          ))}
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {sentiment.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentInsightsModule;
