
import { useState, useEffect } from "react";
import RaioXDashboard from "@/components/RaioXDashboard";
import ClientSelector from "@/components/ClientSelector";
import { RaioXProvider } from "@/context/RaioXContext";
import { FileDown, Podcast, Video, Lock, Shield, ToggleLeft, ToggleRight, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PluggyConnectModal from "@/components/PluggyConnectModal";
import { Button } from "@/components/ui/button";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [mediaType, setMediaType] = useState("pdf");
  const [hasOpenFinance, setHasOpenFinance] = useState(false);
  const [showPluggyModal, setShowPluggyModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const isMobile = useMobileBreakpoint();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Check auth status on component mount
  useEffect(() => {
    // Get auth status from localStorage
    const storedUserRole = localStorage.getItem('userRole');
    const storedClientId = localStorage.getItem('clientId');
    
    if (!storedUserRole) {
      // Redirect to login if not authenticated
      navigate('/auth');
    } else {
      setUserRole(storedUserRole);
      
      // If client role, set the client ID
      if (storedUserRole === 'client' && storedClientId) {
        setClientId(storedClientId);
        setSelectedClient(parseInt(storedClientId));
      }
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('clientId');
    navigate('/auth');
  };
  
  const handleExportMedia = (type: string) => {
    setMediaType(type);
    setShowPdfPreview(true);
  };

  const handleClosePdfPreview = () => {
    setShowPdfPreview(false);
  };

  const toggleOpenFinance = () => {
    if (!hasOpenFinance) {
      // Se o OpenFinance não estiver ativo, abre o modal do Pluggy
      setShowPluggyModal(true);
    } else {
      // Se já estiver ativo, apenas desativa
      setHasOpenFinance(false);
    }
  };

  const handlePluggySuccess = () => {
    setHasOpenFinance(true);
    setShowPluggyModal(false);
  };

  // Listen for the custom event to activate OpenFinance from other components
  useEffect(() => {
    const handleActivateOpenFinance = () => {
      if (!hasOpenFinance) {
        setShowPluggyModal(true);
      }
    };

    // Add event listener
    document.addEventListener('activate-openfinance', handleActivateOpenFinance);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('activate-openfinance', handleActivateOpenFinance);
    };
  }, [hasOpenFinance]);

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId ? parseInt(clientId) : null);
  };
  
  // Check if loading auth state
  if (userRole === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] text-gray-100 overflow-x-hidden">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Reinvent
            </h1>
          </div>
          
          {isMobile ? (
            <div className="flex items-center gap-4">
              <LanguageSelector />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 p-4 flex flex-col">
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Lock className="h-6 w-6 rotate-45" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-center space-y-6 pt-12">
                    <button 
                      className={`flex items-center px-6 py-3 rounded-lg transition-colors w-full justify-center ${
                        hasOpenFinance 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-gray-700/30 text-gray-400'
                      }`}
                      onClick={() => {
                        toggleOpenFinance();
                        setMobileMenuOpen(false);
                      }}
                    >
                      {hasOpenFinance ? (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          <span>{t('openFinanceActive')}</span>
                          <ToggleRight className="h-5 w-5 ml-2" />
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          <span>{t('openFinanceInactive')}</span>
                          <ToggleLeft className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="purpleGradient" size="lg" className="flex items-center gap-2 w-full justify-center">
                          <FileDown className="h-4 w-4" />
                          {t('exportDiagnosis')}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl">
                        <DropdownMenuItem 
                          onClick={() => {
                            handleExportMedia("pdf");
                            setMobileMenuOpen(false);
                          }}
                          className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                        >
                          <FileDown className="h-4 w-4" />
                          <span>{t('pdf')}</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                          onClick={() => {
                            handleExportMedia("podcast");
                            setMobileMenuOpen(false);
                          }}
                          className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                        >
                          <Podcast className="h-4 w-4" />
                          <span>{t('podcast')}</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                          onClick={() => {
                            handleExportMedia("video");
                            setMobileMenuOpen(false);
                          }}
                          className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                        >
                          <Video className="h-4 w-4" />
                          <span>{t('video')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t('logout')}
                    </Button>
                    
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-medium">
                      {userRole === 'advisor' ? 'RM' : 'CL'}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-medium">
                {userRole === 'advisor' ? 'RM' : 'CL'}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            
              <div className="flex items-center mr-2">
                <button 
                  className={`flex items-center px-3 py-1 rounded-full transition-colors ${
                    hasOpenFinance 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-gray-700/30 text-gray-400'
                  }`}
                  onClick={toggleOpenFinance}
                >
                  {hasOpenFinance ? (
                    <>
                      <Shield className="h-3.5 w-3.5 mr-1" />
                      <span>{t('openFinanceActive')}</span>
                      <ToggleRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 mr-1" />
                      <span>{t('openFinanceInactive')}</span>
                      <ToggleLeft className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="purpleGradient" size="sm" className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    {t('exportDiagnosis')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl">
                  <DropdownMenuItem 
                    onClick={() => handleExportMedia("pdf")}
                    className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                  >
                    <FileDown className="h-4 w-4" />
                    <span>{t('pdf')}</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => handleExportMedia("podcast")}
                    className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                  >
                    <Podcast className="h-4 w-4" />
                    <span>{t('podcast')}</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => handleExportMedia("video")}
                    className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                  >
                    <Video className="h-4 w-4" />
                    <span>{t('video')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300"
                onClick={handleLogout}
              >
                {t('logout')}
              </Button>
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-medium">
                {userRole === 'advisor' ? 'RM' : 'CL'}
              </div>
            </div>
          )}
        </div>
        
        {/* Only show ClientSelector for advisor role */}
        {userRole === 'advisor' && (
          <ClientSelector onClientSelect={handleClientSelect} />
        )}
        
        <RaioXProvider 
          clientId={clientId || "client1"} 
          hasOpenFinance={hasOpenFinance}
          selectedClient={selectedClient}
        >
          <RaioXDashboard 
            showPdfPreview={showPdfPreview} 
            onClosePdfPreview={handleClosePdfPreview}
            mediaType={mediaType}
            isClientFull={true}
          />
        </RaioXProvider>

        {/* Pluggy Connect Modal */}
        <PluggyConnectModal 
          isOpen={showPluggyModal}
          onClose={() => setShowPluggyModal(false)}
          onSuccess={handlePluggySuccess}
        />
      </div>
    </div>
  );
};

export default Index;
