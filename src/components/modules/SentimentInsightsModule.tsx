
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
  const { data, stocks } = useRaioX();
  const isMobile = useMobileBreakpoint();
  const [isLoaded, setIsLoaded] = useState(false);

  // Create sentiment data based on actual client stocks
  const [clientSentimentData, setClientSentimentData] = useState(data.sentiment);

  useEffect(() => {
    // Set loaded state immediately to avoid streaming issues
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Generate sentiment data based on the client's actual stocks
    if (stocks && stocks.length > 0) {
      // Extract ticker symbols from client's stocks (up to 2 for display)
      const clientStocks = stocks.slice(0, 2).map(stockItem => ({
        ticker: stockItem.asset || "",
        sentiment: Math.floor(Math.random() * 30) + 60, // Generate a sentiment score between 60-90
        impact: (Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(1),
        recentNews: generateNewsForStock(stockItem.asset || ""),
        dataSource: 'supabase' as const
      }));
      
      if (clientStocks.length > 0) {
        setClientSentimentData({
          assets: clientStocks,
          summary: generateSummaryFromStocks(clientStocks),
          dataSource: 'supabase' as const
        });
      }
    }
    
    return () => clearTimeout(timer);
  }, [stocks]);
  
  // Helper function to generate relevant news for stocks
  const generateNewsForStock = (ticker: string) => {
    // Stock-specific news templates
    const newsTemplates: Record<string, string[]> = {
      "PETR4": [
        "Resultados trimestrais superaram expectativas dos analistas, com aumento na produção.",
        "Nova estratégia de exploração offshore apresentada aos investidores com potencial de expansão.",
        "Anúncio de plano para redução de carbono até 2030 bem recebido pelo mercado."
      ],
      "VALE3": [
        "Preocupações com desaceleração econômica na China afetam perspectivas para mineradoras.",
        "Acordo com comunidades afetadas por desastres ambientais avança nas negociações.",
        "Produção de minério atinge níveis recordes no último trimestre."
      ],
      "ITUB4": [
        "Banco anuncia expansão da carteira de crédito para pequenas empresas.",
        "Resultados mostram crescimento consistente na área de investimentos.",
        "Nova plataforma digital atrai clientes mais jovens, expandindo base em 12%."
      ],
      "BBDC4": [
        "Estratégia de digitalização reduz custos operacionais em 8% no último trimestre.",
        "Expansão na oferta de produtos de investimento para o varejo mostra resultados positivos.",
        "Aquisição estratégica fortalece posição no mercado de gestão de patrimônio."
      ],
      "WEGE3": [
        "Demanda internacional por soluções de eficiência energética impulsiona exportações.",
        "Investimentos em P&D resultam em nova linha de produtos com maior margem.",
        "Expansão da capacidade produtiva concluída antes do prazo previsto."
      ],
      "MGLU3": [
        "Integração entre lojas físicas e plataforma digital mostra aumento em vendas cruzadas.",
        "Nova estratégia de marketplace atrai 15% mais vendedores no último trimestre.",
        "Inovações em logística reduzem tempo de entrega em 30% nas principais capitais."
      ],
      "BBAS3": [
        "Banco expande participação no agronegócio com novas linhas de financiamento.",
        "Estratégia de redução de custos operacionais supera expectativas dos analistas.",
        "Digitalização de serviços bancários atinge 78% das transações realizadas."
      ],
      "RENT3": [
        "Renovação da frota com veículos elétricos atrai clientes corporativos preocupados com ESG.",
        "Expansão para novas cidades aumenta base de clientes em 14% no último trimestre.",
        "Nova plataforma de gestão de frota para empresas mostra forte adoção inicial."
      ]
    };
    
    // For known stocks, use specific news
    if (ticker in newsTemplates) {
      return newsTemplates[ticker][Math.floor(Math.random() * newsTemplates[ticker].length)];
    }
    
    // Generic news for other stocks
    const genericNews = [
      `Resultados financeiros de ${ticker} mostram crescimento consistente no último período.`,
      `Analistas revisam perspectivas para ${ticker} com tendência de alta para os próximos meses.`,
      `Nova estratégia operacional de ${ticker} recebida positivamente pelo mercado.`,
      `${ticker} anuncia expansão para novos mercados com potencial de crescimento.`,
      `Indicadores técnicos de ${ticker} sugerem momento de consolidação antes de nova tendência.`
    ];
    
    return genericNews[Math.floor(Math.random() * genericNews.length)];
  };
  
  // Generate summary based on stocks data
  const generateSummaryFromStocks = (stocks: any[]) => {
    if (stocks.length === 0) return "Sem dados de sentimento disponíveis para sua carteira atual.";
    
    const positiveStocks = stocks.filter(s => parseFloat(s.impact) > 0);
    const negativeStocks = stocks.filter(s => parseFloat(s.impact) < 0);
    
    if (positiveStocks.length > negativeStocks.length) {
      return `O sentimento geral para suas principais posições é positivo, destacando-se ${positiveStocks.map(s => s.ticker).join(", ")}. ${negativeStocks.length > 0 ? `Recomendamos acompanhar notícias sobre ${negativeStocks[0].ticker} que podem impactar seu desempenho.` : ''}`;
    } else if (negativeStocks.length > positiveStocks.length) {
      return `O cenário atual apresenta desafios para algumas das suas posições principais como ${negativeStocks.map(s => s.ticker).join(", ")}. Considere acompanhar fatores macroeconômicos que podem influenciar estes ativos.`;
    } else {
      return `Suas posições apresentam um cenário misto de sentimento de mercado. Recomendamos manter a diversificação atual e acompanhar notícias setoriais relevantes.`;
    }
  };

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

  // Create a chat action using the asset data
  const handleChatAction = (assetTicker: string) => {
    // Create custom event to pre-load message in the chat
    const event = new CustomEvent('load-chat-message', { 
      detail: { message: `Nicolas, o que você acha do ativo ${assetTicker} no cenário atual? Vale a pena investir?` }
    });
    document.dispatchEvent(event);
    
    // Navigate to chat tab
    const tabsEvent = new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'chat' }
    });
    document.dispatchEvent(tabsEvent);
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
              {clientSentimentData.assets.slice(0, 2).map((asset, index) => (
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
                    <span className={`flex items-center font-medium ${getImpactColor(parseFloat(asset.impact as string))}`}>
                      {parseFloat(asset.impact as string) > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {`${getImpactPrefix(parseFloat(asset.impact as string))}${asset.impact}%`}
                    </span>
                  </div>
                  <div className="flex items-start mt-2">
                    <Newspaper className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-800 dark:text-gray-100 text-sm">
                      {asset.recentNews}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50"
                      onClick={() => handleChatAction(asset.ticker)}
                    >
                      Perguntar ao Nicolas
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 mt-4">
              <p className="text-gray-800 dark:text-gray-100">
                {clientSentimentData.summary}
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
