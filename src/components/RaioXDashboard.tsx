
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState("overview");

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
          Bem vindo {data.clientName}!
        </h2>
        
        <div className="w-full max-w-md relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Como posso facilitar sua vida?" 
            className="w-full glass-morphism backdrop-blur-md border border-white/10 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-6 mb-2 flex gap-2 flex-wrap justify-center">
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "ai" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("ai")}
          >
            Assistente IA
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "goals" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("goals")}
          >
            Meus Objetivos
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "planning" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("planning")}
          >
            Planejamento
          </button>
          <button 
            className={`glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all ${activeTab === "insights" ? "bg-white/20 border-blue-400" : ""}`}
            onClick={() => handleQuickNavClick("insights")}
          >
            Insights
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 glass-morphism rounded-lg overflow-x-auto grid grid-cols-3 lg:grid-cols-10 md:grid-cols-5 scrollbar-none">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="plan" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Plano Financeiro</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Meu Futuro</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Assistente IA</TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Planejamento</TabsTrigger>
          <TabsTrigger value="allocation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Investimentos</TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Objetivos</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Insights</TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Social</TabsTrigger>
          <TabsTrigger value="banking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Banking</TabsTrigger>
        </TabsList>

        {/* Overview tab - Main dashboard view */}
        <TabsContent value="overview" className="space-y-6">
          <FinancialOverviewModule />
          <OnePageFinancialPlanModule />
          
          <div className="grid grid-cols-1 gap-6">
            <RecommendedActionsModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LifeGoalsModule />
            <AllocationModule />
          </div>
          
          {/* Always show WholeBankingModule - it'll adapt based on hasOpenFinance state */}
          <div className="grid grid-cols-1 gap-6">
            <WholeBankingModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MeuFuturoFinanceiroModule />
            <InvestmentPlanningModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SocialComparisonModule />
            </div>
            <div className="md:col-span-1">
              <FutureProjectionModule />
            </div>
            <div className="md:col-span-1">
              <SentimentInsightsModule />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinancialInsightsModule />
            <PersonalInsightsModule />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiquidityReserveModule />
            <WrappedModule />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <RecommendationsModule />
            <AIInsightsHubModule />
          </div>
        </TabsContent>
        
        {/* Financial Plan tab */}
        <TabsContent value="plan">
          <OnePageFinancialPlanModule fullWidth />
        </TabsContent>

        {/* Meu Futuro tab */}
        <TabsContent value="future">
          <MeuFuturoFinanceiroModule fullWidth />
          <div className="mt-6">
            <FutureProjectionModule fullWidth />
          </div>
        </TabsContent>
        
        {/* AI Assistant tab */}
        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <AIInsightsHubModule fullWidth />
            <RecommendedActionsModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Planning tab */}
        <TabsContent value="planning" className="space-y-6">
          <InvestmentPlanningModule fullWidth />
          <div className="mt-6">
            <LiquidityReserveModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Investments tab */}
        <TabsContent value="allocation">
          <AllocationModule fullWidth />
          <div className="mt-6">
            <WrappedModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Goals tab */}
        <TabsContent value="goals">
          <LifeGoalsModule fullWidth />
          <div className="mt-6">
            <PersonalInsightsModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Insights tab */}
        <TabsContent value="insights" className="space-y-6">
          <FinancialInsightsModule fullWidth />
          <div className="mt-6">
            <SentimentInsightsModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Social tab */}
        <TabsContent value="social">
          <SocialComparisonModule fullWidth />
          <div className="mt-6">
            <RecommendationsModule fullWidth />
          </div>
        </TabsContent>
        
        {/* Banking tab */}
        <TabsContent value="banking">
          <WholeBankingModule fullWidth />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
