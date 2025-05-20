
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

import AllocationModule from "./modules/AllocationModule";
import FutureProjectionModule from "./modules/FutureProjectionModule";
import LiquidityReserveModule from "./modules/LiquidityReserveModule";
import LifeGoalsModule from "./modules/LifeGoalsModule";
import WrappedModule from "./modules/WrappedModule";
import SocialComparisonModule from "./modules/SocialComparisonModule";
import SentimentInsightsModule from "./modules/SentimentInsightsModule";
import RecommendationsModule from "./modules/RecommendationsModule";
import FinancialInsightsModule from "./modules/FinancialInsightsModule";
import PersonalInsightsModule from "./modules/PersonalInsightsModule";
import PdfPreview from "./PdfPreview";
import FinancialOverviewModule from "./modules/FinancialOverviewModule";
import AIInsightsHubModule from "./modules/AIInsightsHubModule";
import RecommendedActionsModule from "./modules/RecommendedActionsModule";
import InvestmentPlanningModule from "./modules/InvestmentPlanningModule";
import OnePageFinancialPlanModule from "./modules/OnePageFinancialPlanModule";
import WholeBankingModule from "./modules/WholeBankingModule";
import MeuFuturoFinanceiroModule from "./modules/MeuFuturoFinanceiroModule";
import ChatInterface from "./ChatInterface";
import BehavioralFinanceModule from "./modules/BehavioralFinanceModule";
import FamousInvestorsModule from "./modules/FamousInvestorsModule";
import WelcomeBanner from "./WelcomeBanner";

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
          {t('welcomeMessage')} {data.clientName}!
        </h2>
        
        <div className="w-full max-w-md relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')} 
            className="w-full glass-morphism backdrop-blur-md border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-6 mb-2 flex gap-2 flex-wrap justify-center">
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "overview" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("overview")}
          >
            {t('overviewTab')}
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
        <TabsList className="mb-6 glass-morphism rounded-lg overflow-x-auto grid grid-cols-5 scrollbar-none">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('planTab')}</TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('aiTab')}</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('futureTab')}</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">{t('chatTab')}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Visão Geral - Comprehensive overview of all 18 sections */}
        <TabsContent value="overview" className="space-y-6">
          <FinancialOverviewModule />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationModule />
            <LiquidityReserveModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LifeGoalsModule />
            <RecommendedActionsModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentInsightsModule />
            <FutureProjectionModule />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinancialInsightsModule />
            <PersonalInsightsModule />
          </div>

          <AIInsightsHubModule />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialComparisonModule />
            <BehavioralFinanceModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InvestmentPlanningModule />
            <WrappedModule />
          </div>

          <OnePageFinancialPlanModule />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MeuFuturoFinanceiroModule />
            <WholeBankingModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecommendationsModule />
            <FamousInvestorsModule />
          </div>
        </TabsContent>
        
        {/* Tab 2: O que preciso mudar? - Recommendations and actions */}
        <TabsContent value="actions" className="space-y-6">
          <RecommendedActionsModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LifeGoalsModule />
            <PersonalInsightsModule />
          </div>
          
          {hasOpenFinance && (
            <>
              <OnePageFinancialPlanModule fullWidth />
              <BehavioralFinanceModule />
              <div className="grid grid-cols-1 gap-6">
                <RecommendationsModule />
              </div>
            </>
          )}
        </TabsContent>
        
        {/* Tab 3: O que está acontecendo? - Market insights */}
        <TabsContent value="market" className="space-y-6">
          <AIInsightsHubModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentInsightsModule />
            <FinancialInsightsModule />
          </div>
          
          {hasOpenFinance && (
            <div className="grid grid-cols-1 gap-6">
              <SocialComparisonModule />
            </div>
          )}
        </TabsContent>
        
        {/* Tab 4: E meu futuro? - Future projections and planning */}
        <TabsContent value="future" className="space-y-6">
          <MeuFuturoFinanceiroModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FutureProjectionModule />
            <InvestmentPlanningModule />
          </div>
          
          {hasOpenFinance && (
            <>
              <WrappedModule fullWidth />
              <WholeBankingModule />
            </>
          )}
        </TabsContent>
        
        {/* Tab 5: Fale com RM - Chat interface */}
        <TabsContent value="chat">
          <ChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
