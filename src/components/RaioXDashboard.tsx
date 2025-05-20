import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Search, Share2, Download } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

import AllocationModule from "./modules/AllocationModule";
import FutureProjectionModule from "./modules/FutureProjectionModule";
import LiquidityReserveModule from "./modules/LiquidityReserveModule";
import LifeGoalsModule from "./modules/LifeGoalsModule";
import WrappedModule from "./modules/WrappedModule";
import SocialComparisonModule from "./modules/SocialComparisonModule";
import SentimentInsightsModule from "./modules/SentimentInsightsModule";
import PersonalInsightsModule from "./modules/PersonalInsightsModule";
import PdfPreview from "./PdfPreview";
import FinancialOverviewModule from "./modules/FinancialOverviewModule";
import MeuFuturoFinanceiroModule from "./modules/MeuFuturoFinanceiroModule";
import InvestmentPlanningModule from "./modules/InvestmentPlanningModule";
import OnePageFinancialPlanModule from "./modules/OnePageFinancialPlanModule";
import WholeBankingModule from "./modules/WholeBankingModule";
import ChatInterface from "./ChatInterface";
import BehavioralFinanceModule from "./modules/BehavioralFinanceModule";
import FamousInvestorsModule from "./modules/FamousInvestorsModule";
import WelcomeBanner from "./WelcomeBanner";
import InteligenciaModule from "./modules/InteligenciaModule";
import DividendModule from "./modules/DividendModule";
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
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleActivateOpenFinance = () => {
      if (onOpenFinanceActivate) {
        onOpenFinanceActivate();
      }
    };

    const handleTabNavigation = (event: CustomEvent) => {
      if (event.detail?.tabId) {
        setActiveTab(event.detail.tabId);
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
  }, [onOpenFinanceActivate]);

  const handleQuickNavClick = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to top when changing tabs
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract the first name from data.clientName
  const getClientFirstName = () => {
    if (!data.clientName) return "";
    // Split by space and take the first part as the first name
    return data.clientName.split(" ")[0];
  };

  // Handle search query submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Navigate to chat tab
      setActiveTab("chat");
      
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
      setActiveTab("chat");
      
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
        <TabsList className="mb-8 rounded-lg overflow-x-auto grid grid-cols-6 scrollbar-none bg-white/5 backdrop-blur-md border border-white/10">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="status" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('statusTab')}</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('planTab')}</TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('aiTab')}</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('futureTab')}</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('chatTab')}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visão Geral - Optimized ordering for better UX */}
        <TabsContent value="overview" className="space-y-8">
          {/* Starting with Financial Overview */}
          <div>
            <FinancialOverviewModule />
            <FeedbackSection sectionId="financial-overview" />
          </div>
          
          {/* Followed by One Page Financial Plan - Always show regardless of OpenFinance */}
          <div>
            <OnePageFinancialPlanModule />
            <FeedbackSection sectionId="financial-plan" />
          </div>
          
          {/* Add dividend module here */}
          <div>
            <DividendModule fullWidth />
            <FeedbackSection sectionId="dividends" />
          </div>
          
          {/* Then Life Goals */}
          <div>
            <LifeGoalsModule />
            <FeedbackSection sectionId="life-goals" />
          </div>
          
          {/* Moving these modules to the middle as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <MeuFuturoFinanceiroModule />
              <FeedbackSection sectionId="meu-futuro" />
            </div>
            <div>
              <WholeBankingModule />
              <FeedbackSection sectionId="whole-banking" />
            </div>
          </div>
          
          <div>
            <FamousInvestorsModule fullWidth />
            <FeedbackSection sectionId="famous-investors" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AllocationModule />
              <FeedbackSection sectionId="allocation" />
            </div>
            <div>
              <LiquidityReserveModule />
              <FeedbackSection sectionId="liquidity" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SentimentInsightsModule />
              <FeedbackSection sectionId="sentiment" />
            </div>
            <div>
              <PersonalInsightsModule />
              <FeedbackSection sectionId="personal-insights" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FutureProjectionModule />
              <FeedbackSection sectionId="future-projection" />
            </div>
            <div>
              <InvestmentPlanningModule />
              <FeedbackSection sectionId="investment-planning" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SocialComparisonModule />
              <FeedbackSection sectionId="social-comparison" />
            </div>
            <div>
              <BehavioralFinanceModule />
              <FeedbackSection sectionId="behavioral-finance" />
            </div>
          </div>
          
          <div>
            <WrappedModule fullWidth />
            <FeedbackSection sectionId="wrapped" />
          </div>
          
          {/* Add the feedback section at the end of the overview tab */}
          <div>
            <ClientFeedbackSection isAdvisorView={userRole === "advisor"} />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - Visão Geral</p>
          </div>
        </TabsContent>
        
        {/* Tab 2: Como Estou? - Status overview */}
        <TabsContent value="status" className="space-y-8">
          <div>
            <FinancialOverviewModule fullWidth />
            <FeedbackSection sectionId="status-financial-overview" />
          </div>
          
          <div>
            <DividendModule fullWidth />
            <FeedbackSection sectionId="status-dividends" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AllocationModule />
              <FeedbackSection sectionId="status-allocation" />
            </div>
            <div>
              <LiquidityReserveModule />
              <FeedbackSection sectionId="status-liquidity" />
            </div>
          </div>
          
          <div>
            <SentimentInsightsModule fullWidth />
            <FeedbackSection sectionId="status-sentiment" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <PersonalInsightsModule />
              <FeedbackSection sectionId="status-personal-insights" />
            </div>
            <div>
              <SocialComparisonModule />
              <FeedbackSection sectionId="status-social-comparison" />
            </div>
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - Como Estou?</p>
          </div>
        </TabsContent>
        
        {/* Tab 3: O que preciso mudar? - Recommendations and actions */}
        <TabsContent value="actions" className="space-y-8">
          <div>
            <InteligenciaModule fullWidth />
            <FeedbackSection sectionId="actions-inteligencia" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <LifeGoalsModule />
              <FeedbackSection sectionId="actions-life-goals" />
            </div>
            <div>
              <PersonalInsightsModule />
              <FeedbackSection sectionId="actions-personal-insights" />
            </div>
          </div>
          
          <div>
            <OnePageFinancialPlanModule fullWidth />
            <FeedbackSection sectionId="actions-financial-plan" />
          </div>
          
          <div>
            <BehavioralFinanceModule fullWidth />
            <FeedbackSection sectionId="actions-behavioral-finance" />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - O que preciso mudar?</p>
          </div>
        </TabsContent>
        
        {/* Tab 4: O que está acontecendo? - Market insights */}
        <TabsContent value="market" className="space-y-8">
          <div>
            <InteligenciaModule fullWidth />
            <FeedbackSection sectionId="market-inteligencia" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SentimentInsightsModule />
              <FeedbackSection sectionId="market-sentiment" />
            </div>
            <div>
              <FamousInvestorsModule />
              <FeedbackSection sectionId="market-famous-investors" />
            </div>
          </div>
          
          <div>
            <SocialComparisonModule fullWidth />
            <FeedbackSection sectionId="market-social-comparison" />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - O que está acontecendo?</p>
          </div>
        </TabsContent>
        
        {/* Tab 5: E meu futuro? - Future projections and planning */}
        <TabsContent value="future" className="space-y-8">
          <div>
            <MeuFuturoFinanceiroModule fullWidth />
            <FeedbackSection sectionId="future-meu-futuro" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FutureProjectionModule />
              <FeedbackSection sectionId="future-projection-module" />
            </div>
            <div>
              <InvestmentPlanningModule />
              <FeedbackSection sectionId="future-investment-planning" />
            </div>
          </div>
          
          <div>
            <WrappedModule fullWidth />
            <FeedbackSection sectionId="future-wrapped" />
          </div>
          
          <div>
            <WholeBankingModule fullWidth />
            <FeedbackSection sectionId="future-whole-banking" />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - E meu futuro?</p>
          </div>
        </TabsContent>
        
        {/* Tab 6: Fale com RM - Chat interface with voice button */}
        <TabsContent value="chat">
          <div className="relative mb-4">
            <Button
              variant="gradient"
              className="absolute right-4 top-4 z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={handleVoiceSearch}
            >
              <Mic className="h-5 w-5" />
              Falar com RM
            </Button>
            <ChatInterface />
          </div>
          
          {/* Footer for this tab */}
          <div className="w-full py-10 text-center border-t border-white/10 mt-12">
            <p className="text-gray-400">Fim da seção - Fale com RM</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
