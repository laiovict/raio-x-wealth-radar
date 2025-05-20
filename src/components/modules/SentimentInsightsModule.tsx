
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Newspaper } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import StreamingText from "@/components/StreamingText";
import { useStreamingContent } from "@/hooks/use-streaming-content";

interface SentimentInsightsModuleProps {
  fullWidth?: boolean;
}

const SentimentInsightsModule = ({ fullWidth = false }: SentimentInsightsModuleProps) => {
  const { data } = useRaioX();
  const { sentiment } = data;
  const isMobile = useMobileBreakpoint();
  const { isStreaming, isComplete } = useStreamingContent(false, 1200);

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getSentimentBg = (score: number) => {
    if (score >= 70) return "bg-green-50 dark:bg-green-900/40 border-green-100 dark:border-green-800/60";
    if (score >= 50) return "bg-amber-50 dark:bg-amber-900/40 border-amber-100 dark:border-amber-800/60";
    return "bg-red-50 dark:bg-red-900/40 border-red-100 dark:border-red-800/60";
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/70 dark:to-indigo-900/70 pb-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl flex items-center">
          <span className="text-blue-800 dark:text-blue-200">
            Insights de Sentimento
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 bg-white dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentiment.assets.slice(0, 2).map((asset, index) => (
            <div 
              key={index} 
              className={`${getSentimentBg(asset.sentiment)} p-4 rounded-lg shadow-sm border transition-all hover:shadow-md hover:translate-y-[-2px]`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isStreaming ? (
                      <StreamingText 
                        text={asset.ticker} 
                        speed={40}
                        delay={400 + index * 300}
                      />
                    ) : '...'}
                  </span>
                  <Badge className="ml-2 px-2" variant="outline">
                    <span className={getSentimentColor(asset.sentiment)}>
                      {isStreaming ? (
                        <StreamingText 
                          text={`${asset.sentiment}/100`}
                          speed={30}
                          delay={600 + index * 300}
                        />
                      ) : '...'}
                    </span>
                  </Badge>
                </div>
                <span className={`flex items-center font-medium ${getImpactColor(asset.impact)}`}>
                  {asset.impact > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {isStreaming ? (
                    <StreamingText 
                      text={`${getImpactPrefix(asset.impact)}${asset.impact}%`}
                      speed={30}
                      delay={800 + index * 300}
                    />
                  ) : '...'}
                </span>
              </div>
              <div className="flex items-start mt-2">
                <Newspaper className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-800 dark:text-gray-100 text-sm">
                  {isStreaming ? (
                    <StreamingText 
                      text={asset.recentNews}
                      speed={5}
                      delay={1000 + index * 400}
                    />
                  ) : '...'}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 mt-4">
          <p className="text-gray-800 dark:text-gray-100">
            {isStreaming ? (
              <StreamingText 
                text={sentiment.summary}
                speed={8}
                delay={2000}
              />
            ) : '...'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentInsightsModule;
