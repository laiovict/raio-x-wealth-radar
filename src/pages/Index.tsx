
import { useState, useEffect } from "react";
import RaioXDashboard from "@/components/RaioXDashboard";
import ClientSelector from "@/components/ClientSelector";
import { RaioXProvider } from "@/context/RaioXContext";
import { FileDown, Podcast, Video, Lock, Shield, ToggleLeft, ToggleRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PluggyConnectModal from "@/components/PluggyConnectModal";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState("client1");
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [mediaType, setMediaType] = useState("pdf");
  const [isClientFull] = useState(true); // Em produção, isso viria da autenticação
  const [hasOpenFinance, setHasOpenFinance] = useState(false); // Alterado para false como padrão
  const [showPluggyModal, setShowPluggyModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Reinvent
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
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
                    <span>OpenFinance Ativo</span>
                    <ToggleRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    <span>OpenFinance Inativo</span>
                    <ToggleLeft className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all">
                  <FileDown className="h-4 w-4" />
                  Exportar Diagnóstico
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl">
                <DropdownMenuItem 
                  onClick={() => handleExportMedia("pdf")}
                  className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                >
                  <FileDown className="h-4 w-4" />
                  <span>PDF</span>
                </DropdownMenuItem>
                
                {isClientFull ? (
                  <>
                    <DropdownMenuItem 
                      onClick={() => handleExportMedia("podcast")}
                      className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                    >
                      <Podcast className="h-4 w-4" />
                      <span>Podcast</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => handleExportMedia("video")}
                      className="text-black flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                    >
                      <Video className="h-4 w-4" />
                      <span>Vídeo</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem 
                      className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Podcast (Apenas clientes)</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      className="text-gray-500 flex items-center gap-2 cursor-not-allowed"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Vídeo (Apenas clientes)</span>
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
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-medium">
              JO
            </div>
          </div>
        </div>
        
        <ClientSelector 
          selectedClient={selectedClient} 
          setSelectedClient={setSelectedClient} 
        />
        
        <RaioXProvider clientId={selectedClient} hasOpenFinance={hasOpenFinance}>
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
