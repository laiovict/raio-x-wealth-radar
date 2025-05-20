
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ClientSelector from "@/components/ClientSelector";
import RaioXDashboard from "@/components/RaioXDashboard";
import { RaioXProvider } from "@/context/RaioXContext";
import PluggyConnectModal from "@/components/PluggyConnectModal";
import { Download, ArrowLeft, Code, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import WelcomeBanner from "@/components/WelcomeBanner";
import TopControls from "@/components/TopControls";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  
  const getUserInitials = () => {
    if (!userData?.clientName) return "UN";
    return userData.clientName.split(" ")
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
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
        <nav className="backdrop-blur-md bg-black/20 border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          {/* Left section - Logo only */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
              alt="Reinvent Logo"
              className="h-8 w-auto"
            />
          </div>
          
          {/* Center section - Raio-X Financeiro title */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-light tracking-wider text-white">
              Raio-X <span className="font-medium">Financeiro</span>
            </h1>
          </div>
          
          {/* Right section - Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Show API Docs button for all users */}
            <Button 
              variant="outline" 
              className="bg-indigo-500/30 hover:bg-indigo-500/50 border-indigo-400/30 text-indigo-200 rounded-full text-sm font-normal px-5"
              onClick={() => navigate("/api-docs")}
            >
              <Code className="mr-2 h-4 w-4" />
              API Docs
            </Button>
          
            {selectedClient && (
              <Button 
                className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full text-sm font-normal px-5"
                onClick={() => window.open(getMonthlyReportUrl(), '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Relatório Mensal
              </Button>
            )}
            
            {/* Show PDF export for both advisor and client */}
            {selectedClient && (
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10 rounded-full text-sm font-normal px-5"
                onClick={() => handlePdfPreview('pdf')}
              >
                Exportar PDF
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              onClick={handleLogout}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sair
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-0 h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 bg-indigo-600/60 hover:bg-indigo-600/80 transition-colors">
                    <AvatarFallback className="text-sm text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gradient-to-br from-[#171723] to-[#121218] border border-white/10 text-white">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">{userData?.clientName || "Usuário"}</p>
                    <p className="text-xs text-gray-400">Gerenciar Conta</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                  Preferências
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  className="text-white focus:bg-white/10 focus:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        
        <div className="flex-grow overflow-auto">
          <div className="container mx-auto px-4 sm:px-6 pt-4">
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
              userRole={userRole} // Pass the userRole to RaioXDashboard
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
