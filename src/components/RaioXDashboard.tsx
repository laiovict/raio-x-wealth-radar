
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Search } from "lucide-react";
import { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import FeedbackSection from "./FeedbackSection";

interface RaioXDashboardProps {
  showPdfPreview?: boolean;
  onClosePdfPreview?: () => void;
  mediaType?: string;
  isClientFull?: boolean;
  onOpenFinanceActivate?: () => void;
}

const RaioXDashboard = ({ 
  showPdfPreview = false, 
  onClosePdfPreview = () => {}, 
  mediaType = "pdf",
  isClientFull = true,
  onOpenFinanceActivate
}: RaioXDashboardProps) => {
  const { data, hasOpenFinance, selectedClient } = useRaioX();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();

  useEffect(() => {
    const handleActivateOpenFinance = () => {
      const event = new CustomEvent('activate-openfinance');
      document.dispatchEvent(event);
    };

    document.addEventListener('activate-openfinance', handleActivateOpenFinance);

    return () => {
      document.removeEventListener('activate-openfinance', handleActivateOpenFinance);
    };
  }, []);

  const handleQuickNavClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Extract the first name from data.clientName
  const getClientFirstName = () => {
    if (!data.clientName) return "";
    // Split by space and take the first part as the first name
    return data.clientName.split(" ")[0];
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
      // Aqui você pode implementar a lógica para processar o comando de voz
      // Por exemplo, enviar para a interface de chat ou realizar uma pesquisa
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

  if (showPdfPreview) {
    return (
      <PdfPreview 
        onClose={onClosePdfPreview} 
        clientData={data} 
        mediaType={mediaType}
        isClientFull={isClientFull}
        hasOpenFinance={hasOpenFinance}
      />
    );
  }

  return (
    <div className="space-y-6 pb-16 min-h-screen max-h-full">
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent mb-2">
          {t('welcomeMessage')} {getClientFirstName()}!
        </h2>
        
        <div className="w-full max-w-md relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')} 
            className="w-full glass-morphism backdrop-blur-md border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button 
              className="text-gray-400 hover:text-white"
              onClick={handleVoiceSearch}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-6 mb-2 flex gap-2 flex-wrap justify-center">
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "overview" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("overview")}
          >
            {t('overviewTab')}
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "status" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("status")}
          >
            {t('statusTab')}
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "actions" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("actions")}
          >
            {t('planTab')}
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "market" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("market")}
          >
            {t('aiTab')}
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "future" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("future")}
          >
            {t('futureTab')}
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "chat" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("chat")}
          >
            {t('chatTab')}
          </button>
        </div>
      </div>

      <WelcomeBanner selectedClient={selectedClient} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 glass-morphism rounded-lg overflow-x-auto grid grid-cols-6 scrollbar-none">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="status" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('statusTab')}</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('planTab')}</TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('aiTab')}</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('futureTab')}</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('chatTab')}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visão Geral - Reordered to match requirements */}
        <TabsContent value="overview" className="space-y-6">
          {/* Starting with Financial Overview */}
          <FinancialOverviewModule />
          
          {/* Followed by One Page Financial Plan */}
          <OnePageFinancialPlanModule />
          
          {/* Then Life Goals */}
          <LifeGoalsModule />
          
          {/* Moving MeuFuturoFinanceiro and WholeBanking to the middle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MeuFuturoFinanceiroModule />
            <WholeBankingModule />
          </div>
          
          <FamousInvestorsModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationModule />
            <LiquidityReserveModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InteligenciaModule />
            <SentimentInsightsModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FutureProjectionModule />
            <PersonalInsightsModule />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InvestmentPlanningModule />
            <SocialComparisonModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BehavioralFinanceModule />
            <WrappedModule />
          </div>
        </TabsContent>
        
        {/* Tab 2: Como Estou? - Status overview */}
        <TabsContent value="status" className="space-y-6">
          <FinancialOverviewModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationModule />
            <LiquidityReserveModule />
          </div>
          
          <SentimentInsightsModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonalInsightsModule />
            <SocialComparisonModule />
          </div>
        </TabsContent>
        
        {/* Tab 3: O que preciso mudar? - Recommendations and actions */}
        <TabsContent value="actions" className="space-y-6">
          <InteligenciaModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LifeGoalsModule />
            <PersonalInsightsModule />
          </div>
          
          <OnePageFinancialPlanModule fullWidth />
          <BehavioralFinanceModule fullWidth />
        </TabsContent>
        
        {/* Tab 4: O que está acontecendo? - Market insights */}
        <TabsContent value="market" className="space-y-6">
          <InteligenciaModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentInsightsModule />
            <FamousInvestorsModule />
          </div>
          
          <SocialComparisonModule fullWidth />
        </TabsContent>
        
        {/* Tab 5: E meu futuro? - Future projections and planning */}
        <TabsContent value="future" className="space-y-6">
          <MeuFuturoFinanceiroModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FutureProjectionModule />
            <InvestmentPlanningModule />
          </div>
          
          <WrappedModule fullWidth />
          <WholeBankingModule fullWidth />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
