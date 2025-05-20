
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ClientSelector from "@/components/ClientSelector";
import RaioXDashboard from "@/components/RaioXDashboard";
import LanguageSelector from "@/components/LanguageSelector";
import { RaioXProvider } from "@/context/RaioXContext";
import PluggyConnectModal from "@/components/PluggyConnectModal";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import WelcomeBanner from "@/components/WelcomeBanner";
import TopControls from "@/components/TopControls";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [hasOpenFinance, setHasOpenFinance] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [mediaType, setMediaType] = useState("pdf");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPluggyModal, setShowPluggyModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"advisor" | "client" | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in based on localStorage
    const storedUserRole = localStorage.getItem("userRole");
    const clientId = localStorage.getItem("clientId");
    
    if (storedUserRole === "advisor") {
      setIsLoggedIn(true);
      setUserRole("advisor");
    } else if (storedUserRole === "client" && clientId) {
      setIsLoggedIn(true);
      setUserRole("client");
      setSelectedClient(parseInt(clientId));
    } else {
      // Redirect to login if not logged in
      navigate("/auth");
    }
    
    // Simulate loading time for the agent screen
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Make sure body and main container have proper overflow settings
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    // Listen for custom event for OpenFinance activation
    const handleOpenFinanceEvent = () => {
      setShowPluggyModal(true);
    };
    
    document.addEventListener('activate-openfinance', handleOpenFinanceEvent);
    
    return () => {
      document.removeEventListener('activate-openfinance', handleOpenFinanceEvent);
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [navigate]);

  const handleClientSelect = (clientId: string) => {
    console.log("Client selected in Index component:", clientId);
    setSelectedClient(parseInt(clientId));
  };

  const handleOpenFinanceActivate = () => {
    setShowPluggyModal(true);
  };

  const handlePluggySuccess = () => {
    setShowPluggyModal(false);
    setHasOpenFinance(true);
  };

  const handlePluggyClose = () => {
    setShowPluggyModal(false);
  };

  const handlePdfPreview = (type: string) => {
    setMediaType(type);
    setShowPdfPreview(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("clientId");
    setIsLoggedIn(false);
    setUserRole(null);
    setSelectedClient(null);
    navigate("/auth");
  };
  
  const handleOpenFinanceToggle = () => {
    if (!hasOpenFinance) {
      setShowPluggyModal(true);
    } else {
      setHasOpenFinance(false);
    }
  };
  
  // Generate monthly report URL based on current date
  const getMonthlyReportUrl = () => {
    const now = new Date();
    const today = now.getDate();
    const isBeforeFifthWorkingDay = today < 5; // Simplified check for 5th working day
    
    let reportMonth, reportYear;
    
    if (isBeforeFifthWorkingDay) {
      // If before 5th working day, use report from 2 months ago
      reportMonth = now.getMonth() - 1;
      reportYear = now.getFullYear();
      
      // Handle January case (need to go back to previous year)
      if (reportMonth < 0) {
        reportMonth = 11; // December
        reportYear = reportYear - 1;
      }
    } else {
      // Otherwise use report from last month
      reportMonth = now.getMonth();
      reportYear = now.getFullYear();
      
      // Handle January case (need to go back to previous year)
      if (reportMonth < 0) {
        reportMonth = 11; // December
        reportYear = reportYear - 1;
      }
    }
    
    // Format month as MM
    const formattedMonth = (reportMonth + 1).toString().padStart(2, '0');
    
    // Return the URL for the report
    return `https://report.letsreinvent.vc/reinvent/5b552db1-7aa6-4f0b-b25e-f145a2688936/report?period=${reportYear}${formattedMonth}&reportId=c767ceee-e4f4-449a-bd3e-ea00a5567880&clientId=${selectedClient || ''}`;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Redirect to auth if not logged in
  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <RaioXProvider 
      hasOpenFinance={hasOpenFinance}
      selectedClient={selectedClient}
    >
      <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] text-white">
        <nav className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
              alt="Reinvent Logo"
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Raio-X Financeiro
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {selectedClient && (
              <Button 
                className="bg-gradient-to-r from-emerald-600 to-green-700 text-white hover:from-emerald-700 hover:to-green-800"
                onClick={() => window.open(getMonthlyReportUrl(), '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Relatório Mensal
              </Button>
            )}
            
            {userRole === "advisor" ? (
              <Button
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
                onClick={() => handlePdfPreview('pdf')}
              >
                Exportar PDF
              </Button>
            ) : null}
            
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </nav>
        
        <div className="flex-grow overflow-auto">
          <div className="container mx-auto px-4 sm:px-6 pt-4">
            {userRole === "advisor" && <ClientSelector onClientSelect={handleClientSelect} />}

            {selectedClient && (
              <TopControls 
                isAdvisor={userRole === "advisor"} 
                onOpenFinanceToggle={handleOpenFinanceToggle} 
              />
            )}

            <RaioXDashboard
              showPdfPreview={showPdfPreview}
              onClosePdfPreview={() => setShowPdfPreview(false)}
              mediaType={mediaType}
              isClientFull={hasOpenFinance}
              onOpenFinanceActivate={handleOpenFinanceActivate}
            />
          </div>
        </div>
        
        <PluggyConnectModal
          isOpen={showPluggyModal}
          onClose={handlePluggyClose}
          onSuccess={handlePluggySuccess}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
        />
      </div>
    </RaioXProvider>
  );
};

export default Index;
