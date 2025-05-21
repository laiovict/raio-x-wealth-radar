
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRaioX } from "@/context/RaioXContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useFeatureFlags } from "@/context/FeatureFlagContext";
import { getMonthlyReportUrl } from "@/utils/reportUtils";
import { generatePdf } from "@/utils/pdfGenerator";
import { saveAs } from 'file-saver';
import { Eye, Download, XCircle } from "lucide-react";

// Import Module Components
import PersonalInsightsModule from "@/components/modules/PersonalInsightsModule";
import RecommendationsModule from "@/components/modules/RecommendationsModule";
import RecommendedActionsModule from "@/components/modules/RecommendedActionsModule";
import InvestmentPlanningModule from "@/components/modules/InvestmentPlanningModule";
import InteligenciaModule from "@/components/modules/InteligenciaModule";
import ClientProfileModule from "@/components/modules/ClientProfileModule";

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

  // Function to generate and download the report
  const handleDownloadReport = async () => {
    try {
      // Generate the PDF
      const clientId = typeof selectedClient === 'string' ? parseInt(selectedClient, 10) : selectedClient;
      const pdfBlob = await generatePdf(clientId);

      // Save the PDF
      saveAs(pdfBlob, `raiox-report-${selectedClient}.pdf`);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <ClientProfileModule />
            <div className="grid grid-cols-1 gap-6">
              <RecommendationsModule />
              <RecommendedActionsModule />
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

      {/* Tabbed Content */}
      {renderTabContent(activeTab || 'raiox-beta')}
    </>
  );
};

export default RaioXDashboard;
