
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Search, Share2, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useFeatureFlags } from "@/context/FeatureFlagContext";

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
import { toast } from "@/hooks/use-toast";
import FeedbackSection from "./FeedbackSection";
import ClientFeedbackSection from "./ClientFeedbackSection";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const { data, hasOpenFinance, selectedClient } = useRaioX();
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
    setShowSyntheticData(activeTab === "versao-full" || activeTab === "steve-jobs");
    
    const handleActivateOpenFinance = () => {
      if (onOpenFinanceActivate) {
        onOpenFinanceActivate();
      }
    };

    const handleTabNavigation = (event: CustomEvent) => {
      if (event.detail?.tabId) {
        setActiveTab(event.detail.tabId);
        // Update synthetic data state when changing tabs
        setShowSyntheticData(event.detail.tabId === "versao-full" || event.detail.tabId === "steve-jobs");
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

      <WelcomeBanner selectedClient={selectedClient} />
      
      {/* Moved InteligenciaModule to the top for greater prominence */}
      <InteligenciaModule fullWidth />
      <FeedbackSection sectionId="top-inteligencia" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 rounded-lg overflow-x-auto grid grid-cols-3 scrollbar-none bg-white/5 backdrop-blur-md border border-white/10">
          <TabsTrigger value="raiox-beta" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
            RaioX Beta
          </TabsTrigger>
          <TabsTrigger value="versao-full" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
            Versão Full
          </TabsTrigger>
          {/* Added "Por Steve Jobs" tab with special styling */}
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
        </TabsContent>
        
        {/* Tab 3: Steve Jobs - The reimagined financial diagnostic */}
        <TabsContent value="steve-jobs" className="space-y-8">
          <SteveJobsReportModule fullWidth />
          <FeedbackSection sectionId="steve-jobs-report" />
          
          {/* Steve Jobs Implementation of the RaioX based on the mandate */}
          <div className="space-y-8">
            <FinancialOverviewModule useSyntheticData={true} steveJobsMode={true} />
            <FeedbackSection sectionId="steve-jobs-financial-overview" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <LiquidityReserveModule useSyntheticData={true} steveJobsMode={true} />
                <FeedbackSection sectionId="steve-jobs-liquidity" />
              </div>
              <div>
                <AllocationModule useSyntheticData={true} steveJobsMode={true} />
                <FeedbackSection sectionId="steve-jobs-allocation" />
              </div>
            </div>
            
            <DividendModule fullWidth useSyntheticData={true} steveJobsMode={true} />
            <FeedbackSection sectionId="steve-jobs-dividends" />
            
            <BehavioralFinanceModule useSyntheticData={true} steveJobsMode={true} />
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
