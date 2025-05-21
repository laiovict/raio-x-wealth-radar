
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Search, Share2, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useFeatureFlags } from "@/context/FeatureFlagContext";
import { toNumber } from "@/utils/typeConversionHelpers";

// Import modules
import AllocationModule from "./modules/AllocationModule";
import LiquidityReserveModule from "./modules/LiquidityReserveModule";
import SentimentInsightsModule from "./modules/SentimentInsightsModule";
import SocialComparisonModule from "./modules/SocialComparisonModule";
import PdfPreview from "./PdfPreview";
import FinancialOverviewModule from "./modules/FinancialOverviewModule";
import OnePageFinancialPlanModule from "./modules/OnePageFinancialPlanModule";
import ChatInterface from "./ChatInterface";
import BehavioralFinanceModule from "./modules/BehavioralFinanceModule";
import WelcomeBanner from "./WelcomeBanner";
import InteligenciaModule from "./modules/InteligenciaModule";
import DividendModule from "./modules/DividendModule";
import SteveJobsReportModule from "./modules/SteveJobsReportModule";
import LifeGoalsModule from "./modules/LifeGoalsModule";
import FutureProjectionModule from "./modules/FutureProjectionModule";
import InvestmentPlanningModule from "./modules/InvestmentPlanningModule";
import PersonalInsightsModule from "./modules/PersonalInsightsModule";
import WholeBankingModule from "./modules/WholeBankingModule";
import { toast } from "@/hooks/use-toast";
import FeedbackSection from "./FeedbackSection";
import ClientFeedbackSection from "./ClientFeedbackSection";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TypeSafeDataSourceTag from "./common/TypeSafeDataSourceTag";

interface RaioXDashboardProps {
  showPdfPreview?: boolean;
  onClosePdfPreview?: () => void;
  mediaType?: string;
  isClientFull?: boolean;
  onOpenFinanceActivate?: () => void;
  userRole?: "advisor" | "client" | null;
}

const RaioXDashboard = ({ 
  showPdfPreview = false, 
  onClosePdfPreview = () => {}, 
  mediaType = "pdf",
  isClientFull = true,
  onOpenFinanceActivate,
  userRole
}: RaioXDashboardProps) => {
  const { data, hasOpenFinance, selectedClient, hasOpenFinanceData } = useRaioX();
  const [searchQuery, setSearchQuery] = useState("");
  // Set default tab to "raiox-beta"
  const [activeTab, setActiveTab] = useState("raiox-beta");
  const { t } = useLanguage();
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  // State to track if we're showing synthetic data (full version) or just real data (beta)
  const [showSyntheticData, setShowSyntheticData] = useState(false);

  // Get feature flags to control module behavior
  const { flags, enableFlag, disableFlag } = useFeatureFlags();
  
  useEffect(() => {
    // Update the showSyntheticData state based on the active tab
    setShowSyntheticData(activeTab === "versao-full" || activeTab === "steve-jobs" || activeTab === "versao-full-v2");
    
    const handleActivateOpenFinance = () => {
      if (onOpenFinanceActivate) {
        onOpenFinanceActivate();
      }
    };

    const handleTabNavigation = (event: CustomEvent) => {
      if (event.detail?.tabId) {
        setActiveTab(event.detail.tabId);
        // Update synthetic data state when changing tabs
        setShowSyntheticData(
          event.detail.tabId === "versao-full" || 
          event.detail.tabId === "steve-jobs" ||
          event.detail.tabId === "versao-full-v2"
        );
        // Scroll to top when changing tabs
        if (dashboardRef.current) {
          dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('activate-openfinance', handleActivateOpenFinance);
    document.addEventListener('navigate-to-tab', handleTabNavigation as EventListener);

    // Fix scrolling behavior
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.classList.add('overflow-y-auto', 'max-h-screen', 'pb-24');
    }

    return () => {
      document.removeEventListener('activate-openfinance', handleActivateOpenFinance);
      document.removeEventListener('navigate-to-tab', handleTabNavigation as EventListener);
    };
  }, [onOpenFinanceActivate, activeTab, enableFlag, disableFlag]);

  // Handle search query submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Create custom event to pre-load message in the chat
      const chatEvent = new CustomEvent('load-chat-message', { 
        detail: { message: searchQuery }
      });
      
      // Dispatch the event
      document.dispatchEvent(chatEvent);
      
      // Reset the search query
      setSearchQuery("");
      
      toast({
        title: "Pergunta enviada",
        description: "Sua pergunta foi enviada para o assistente."
      });
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Não suportado",
        description: "Seu navegador não suporta reconhecimento de voz.",
        variant: "destructive"
      });
      return;
    }

    // @ts-ignore - WebkitSpeechRecognition não está tipado no TypeScript padrão
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      toast({
        title: "Escutando...",
        description: "Diga o que você gostaria de saber."
      });
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      
      // Create custom event to pre-load message in the chat
      const chatEvent = new CustomEvent('load-chat-message', { 
        detail: { message: speechResult }
      });
      document.dispatchEvent(chatEvent);
      
      toast({
        title: "Comando recebido",
        description: speechResult
      });
    };

    recognition.onerror = (event: any) => {
      toast({
        title: "Erro",
        description: "Ocorreu um erro no reconhecimento de voz.",
        variant: "destructive"
      });
      console.error('Speech recognition error', event.error);
    };

    recognition.start();
  };

  const handleSharePdf = () => {
    // Generate whatsapp share link with pre-filled message
    const message = encodeURIComponent(`Olá, segue o diagnóstico financeiro para sua análise.`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Link de compartilhamento criado",
      description: "O link para WhatsApp foi aberto em uma nova aba."
    });
  };
  
  const handleDownloadPdf = () => {
    toast({
      title: "Relatório sendo gerado",
      description: "Seu relatório completo está sendo preparado para download.",
    });
    
    // Simulating PDF download
    setTimeout(() => {
      toast({
        title: "PDF gerado com sucesso",
        description: "Seu relatório completo está pronto.",
      });
    }, 2000);
  };

  // Function to check if the full tab should be enabled
  const isFullTabEnabled = () => {
    return hasOpenFinance || hasOpenFinanceData;
  };

  if (showPdfPreview) {
    return (
      <PdfPreview 
        onClose={onClosePdfPreview} 
        clientData={data} 
        mediaType={mediaType}
        isClientFull={isClientFull}
        hasOpenFinance={hasOpenFinance}
        onShare={handleSharePdf}
      />
    );
  }

  // Function to handle clicking on the Full Version tab when OpenFinance is not active
  const handleFullTabClick = () => {
    if (!isFullTabEnabled()) {
      // Show toast notification
      toast({
        title: "OpenFinance não ativado",
        description: "Ative o OpenFinance para acessar a versão completa do RaioX.",
      });
      
      // Trigger OpenFinance activation if callback exists
      if (onOpenFinanceActivate) {
        onOpenFinanceActivate();
      }
    }
  };

  return (
    <div className="space-y-8 pb-16 min-h-screen" ref={dashboardRef}>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-full max-w-md relative">
          <form onSubmit={handleSearch}>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')} 
              className="w-full backdrop-blur-md border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button 
                type="button"
                className="text-gray-400 hover:text-white"
                onClick={handleVoiceSearch}
              >
                <Mic className="h-5 w-5" />
              </button>
              <button 
                type="submit"
                className="text-gray-400 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-white/10 bg-white/5 hover:bg-white/10"
            onClick={handleDownloadPdf}
          >
            <Download className="h-5 w-5" /> Baixar Relatório Completo
          </Button>
        </div>
      </div>

      <WelcomeBanner selectedClient={selectedClient ? toNumber(selectedClient) : null} />
      
      {/* Moved InteligenciaModule to the top for greater prominence */}
      <InteligenciaModule fullWidth />
      <FeedbackSection sectionId="top-inteligencia" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 rounded-lg overflow-x-auto grid grid-cols-4 scrollbar-none bg-white/5 backdrop-blur-md border border-white/10">
          <TabsTrigger value="raiox-beta" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
            RaioX Beta
          </TabsTrigger>
          <TabsTrigger 
            value="versao-full" 
            className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white ${!isFullTabEnabled() ? 'opacity-50' : ''}`}
            onClick={handleFullTabClick}
            disabled={!isFullTabEnabled()}
          >
            Versão Full
          </TabsTrigger>
          {/* Added "Versão full v2" tab */}
          <TabsTrigger 
            value="versao-full-v2" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6680FF] data-[state=active]:to-[#3040CC] data-[state=active]:text-white"
          >
            Versão full v2
          </TabsTrigger>
          {/* Steve Jobs tab */}
          <TabsTrigger 
            value="steve-jobs" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6680FF] data-[state=active]:to-black data-[state=active]:text-white"
          >
            Por Steve Jobs
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: RaioX Beta - Only showing components with real data */}
        <TabsContent value="raiox-beta" className="space-y-8">
          <div>
            {/* Financial Overview with useSyntheticData={false} */}
            <FinancialOverviewModule useSyntheticData={false} />
            <FeedbackSection sectionId="beta-financial-overview" />
          </div>
          
          {/* Add dividend module - real data only */}
          <div>
            <DividendModule fullWidth />
            <FeedbackSection sectionId="beta-dividends" />
          </div>
          
          {/* Allocation module - real data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AllocationModule useSyntheticData={false} />
              <FeedbackSection sectionId="beta-allocation" />
            </div>
            <div>
              <LiquidityReserveModule useSyntheticData={false} />
              <FeedbackSection sectionId="beta-liquidity" />
            </div>
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - RaioX Beta</p>
          </div>
        </TabsContent>
        
        {/* Tab 2: Versão Full - Full version with all features */}
        <TabsContent value="versao-full" className="space-y-8">
          {/* Only show OpenFinance CTA when Full is being viewed but not enabled */}
          {!isFullTabEnabled() ? (
            <div className="p-6 border border-blue-500/20 rounded-lg bg-blue-900/10 text-center">
              <h3 className="text-xl font-medium text-white mb-3">Versão completa indisponível</h3>
              <p className="text-gray-300 mb-4">
                Para acessar a versão completa do RaioX com insights mais profundos e uma visão 360° das suas finanças,
                é necessário ativar o OpenFinance.
              </p>
              <Button 
                variant="purpleGradient"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
                onClick={onOpenFinanceActivate}
              >
                Ativar OpenFinance
              </Button>
            </div>
          ) : (
            <>
              {/* Starting with Financial Overview with synthetic data explicitly enabled */}
              <div>
                <FinancialOverviewModule useSyntheticData={flags.synthetic_data} />
                <FeedbackSection sectionId="full-financial-overview" />
              </div>
              
              {/* The rest of the full content, always with synthetic data */}
              <div>
                <OnePageFinancialPlanModule useSyntheticData={flags.synthetic_data} />
                <FeedbackSection sectionId="full-financial-plan" />
              </div>
              
              <div>
                <DividendModule fullWidth useSyntheticData={flags.synthetic_data} />
                <FeedbackSection sectionId="full-dividends" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <AllocationModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-allocation" />
                </div>
                <div>
                  <LiquidityReserveModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-liquidity" />
                </div>
              </div>

              {/* Adding the WholeBankingModule back to the full version */}
              <div>
                <WholeBankingModule fullWidth useSyntheticData={flags.synthetic_data} />
                <FeedbackSection sectionId="full-whole-banking" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <BehavioralFinanceModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-behavioral-finance" />
                </div>
                <div>
                  <SentimentInsightsModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-sentiment" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <FutureProjectionModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-future-projection" />
                </div>
                <div>
                  <InvestmentPlanningModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-investment-planning" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <SocialComparisonModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-social-comparison" />
                </div>
                <div>
                  <PersonalInsightsModule useSyntheticData={flags.synthetic_data} />
                  <FeedbackSection sectionId="full-personal-insights" />
                </div>
              </div>
              
              <div>
                <LifeGoalsModule useSyntheticData={flags.synthetic_data} />
                <FeedbackSection sectionId="full-life-goals" />
              </div>
              
              {/* Add the feedback section at the end of the full version tab */}
              <div>
                <ClientFeedbackSection isAdvisorView={userRole === "advisor"} />
              </div>
              
              {/* Footer for this tab */}
              <div className="w-full py-10 text-center border-t border-white/10 mt-12">
                <p className="text-gray-400">Fim da seção - Versão Full</p>
              </div>
            </>
          )}
        </TabsContent>

        {/* New Tab: Versão full v2 - Jony Ive inspired design */}
        <TabsContent value="versao-full-v2" className="space-y-8">
          {/* Header with version badge */}
          <div className="relative">
            <div className="absolute right-0 top-0">
              <Badge variant="outline" className="bg-gradient-to-r from-[#6680FF]/20 to-[#3040CC]/20 text-[#6680FF] border-[#6680FF]/30 px-3 py-1">
                <span className="font-medium">Blueprint v2</span>
              </Badge>
            </div>
            <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 rounded-lg border border-[#6680FF]/20 p-6 text-center">
              <h2 className="text-2xl font-light text-white mb-3 tracking-wide">Seu Plano Financeiro</h2>
              <p className="text-[#6680FF]/90 text-sm mb-4 max-w-xl mx-auto">
                Criado especialmente para você, este plano integra diagnóstico, planejamento e projeção para seu futuro financeiro.
              </p>
              <div className="inline-flex items-center bg-gradient-to-r from-[#6680FF]/20 to-[#3040CC]/20 rounded-full px-3 py-1.5">
                <TypeSafeDataSourceTag source={hasOpenFinance ? 'openfinance' : 'synthetic'} showLabel className="mr-2" />
                <span className="text-xs text-white/70">Atualizado: {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Financial Overview - Redesigned with Jony Ive aesthetic */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
              <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                <h2 className="text-xl font-light tracking-wide text-white mb-2">Visão Geral Financeira</h2>
                <p className="text-gray-400 text-sm">Uma visão holística e simples da sua situação financeira atual</p>
              </div>
              <div className="p-1">
                <FinancialOverviewModule useSyntheticData={true} />
              </div>
            </div>
            <FeedbackSection sectionId="fullv2-financial-overview" />
          </div>
          
          {/* One Page Financial Plan */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
              <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                <h2 className="text-xl font-light tracking-wide text-white mb-2">Seu Blueprint Financeiro</h2>
                <p className="text-gray-400 text-sm">Um plano completo para construir seu futuro financeiro</p>
              </div>
              <div className="p-1">
                <OnePageFinancialPlanModule useSyntheticData={true} />
              </div>
            </div>
            <FeedbackSection sectionId="fullv2-financial-plan" />
          </div>

          {/* Whole Banking Section */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
              <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                <h2 className="text-xl font-light tracking-wide text-white mb-2">Visão Integral Bancária</h2>
                <p className="text-gray-400 text-sm">Uma visão completa dos seus produtos e serviços financeiros</p>
              </div>
              <div className="p-1">
                <WholeBankingModule fullWidth useSyntheticData={true} />
              </div>
            </div>
            <FeedbackSection sectionId="fullv2-whole-banking" />
          </div>
          
          {/* Two-column layout for allocation and liquidity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Alocação de Ativos</h2>
                  <p className="text-gray-400 text-sm">Distribuição estratégica dos seus investimentos</p>
                </div>
                <div className="p-1">
                  <AllocationModule useSyntheticData={true} />
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Reserva de Liquidez</h2>
                  <p className="text-gray-400 text-sm">Sua segurança financeira para imprevistos</p>
                </div>
                <div className="p-1">
                  <LiquidityReserveModule useSyntheticData={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Dividends */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
              <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                <h2 className="text-xl font-light tracking-wide text-white mb-2">Fluxo de Dividendos</h2>
                <p className="text-gray-400 text-sm">Análise da sua renda passiva através de dividendos</p>
              </div>
              <div className="p-1">
                <DividendModule fullWidth useSyntheticData={true} />
              </div>
            </div>
            <FeedbackSection sectionId="fullv2-dividends" />
          </div>

          {/* Two-column layout for behavioral and sentiment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Finanças Comportamentais</h2>
                  <p className="text-gray-400 text-sm">Como seus comportamentos afetam suas decisões financeiras</p>
                </div>
                <div className="p-1">
                  <BehavioralFinanceModule useSyntheticData={true} />
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Análise de Sentimento</h2>
                  <p className="text-gray-400 text-sm">Como o mercado está reagindo aos seus investimentos</p>
                </div>
                <div className="p-1">
                  <SentimentInsightsModule useSyntheticData={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Two-column layout for future projection and investment planning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Projeção Futura</h2>
                  <p className="text-gray-400 text-sm">Como seu patrimônio pode evoluir ao longo do tempo</p>
                </div>
                <div className="p-1">
                  <FutureProjectionModule useSyntheticData={true} />
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Planejamento de Investimentos</h2>
                  <p className="text-gray-400 text-sm">Estratégias para otimizar seus investimentos</p>
                </div>
                <div className="p-1">
                  <InvestmentPlanningModule useSyntheticData={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Two-column layout for social comparison and personal insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">Comparação Social</h2>
                  <p className="text-gray-400 text-sm">Como sua situação financeira se compara com seus pares</p>
                </div>
                <div className="p-1">
                  <SocialComparisonModule useSyntheticData={true} />
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-xl h-full overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
                <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                  <h2 className="text-xl font-light tracking-wide text-white mb-2">O Que Sabemos Sobre Você</h2>
                  <p className="text-gray-400 text-sm">Perfil personalizado baseado em suas informações</p>
                </div>
                <div className="p-1">
                  <PersonalInsightsModule useSyntheticData={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Life Goals */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#6680FF]/20 shadow-lg shadow-[#6680FF]/5">
              <div className="bg-gradient-to-r from-[#6680FF]/10 to-[#3040CC]/5 p-5">
                <h2 className="text-xl font-light tracking-wide text-white mb-2">Objetivos de Vida</h2>
                <p className="text-gray-400 text-sm">Acompanhe seus objetivos financeiros e de vida</p>
              </div>
              <div className="p-1">
                <LifeGoalsModule useSyntheticData={true} />
              </div>
            </div>
            <FeedbackSection sectionId="fullv2-life-goals" />
          </div>

          {/* Add the feedback section at the end of the v2 version tab */}
          <div>
            <ClientFeedbackSection isAdvisorView={userRole === "advisor"} />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-[#6680FF]/20 mt-12">
            <p className="text-[#6680FF]/70">Fim da seção - Versão Full v2</p>
          </div>
        </TabsContent>
        
        {/* Tab 3: Steve Jobs - The reimagined financial diagnostic */}
        <TabsContent value="steve-jobs" className="space-y-8">
          <SteveJobsReportModule fullWidth />
          <FeedbackSection sectionId="steve-jobs-report" />
          
          {/* Steve Jobs Implementation of the RaioX based on the mandate */}
          <div className="space-y-8">
            <FinancialOverviewModule useSyntheticData={true} />
            <FeedbackSection sectionId="steve-jobs-financial-overview" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <LiquidityReserveModule useSyntheticData={true} />
                <FeedbackSection sectionId="steve-jobs-liquidity" />
              </div>
              <div>
                <AllocationModule useSyntheticData={true} />
                <FeedbackSection sectionId="steve-jobs-allocation" />
              </div>
            </div>
            
            <DividendModule fullWidth useSyntheticData={true} />
            <FeedbackSection sectionId="steve-jobs-dividends" />
            
            <BehavioralFinanceModule useSyntheticData={true} />
            <FeedbackSection sectionId="steve-jobs-behavioral" />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-[#6680FF]/40 mt-12">
            <p className="text-gray-400">Fim da seção - Por Steve Jobs</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
