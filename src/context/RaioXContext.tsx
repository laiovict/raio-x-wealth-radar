
import React, { createContext, useContext, useState, useEffect } from 'react';
import { clientData } from '@/data/clientData';
import { supabase } from "@/integrations/supabase/client";

// Define interfaces for our data structures
export interface RiskItem {
  name: string;
  value: number;
  color: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface FinancialSummary {
  totalAssets: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  investmentBalance: number;
  cashReserves: number;
  debtTotal: number;
  netWorth: number;
  riskProfile: string;
  allocationSummary: {
    stocks: number;
    bonds: number;
    cash: number;
    realEstate: number;
    alternatives: number;
  };
  riskMetrics: RiskItem[];
  creditScore: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  cta: string;
  buttonText: string;
  buttonLink: string;
  completed: boolean;
}

export interface RaioXData {
  clientName: string;
  clientAge: number;
  financialSummary: FinancialSummary;
  financialInsights: AIInsight[];
  recommendedActions: RecommendedAction[];
  assetAllocation: {
    equities: number;
    fixedIncome: number;
    alternatives: number;
    cash: number;
    realEstate: number;
  };
  openFinanceMonths: number;
}

interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: number | null;
}

const defaultContext: RaioXContextProps = {
  data: clientData,
  hasOpenFinance: false,
  selectedClient: null
};

const RaioXContext = createContext<RaioXContextProps>(defaultContext);

export const RaioXProvider = ({ 
  children, 
  clientId = "client1",
  hasOpenFinance = false,
  selectedClient = null
}: { 
  children: React.ReactNode, 
  clientId?: string,
  hasOpenFinance?: boolean,
  selectedClient?: number | null 
}) => {
  const [data, setData] = useState<RaioXData>({...clientData});

  // Function to generate customized data for a specific client
  const generateClientData = (clientNumber: number): RaioXData => {
    // Special case for Laio Santos (client 240275)
    if (clientNumber === 240275) {
      return {
        clientName: "Laio Santos",
        clientAge: 32,
        financialSummary: {
          ...clientData.financialSummary,
          totalAssets: 1250000,
          monthlyIncome: 35000,
          investmentBalance: 850000,
          netWorth: 1120000,
          riskProfile: "Moderado-Agressivo",
          riskMetrics: [
            { name: "Volatilidade", value: 65, color: "#4CAF50" },
            { name: "Exposição a Renda Variável", value: 72, color: "#FFC107" },
            { name: "Concentração", value: 45, color: "#2196F3" },
          ]
        },
        financialInsights: [
          {
            id: "1",
            title: "Alto potencial para diversificação internacional",
            description: "Sua carteira tem baixa exposição a mercados internacionais, o que representa uma oportunidade de diversificação.",
            category: "allocation"
          },
          {
            id: "2",
            title: "Concentração em tecnologia",
            description: "Seus investimentos em ações estão concentrados no setor de tecnologia, o que aumenta a volatilidade da carteira.",
            category: "risk"
          },
          {
            id: "3",
            title: "Fluxo de caixa positivo",
            description: "Sua taxa de poupança de 43% está acima da média para sua faixa etária e renda.",
            category: "savings"
          },
          {
            id: "4",
            title: "Oportunidade em renda fixa",
            description: "Com a atual curva de juros, há oportunidade para aumentar sua alocação em títulos públicos de longo prazo.",
            category: "opportunity"
          }
        ],
        recommendedActions: [
          {
            id: "1",
            title: "Diversificar investimentos internacionais",
            description: "Adicione ETFs globais para reduzir a concentração no mercado brasileiro",
            impact: "high",
            effort: "low",
            cta: "Abrir posição em IVVB11 ou BDRs selecionados",
            buttonText: "Executar",
            buttonLink: "#",
            completed: false
          },
          {
            id: "2",
            title: "Rebalancear carteira de ações",
            description: "Reduzir exposição ao setor de tecnologia e aumentar em setores defensivos",
            impact: "medium",
            effort: "medium",
            cta: "Agendar conversa com assessor para rebalanceamento",
            buttonText: "Agendar",
            buttonLink: "#",
            completed: false
          }
        ],
        assetAllocation: {
          equities: 55,
          fixedIncome: 25,
          alternatives: 10,
          cash: 5,
          realEstate: 5
        },
        openFinanceMonths: 12
      };
    }

    // Generate synthetic data for other clients based on account number
    const seed = clientNumber % 1000;
    const riskProfiles = ["Conservador", "Moderado-Conservador", "Moderado", "Moderado-Agressivo", "Agressivo"];
    const riskProfileIndex = seed % 5;
    
    // Use the seed to create variation in the data
    const variationFactor = (seed % 20) / 10 + 0.5; // Range from 0.5 to 2.5
    
    return {
      clientName: `Cliente ${clientNumber}`,
      clientAge: 25 + (seed % 40), // Age between 25 and 64
      financialSummary: {
        ...clientData.financialSummary,
        totalAssets: Math.round(clientData.financialSummary.totalAssets * variationFactor),
        monthlyIncome: Math.round(clientData.financialSummary.monthlyIncome * variationFactor),
        investmentBalance: Math.round(clientData.financialSummary.investmentBalance * variationFactor),
        netWorth: Math.round(clientData.financialSummary.netWorth * variationFactor),
        riskProfile: riskProfiles[riskProfileIndex],
        riskMetrics: [
          { name: "Volatilidade", value: 20 + (seed % 60), color: "#4CAF50" },
          { name: "Exposição a Renda Variável", value: 15 + (seed % 70), color: "#FFC107" },
          { name: "Concentração", value: 30 + (seed % 50), color: "#2196F3" },
        ]
      },
      financialInsights: clientData.financialInsights,
      recommendedActions: clientData.recommendedActions,
      assetAllocation: {
        equities: 20 + (riskProfileIndex * 10) + (seed % 10),
        fixedIncome: 60 - (riskProfileIndex * 8) - (seed % 10),
        alternatives: 5 + (riskProfileIndex * 2),
        cash: 10 - (riskProfileIndex * 1),
        realEstate: 5 + (riskProfileIndex * 1)
      },
      openFinanceMonths: seed % 12
    };
  };

  // Fetch client data from Supabase or generate synthetic data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (selectedClient) {
          // Try to fetch real data from Supabase
          const { data: clientPortfolioData, error: portfolioError } = await supabase
            .from('investor_portfolio_summary')
            .select('*')
            .eq('investor_account_on_brokerage_house', selectedClient)
            .single();
            
          if (portfolioError || !clientPortfolioData) {
            // If no data found, generate synthetic data
            console.log("Using synthetic data for client:", selectedClient);
            const customData = generateClientData(selectedClient);
            setData(customData);
          } else {
            // Process and use the real data
            console.log("Using real data for client:", selectedClient);
            
            // Create data structure based on real data
            const realClientData: RaioXData = {
              clientName: `Cliente ${selectedClient}`,
              clientAge: 35 + (selectedClient % 30), // Synthetic age
              financialSummary: {
                ...clientData.financialSummary,
                totalAssets: parseFloat(clientPortfolioData.total_portfolio_value || "500000"),
                monthlyIncome: 15000 + (selectedClient % 15000),
                monthlyExpenses: 8000 + (selectedClient % 8000),
                investmentBalance: parseFloat(clientPortfolioData.total_portfolio_value || "450000"),
                savingsRate: 30 + (selectedClient % 20),
                cashReserves: 50000 + (selectedClient % 30000),
                debtTotal: 20000 + (selectedClient % 50000),
                netWorth: parseFloat(clientPortfolioData.total_portfolio_value || "450000") - (20000 + (selectedClient % 50000)),
                riskProfile: ["Conservador", "Moderado-Conservador", "Moderado", "Moderado-Agressivo", "Agressivo"][selectedClient % 5],
                allocationSummary: {
                  stocks: clientPortfolioData.stocks_representation ? parseFloat(clientPortfolioData.stocks_representation) : 25,
                  bonds: clientPortfolioData.fixed_income_representation || 45,
                  cash: 5 + (selectedClient % 10),
                  realEstate: clientPortfolioData.real_estate_representation || 5,
                  alternatives: 10 + (selectedClient % 10)
                },
                riskMetrics: [
                  { name: "Volatilidade", value: 20 + (selectedClient % 60), color: "#4CAF50" },
                  { name: "Exposição a Renda Variável", value: 15 + (selectedClient % 70), color: "#FFC107" },
                  { name: "Concentração", value: 30 + (selectedClient % 50), color: "#2196F3" },
                ],
                creditScore: 650 + (selectedClient % 200)
              },
              financialInsights: clientData.financialInsights,
              recommendedActions: clientData.recommendedActions,
              assetAllocation: {
                equities: clientPortfolioData.stocks_representation ? parseFloat(clientPortfolioData.stocks_representation) : 25,
                fixedIncome: clientPortfolioData.fixed_income_representation || 45,
                alternatives: 10 + (selectedClient % 10),
                cash: 5 + (selectedClient % 10),
                realEstate: clientPortfolioData.real_estate_representation || 5
              },
              openFinanceMonths: hasOpenFinance ? (3 + (selectedClient % 9)) : 0
            };
            
            setData(realClientData);
          }
        } else {
          // If no client selected, use default data
          setData({...clientData});
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        setData({...clientData}); // Use default data on error
      }
    };
    
    fetchClientData();
  }, [selectedClient, hasOpenFinance]);

  return (
    <RaioXContext.Provider value={{ data, hasOpenFinance, selectedClient }}>
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
