
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

// Lazy-load less frequently used components
const RecommendationsModule = lazy(() => import("@/components/modules/RecommendationsModule"));
const RecommendedActionsModule = lazy(() => import("@/components/modules/RecommendedActionsModule"));
const InteligenciaModule = lazy(() => import("@/components/modules/InteligenciaModule"));
const InvestmentPlanningModule = lazy(() => import("@/components/modules/InvestmentPlanningModule"));
const LifeGoalsModule = lazy(() => import("@/components/modules/LifeGoalsModule"));
const WrappedModule = lazy(() => import("@/components/modules/WrappedModule"));
const FutureProjectionModule = lazy(() => import("@/components/modules/FutureProjectionModule"));
const OnePageFinancialPlanModule = lazy(() => import("@/components/modules/OnePageFinancialPlanModule"));
const WholeBankingModule = lazy(() => import("@/components/modules/WholeBankingModule"));
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

  // Define RaioX Beta tab content
  const BetaTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
      {/* Visão Geral section */}
      <FinancialOverviewModule fullWidth={true} />
      <div className="grid grid-cols-1 gap-6">
        <AllocationModule />
        <LiquidityReserveModule />
      </div>
      
      {/* Insights AI section */}
      <AIInsightsHubModule fullWidth={false} />
      <SentimentInsightsModule />
      
      {/* Investimentos section */}
      <DividendModule fullWidth={false} />
      <div className="grid grid-cols-1 gap-6">
        <SocialComparisonModule />
        <FamousInvestorsModule />
      </div>
    </div>
  );

  // Define RaioX Full tab content with consistent styling and no duplicates
  const FullTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
      <div className="lg:col-span-1">
        <ClientProfileModule />
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingComponent />}>
          <RecommendationsModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <RecommendedActionsModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <InteligenciaModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <InvestmentPlanningModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <LifeGoalsModule />
        </Suspense>
        <DividendModule />
        <AllocationModule />
        <LiquidityReserveModule />
        <Suspense fallback={<LoadingComponent />}>
          <FutureProjectionModule />
        </Suspense>
        <SocialComparisonModule />
        <AIInsightsHubModule />
        <Suspense fallback={<LoadingComponent />}>
          <BehavioralFinanceModule />
        </Suspense>
        <FinancialOverviewModule />
        <Suspense fallback={<LoadingComponent />}>
          <OnePageFinancialPlanModule />
        </Suspense>
        <SentimentInsightsModule />
        <FamousInvestorsModule />
        <Suspense fallback={<LoadingComponent />}>
          <WrappedModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <WholeBankingModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <MeuFuturoFinanceiroModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <PersonalInsightsModule />
        </Suspense>
      </div>
    </div>
  );

  // Define RaioX Full v2 (Jony Ive design) tab content with better organization
  const FullV2TabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 jony-ive-design">
      <ClientProfileModule fullWidth={false} />
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<LoadingComponent />}>
          <InvestmentPlanningModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <InteligenciaModule />
        </Suspense>
      </div>
      <div className="lg:col-span-2">
        <FinancialOverviewModule fullWidth={true} />
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Suspense fallback={<LoadingComponent />}>
          <RecommendationsModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <RecommendedActionsModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <LifeGoalsModule />
        </Suspense>
        <DividendModule />
        <AllocationModule />
        <LiquidityReserveModule />
        <Suspense fallback={<LoadingComponent />}>
          <FutureProjectionModule />
        </Suspense>
        <SocialComparisonModule />
        <AIInsightsHubModule />
        <Suspense fallback={<LoadingComponent />}>
          <BehavioralFinanceModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <OnePageFinancialPlanModule />
        </Suspense>
        <SentimentInsightsModule />
        <FamousInvestorsModule />
        <Suspense fallback={<LoadingComponent />}>
          <WholeBankingModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <MeuFuturoFinanceiroModule />
        </Suspense>
        <Suspense fallback={<LoadingComponent />}>
          <PersonalInsightsModule />
        </Suspense>
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
