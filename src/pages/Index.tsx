
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

const Index = () => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [mediaType, setMediaType] = useState("pdf");
  const [isClientFull] = useState(true); // Em produção, isso viria da autenticação
  const [hasOpenFinance, setHasOpenFinance] = useState(false);
  const [showPluggyModal, setShowPluggyModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const isMobile = useMobileBreakpoint();
  const { t } = useLanguage();
  
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
                        
                        {isClientFull ? (
                          <>
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
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem 
                              className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                            >
                              <Lock className="h-4 w-4" />
                              <span>{t('podcast')} ({t('onlyClientsFeature')})</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                            >
                              <Lock className="h-4 w-4" />
                              <span>{t('video')} ({t('onlyClientsFeature')})</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-medium">
                      JO
                    </div>
                  </div>
                </div>
              )}
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-medium">
                JO
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
                  
                  {isClientFull ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem 
                        className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                      >
                        <Lock className="h-4 w-4" />
                        <span>{t('podcast')} ({t('onlyClientsFeature')})</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                      >
                        <Lock className="h-4 w-4" />
                        <span>{t('video')} ({t('onlyClientsFeature')})</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button className="rounded-full p-2 text-white bg-white/10 hover:bg-white/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-medium">
                JO
              </div>
            </div>
          )}
        </div>
        
        <ClientSelector onClientSelect={handleClientSelect} />
        
        <RaioXProvider 
          clientId="client1" 
          hasOpenFinance={hasOpenFinance}
          selectedClient={selectedClient}
        >
          <RaioXDashboard 
            showPdfPreview={showPdfPreview} 
            onClosePdfPreview={handleClosePdfPreview}
            mediaType={mediaType}
            isClientFull={isClientFull} 
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
