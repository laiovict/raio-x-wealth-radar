
import React, { createContext, useContext, useState, useEffect } from "react";
import { clientData } from "@/data/clientData";
import { supabase } from "@/integrations/supabase/client";

// Define interfaces for the AI insights
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  timestamp: Date;
  isNew: boolean;
}

// Risk item for financial summary
interface RiskItem {
  name: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
}

// Define interface for financial summary
export interface FinancialSummary {
  totalAssets: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  // Add missing properties that are used in FinancialOverviewModule
  netWorth: number;
  totalLiabilities: number;
  liquidAssets: number;
  topRisks: RiskItem[];
}

// Define interface for recommended actions
export interface RecommendedAction {
  id: string;
  action: string;
  impact: string;
  urgency: string;
  description: string;
  // Add missing properties used in RecommendedActionsModule
  title: string;
  category: string;
  difficulty: string;
}

interface RaioXContextType {
  data: any;
  hasOpenFinance: boolean;
  selectedClient: number | null;
  // Adding missing properties
  aiInsights: AIInsight[];
  financialSummary: FinancialSummary;
  recommendedActions: RecommendedAction[];
  isAIAnalysisLoading: boolean;
  refreshAIAnalysis: () => void;
}

export const RaioXContext = createContext<RaioXContextType>({
  data: {},
  hasOpenFinance: false,
  selectedClient: null,
  // Initialize with empty values
  aiInsights: [],
  financialSummary: {
    totalAssets: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0,
    netWorth: 0,
    totalLiabilities: 0,
    liquidAssets: 0,
    topRisks: []
  },
  recommendedActions: [],
  isAIAnalysisLoading: false,
  refreshAIAnalysis: () => {}
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
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    totalAssets: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0,
    netWorth: 0,
    totalLiabilities: 0,
    liquidAssets: 0,
    topRisks: []
  });
  const [recommendedActions, setRecommendedActions] = useState<RecommendedAction[]>([]);
  
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
            goals: [
              {
                name: "Compra de Imóvel",
                currentValue: 235000,
                targetValue: 450000,
                targetDate: "2026-06-30",
                progress: 52,
                monthly: 7500,
                icon: "home"
              },
              {
                name: "Aposentadoria",
                currentValue: 180000,
                targetValue: 2000000,
                targetDate: "2045-01-15",
                progress: 9,
                monthly: 3800,
                icon: "umbrella"
              },
              {
                name: "Educação dos Filhos",
                currentValue: 45000,
                targetValue: 300000,
                targetDate: "2035-12-01",
                progress: 15,
                monthly: 1200,
                icon: "book"
              }
            ],
            recommendations: [
              {
                action: "Aumentar alocação internacional",
                description: "Adicione 8% de exposição a mercados internacionais via ETFs ou fundos para aumentar diversificação geográfica.",
                urgency: "Médio",
                impact: "Alto"
              },
              {
                action: "Reforçar reserva de emergência",
                description: "Direcione R$ 2.000 mensais para sua reserva de emergência até atingir o equivalente a 3 meses de despesas.",
                urgency: "Alto",
                impact: "Médio"
              },
              {
                action: "Consolidar investimentos",
                description: "Você possui investimentos espalhados em 3 instituições diferentes, gerando complexidade e dificultando a visão consolidada.",
                urgency: "Baixo",
                impact: "Médio"
              }
            ],
            summary: "Seu portfólio tem um bom equilíbrio entre renda fixa e variável. Considere aumentar sua reserva de emergência e diversificar com mais exposição internacional."
          };

          setData(adaptedData);
          console.log('Client data updated:', adaptedData);
          
          // Generate customized AI insights based on the data
          generateCustomInsights(adaptedData, selectedClient);
        } catch (error) {
          console.error('Error in client data fetch:', error);
        }
      } else {
        // If no client selected, use default data
        setData(clientData[clientId]);
        
        // Generate mock AI insights for default client
        generateMockAIInsights(clientData[clientId]);
      }
    };

    fetchClientData();
  }, [selectedClient, clientId]);
  
  const generateCustomInsights = (clientData: any, clientId: number) => {
    setIsAIAnalysisLoading(true);
    
    // Get client-specific data based on client ID
    const customData = getCustomClientData(clientId);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate custom financial summary with all required properties
      const summary: FinancialSummary = {
        totalAssets: Number(clientData.portfolioSummary?.total_portfolio_value) || customData.totalAssets,
        monthlyIncome: customData.monthlyIncome,
        monthlyExpenses: customData.monthlyExpenses,
        savingsRate: customData.savingsRate,
        netWorth: Number(clientData.portfolioSummary?.total_portfolio_value) || customData.netWorth,
        totalLiabilities: customData.totalLiabilities,
        liquidAssets: customData.liquidAssets,
        topRisks: customData.topRisks
      };
      setFinancialSummary(summary);
      
      // Generate custom AI insights
      setAiInsights(customData.aiInsights);
      
      // Generate custom recommended actions with all required properties
      setRecommendedActions(customData.recommendedActions);
      
      setIsAIAnalysisLoading(false);
    }, 1500);
  };
  
  // Function to generate mock AI insights
  const generateMockAIInsights = (clientData: any) => {
    setIsAIAnalysisLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate mock financial summary with all required properties
      const summary: FinancialSummary = {
        totalAssets: clientData.portfolioSummary?.total_portfolio_value || 450000,
        monthlyIncome: 12000,
        monthlyExpenses: 8000,
        savingsRate: 33,
        netWorth: clientData.portfolioSummary?.total_portfolio_value || 1250000,
        totalLiabilities: 200000,
        liquidAssets: 75000,
        topRisks: [
          {
            name: 'Alta concentração em ativos de baixa liquidez',
            severity: 'high',
            impact: 'Pode dificultar resgates em momentos de necessidade'
          },
          {
            name: 'Exposição concentrada em um único setor',
            severity: 'medium',
            impact: 'Aumenta volatilidade em caso de crises setoriais'
          },
          {
            name: 'Reserva de emergência abaixo do ideal',
            severity: 'medium',
            impact: 'Cobertura de apenas 2.5 meses de despesas'
          }
        ]
      };
      setFinancialSummary(summary);
      
      // Generate mock AI insights
      const insights: AIInsight[] = [
        {
          id: '1',
          title: 'Concentração excessiva em Renda Fixa',
          description: 'Sua carteira possui mais de 45% em ativos de renda fixa, o que pode limitar seu potencial de retorno no longo prazo.',
          category: 'risk',
          priority: 'high',
          timestamp: new Date(),
          isNew: true
        },
        {
          id: '2',
          title: 'Oportunidade em Fundos Imobiliários',
          description: 'Considerando seu perfil de investidor e objetivos, uma alocação de 7-10% em FIIs poderia trazer diversificação e renda passiva.',
          category: 'opportunity',
          priority: 'medium',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          isNew: false
        },
        {
          id: '3',
          title: 'Gap no objetivo para compra de imóvel',
          description: 'Com o ritmo atual de investimentos, você alcançará apenas 85% da meta para compra do imóvel no prazo estipulado.',
          category: 'goal',
          priority: 'high',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          isNew: true
        },
        {
          id: '4',
          title: 'Economia potencial em IOF',
          description: 'Realizando saques programados com 30 dias de antecedência, você pode economizar aproximadamente R$ 1.200/ano em IOF.',
          category: 'tax',
          priority: 'low',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          isNew: false
        },
        {
          id: '5',
          title: 'Reserva de emergência abaixo do ideal',
          description: 'Sua reserva atual cobre apenas 1,2 meses de despesas, quando o ideal para seu perfil são 3 meses.',
          category: 'budget',
          priority: 'medium',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          isNew: true
        }
      ];
      setAiInsights(insights);
      
      // Generate mock recommended actions with all required properties
      const actions: RecommendedAction[] = [
        {
          id: '1',
          title: 'Aumentar alocação internacional',
          action: 'Aumentar alocação internacional',
          impact: 'Alto',
          urgency: 'Médio',
          difficulty: 'Médio',
          category: 'diversification',
          description: 'Adicione 8% de exposição a mercados internacionais via ETFs ou fundos para aumentar diversificação geográfica.'
        },
        {
          id: '2',
          title: 'Reforçar reserva de emergência',
          action: 'Reforçar reserva de emergência',
          impact: 'Médio',
          urgency: 'Alto',
          difficulty: 'Baixo',
          category: 'security',
          description: 'Direcione R$ 2.000 mensais para sua reserva de emergência até atingir o equivalente a 3 meses de despesas.'
        },
        {
          id: '3',
          title: 'Consolidar investimentos',
          action: 'Consolidar investimentos',
          impact: 'Médio',
          urgency: 'Baixo',
          difficulty: 'Médio',
          category: 'optimization',
          description: 'Você possui investimentos espalhados em 3 instituições diferentes, gerando complexidade e dificultando a visão consolidada.'
        }
      ];
      setRecommendedActions(actions);
      
      setIsAIAnalysisLoading(false);
    }, 1500);
  };
  
  // Function to provide custom data based on client ID
  const getCustomClientData = (clientId: number) => {
    // Default data structure
    const defaultData = {
      totalAssets: 450000,
      monthlyIncome: 12000,
      monthlyExpenses: 8000,
      savingsRate: 33,
      netWorth: 1250000,
      totalLiabilities: 200000,
      liquidAssets: 75000,
      topRisks: [
        {
          name: 'Alta concentração em ativos de baixa liquidez',
          severity: 'high' as const,
          impact: 'Pode dificultar resgates em momentos de necessidade'
        },
        {
          name: 'Exposição concentrada em um único setor',
          severity: 'medium' as const,
          impact: 'Aumenta volatilidade em caso de crises setoriais'
        },
        {
          name: 'Reserva de emergência abaixo do ideal',
          severity: 'medium' as const,
          impact: 'Cobertura de apenas 2.5 meses de despesas'
        }
      ],
      aiInsights: [
        {
          id: '1',
          title: 'Concentração excessiva em Renda Fixa',
          description: 'Sua carteira possui mais de 45% em ativos de renda fixa, o que pode limitar seu potencial de retorno no longo prazo.',
          category: 'risk',
          priority: 'high',
          timestamp: new Date(),
          isNew: true
        },
        {
          id: '2',
          title: 'Oportunidade em Fundos Imobiliários',
          description: 'Considerando seu perfil de investidor e objetivos, uma alocação de 7-10% em FIIs poderia trazer diversificação e renda passiva.',
          category: 'opportunity',
          priority: 'medium',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          isNew: false
        },
        {
          id: '3',
          title: 'Gap no objetivo para compra de imóvel',
          description: 'Com o ritmo atual de investimentos, você alcançará apenas 85% da meta para compra do imóvel no prazo estipulado.',
          category: 'goal',
          priority: 'high',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          isNew: true
        },
      ],
      recommendedActions: [
        {
          id: '1',
          title: 'Aumentar alocação internacional',
          action: 'Aumentar alocação internacional',
          impact: 'Alto',
          urgency: 'Médio',
          difficulty: 'Médio',
          category: 'diversification',
          description: 'Adicione 8% de exposição a mercados internacionais via ETFs ou fundos para aumentar diversificação geográfica.'
        },
        {
          id: '2',
          title: 'Reforçar reserva de emergência',
          action: 'Reforçar reserva de emergência',
          impact: 'Médio',
          urgency: 'Alto',
          difficulty: 'Baixo',
          category: 'security',
          description: 'Direcione R$ 2.000 mensais para sua reserva de emergência até atingir o equivalente a 3 meses de despesas.'
        }
      ]
    };
    
    // Custom data for client 240275 (Laio Santos)
    if (clientId === 240275) {
      return {
        ...defaultData,
        totalAssets: 720000,
        monthlyIncome: 18000,
        monthlyExpenses: 9000,
        savingsRate: 50,
        netWorth: 1850000,
        totalLiabilities: 150000,
        liquidAssets: 120000,
        topRisks: [
          {
            name: 'Concentração em renda variável',
            severity: 'medium' as const,
            impact: 'Maior volatilidade em períodos de crise'
          },
          {
            name: 'Alocação internacional abaixo do recomendado',
            severity: 'low' as const,
            impact: 'Menor diversificação geográfica'
          }
        ],
        aiInsights: [
          {
            id: '1',
            title: 'Potencial para otimização tributária',
            description: 'Considerando seu perfil fiscal, há oportunidades para reduzir a carga tributária em até 12% com planejamento adequado.',
            category: 'tax',
            priority: 'high',
            timestamp: new Date(),
            isNew: true
          },
          {
            id: '2',
            title: 'Oportunidade em investimentos alternativos',
            description: 'Seu perfil de risco permite alocação de 5-8% em investimentos alternativos como venture capital ou private equity.',
            category: 'opportunity',
            priority: 'medium',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            isNew: false
          }
        ],
        recommendedActions: [
          {
            id: '1',
            title: 'Otimização tributária',
            action: 'Implementar estratégia de otimização tributária',
            impact: 'Alto',
            urgency: 'Alto',
            difficulty: 'Médio',
            category: 'tax',
            description: 'Redistribuir investimentos entre pessoa física e jurídica para maximizar eficiência fiscal.'
          },
          {
            id: '2',
            title: 'Diversificação Internacional',
            action: 'Aumentar exposição internacional',
            impact: 'Médio',
            urgency: 'Médio',
            difficulty: 'Baixo',
            category: 'diversification',
            description: 'Elevar exposição internacional de 5% para 15-20% da carteira para mitigar riscos locais.'
          }
        ]
      };
    }
    
    // Custom data for other clients - using clientId as a seed for some variation
    return {
      ...defaultData,
      totalAssets: 350000 + (clientId % 10) * 50000,
      monthlyIncome: 10000 + (clientId % 8) * 1000,
      monthlyExpenses: 6000 + (clientId % 5) * 500,
      savingsRate: 30 + (clientId % 15),
      netWorth: 950000 + (clientId % 12) * 75000,
      totalLiabilities: 180000 - (clientId % 10) * 15000,
      liquidAssets: 60000 + (clientId % 6) * 10000,
      aiInsights: [
        {
          id: '1',
          title: `Oportunidade em ${clientId % 2 === 0 ? 'Fundos Imobiliários' : 'BDRs'}`,
          description: `Baseado no seu perfil, recomendamos aumentar exposição em ${clientId % 2 === 0 ? 'FIIs' : 'BDRs'} para melhor diversificação.`,
          category: 'opportunity',
          priority: 'medium',
          timestamp: new Date(),
          isNew: true
        },
        {
          id: '2',
          title: clientId % 3 === 0 ? 'Risco de concentração' : 'Potencial de retorno abaixo do ideal',
          description: clientId % 3 === 0 ? 
            'Sua carteira tem concentração elevada em poucos ativos, aumentando o risco não-sistemático.' : 
            'Seu perfil de risco permitiria uma alocação mais agressiva para maior potencial de retorno.',
          category: clientId % 3 === 0 ? 'risk' : 'performance',
          priority: clientId % 3 === 0 ? 'high' : 'medium',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          isNew: false
        }
      ],
      recommendedActions: [
        {
          id: '1',
          title: clientId % 2 === 0 ? 'Diversificar carteira' : 'Ajustar alocação estratégica',
          action: clientId % 2 === 0 ? 'Diversificar carteira' : 'Ajustar alocação estratégica',
          impact: 'Alto',
          urgency: 'Médio',
          difficulty: 'Médio',
          category: 'allocation',
          description: clientId % 2 === 0 ? 
            'Reduzir exposição aos 3 principais ativos para no máximo 5% cada, diluindo o risco específico.' : 
            'Ajustar mix entre renda fixa e variável para alinhar com seus objetivos de longo prazo.'
        },
        {
          id: '2',
          title: 'Planejar sucessão patrimonial',
          action: 'Planejar sucessão patrimonial',
          impact: 'Alto',
          urgency: 'Baixo',
          difficulty: 'Alto',
          category: 'planning',
          description: 'Iniciar planejamento sucessório para garantir transferência eficiente de patrimônio e minimizar custos.'
        }
      ]
    };
  };
  
  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    if (selectedClient) {
      // Generate client-specific insights
      const adaptedData = { ...data };
      generateCustomInsights(adaptedData, selectedClient);
    } else {
      // Generate mock AI insights for default client
      generateMockAIInsights(data);
    }
  };

  return (
    <RaioXContext.Provider
      value={{
        data,
        hasOpenFinance,
        selectedClient,
        aiInsights,
        financialSummary,
        recommendedActions,
        isAIAnalysisLoading,
        refreshAIAnalysis
      }}
    >
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
