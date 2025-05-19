
import { useRaioX } from "@/context/RaioXContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { useState } from "react";

import AllocationModule from "./modules/AllocationModule";
import FutureProjectionModule from "./modules/FutureProjectionModule";
import LiquidityReserveModule from "./modules/LiquidityReserveModule";
import LifeGoalsModule from "./modules/LifeGoalsModule";
import WrappedModule from "./modules/WrappedModule";
import SocialComparisonModule from "./modules/SocialComparisonModule";
import SentimentInsightsModule from "./modules/SentimentInsightsModule";
import RecommendationsModule from "./modules/RecommendationsModule";
import FinancialInsightsModule from "./modules/FinancialInsightsModule";
import PdfPreview from "./PdfPreview";

interface RaioXDashboardProps {
  showPdfPreview?: boolean;
  onClosePdfPreview?: () => void;
}

const RaioXDashboard = ({ showPdfPreview = false, onClosePdfPreview = () => {} }: RaioXDashboardProps) => {
  const { data } = useRaioX();
  const [searchQuery, setSearchQuery] = useState("");

  if (showPdfPreview) {
    return <PdfPreview onClose={onClosePdfPreview} clientData={data} />;
  }

  return (
    <div className="space-y-6">
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
        
        <div className="mt-6 mb-2">
          <button className="glass-morphism px-8 py-2 rounded-full text-white hover:bg-white/10 transition-all">
            Insights
          </button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-6 glass-morphism rounded-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">Todos</TabsTrigger>
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
        
        <TabsContent value="sentiment">
          <SentimentInsightsModule fullWidth />
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
