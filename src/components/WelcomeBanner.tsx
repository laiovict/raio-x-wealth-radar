
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Shield, Lock } from "lucide-react";

interface WelcomeBannerProps {
  selectedClient: number | null;
}

interface ClientInfo {
  name: string;
  cpf?: string;
}

const clientData: Record<string, ClientInfo> = {
  // Known clients with their info
  "240275": { name: "Laio Santos", cpf: "13701356705" },
  // Add fallback examples for common client IDs
  "12345678": { name: "Cliente Exemplo", cpf: "123.456.789-10" }
};

const WelcomeBanner = ({ selectedClient }: WelcomeBannerProps) => {
  const [clientName, setClientName] = useState<string>("");
  const { t } = useLanguage();
  const { hasOpenFinance } = useRaioX();
  
  useEffect(() => {
    const fetchClientInfo = async () => {
      if (!selectedClient) return;
      
      const clientId = selectedClient.toString();
      
      try {
        // First check if we have client info in our predefined data
        if (clientData[clientId]) {
          setClientName(clientData[clientId].name);
          console.log("Found client in predefined data:", clientData[clientId]);
          return;
        }
        
        // If not in predefined data, try to fetch from database
        const { data, error } = await supabase
          .from('investor_portfolio_summary')
          .select('*')
          .eq('investor_account_on_brokerage_house', selectedClient)
          .single();
        
        if (error) {
          console.error("Error fetching client data:", error);
          setClientName(`Cliente ${clientId}`);
          return;
        }
        
        // Here we would normally extract client name from data
        // For now, we'll use a placeholder
        setClientName(`Cliente ${clientId}`);
        
      } catch (error) {
        console.error("Error in client data fetch:", error);
        setClientName(`Cliente ${clientId}`);
      }
    };
    
    fetchClientInfo();
  }, [selectedClient]);
  
  // Extract the first name from clientName
  const getFirstName = () => {
    if (!clientName) return "";
    return clientName.split(" ")[0];
  };
  
  if (!selectedClient || !clientName) return null;
  
  return (
    <Card className="w-full bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-white/10 p-6 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light text-white">
            Bem-vindo, <span className="font-semibold">{getFirstName()}</span>
          </h2>
          <p className="text-blue-200/70">
            {t('welcomeMessagePortfolio')}
          </p>
        </div>
        
        <div className="flex items-center">
          {hasOpenFinance ? (
            <div className="bg-green-600/20 text-green-400 text-sm px-4 py-2 rounded-full flex items-center border border-green-500/30">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Open Finance <span className="font-medium ml-1">Ativo</span>
            </div>
          ) : (
            <div className="bg-gray-700/30 text-gray-300 text-sm px-4 py-2 rounded-full flex items-center border border-gray-600/30">
              <Lock className="h-5 w-5 mr-2 text-gray-300" />
              Open Finance <span className="font-medium ml-1">Inativo</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WelcomeBanner;
