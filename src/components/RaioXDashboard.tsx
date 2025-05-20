
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
import FamousInvestorsModule from "./modules/FamousInvestorsModule";
import BehavioralFinanceModule from "./modules/BehavioralFinanceModule";

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
  const { data, hasOpenFinance } = useRaioX();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("status");
  const { t } = useLanguage();

  // Listen for the custom event to activate OpenFinance
  useEffect(() => {
    const handleActivateOpenFinance = () => {
      // Display the Pluggy widget through the parent component
      const event = new CustomEvent('activate-openfinance');
      document.dispatchEvent(event);
    };

    // Add event listener
    document.addEventListener('activate-openfinance', handleActivateOpenFinance);

    // Remove event listener on cleanup
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
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "status" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("status")}
          >
            Como estou?
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "actions" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("actions")}
          >
            O que preciso mudar?
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "market" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("market")}
          >
            O que está acontecendo?
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "future" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("future")}
          >
            E meu futuro?
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "chat" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("chat")}
          >
            Fale com RM
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 glass-morphism rounded-lg overflow-x-auto grid grid-cols-5 scrollbar-none">
          <TabsTrigger value="status" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Como estou?</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">O que preciso mudar?</TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">O que está acontecendo?</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">E meu futuro?</TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Fale com RM</TabsTrigger>
        </TabsList>

        {/* Tab 1: Como estou? - Current financial state overview */}
        <TabsContent value="status" className="space-y-6">
          <FinancialOverviewModule />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationModule />
            <BehavioralFinanceModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiquidityReserveModule />
            <WholeBankingModule />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <SocialComparisonModule />
          </div>
        </TabsContent>
        
        {/* Tab 2: O que preciso mudar? - Recommendations and actions */}
        <TabsContent value="actions" className="space-y-6">
          <RecommendedActionsModule fullWidth />
          <OnePageFinancialPlanModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LifeGoalsModule />
            <PersonalInsightsModule />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <RecommendationsModule />
          </div>
        </TabsContent>
        
        {/* Tab 3: O que está acontecendo? - Market insights */}
        <TabsContent value="market" className="space-y-6">
          <AIInsightsHubModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentInsightsModule />
            <FinancialInsightsModule />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <FamousInvestorsModule />
          </div>
        </TabsContent>
        
        {/* Tab 4: E meu futuro? - Future projections and planning */}
        <TabsContent value="future" className="space-y-6">
          <MeuFuturoFinanceiroModule fullWidth />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FutureProjectionModule />
            <InvestmentPlanningModule />
          </div>
          
          <WrappedModule fullWidth />
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
