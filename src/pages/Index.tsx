
import { useState } from "react";
import RaioXDashboard from "@/components/RaioXDashboard";
import ClientSelector from "@/components/ClientSelector";
import { RaioXProvider } from "@/context/RaioXContext";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState("client1");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400">
            Laio Santos RaioX Engine
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Seu assistente financeiro inteligente para análise de carteiras e planejamento
          </p>
        </div>
        
        <ClientSelector 
          selectedClient={selectedClient} 
          setSelectedClient={setSelectedClient} 
        />
        
        <RaioXProvider clientId={selectedClient}>
          <RaioXDashboard />
        </RaioXProvider>
      </div>
    </div>
  );
};

export default Index;
