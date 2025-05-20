
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Newspaper, Download } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface SentimentInsightsModuleProps {
  fullWidth?: boolean;
}

const SentimentInsightsModule = ({ fullWidth = false }: SentimentInsightsModuleProps) => {
  const { data } = useRaioX();
  const { sentiment } = data;
  const isMobile = useMobileBreakpoint();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state immediately to avoid streaming issues
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    toast({
      title: "PDF sendo gerado",
      description: "Seu relatório de sentimentos de mercado está sendo preparado para download.",
    });
    
    // Simulating PDF download - in a real application this would call an API
    setTimeout(() => {
      toast({
        title: "PDF gerado com sucesso",
        description: "Seu relatório de sentimentos de mercado está pronto.",
      });
    }, 2000);
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/70 dark:to-indigo-900/70 pb-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700 flex flex-row justify-between items-center">
        <CardTitle className="text-xl flex items-center">
          <span className="text-blue-800 dark:text-blue-200">
            Insights de Sentimento
          </span>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80">
          <Download className="h-4 w-4" /> PDF
        </Button>
      </CardHeader>
      <CardContent className="pt-5 bg-white dark:bg-slate-900">
        {isLoaded ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sentiment.assets.slice(0, 2).map((asset, index) => (
                <div 
                  key={index} 
                  className={`${getSentimentBg(asset.sentiment)} p-4 rounded-lg shadow-sm border transition-all hover:shadow-md hover:translate-y-[-2px]`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {asset.ticker}
                      </span>
                      <Badge className="ml-2 px-2" variant="outline">
                        <span className={getSentimentColor(asset.sentiment)}>
                          {`${asset.sentiment}/100`}
                        </span>
                      </Badge>
                    </div>
                    <span className={`flex items-center font-medium ${getImpactColor(asset.impact)}`}>
                      {asset.impact > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {`${getImpactPrefix(asset.impact)}${asset.impact}%`}
                    </span>
                  </div>
                  <div className="flex items-start mt-2">
                    <Newspaper className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-800 dark:text-gray-100 text-sm">
                      {asset.recentNews}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 mt-4">
              <p className="text-gray-800 dark:text-gray-100">
                {sentiment.summary}
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 animate-pulse dark:bg-gray-800/40 rounded-lg"></div>
            <div className="h-32 bg-gray-200 animate-pulse dark:bg-gray-800/40 rounded-lg"></div>
            <div className="h-16 bg-gray-200 animate-pulse dark:bg-gray-800/40 rounded-lg"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentInsightsModule;
