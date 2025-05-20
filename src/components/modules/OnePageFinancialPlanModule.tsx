import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Clock, ChevronDown, ChevronUp, ArrowRight, ChevronRight, Shield, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";

interface OnePageFinancialPlanModuleProps {
  fullWidth?: boolean;
}

// Component definitions for icons
const Target = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const FileClock = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 2v4a2 2 0 0 0 2 2h4" />
    <path d="M22 5.5V22a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12.5z" />
    <circle cx="12" cy="14" r="4" />
    <path d="M12 12v2l1.5 1" />
  </svg>
);

const Users = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const OnePageFinancialPlanModule = ({ fullWidth = false }: OnePageFinancialPlanModuleProps) => {
  const { hasOpenFinance, isAIAnalysisLoading, refreshAIAnalysis, portfolioSummary, profitability } = useRaioX();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "cashFlow": true,
    "investments": false,
    "goals": false,
    "protection": false,
    "taxes": false,
    "estate": false
  });

  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate investment data from real Supabase data
  const investmentData = useMemo(() => {
    // Default values if no portfolio summary is available
    let totalValue = 325000;
    let fixedIncomeValue = 211250;
    let fixedIncomePercentage = 65;
    let stocksValue = 81250;
    let stocksPercentage = 25;
    let alternativesValue = 32500;
    let alternativesPercentage = 10;
    let ytdReturn = 7.8;
    let benchmarkReturn = 8.5;

    // If we have real data from Supabase, use it
    if (portfolioSummary) {
      totalValue = parseFloat(portfolioSummary.total_portfolio_value || "0");
      
      // Fixed Income values
      fixedIncomeValue = portfolioSummary.fixed_income_value || 0;
      fixedIncomePercentage = portfolioSummary.fixed_income_representation || 0;
      
      // Stocks values - handling string values from API
      stocksValue = parseFloat(portfolioSummary.stocks_value || "0");
      stocksPercentage = parseFloat(portfolioSummary.stocks_representation || "0");
      
      // Alternatives - sum of investment funds, real estate and international investments
      const investmentFundValue = portfolioSummary.investment_fund_value || 0;
      const realEstateValue = portfolioSummary.real_estate_value || 0;
      const internationalValue = parseFloat(portfolioSummary.investment_international_value || "0");
      
      alternativesValue = investmentFundValue + realEstateValue + internationalValue;
      alternativesPercentage = portfolioSummary.investment_fund_representation + 
                              portfolioSummary.real_estate_representation +
                              parseFloat(portfolioSummary.investment_international_representation || "0");
    }

    // If we have profitability data, use it
    if (profitability) {
      ytdReturn = profitability.ytd || 7.8;
      // Benchmark is often not provided in the data, so we'll keep the default
    }

    return {
      totalValue,
      fixedIncomeValue,
      fixedIncomePercentage,
      stocksValue,
      stocksPercentage,
      alternativesValue,
      alternativesPercentage,
      ytdReturn,
      benchmarkReturn
    };
  }, [portfolioSummary, profitability]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Plano Financeiro (One-Page)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Plano Financeiro Indisponível</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Para acessar seu plano financeiro personalizado, é necessário ativar o OpenFinance para permitir a análise completa de seus dados financeiros.
            </p>
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
              onClick={handleActivateOpenFinance}
            >
              Ativar OpenFinance
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAIAnalysisLoading) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Plano Financeiro (One-Page)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Gerando plano financeiro personalizado...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Data for the financial plan
  const financialPlan = {
    lastUpdated: "2023-05-15T10:30:00Z",
    sections: [
      {
        id: "cashFlow",
        title: "Fluxo de Caixa",
        icon: <Clock className="h-5 w-5 text-green-500" />,
        summary: "Renda mensal líquida de R$ 12.500 com despesas fixas de R$ 8.750 (70% da renda).",
        details: [
          { label: "Receita total", value: "R$ 15.000/mês" },
          { label: "Impostos", value: "R$ 2.500 (16,7%)" },
          { label: "Despesas fixas", value: "R$ 8.750 (70% da receita líquida)" },
          { label: "Despesas variáveis", value: "R$ 2.500 (20% da receita líquida)" },
          { label: "Poupança atual", value: "R$ 1.250 (10% da receita líquida)" }
        ],
        actions: [
          { text: "Aumentar taxa de poupança para 20%" },
          { text: "Reduzir gastos com streaming em 30%" },
          { text: "Revisar plano de telefonia" }
        ]
      },
      {
        id: "investments",
        title: "Investimentos",
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
        summary: `Carteira atual de ${formatCurrency(investmentData.totalValue)} com concentração em renda fixa (${investmentData.fixedIncomePercentage}%).`,
        details: [
          { label: "Valor total investido", value: formatCurrency(investmentData.totalValue) },
          { label: "Renda fixa", value: `${formatCurrency(investmentData.fixedIncomeValue)} (${investmentData.fixedIncomePercentage}%)` },
          { label: "Renda variável", value: `${formatCurrency(investmentData.stocksValue)} (${investmentData.stocksPercentage}%)` },
          { label: "Alternativos", value: `${formatCurrency(investmentData.alternativesValue)} (${Math.round(investmentData.alternativesPercentage)}%)` },
          { label: "Rentabilidade YTD", value: `${investmentData.ytdReturn.toFixed(1)}% (vs. benchmark ${investmentData.benchmarkReturn}%)` }
        ],
        actions: [
          { text: "Rebalancear carteira para 50/35/15" },
          { text: "Diversificar exposição internacional" },
          { text: "Avaliar fundos de dividendos" }
        ]
      },
      {
        id: "goals",
        title: "Objetivos Financeiros",
        icon: <Target className="h-5 w-5 text-purple-500" />,
        summary: "3 objetivos principais definidos, com gap de 35% no financeiro para aposentadoria.",
        details: [
          { 
            label: "Aposentadoria", 
            value: "Meta: R$ 4,5M (2043) / Atual: R$ 250.000", 
            progress: 35
          },
          { 
            label: "Educação filhos", 
            value: "Meta: R$ 500.000 (2030) / Atual: R$ 125.000", 
            progress: 60 
          },
          { 
            label: "Imóvel de veraneio", 
            value: "Meta: R$ 800.000 (2027) / Atual: R$ 200.000", 
            progress: 45
          }
        ],
        actions: [
          { text: "Aumentar aportes para aposentadoria em R$ 1.500/mês" },
          { text: "Revisar estratégia para objetivo de curto prazo" }
        ]
      },
      {
        id: "protection",
        title: "Proteção Patrimonial",
        icon: <Shield className="h-5 w-5 text-red-500" />,
        summary: "Cobertura básica de seguros, com gaps em seguro de vida e previdência.",
        details: [
          { label: "Seguro de vida", value: "R$ 500.000 (recomendado: R$ 1,2M)" },
          { label: "Seguro saúde", value: "Plano empresarial completo" },
          { label: "Seguro patrimonial", value: "Residência segurada (80% do valor)" },
          { label: "Previdência privada", value: "Não possui" }
        ],
        actions: [
          { text: "Contratar seguro de vida complementar" },
          { text: "Avaliar PGBL/VGBL com benefício fiscal" },
          { text: "Revisar coberturas do seguro residencial" }
        ]
      },
      {
        id: "taxes",
        title: "Planejamento Tributário",
        icon: <FileClock className="h-5 w-5 text-amber-500" />,
        summary: "Potencial economia de R$ 9.500/ano com otimizações tributárias.",
        details: [
          { label: "IR pessoa física", value: "Alíquota efetiva: 15,5%" },
          { label: "Declaração completa", value: "Sim (mais vantajosa)" },
          { label: "Despesas dedutíveis", value: "R$ 28.000/ano" },
          { label: "Ganhos isentos", value: "R$ 35.000/ano" }
        ],
        actions: [
          { text: "Avaliar uso de holding familiar" },
          { text: "Otimizar declaração com despesas médicas" },
          { text: "Revisar estratégia de previdência privada" }
        ]
      },
      {
        id: "estate",
        title: "Planejamento Sucessório",
        icon: <Users className="h-5 w-5 text-indigo-500" />,
        summary: "Sem planejamento sucessório formal estabelecido.",
        details: [
          { label: "Testamento", value: "Não possui" },
          { label: "Holding familiar", value: "Não possui" },
          { label: "Doação em vida", value: "Não realizada" },
          { label: "Seguro vida com beneficiários", value: "Parcial (R$ 500.000)" }
        ],
        actions: [
          { text: "Elaborar testamento" },
          { text: "Consultar sobre planejamento sucessório" },
          { text: "Revisar beneficiários do seguro" }
        ]
      }
    ]
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Plano Financeiro (One-Page)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
        <p className="text-xs text-gray-400">
          Última atualização: {formatDate(financialPlan.lastUpdated)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {financialPlan.sections.map((section) => (
            <div 
              key={section.id}
              className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
            >
              <button 
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <span className="font-medium text-white">{section.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-3">{section.summary}</span>
                  {expandedSections[section.id] ? 
                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-4 pb-4">
                  <div className="bg-white/5 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Detalhes</h4>
                    <ul className="space-y-2">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-400">{detail.label}</span>
                          <span className="text-white font-medium">{detail.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Ações Recomendadas</h4>
                    <ul className="space-y-2">
                      {section.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 flex items-center"
                            onClick={() => console.log(`Action clicked: ${action.text}`)}
                          >
                            <ChevronRight className="h-4 w-4 mr-1" />
                            <span className="text-sm">{action.text}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            onClick={() => console.log("Download full financial plan")}
          >
            Ver Plano Financeiro Completo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnePageFinancialPlanModule;
