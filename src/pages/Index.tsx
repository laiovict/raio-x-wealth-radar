import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ClientSelector from "@/components/ClientSelector";
import RaioXDashboard from "@/components/RaioXDashboard";
import { RaioXProvider } from "@/context/RaioXContext";
import PluggyConnectModal from "@/components/PluggyConnectModal";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import TopNavigation from "@/components/TopNavigation";
import TopControls from "@/components/TopControls";

// Define the user data interface
interface UserData {
  clientName: string;
  clientId?: number;
}

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
  const [userData, setUserData] = useState<UserData>({ clientName: "Usuário" });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in based on localStorage
    const storedUserRole = localStorage.getItem("userRole");
    const clientId = localStorage.getItem("clientId");
    const selectedClientId = localStorage.getItem("selectedClientId");
    
    if (storedUserRole === "advisor") {
      setIsLoggedIn(true);
      setUserRole("advisor");
      setUserData({ clientName: "Consultor" });
      // If there's a previously selected client, use it
      if (selectedClientId) {
        setSelectedClient(parseInt(selectedClientId));
        // For demo purposes, set a client name
        setUserData({ clientName: "Cliente Selecionado", clientId: parseInt(selectedClientId) });
      }
    } else if (storedUserRole === "client" && clientId) {
      setIsLoggedIn(true);
      setUserRole("client");
      setSelectedClient(parseInt(clientId));
      setUserData({ clientName: "Cliente", clientId: parseInt(clientId) });
    } else {
      // Redirect to login if not logged in
      navigate("/auth");
    }
    
    // Garantir que a tela de loading seja exibida por completo (7 segundos)
    setTimeout(() => {
      setLoading(false);
    }, 7000);
    
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
    localStorage.setItem("selectedClientId", clientId);
    setSelectedClient(parseInt(clientId));
    // Update user data when client is selected
    setUserData({ clientName: `Cliente ${clientId}`, clientId: parseInt(clientId) });
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
    localStorage.removeItem("selectedClientId");
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

  // Handle logo click - return to home/default page
  const handleLogoClick = () => {
    // Reset to default view
    document.dispatchEvent(new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'overview' }
    }));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingScreen forceShow={true} />;
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
        <TopNavigation 
          selectedClient={selectedClient}
          userData={userData}
          handleLogout={handleLogout}
          handleLogoClick={handleLogoClick}
          getMonthlyReportUrl={getMonthlyReportUrl}
        />
        
        <div className="flex-grow overflow-auto">
          <div className="container mx-auto px-3 sm:px-6 pt-4">
            <div className="mb-6">
              {userRole === "advisor" && <ClientSelector onClientSelect={handleClientSelect} />}
              
              {selectedClient && (
                <TopControls 
                  isAdvisor={userRole === "advisor"} 
                  onOpenFinanceToggle={handleOpenFinanceToggle} 
                  hasOpenFinance={hasOpenFinance}
                />
              )}
            </div>

            <RaioXDashboard
              showPdfPreview={showPdfPreview}
              onClosePdfPreview={() => setShowPdfPreview(false)}
              mediaType={mediaType}
              isClientFull={hasOpenFinance}
              onOpenFinanceActivate={handleOpenFinanceActivate}
              userRole={userRole}
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
