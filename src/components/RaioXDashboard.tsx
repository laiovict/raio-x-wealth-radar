
import React, { useState, useEffect } from "react";
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
import { Eye, Download, XCircle, LayoutDashboard, BrainCircuit, LineChart, Calendar, Sparkles, Book } from "lucide-react";

// Import Module Components
import PersonalInsightsModule from "@/components/modules/PersonalInsightsModule";
import RecommendationsModule from "@/components/modules/RecommendationsModule";
import RecommendedActionsModule from "@/components/modules/RecommendedActionsModule";
import InvestmentPlanningModule from "@/components/modules/InvestmentPlanningModule";
import InteligenciaModule from "@/components/modules/InteligenciaModule";
import ClientProfileModule from "@/components/modules/ClientProfileModule";
import AllocationModule from "@/components/modules/AllocationModule";
import LifeGoalsModule from "@/components/modules/LifeGoalsModule";
import WrappedModule from "@/components/modules/WrappedModule";
import DividendModule from "@/components/modules/DividendModule";
import FinancialOverviewModule from "@/components/modules/FinancialOverviewModule";
import LiquidityReserveModule from "@/components/modules/LiquidityReserveModule";
import AIInsightsHubModule from "@/components/modules/AIInsightsHubModule";
import SentimentInsightsModule from "@/components/modules/SentimentInsightsModule";
import SocialComparisonModule from "@/components/modules/SocialComparisonModule";
import FamousInvestorsModule from "@/components/modules/FamousInvestorsModule";
import OnePageFinancialPlanModule from "@/components/modules/OnePageFinancialPlanModule";
import FutureProjectionModule from "@/components/modules/FutureProjectionModule";
import SteveJobsReportModule from "@/components/modules/SteveJobsReportModule";
import WholeBankingModule from "@/components/modules/WholeBankingModule";
import BehavioralFinanceModule from "@/components/modules/BehavioralFinanceModule";
import MeuFuturoFinanceiroModule from "@/components/modules/MeuFuturoFinanceiroModule";

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

  useEffect(() => {
    // Set initial tab from URL params
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    } else {
      // Set default tab
      setActiveTab("raiox-beta");
    }

    // Listen for custom event to navigate to tab
    const handleNavigateToTab = (event: any) => {
      setActiveTab(event.detail.tabId);
      setSearchParams({ tab: event.detail.tabId });
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

  // Define tab content components
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'raiox-beta':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <PersonalInsightsModule fullWidth={true} />
            <div className="grid grid-cols-1 gap-6">
              <RecommendationsModule fullWidth={true} />
              <RecommendedActionsModule fullWidth={true} />
            </div>
          </div>
        );
      case 'raiox-full':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            <div className="lg:col-span-1">
              <ClientProfileModule />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecommendationsModule />
              <RecommendedActionsModule />
              <InteligenciaModule />
              <InvestmentPlanningModule />
              <LifeGoalsModule />
              <DividendModule />
              <AllocationModule />
              <LiquidityReserveModule />
              <FutureProjectionModule />
              <SocialComparisonModule />
              <AIInsightsHubModule />
              <BehavioralFinanceModule />
            </div>
          </div>
        );
      case 'raiox-full-v2':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <ClientProfileModule fullWidth={false} />
            <div className="grid grid-cols-1 gap-6">
              <InvestmentPlanningModule />
              <InteligenciaModule />
            </div>
          </div>
        );
      case 'visao-geral':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <FinancialOverviewModule />
            <div className="grid grid-cols-1 gap-6">
              <AllocationModule />
              <LiquidityReserveModule />
            </div>
          </div>
        );
      case 'insights-ai':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <AIInsightsHubModule fullWidth={false} />
            <SentimentInsightsModule />
          </div>
        );
      case 'investimentos':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <DividendModule fullWidth={false} />
            <div className="grid grid-cols-1 gap-6">
              <SocialComparisonModule />
              <FamousInvestorsModule />
            </div>
          </div>
        );
      case 'planejamento':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <OnePageFinancialPlanModule />
            <div className="grid grid-cols-1 gap-6">
              <LifeGoalsModule />
              <FutureProjectionModule />
            </div>
          </div>
        );
      case 'especiais':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <SteveJobsReportModule />
            <WrappedModule />
          </div>
        );
      case 'comportamento':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <BehavioralFinanceModule />
            <MeuFuturoFinanceiroModule />
          </div>
        );
      case 'chat':
        return (
          <Card className="glass-morphism p-6">
            <CardContent>
              {t("chatModuleContent")}
            </CardContent>
          </Card>
        );
      case 'openfinance':
        return (
          <Card className="glass-morphism p-6">
            <CardContent>
              {t("openFinanceModuleContent")}
            </CardContent>
          </Card>
        );
      case 'banking':
        return (
          <div className="grid grid-cols-1 gap-6 pb-6">
            <WholeBankingModule />
          </div>
        );
      default:
        return (
          <Card className="glass-morphism p-6">
            <CardContent>
              {t("defaultTabContent")}
            </CardContent>
          </Card>
        );
    }
  };

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
                RaioX Full v2
              </TabsTrigger>
              <TabsTrigger 
                value="visao-geral"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="insights-ai"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                <BrainCircuit className="w-4 h-4 mr-2" />
                Insights AI
              </TabsTrigger>
              <TabsTrigger 
                value="investimentos"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-teal-600 data-[state=active]:text-white"
              >
                <LineChart className="w-4 h-4 mr-2" />
                Investimentos
              </TabsTrigger>
              <TabsTrigger 
                value="planejamento"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Planejamento
              </TabsTrigger>
              <TabsTrigger 
                value="especiais"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Especiais
              </TabsTrigger>
              <TabsTrigger 
                value="comportamento"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-sky-600 data-[state=active]:text-white"
              >
                <Book className="w-4 h-4 mr-2" />
                Comportamento
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="raiox-beta">
              {renderTabContent('raiox-beta')}
            </TabsContent>
            <TabsContent value="raiox-full">
              {renderTabContent('raiox-full')}
            </TabsContent>
            <TabsContent value="raiox-full-v2">
              {renderTabContent('raiox-full-v2')}
            </TabsContent>
            <TabsContent value="visao-geral">
              {renderTabContent('visao-geral')}
            </TabsContent>
            <TabsContent value="insights-ai">
              {renderTabContent('insights-ai')}
            </TabsContent>
            <TabsContent value="investimentos">
              {renderTabContent('investimentos')}
            </TabsContent>
            <TabsContent value="planejamento">
              {renderTabContent('planejamento')}
            </TabsContent>
            <TabsContent value="especiais">
              {renderTabContent('especiais')}
            </TabsContent>
            <TabsContent value="comportamento">
              {renderTabContent('comportamento')}
            </TabsContent>
            <TabsContent value="banking">
              {renderTabContent('banking')}
            </TabsContent>
            <TabsContent value="chat">
              {renderTabContent('chat')}
            </TabsContent>
            <TabsContent value="openfinance">
              {renderTabContent('openfinance')}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>

      {/* Tab Content */}
      {activeTab && (
        <div>
          {renderTabContent(activeTab)}
        </div>
      )}
    </>
  );
};

export default RaioXDashboard;
