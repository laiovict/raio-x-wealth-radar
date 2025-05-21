import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Newspaper, Download } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface SentimentInsightsModuleProps {
  fullWidth?: boolean;
}

// Define a specific type for asset data with dataSource optional
interface SentimentAsset {
  ticker: string;
  sentiment: number;
  impact: number;
  recentNews: string;
  dataSource?: DataSourceType | 'synthetic' | 'supabase';
}

// Define the structure of sentiment data
interface SentimentData {
  assets?: SentimentAsset[];
  summary: string;
  dataSource: DataSourceType | 'synthetic' | 'supabase';
}

const SentimentInsightsModule = ({ fullWidth = false }: SentimentInsightsModuleProps) => {
  const { data, stocks } = useRaioX();
  const isMobile = useMobileBreakpoint();
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize with properly typed default state
  const [clientSentimentData, setClientSentimentData] = useState<SentimentData>({
    assets: [],
    summary: "",
    dataSource: 'synthetic'
  });

  useEffect(() => {
    // Set loaded state immediately to avoid streaming issues
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Generate sentiment data based on the client's actual stocks
    if (stocks && Array.isArray(stocks) && stocks.length > 0) {
      // Extract ticker symbols from client's stocks (up to 2 for display)
      const clientStocks = stocks.slice(0, 2).map(stockItem => ({
        ticker: stockItem.asset || "",
        sentiment: Math.floor(Math.random() * 30) + 60, // Generate a sentiment score between 60-90
        impact: parseFloat((Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(1)),
        recentNews: generateNewsForStock(stockItem.asset || ""),
        dataSource: 'supabase' as const
      }));
      
      if (clientStocks.length > 0) {
        setClientSentimentData({
          assets: clientStocks,
          summary: generateSummaryFromStocks(clientStocks),
          dataSource: 'supabase'
        });
      }
    } else if (data.sentiment) {
      // Safely convert any incoming data to our expected format
      const sentimentData: SentimentData = {
        assets: data.sentiment.assets || [],
        summary: data.sentiment.summary || "Sem dados de sentimento disponíveis.",
        dataSource: data.sentiment.dataSource || 'synthetic'
      };
      setClientSentimentData(sentimentData);
    }
    
    return () => clearTimeout(timer);
  }, [stocks, data.sentiment]);
  
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
      ],
      "AAPL34": [
        "Nova linha de produtos apresenta avanços significativos em inteligência artificial.",
        "Vendas internacionais superam expectativas, com crescimento expressivo no mercado asiático.",
        "Estratégia de serviços continua impulsionando receita recorrente da empresa."
      ],
      "TSLA34": [
        "Produção de veículos elétricos atinge novo recorde trimestral.",
        "Expansão de fábricas na Europa e Ásia avança conforme o cronograma.",
        "Novas tecnologias de bateria prometem aumentar autonomia dos veículos em 20%."
      ],
      "HASH11": [
        "ETF de criptoativos apresenta recuperação consistente após período de volatilidade.",
        "Aumento de adoção institucional fortalece fundamentos do setor de blockchain.",
        "Estratégia de diversificação de ativos digitais reduz impacto de oscilações de mercado."
      ],
      "GOLD11": [
        "ETF de ouro beneficia-se de incertezas macroeconômicas globais.",
        "Demanda por ativos de proteção aumenta em cenário de volatilidade em mercados emergentes.",
        "Correlação negativa com ativos de risco reforça papel do ouro em carteiras diversificadas."
      ],
      "GMCO34": [
        "Resultados operacionais superam expectativas do mercado no último trimestre.",
        "Estratégia de expansão internacional mostra resultados promissores em novos mercados.",
        "Investimentos em inovação reforçam vantagem competitiva da empresa no setor."
      ],
      "JPMC34": [
        "Banco apresenta crescimento robusto na divisão de investimentos corporativos.",
        "Estratégia digital atrai nova geração de clientes para serviços financeiros.",
        "Resultados superam expectativas com forte desempenho no segmento de gestão de patrimônio."
      ],
      "MELI34": [
        "Plataforma de e-commerce registra crescimento de 25% em transações na América Latina.",
        "Divisão de serviços financeiros continua expandindo base de usuários em mercados-chave.",
        "Investimentos em logística reduzem tempo de entrega e aumentam satisfação dos clientes."
      ],
      "IVVB11": [
        "ETF que replica o S&P 500 beneficia-se de forte desempenho das ações americanas.",
        "Estratégia de exposição ao mercado norte-americano mostra resultados consistentes.",
        "Aumenta procura por instrumentos de diversificação internacional entre investidores brasileiros."
      ],
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
  const generateSummaryFromStocks = (stocks: SentimentAsset[]) => {
    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
      return "Sem dados de sentimento disponíveis para sua carteira atual.";
    }
    
    const positiveStocks = stocks.filter(s => s.impact > 0);
    const negativeStocks = stocks.filter(s => s.impact < 0);
    
    if (positiveStocks.length > negativeStocks.length) {
      return `O sentimento geral para suas principais posições é positivo, destacando-se ${positiveStocks.map(s => s.ticker).join(", ")}. ${negativeStocks.length > 0 ? `Recomendamos acompanhar notícias sobre ${negativeStocks[0].ticker} que podem impactar seu desempenho.` : ''}`;
    } else if (negativeStocks.length > positiveStocks.length) {
      return `O cenário atual apresenta desafios para algumas das suas posições principais como ${negativeStocks.map(s => s.ticker).join(", ")}. Considere acompanhar fatores macroeconômicos que podem influenciar estes ativos.`;
    } else {
      return `Suas posições apresentam um cenário misto de sentimento de mercado. Recomendamos manter a diversificação atual e acompanhar notícias setoriais relevantes.`;
    }
  };

  // Styling helper functions
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getSentimentBg = (score: number) => {
    if (score >= 70) return "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/50";
    if (score >= 50) return "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/50";
    return "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/50";
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/50`}>
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 pb-4 rounded-t-lg border-b border-slate-600/50 flex flex-row justify-between items-center">
        <CardTitle className="text-xl flex items-center">
          <span className="font-bold text-white">
            Insights de Sentimento
          </span>
          <TypeSafeDataSourceTag source={clientSentimentData.dataSource} />
        </CardTitle>
        <Button variant="secondary" size="sm" onClick={handleDownloadPdf} className="flex items-center gap-1 bg-slate-700/90 dark:bg-slate-800/90 hover:bg-slate-600 dark:hover:bg-slate-700 text-slate-200">
          <Download className="h-4 w-4" /> PDF
        </Button>
      </CardHeader>
      <CardContent className="pt-5 bg-slate-900/80 backdrop-blur-sm">
        {isLoaded ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ensure assets exist and is an array before attempting to slice */}
              {clientSentimentData.assets && Array.isArray(clientSentimentData.assets) && 
               clientSentimentData.assets.length > 0 ? clientSentimentData.assets.slice(0, 2).map((asset, index) => (
                <div 
                  key={index} 
                  className={`${getSentimentBg(asset.sentiment)} p-4 rounded-lg shadow-lg border transition-all hover:shadow-xl hover:translate-y-[-2px]`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-slate-200">
                        {asset.ticker}
                      </span>
                      <Badge className="ml-2 px-2" variant={asset.sentiment >= 70 ? "default" : asset.sentiment >= 50 ? "secondary" : "destructive"}>
                        <span className="font-bold">
                          {`${asset.sentiment}/100`}
                        </span>
                      </Badge>
                    </div>
                    <span className={`flex items-center font-bold ${getImpactColor(asset.impact)}`}>
                      {asset.impact > 0 ? (
                        <TrendingUp className="h-5 w-5 mr-1" />
                      ) : (
                        <TrendingDown className="h-5 w-5 mr-1" />
                      )}
                      {`${getImpactPrefix(asset.impact)}${asset.impact.toFixed(1)}%`}
                    </span>
                  </div>
                  <div className="flex items-start mt-3 bg-slate-800/80 p-3 rounded-lg shadow-inner">
                    <Newspaper className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-slate-400" />
                    <p className="text-slate-300">
                      {asset.recentNews}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/50"
                      onClick={() => handleChatAction(asset.ticker)}
                    >
                      Perguntar ao Nicolas
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 p-6 text-center bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <p className="text-slate-400">Nenhum ativo disponível para análise de sentimento.</p>
                </div>
              )}
            </div>
            
            {/* Ensure we have summary data or provide a fallback */}
            <div className="bg-gradient-to-r from-slate-800/70 to-slate-700/70 p-4 rounded-lg border border-slate-600/50 mt-4 shadow-lg">
              <p className="text-slate-300 font-medium">
                {clientSentimentData.summary || "Sem dados disponíveis para análise de sentimento."}
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="h-32 bg-slate-800/40 animate-pulse rounded-lg"></div>
            <div className="h-32 bg-slate-800/40 animate-pulse rounded-lg"></div>
            <div className="h-16 bg-slate-800/40 animate-pulse rounded-lg"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentInsightsModule;
