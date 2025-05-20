
import React, { createContext, useContext, useState, useEffect } from "react";
import clientData from "@/data/clientData";
import { supabase } from "@/integrations/supabase/client";

interface RaioXContextType {
  data: any;
  hasOpenFinance: boolean;
  selectedClient: number | null;
}

export const RaioXContext = createContext<RaioXContextType>({
  data: {},
  hasOpenFinance: false,
  selectedClient: null,
});

interface RaioXProviderProps {
  children: React.ReactNode;
  clientId?: string;
  hasOpenFinance?: boolean;
  selectedClient?: number | null;
}

export const RaioXProvider: React.FC<RaioXProviderProps> = ({
  children,
  clientId = 'client1',
  hasOpenFinance = false,
  selectedClient = null,
}) => {
  const [data, setData] = useState(clientData[clientId]);
  
  // Effect to fetch client data when selectedClient changes
  useEffect(() => {
    const fetchClientData = async () => {
      if (selectedClient) {
        try {
          console.log(`Fetching data for client ID: ${selectedClient}`);
          
          // Fetch portfolio summary
          const { data: portfolioData, error: portfolioError } = await supabase
            .from('investor_portfolio_summary')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient)
            .single();

          if (portfolioError) {
            console.error('Error fetching portfolio data:', portfolioError);
            return;
          }

          // Fetch fixed income data
          const { data: fixedIncomeData, error: fixedIncomeError } = await supabase
            .from('fixed_income')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient);

          if (fixedIncomeError) {
            console.error('Error fetching fixed income data:', fixedIncomeError);
          }

          // Fetch investment funds data
          const { data: fundsData, error: fundsError } = await supabase
            .from('investment_funds')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient);

          if (fundsError) {
            console.error('Error fetching investment funds data:', fundsError);
          }

          // Fetch stocks data
          const { data: stocksData, error: stocksError } = await supabase
            .from('stocks')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient);

          if (stocksError) {
            console.error('Error fetching stocks data:', stocksError);
          }

          // Fetch real estate data
          const { data: realEstateData, error: realEstateError } = await supabase
            .from('real_estate')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient);

          if (realEstateError) {
            console.error('Error fetching real estate data:', realEstateError);
          }

          // Fetch profitability data
          const { data: profitabilityData, error: profitabilityError } = await supabase
            .from('profitability_ytd')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient)
            .single();

          if (profitabilityError && profitabilityError.code !== 'PGRST116') {
            // PGRST116 is "Results contain 0 rows" - not an error if client has no profitability data
            console.error('Error fetching profitability data:', profitabilityError);
          }

          // Adapt the data to match the existing structure
          const adaptedData = {
            ...data,
            clientName: `Cliente ${selectedClient}`,
            portfolioSummary: portfolioData || {},
            fixedIncome: fixedIncomeData || [],
            investmentFunds: fundsData || [],
            stocks: stocksData || [],
            realEstate: realEstateData || [],
            profitability: profitabilityData || {},
          };

          setData(adaptedData);
          console.log('Client data updated:', adaptedData);
        } catch (error) {
          console.error('Error in client data fetch:', error);
        }
      } else {
        // If no client selected, use default data
        setData(clientData[clientId]);
      }
    };

    fetchClientData();
  }, [selectedClient, clientId]);

  return (
    <RaioXContext.Provider
      value={{
        data,
        hasOpenFinance,
        selectedClient,
      }}
    >
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
