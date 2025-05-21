import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRaioX } from "@/context/RaioXContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useFeatureFlags } from "@/context/FeatureFlagContext";
import { getMonthlyReportUrl } from "@/utils/reportUtils";
import { generatePdf } from "@/utils/pdfGenerator";
import { LayoutDashboard, Download, XCircle } from "lucide-react";
import { useSteveJobsUI } from "@/hooks/useSteveJobsUI";

// Import static components
import FinancialOverviewModule from "@/components/modules/FinancialOverviewModule";
import AllocationModule from "@/components/modules/AllocationModule";
import LiquidityReserveModule from "@/components/modules/LiquidityReserveModule";
import AIInsightsHubModule from "@/components/modules/AIInsightsHubModule";
import SentimentInsightsModule from "@/components/modules/SentimentInsightsModule";
import DividendModule from "@/components/modules/DividendModule";
import SocialComparisonModule from "@/components/modules/SocialComparisonModule";
import FamousInvestorsModule from "@/components/modules/FamousInvestorsModule";
import ClientProfileModule from "@/components/modules/ClientProfileModule";
import InteligenciaModule from "@/components/modules/InteligenciaModule";
import WholeBankingModule from "@/components/modules/WholeBankingModule";

// Lazy-load less frequently used components
const RecommendationsModule = lazy(() => import("@/components/modules/RecommendationsModule"));
const RecommendedActionsModule = lazy(() => import("@/components/modules/RecommendedActionsModule"));
const InvestmentPlanningModule = lazy(() => import("@/components/modules/InvestmentPlanningModule"));
const LifeGoalsModule = lazy(() => import("@/components/modules/LifeGoalsModule"));
const WrappedModule = lazy(() => import("@/components/modules/WrappedModule"));
const FutureProjectionModule = lazy(() => import("@/components/modules/FutureProjectionModule"));
const OnePageFinancialPlanModule = lazy(() => import("@/components/modules/OnePageFinancialPlanModule"));
const BehavioralFinanceModule = lazy(() => import("@/components/modules/BehavioralFinanceModule"));
const MeuFuturoFinanceiroModule = lazy(() => import("@/components/modules/MeuFuturoFinanceiroModule"));
const PersonalInsightsModule = lazy(() => import("@/components/modules/PersonalInsightsModule"));

// Loading component for Suspense
const LoadingComponent = () => (
  <Card className="p-4 min-h-[200px] w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-l-indigo-500 border-r-indigo-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-slate-400">Carregando...</p>
    </div>
  </Card>
);

interface RaioXDashboardProps {
  showPdfPreview: boolean;
  onClosePdfPreview: () => void;
  mediaType: string;
  isClientFull: boolean;
  onOpenFinanceActivate: () => void;
  userRole: string;
}

const RaioXDashboard: React.FC<RaioXDashboardProps> = ({
  showPdfPreview,
  onClosePdfPreview,
  mediaType,
  isClientFull,
  onOpenFinanceActivate,
  userRole
}) => {
  const { data, selectedClient } = useRaioX();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { flags } = useFeatureFlags();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { theme } = useSteveJobsUI();

  useEffect(() => {
    // Set initial tab from URL params
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["raiox-beta", "raiox-full", "raiox-full-v2"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else {
      // Set default tab
      setActiveTab("raiox-beta");
    }

    // Listen for custom event to navigate to tab
    const handleNavigateToTab = (event: any) => {
      const newTabId = event.detail.tabId;
      if (["raiox-beta", "raiox-full", "raiox-full-v2"].includes(newTabId)) {
        setActiveTab(newTabId);
        setSearchParams({ tab: newTabId });
      }
    };

    document.addEventListener('navigate-to-tab', handleNavigateToTab);

    return () => {
      document.removeEventListener('navigate-to-tab', handleNavigateToTab);
    };
  }, [setSearchParams, searchParams]);

  // Function to generate and download the report using native browser APIs
  const handleDownloadReport = async () => {
    try {
      // Generate the PDF
      const clientId = typeof selectedClient === 'string' ? parseInt(selectedClient, 10) : selectedClient;
      const pdfBlob = await generatePdf(clientId);

      // Use browser APIs to create download
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `raiox-report-${selectedClient}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Relatório gerado com sucesso!",
        description: "O download do relatório será iniciado em breve.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar relatório",
        description: "Houve um problema ao gerar o relatório. Por favor, tente novamente mais tarde.",
      });
    }
  };

  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  // Define RaioX Beta tab content - moved InteligenciaModule to top
  const BetaTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-6">
      {/* Visão Geral section */}
      <div className="lg:col-span-2">
        <FinancialOverviewModule fullWidth={true} />
      </div>

      {/* Inteligência Financeira section - Moved to top */}
      <div className="lg:col-span-2">
        <InteligenciaModule fullWidth={true} />
      </div>
      
      <div>
        <AllocationModule fullWidth={true} />
      </div>
      <div>
        <LiquidityReserveModule fullWidth={true} />
      </div>
      
      {/* Insights AI section */}
      <div>
        <AIInsightsHubModule fullWidth={true} />
      </div>
      <div>
        <SentimentInsightsModule fullWidth={true} />
      </div>
      
      {/* Investimentos section */}
      <div>
        <DividendModule fullWidth={true} />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <SocialComparisonModule fullWidth={true} />
        <FamousInvestorsModule fullWidth={true} />
      </div>

      {/* Added WholeBanking module */}
      <div className="lg:col-span-2">
        <WholeBankingModule fullWidth={true} />
      </div>
    </div>
  );

  // Define RaioX Full tab content - moved InteligenciaModule to top and restored WholeBankingModule
  const FullTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-6">
      {/* Main content area first (full width) */}
      <div className="lg:col-span-12 space-y-8">
        <FinancialOverviewModule fullWidth={true} />
        <InteligenciaModule fullWidth={true} />
      </div>
      
      {/* Sidebar with client profile (1/3 width) */}
      <div className="lg:col-span-4 space-y-8">
        <Suspense fallback={<LoadingComponent />}>
          <RecommendationsModule fullWidth={true} />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <BehavioralFinanceModule fullWidth={true} />
        </Suspense>
      </div>
      
      {/* Main content area (2/3 width) */}
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DividendModule fullWidth={true} />
          <AllocationModule fullWidth={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<LoadingComponent />}>
            <InvestmentPlanningModule fullWidth={true} />
          </Suspense>
          <LiquidityReserveModule fullWidth={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AIInsightsHubModule fullWidth={true} />
          <SentimentInsightsModule fullWidth={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<LoadingComponent />}>
            <RecommendedActionsModule fullWidth={true} />
          </Suspense>
          <Suspense fallback={<LoadingComponent />}>
            <LifeGoalsModule fullWidth={true} />
          </Suspense>
        </div>
        
        {/* Added WholeBanking module */}
        <WholeBankingModule fullWidth={true} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SocialComparisonModule fullWidth={true} />
          <FamousInvestorsModule fullWidth={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<LoadingComponent />}>
            <FutureProjectionModule fullWidth={true} />
          </Suspense>
          <Suspense fallback={<LoadingComponent />}>
            <OnePageFinancialPlanModule fullWidth={true} />
          </Suspense>
        </div>
      </div>
    </div>
  );

  // Define RaioX Full v2 (Jony Ive design) tab content - moved InteligenciaModule to top and restored WholeBankingModule
  const FullV2TabContent = () => (
    <div className="jony-ive-design space-y-12">
      {/* Header row - key overview components */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <FinancialOverviewModule fullWidth={true} />
        </div>
      </div>
      
      {/* Inteligência Financeira section - Moved to top */}
      <div className="grid grid-cols-1 gap-8">
        <InteligenciaModule fullWidth={true} />
      </div>
      
      {/* Main content grid - organized by categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {/* Investment Management Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-light text-white/80 px-2">
            Gestão de Investimentos
          </h3>
          <AllocationModule fullWidth={true} />
          <DividendModule fullWidth={true} />
          <Suspense fallback={<LoadingComponent />}>
            <InvestmentPlanningModule fullWidth={true} />
          </Suspense>
          <LiquidityReserveModule fullWidth={true} />
        </div>
        
        {/* Insights and Planning Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-light text-white/80 px-2">
            Insights e Planejamento
          </h3>
          <Suspense fallback={<LoadingComponent />}>
            <RecommendationsModule fullWidth={true} />
          </Suspense>
          <AIInsightsHubModule fullWidth={true} />
          <SentimentInsightsModule fullWidth={true} />
        </div>
      </div>
      
      {/* WholeBanking and Additional Features Section */}
      <div className="space-y-8 pb-12">
        <h3 className="text-2xl font-light text-white/80 px-2">
          Whole Banking
        </h3>
        <WholeBankingModule fullWidth={true} />
        
        <h3 className="text-2xl font-light text-white/80 px-2">
          Recursos Adicionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SocialComparisonModule fullWidth={true} />
          <FamousInvestorsModule fullWidth={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<LoadingComponent />}>
            <FutureProjectionModule fullWidth={true} />
          </Suspense>
          <Suspense fallback={<LoadingComponent />}>
            <OnePageFinancialPlanModule fullWidth={true} />
          </Suspense>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Visualização do Relatório</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2 inline-block" />
                  Download
                </button>
                <button onClick={onClosePdfPreview} className="hover:bg-gray-200 rounded-full p-1">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <CardContent className="flex-grow overflow-hidden">
              <embed
                src={getMonthlyReportUrl(typeof selectedClient === 'string' ? parseInt(selectedClient, 10) : selectedClient)}
                type={`application/${mediaType}`}
                className="w-full h-full"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <Tabs
            value={activeTab || 'raiox-beta'}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="h-12 bg-gradient-to-r from-slate-900 to-slate-800 p-1 flex items-center w-full overflow-x-auto">
              <TabsTrigger 
                value="raiox-beta"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                RaioX Beta
              </TabsTrigger>
              <TabsTrigger 
                value="raiox-full"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                RaioX Full
              </TabsTrigger>
              <TabsTrigger 
                value="raiox-full-v2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                RaioX Full v2 (Jony Ive)
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="raiox-beta">
              <BetaTabContent />
            </TabsContent>
            <TabsContent value="raiox-full">
              <FullTabContent />
            </TabsContent>
            <TabsContent value="raiox-full-v2">
              <FullV2TabContent />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </>
  );
};

export default RaioXDashboard;
