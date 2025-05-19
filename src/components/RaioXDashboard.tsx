
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AllocationModule from "./modules/AllocationModule";
import FutureProjectionModule from "./modules/FutureProjectionModule";
import LiquidityReserveModule from "./modules/LiquidityReserveModule";
import LifeGoalsModule from "./modules/LifeGoalsModule";
import WrappedModule from "./modules/WrappedModule";
import SocialComparisonModule from "./modules/SocialComparisonModule";
import SentimentInsightsModule from "./modules/SentimentInsightsModule";
import RecommendationsModule from "./modules/RecommendationsModule";
import FinancialInsightsModule from "./modules/FinancialInsightsModule";

const RaioXDashboard = () => {
  const { data } = useRaioX();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          RaioX Financeiro: {data.clientName}
        </h2>
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
          {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="allocation">Alocação</TabsTrigger>
          <TabsTrigger value="projection">Projeção</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidez</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="wrapped">Wrapped</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
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
