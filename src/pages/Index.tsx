
import { useState } from "react";
import RaioXDashboard from "@/components/RaioXDashboard";
import ClientSelector from "@/components/ClientSelector";
import { RaioXProvider } from "@/context/RaioXContext";
import { FileDown } from "lucide-react";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState("client1");
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const handleExportPdf = () => {
    setShowPdfPreview(true);
  };

  const handleClosePdfPreview = () => {
    setShowPdfPreview(false);
  };

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
            <button 
              onClick={handleExportPdf}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all"
            >
              <FileDown className="h-4 w-4" />
              Exportar Diagnóstico
            </button>
            
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
        
        <RaioXProvider clientId={selectedClient}>
          <RaioXDashboard showPdfPreview={showPdfPreview} onClosePdfPreview={handleClosePdfPreview} />
        </RaioXProvider>
      </div>
    </div>
  );
};

export default Index;
