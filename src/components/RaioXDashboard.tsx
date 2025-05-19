
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
          <button className="glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all">
            Insights
          </button>
          <button className="glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all">
            Meus Objetivos
          </button>
          <button className="glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all">
            Copiloto IA
          </button>
          <button className="glass-morphism px-6 py-2 rounded-full text-white hover:bg-white/10 transition-all">
            Planejamento
          </button>
        </div>
      </div>

      {/* One-Page Financial Plan - Always visible at the very top */}
      <OnePageFinancialPlanModule />

      {/* Financial Overview - Always visible below the plan */}
      <FinancialOverviewModule />
      
      {/* Whole Banking - Always visible after financial overview */}
      <WholeBankingModule />

      {/* Meu Futuro Financeiro - New module inspired by the images */}
      <MeuFuturoFinanceiroModule />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 glass-morphism rounded-lg overflow-x-auto grid grid-cols-3 lg:grid-cols-12 md:grid-cols-6 scrollbar-none">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Todos</TabsTrigger>
          <TabsTrigger value="plan" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Plano em Uma Página</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Copiloto IA</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Meu Futuro</TabsTrigger>
          <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Pessoal</TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Planejamento</TabsTrigger>
          <TabsTrigger value="banking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Whole Banking</TabsTrigger>
          <TabsTrigger value="allocation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Alocação</TabsTrigger>
          <TabsTrigger value="projection" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Projeção</TabsTrigger>
          <TabsTrigger value="liquidity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Liquidez</TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Metas</TabsTrigger>
          <TabsTrigger value="wrapped" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Wrapped</TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Social</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Insights</TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <AIInsightsHubModule />
            <RecommendedActionsModule />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <InvestmentPlanningModule />
          </div>
          <PersonalInsightsModule />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllocationModule />
            <FutureProjectionModule />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiquidityReserveModule />
            <LifeGoalsModule />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WrappedModule />
            <SocialComparisonModule />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentInsightsModule />
            <RecommendationsModule />
          </div>
          <div className="mt-6">
            <FinancialInsightsModule fullWidth />
          </div>
        </TabsContent>
        
        <TabsContent value="plan">
          <OnePageFinancialPlanModule fullWidth />
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <AIInsightsHubModule fullWidth />
            <RecommendedActionsModule fullWidth />
          </div>
        </TabsContent>
        
        {/* New tab for Meu Futuro Financeiro */}
        <TabsContent value="future">
          <MeuFuturoFinanceiroModule fullWidth />
        </TabsContent>
        
        <TabsContent value="personal">
          <PersonalInsightsModule fullWidth />
        </TabsContent>
        
        <TabsContent value="planning">
          <InvestmentPlanningModule fullWidth />
        </TabsContent>
        
        <TabsContent value="banking">
          <WholeBankingModule fullWidth />
        </TabsContent>
        
        <TabsContent value="allocation">
          <AllocationModule fullWidth />
        </TabsContent>
        
        <TabsContent value="projection">
          <FutureProjectionModule fullWidth />
        </TabsContent>
        
        <TabsContent value="liquidity">
          <LiquidityReserveModule fullWidth />
        </TabsContent>
        
        <TabsContent value="goals">
          <LifeGoalsModule fullWidth />
        </TabsContent>
        
        <TabsContent value="wrapped">
          <WrappedModule fullWidth />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialComparisonModule fullWidth />
        </TabsContent>
        
        <TabsContent value="insights">
          <FinancialInsightsModule fullWidth />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <RecommendationsModule fullWidth />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaioXDashboard;
