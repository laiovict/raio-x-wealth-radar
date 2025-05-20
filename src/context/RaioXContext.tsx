
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
  totalLiabilities?: number;
  liquidAssets?: number;
  topRisks?: Array<{ name: string; impact: string; severity: 'high' | 'medium' | 'low' }>;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  cta?: string;
  buttonText: string;
  buttonLink: string;
  completed: boolean;
}

export interface Goal {
  name: string;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  timeframe: string;
  adjustmentNeeded: number;
  category?: string;
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
  // Add the missing properties
  lifeGoals: {
    goals: Goal[];
    summary: string;
  };
  liquidity: {
    currentIdle: number;
    idealReserve: number;
    monthlyExpenses: number;
    idealMonths: number;
    summary: string;
  };
  projection: {
    currentTotal: number;
    monthlyContribution: number;
    scenarios: {
      base: {
        "1 ano": number;
        "3 anos": number;
        "5 anos": number;
      };
      stress: {
        "1 ano": number;
        "3 anos": number;
        "5 anos": number;
      };
    };
  };
  recommendations: Array<{
    action: string;
    description: string;
    urgency: string;
    impact: string;
  }>;
  summary?: string;
}

interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: number | null;
  refreshAIAnalysis?: () => void;
  isAIAnalysisLoading?: boolean;
  financialSummary?: FinancialSummary;
}

// Update the default context with the new properties
const defaultContext: RaioXContextProps = {
  data: {
    ...clientData,
    lifeGoals: {
      goals: [
        {
          name: "Aposentadoria",
          progress: 35,
          currentAmount: 350000,
          targetAmount: 1000000,
          timeframe: "Longo prazo",
          adjustmentNeeded: 15,
          category: "investment"
        },
        {
          name: "Casa própria",
          progress: 60,
          currentAmount: 300000,
          targetAmount: 500000,
          timeframe: "Médio prazo",
          adjustmentNeeded: 0,
          category: "real estate"
        }
      ],
      summary: "Você está no caminho para alcançar a maioria das suas metas, mas pode precisar aumentar suas contribuições para aposentadoria."
    },
    liquidity: {
      currentIdle: 30000,
      idealReserve: 60000,
      monthlyExpenses: 10000,
      idealMonths: 6,
      summary: "Sua reserva de emergência cobre 3 meses de despesas, recomendamos aumentar para 6 meses."
    },
    projection: {
      currentTotal: 850000,
      monthlyContribution: 5000,
      scenarios: {
        base: {
          "1 ano": 950000,
          "3 anos": 1200000,
          "5 anos": 1500000
        },
        stress: {
          "1 ano": 900000,
          "3 anos": 1100000,
          "5 anos": 1350000
        }
      }
    },
    recommendations: [
      {
        action: "Diversificar portfólio internacional",
        description: "Adicionar ETFs globais para reduzir concentração no mercado doméstico",
        urgency: "Médio",
        impact: "Alto"
      },
      {
        action: "Aumentar reserva de emergência",
        description: "Atingir o equivalente a 6 meses de despesas em ativos de alta liquidez",
        urgency: "Alto",
        impact: "Médio"
      }
    ],
    summary: "Seu portfólio está bem diversificado, mas poderia se beneficiar de maior exposição internacional. Sua saúde financeira está em ótimo estado, com fluxo de caixa positivo e bons índices de poupança."
  },
  hasOpenFinance: false,
  selectedClient: null,
  refreshAIAnalysis: () => {},
  isAIAnalysisLoading: false
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
  const [data, setData] = useState<RaioXData>({...defaultContext.data});
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState<boolean>(false);

  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    setIsAIAnalysisLoading(true);
    setTimeout(() => {
      setIsAIAnalysisLoading(false);
    }, 2000);
  };

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
        openFinanceMonths: 12,
        lifeGoals: {
          goals: [
            {
              name: "Aposentadoria aos 55",
              progress: 42,
              currentAmount: 850000,
              targetAmount: 2000000,
              timeframe: "Longo prazo (23 anos)",
              adjustmentNeeded: 10,
              category: "investment"
            },
            {
              name: "Compra de imóvel de veraneio",
              progress: 75,
              currentAmount: 450000,
              targetAmount: 600000,
              timeframe: "Médio prazo (3 anos)",
              adjustmentNeeded: 0,
              category: "real estate"
            },
            {
              name: "Educação dos filhos",
              progress: 25,
              currentAmount: 150000,
              targetAmount: 600000,
              timeframe: "Médio prazo (10 anos)",
              adjustmentNeeded: 15,
              category: "education"
            }
          ],
          summary: "Você está progredindo bem em suas metas de longo prazo, mas pode precisar aumentar os aportes para a educação dos filhos."
        },
        liquidity: {
          currentIdle: 80000,
          idealReserve: 105000,
          monthlyExpenses: 17500,
          idealMonths: 6,
          summary: "Sua reserva de emergência cobre 4.5 meses de despesas, recomendamos aumentar para 6 meses para maior segurança."
        },
        projection: {
          currentTotal: 1250000,
          monthlyContribution: 15000,
          scenarios: {
            base: {
              "1 ano": 1450000,
              "3 anos": 2100000,
              "5 anos": 3000000
            },
            stress: {
              "1 ano": 1350000,
              "3 anos": 1800000,
              "5 anos": 2500000
            }
          }
        },
        recommendations: [
          {
            action: "Aumentar diversificação internacional",
            description: "Adicionar ETFs globais e BDRs para aumentar exposição a mercados desenvolvidos",
            urgency: "Médio",
            impact: "Alto"
          },
          {
            action: "Rebalancear setores de ações",
            description: "Reduzir concentração em tecnologia e aumentar exposição a setores mais defensivos",
            urgency: "Alto",
            impact: "Médio"
          },
          {
            action: "Revisar seguros de vida e saúde",
            description: "Avaliar cobertura atual considerando seu patrimônio e dependentes",
            urgency: "Baixo",
            impact: "Alto"
          }
        ],
        summary: "Seu portfólio tem excelente desempenho, mas há oportunidades para otimização. Considerando seu perfil moderado-agressivo, uma maior diversificação global e setorial pode melhorar o equilíbrio entre risco e retorno."
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
      openFinanceMonths: seed % 12,
      lifeGoals: {
        goals: [
          {
            name: "Aposentadoria",
            progress: 20 + (seed % 40),
            currentAmount: 100000 + (seed * 5000),
            targetAmount: 500000 + (seed * 20000),
            timeframe: "Longo prazo",
            adjustmentNeeded: (seed % 20),
            category: "investment"
          },
          {
            name: "Casa própria",
            progress: 30 + (seed % 50),
            currentAmount: 50000 + (seed * 2000),
            targetAmount: 200000 + (seed * 10000),
            timeframe: "Médio prazo",
            adjustmentNeeded: (seed % 15) - 5,
            category: "real estate"
          }
        ],
        summary: "Você está progredindo em suas metas financeiras, mas pode otimizar seu plano para alcançá-las mais rapidamente."
      },
      liquidity: {
        currentIdle: 10000 + (seed * 1000),
        idealReserve: 30000 + (seed * 2000),
        monthlyExpenses: 5000 + (seed * 300),
        idealMonths: 6,
        summary: "Sua reserva de emergência precisa ser fortalecida para maior segurança financeira."
      },
      projection: {
        currentTotal: 150000 + (seed * 10000),
        monthlyContribution: 1000 + (seed * 100),
        scenarios: {
          base: {
            "1 ano": (150000 + (seed * 10000)) * 1.1,
            "3 anos": (150000 + (seed * 10000)) * 1.4,
            "5 anos": (150000 + (seed * 10000)) * 1.8
          },
          stress: {
            "1 ano": (150000 + (seed * 10000)) * 1.05,
            "3 anos": (150000 + (seed * 10000)) * 1.2,
            "5 anos": (150000 + (seed * 10000)) * 1.5
          }
        }
      },
      recommendations: [
        {
          action: "Aumentar reserva de emergência",
          description: "Fortalecer sua reserva para atingir o equivalente a 6 meses de despesas",
          urgency: riskProfileIndex < 2 ? "Alto" : "Médio",
          impact: "Médio"
        },
        {
          action: riskProfileIndex < 2 ? "Diversificar investimentos" : "Aumentar exposição a renda variável",
          description: riskProfileIndex < 2 
            ? "Adicionar uma pequena porcentagem de renda variável ao portfólio" 
            : "Aumentar gradualmente a exposição a ações para melhorar retornos a longo prazo",
          urgency: "Médio",
          impact: "Alto"
        }
      ],
      summary: "Seu portfólio está alinhado com seu perfil de risco, mas há oportunidades para otimização e diversificação que podem melhorar seus resultados a longo prazo."
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
              openFinanceMonths: hasOpenFinance ? (3 + (selectedClient % 9)) : 0,
              lifeGoals: {
                goals: [
                  {
                    name: "Aposentadoria",
                    progress: 20 + (selectedClient % 40),
                    currentAmount: 100000 + (selectedClient * 5000),
                    targetAmount: 500000 + (selectedClient * 20000),
                    timeframe: "Longo prazo",
                    adjustmentNeeded: (selectedClient % 20),
                    category: "investment"
                  },
                  {
                    name: "Casa própria",
                    progress: 30 + (selectedClient % 50),
                    currentAmount: 50000 + (selectedClient * 2000),
                    targetAmount: 200000 + (selectedClient * 10000),
                    timeframe: "Médio prazo",
                    adjustmentNeeded: (selectedClient % 15) - 5,
                    category: "real estate"
                  }
                ],
                summary: "Você está progredindo em suas metas financeiras, mas pode otimizar seu plano para alcançá-las mais rapidamente."
              },
              liquidity: {
                currentIdle: 10000 + (selectedClient * 1000),
                idealReserve: 30000 + (selectedClient * 2000),
                monthlyExpenses: 5000 + (selectedClient * 300),
                idealMonths: 6,
                summary: "Sua reserva de emergência precisa ser fortalecida para maior segurança financeira."
              },
              projection: {
                currentTotal: parseFloat(clientPortfolioData.total_portfolio_value || "450000"),
                monthlyContribution: 1000 + (selectedClient * 100),
                scenarios: {
                  base: {
                    "1 ano": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.1,
                    "3 anos": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.4,
                    "5 anos": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.8
                  },
                  stress: {
                    "1 ano": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.05,
                    "3 anos": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.2,
                    "5 anos": parseFloat(clientPortfolioData.total_portfolio_value || "450000") * 1.5
                  }
                }
              },
              recommendations: [
                {
                  action: "Aumentar reserva de emergência",
                  description: "Fortalecer sua reserva para atingir o equivalente a 6 meses de despesas",
                  urgency: "Alto",
                  impact: "Médio"
                },
                {
                  action: "Diversificar investimentos",
                  description: "Adicionar maior exposição internacional à sua carteira",
                  urgency: "Médio",
                  impact: "Alto"
                }
              ],
              summary: "Seu portfólio está bem estruturado, mas há oportunidades para otimização e diversificação."
            };
            
            setData(realClientData);
          }
        } else {
          // If no client selected, use default data
          setData({...defaultContext.data});
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        setData({...defaultContext.data}); // Use default data on error
      }
    };
    
    fetchClientData();
  }, [selectedClient, hasOpenFinance]);

  return (
    <RaioXContext.Provider value={{ 
      data, 
      hasOpenFinance, 
      selectedClient,
      refreshAIAnalysis,
      isAIAnalysisLoading,
      financialSummary: data.financialSummary
    }}>
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
