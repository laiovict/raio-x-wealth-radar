
import { useState } from "react";
import RaioXDashboard from "@/components/RaioXDashboard";
import ClientSelector from "@/components/ClientSelector";
import { RaioXProvider } from "@/context/RaioXContext";

const Index = () => {
  const [selectedClient, setSelectedClient] = useState("client1");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              Reinvent
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 text-white hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
              JO
            </div>
          </div>
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
