
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
  isNew?: boolean;
  priority?: 'high' | 'medium' | 'low';
  timestamp: Date;
  agent?: 'planner' | 'investor' | 'farmer' | 'insurancer' | 'credit';
  isSynthetic?: boolean;
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

export interface SentimentAsset {
  ticker: string;
  sentiment: number;
  impact: number;
  recentNews: string;
}

export interface SentimentData {
  assets: SentimentAsset[];
  summary: string;
}

export interface SocialComparisonData {
  peerGroup: string;
  percentileRank: number;
  returnVsPeers: number;
  diversificationScore: number;
  summary: string;
}

export interface AllocationData {
  current: Record<string, number>;
  recommended: Record<string, number>;
  optimizationGain: number;
  summary: string;
}

export interface WrappedData {
  biggestContribution: {
    amount: number;
    date: string;
  };
  longestPositiveStreak: number;
  largestDrawdown: {
    percentage: number;
    period: string;
  };
  mostProfitableAsset: {
    name: string;
    return: number;
  };
  summary: string;
}

export interface FinancialInsightData {
  highestSpendingMonth: {
    month: string;
    amount: number;
    categories: Array<{name: string, amount: number}>;
  };
  wastedMoney: {
    total: number;
    categories: Array<{name: string, amount: number}>;
  };
  topCategories: {
    categories: Array<{name: string, amount: number, percentage: number}>;
    total: number;
  };
  negativeMonths: {
    count: number;
    months: string[];
    totalDeficit: number;
  };
  investmentGrowth: {
    annual: number;
    total: number;
    bestAsset: { name: string, growth: number };
  };
  potentialSavings: {
    amount: number;
    suggestions: string[];
  };
  bestInvestment: {
    name: string;
    return: number;
    period: string;
  };
  retirementReadiness: {
    score: number;
    years: number;
    monthlyNeeded: number;
  };
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
  hasOpenFinance?: boolean;
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
  sentiment: SentimentData;
  socialComparison: SocialComparisonData;
  allocation: AllocationData;
  wrapped: WrappedData;
  financialInsightData?: FinancialInsightData;
  summary?: string;
}

interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: number | null;
  refreshAIAnalysis?: () => void;
  isAIAnalysisLoading?: boolean;
  financialSummary?: FinancialSummary;
  aiInsights: AIInsight[];
}

// Create mock data for the new properties
const mockSentimentData: SentimentData = {
  assets: [
    {
      ticker: "PETR4",
      sentiment: 75,
      impact: 2.3,
      recentNews: "Resultados trimestrais superaram expectativas dos analistas, com aumento de 12% na produção."
    },
    {
      ticker: "VALE3",
      sentiment: 60,
      impact: -1.5,
      recentNews: "Preocupações com desaceleração econômica na China afetam perspectivas para mineradoras."
    }
  ],
  summary: "O sentimento geral para suas principais posições é positivo, destacando-se o setor de energia com Petrobras. Recomendamos acompanhar notícias sobre a China que podem impactar Vale."
};

const mockSocialComparison: SocialComparisonData = {
  peerGroup: "30-40 anos | Moderado",
  percentileRank: 75,
  returnVsPeers: 3.2,
  diversificationScore: 82,
  summary: "Seu desempenho está superior a 75% dos investidores com perfil similar ao seu. Sua estratégia de diversificação está contribuindo positivamente para resultados acima da média."
};

const mockAllocationData: AllocationData = {
  current: {
    "Renda Fixa": 45.0,
    "Ações BR": 25.0,
    "Fundos": 20.0,
    "Caixa": 10.0,
    "Internacional": 0.0,
    "FIIs": 0.0,
    "Previdência": 0.0
  },
  recommended: {
    "Renda Fixa": 30.0,
    "Ações BR": 20.0,
    "Fundos": 15.0,
    "Caixa": 5.0,
    "Internacional": 15.0,
    "FIIs": 10.0,
    "Previdência": 5.0
  },
  optimizationGain: 2.4,
  summary: "Atualmente sua carteira está concentrada em renda fixa (45%) e ações brasileiras (25%), o que reflete seu perfil conservador. Como empreendedor, recomendamos diversificar com 15% em internacional e 10% em FIIs para melhor equilíbrio entre segurança e crescimento, especialmente considerando seus planos familiares futuros."
};

const mockWrappedData: WrappedData = {
  biggestContribution: {
    amount: 50000,
    date: "2023-06-15"
  },
  longestPositiveStreak: 7,
  largestDrawdown: {
    percentage: 12.5,
    period: "Mar-Abr 2023"
  },
  mostProfitableAsset: {
    name: "WEGE3",
    return: 32.4
  },
  summary: "2023 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial. Seu padrão de aportes consistentes contribuiu para o bom desempenho, apesar da volatilidade no 2º trimestre."
};

const mockFinancialInsightData: FinancialInsightData = {
  highestSpendingMonth: {
    month: "Dezembro/2023",
    amount: 15200,
    categories: [
      {name: "Presentes", amount: 4500},
      {name: "Viagens", amount: 3800},
      {name: "Alimentação", amount: 2200}
    ]
  },
  wastedMoney: {
    total: 12400,
    categories: [
      {name: "Taxas bancárias", amount: 4800},
      {name: "Serviços não utilizados", amount: 3600},
      {name: "Juros", amount: 2800}
    ]
  },
  topCategories: {
    categories: [
      {name: "Moradia", amount: 42000, percentage: 28},
      {name: "Alimentação", amount: 36000, percentage: 24},
      {name: "Transporte", amount: 24000, percentage: 16}
    ],
    total: 150000
  },
  negativeMonths: {
    count: 2,
    months: ["Dezembro/2023", "Janeiro/2024"],
    totalDeficit: 4500
  },
  investmentGrowth: {
    annual: 11.2,
    total: 65000,
    bestAsset: {name: "Fundo Imobiliário XP", growth: 14.8}
  },
  potentialSavings: {
    amount: 18600,
    suggestions: [
      "Renegociar contratos de serviços", 
      "Consolidar dívidas para reduzir juros",
      "Eliminar assinaturas redundantes"
    ]
  },
  bestInvestment: {
    name: "Tesouro IPCA+ 2035",
    return: 12.4,
    period: "últimos 12 meses"
  },
  retirementReadiness: {
    score: 68,
    years: 22,
    monthlyNeeded: 15000
  }
};

// Sample AI insights
const sampleAIInsights: AIInsight[] = [
  {
    id: "1",
    title: "Alto potencial para diversificação internacional",
    description: "Sua carteira tem baixa exposição a mercados internacionais, o que representa uma oportunidade de diversificação.",
    category: "allocation",
    priority: "medium",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    agent: "investor",
    isSynthetic: false
  },
  {
    id: "2",
    title: "Concentração em tecnologia",
    description: "Seus investimentos em ações estão concentrados no setor de tecnologia, o que aumenta a volatilidade da carteira.",
    category: "risk",
    priority: "high",
    isNew: true,
    timestamp: new Date(),
    agent: "planner",
    isSynthetic: false
  },
  {
    id: "3",
    title: "Fluxo de caixa positivo",
    description: "Sua taxa de poupança de 43% está acima da média para sua faixa etária e renda.",
    category: "savings",
    priority: "low",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    agent: "planner",
    isSynthetic: true
  },
  {
    id: "4",
    title: "Oportunidade em renda fixa",
    description: "Com a atual curva de juros, há oportunidade para aumentar sua alocação em títulos públicos de longo prazo.",
    category: "opportunity",
    priority: "medium",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    agent: "investor",
    isSynthetic: false
  },
  {
    id: "5",
    title: "Despesas recorrentes elevadas",
    description: "Identificamos que suas despesas recorrentes representam 68% da sua renda mensal, acima do recomendado de 50%.",
    category: "budget",
    priority: "high",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    agent: "planner",
    isSynthetic: true
  },
  {
    id: "6",
    title: "Oportunidade de otimização tributária",
    description: "Com base no seu perfil de investimentos, você poderia economizar até R$ 4.800 por ano em impostos com ajustes na sua carteira.",
    category: "tax",
    priority: "medium",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    agent: "credit",
    isSynthetic: false
  }
];

// Update the default context with the new properties
const defaultContext: RaioXContextProps = {
  data: {
    clientName: "Cliente Padrão",
    clientAge: 35,
    financialSummary: clientData.financialSummary,
    financialInsights: clientData.financialInsights,
    recommendedActions: clientData.recommendedActions,
    assetAllocation: {
      equities: 30,
      fixedIncome: 40,
      alternatives: 10,
      cash: 15,
      realEstate: 5
    },
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
    sentiment: mockSentimentData,
    socialComparison: mockSocialComparison,
    allocation: mockAllocationData,
    wrapped: mockWrappedData,
    financialInsightData: mockFinancialInsightData,
    openFinanceMonths: 0,
    hasOpenFinance: false,
    summary: "Seu portfólio está bem diversificado, mas poderia se beneficiar de maior exposição internacional. Sua saúde financeira está em ótimo estado, com fluxo de caixa positivo e bons índices de poupança."
  },
  hasOpenFinance: false,
  selectedClient: null,
  refreshAIAnalysis: () => {},
  isAIAnalysisLoading: false,
  aiInsights: sampleAIInsights
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
  const [aiInsights, setAIInsights] = useState<AIInsight[]>(sampleAIInsights);

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
            category: "allocation",
            timestamp: new Date(),
            agent: "investor"
          },
          {
            id: "2",
            title: "Concentração em tecnologia",
            description: "Seus investimentos em ações estão concentrados no setor de tecnologia, o que aumenta a volatilidade da carteira.",
            category: "risk",
            timestamp: new Date(),
            agent: "planner"
          },
          {
            id: "3",
            title: "Fluxo de caixa positivo",
            description: "Sua taxa de poupança de 43% está acima da média para sua faixa etária e renda.",
            category: "savings",
            timestamp: new Date(),
            agent: "planner"
          },
          {
            id: "4",
            title: "Oportunidade em renda fixa",
            description: "Com a atual curva de juros, há oportunidade para aumentar sua alocação em títulos públicos de longo prazo.",
            category: "opportunity",
            timestamp: new Date(),
            agent: "investor"
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
        hasOpenFinance: true,
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
        sentiment: {
          assets: [
            {
              ticker: "AAPL34",
              sentiment: 82,
              impact: 3.5,
              recentNews: "Apple supera expectativas com lançamento do novo iPhone e expansão de serviços de IA"
            },
            {
              ticker: "ITSA4",
              sentiment: 65,
              impact: 1.8,
              recentNews: "Itaúsa reporta crescimento sólido com diversificação de investimentos não financeiros"
            }
          ],
          summary: "O sentimento para suas principais posições está muito positivo, com destaque para o setor de tecnologia. Recomendamos manter e potencialmente aumentar exposição em empresas com forte integração de IA."
        },
        socialComparison: {
          peerGroup: "30-40 anos | Moderado-Agressivo",
          percentileRank: 85,
          returnVsPeers: 4.7,
          diversificationScore: 78,
          summary: "Seu desempenho está entre os 15% melhores investidores com perfil similar. Sua maior alocação em ações growth está contribuindo para este resultado superior."
        },
        allocation: {
          current: {
            "Renda Fixa": 25.0,
            "Ações BR": 40.0,
            "Fundos": 15.0,
            "Caixa": 5.0,
            "Internacional": 10.0,
            "FIIs": 5.0,
            "Previdência": 0.0
          },
          recommended: {
            "Renda Fixa": 20.0,
            "Ações BR": 30.0,
            "Fundos": 15.0,
            "Caixa": 5.0,
            "Internacional": 20.0,
            "FIIs": 7.0,
            "Previdência": 3.0
          },
          optimizationGain: 2.8,
          summary: "Sua carteira está bem posicionada com forte exposição a renda variável, alinhada ao seu perfil. Recomendamos aumentar a diversificação internacional para reduzir risco-país e capturar oportunidades globais em tecnologia e healthcare."
        },
        wrapped: {
          biggestContribution: {
            amount: 120000,
            date: "2023-08-22"
          },
          longestPositiveStreak: 9,
          largestDrawdown: {
            percentage: 8.2,
            period: "Fev-Mar 2023"
          },
          mostProfitableAsset: {
            name: "MGLU3",
            return: 45.8
          },
          summary: "Em 2023 você demonstrou excelente disciplina nos aportes, com contribuições substanciais e regulares. Sua estratégia de compra em momentos de queda do mercado resultou em bons pontos de entrada."
        },
        financialInsightData: mockFinancialInsightData,
        summary: "Seu portfólio tem excelente desempenho, mas há oportunidades para otimização. Considerando seu perfil moderado-agressivo, uma maior diversificação global e setorial pode melhorar o equilíbrio entre risco e retorno."
      };
    }

    // Generate synthetic data for other clients based on account number
    const seed = clientNumber % 1000;
    const riskProfiles = ["Conservador", "Moderado-Conservador", "Moderado", "Moderado-Agressivo", "Agressivo"];
    const riskProfileIndex = seed % 5;
    
    // Use the seed to create variation in the data
    const variationFactor = (seed % 20) / 10 + 0.5; // Range from 0.5 to 2.5
    
    // Generate mockup data for this client
    const hasClientOpenFinance = hasOpenFinance && (seed % 3 !== 0); // 2/3 chance of having open finance if globally enabled
    const openFinanceMonths = hasClientOpenFinance ? (seed % 12) : 0;
    
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
      financialInsights: clientData.financialInsights.map(insight => ({
        ...insight,
        timestamp: new Date(),
        agent: ["planner", "investor", "farmer", "insurancer", "credit"][Math.floor(Math.random() * 5)] as "planner" | "investor" | "farmer" | "insurancer" | "credit",
        isSynthetic: Math.random() > 0.5
      })),
      recommendedActions: clientData.recommendedActions,
      assetAllocation: {
        equities: 20 + (riskProfileIndex * 10) + (seed % 10),
        fixedIncome: 60 - (riskProfileIndex * 8) - (seed % 10),
        alternatives: 5 + (riskProfileIndex * 2),
        cash: 10 - (riskProfileIndex * 1),
        realEstate: 5 + (riskProfileIndex * 1)
      },
      openFinanceMonths,
      hasOpenFinance: hasClientOpenFinance,
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
      sentiment: {
        assets: [
          {
            ticker: riskProfileIndex < 2 ? "PETR4" : "MGLU3",
            sentiment: 50 + (seed % 30),
            impact: (seed % 5) * (Math.random() > 0.3 ? 1 : -1),
            recentNews: riskProfileIndex < 2 
              ? "Petrobras anuncia novos projetos de exploração sustentável"
              : "Magazine Luiza expande operações de marketplace e logística"
          },
          {
            ticker: riskProfileIndex < 2 ? "BBAS3" : "WEGE3",
            sentiment: 40 + (seed % 40),
            impact: (seed % 4) * (Math.random() > 0.4 ? 1 : -1),
            recentNews: riskProfileIndex < 2 
              ? "Banco do Brasil reporta aumento na carteira de crédito"
              : "WEG apresenta forte crescimento em exportações no último trimestre"
          }
        ],
        summary: riskProfileIndex < 2
          ? "O sentimento para ativos de menor volatilidade está estável, mas atenção às mudanças na política monetária que podem impactar seus investimentos em renda fixa."
          : "O mercado está otimista com alguns setores de crescimento que compõem sua carteira, mas mantenha diversificação para reduzir volatilidade."
      },
      socialComparison: {
        peerGroup: `${25 + (seed % 10)}-${35 + (seed % 10)} anos | ${riskProfiles[riskProfileIndex]}`,
        percentileRank: 50 + (seed % 40),
        returnVsPeers: 0.5 + (seed % 30) / 10,
        diversificationScore: 60 + (seed % 30),
        summary: (50 + (seed % 40)) > 70
          ? "Seu desempenho está entre os melhores da sua categoria de risco e faixa etária. Continue com a estratégia atual."
          : "Sua performance está na média para seu perfil. Sugerimos revisar sua estratégia de diversificação para potencialmente melhorar resultados."
      },
      allocation: {
        current: {
          "Renda Fixa": 60 - (riskProfileIndex * 10),
          "Ações BR": 20 + (riskProfileIndex * 5),
          "Fundos": 10 + (riskProfileIndex * 2),
          "Caixa": 10 - (riskProfileIndex * 1),
          "Internacional": 0 + (riskProfileIndex * 2),
          "FIIs": 0 + (riskProfileIndex * 1),
          "Previdência": 0 + (riskProfileIndex * 1)
        },
        recommended: {
          "Renda Fixa": 50 - (riskProfileIndex * 8),
          "Ações BR": 25 + (riskProfileIndex * 3),
          "Fundos": 10,
          "Caixa": 5,
          "Internacional": 5 + (riskProfileIndex * 2),
          "FIIs": 3 + (riskProfileIndex * 1),
          "Previdência": 2 + (riskProfileIndex * 1)
        },
        optimizationGain: 1.0 + (riskProfileIndex * 0.4),
        summary: riskProfileIndex < 2
          ? "Sua alocação atual está alinhada com seu perfil conservador, mas pequenos ajustes podem melhorar retornos sem aumentar significativamente o risco."
          : "Considerando seu perfil mais dinâmico, recomendamos maior diversificação global e entre classes de ativos para otimizar o potencial de retorno."
      },
      wrapped: {
        biggestContribution: {
          amount: 10000 + (seed * 1000),
          date: `2023-${(seed % 12) + 1}-${(seed % 28) + 1}`
        },
        longestPositiveStreak: 3 + (seed % 6),
        largestDrawdown: {
          percentage: 5 + (seed % 10),
          period: seed % 2 === 0 ? "Jan-Fev 2023" : "Mai-Jun 2023" 
        },
        mostProfitableAsset: {
          name: ["PETR4", "BBAS3", "ITUB4", "VALE3", "WEGE3"][seed % 5],
          return: 10 + (seed % 20)
        },
        summary: "Seu portfólio demonstrou resistência à volatilidade do mercado em 2023. Seus aportes regulares contribuíram para um bom desempenho médio."
      },
      financialInsightData: mockFinancialInsightData,
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
            
            // Generate AI insights for this client
            const clientInsights = generateClientInsights(selectedClient);
            setAIInsights(clientInsights);
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
              financialInsights: clientData.financialInsights.map(insight => ({
                ...insight,
                timestamp: new Date(),
                agent: ["planner", "investor", "farmer", "insurancer", "credit"][Math.floor(Math.random() * 5)] as "planner" | "investor" | "farmer" | "insurancer" | "credit",
                isSynthetic: Math.random() > 0.5
              })),
              recommendedActions: clientData.recommendedActions,
              assetAllocation: {
                equities: clientPortfolioData.stocks_representation ? parseFloat(clientPortfolioData.stocks_representation) : 25,
                fixedIncome: clientPortfolioData.fixed_income_representation || 45,
                alternatives: 10 + (selectedClient % 10),
                cash: 5 + (selectedClient % 10),
                realEstate: clientPortfolioData.real_estate_representation || 5
              },
              openFinanceMonths: hasOpenFinance ? (3 + (selectedClient % 9)) : 0,
              hasOpenFinance: hasOpenFinance,
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
              sentiment: mockSentimentData,
              socialComparison: mockSocialComparison,
              allocation: mockAllocationData,
              wrapped: mockWrappedData,
              financialInsightData: mockFinancialInsightData,
              summary: "Seu portfólio está bem estruturado, mas há oportunidades para otimização e diversificação."
            };
            
            setData(realClientData);
            
            // Generate AI insights for this client based on real data
            const clientInsights = generateClientInsights(selectedClient);
            setAIInsights(clientInsights);
          }
        } else {
          // If no client selected, use default data
          setData({...defaultContext.data});
          setAIInsights(sampleAIInsights);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        setData({...defaultContext.data}); // Use default data on error
        setAIInsights(sampleAIInsights);
      }
    };
    
    fetchClientData();
  }, [selectedClient, hasOpenFinance]);

  // Generate insights based on client data
  const generateClientInsights = (clientId: number): AIInsight[] => {
    const seed = clientId % 1000;
    const insights: AIInsight[] = [];
    
    // Base insights always present
    const baseInsights: AIInsight[] = [
      {
        id: "i1",
        title: "Potencial diversificação internacional",
        description: "Sua carteira tem baixa exposição a mercados internacionais, o que representa uma oportunidade para diversificar e reduzir riscos.",
        category: "allocation",
        priority: "medium",
        timestamp: new Date(Date.now() - (7 + seed % 10) * 24 * 60 * 60 * 1000),
        agent: "investor",
        isSynthetic: false
      },
      {
        id: "i2",
        title: "Otimização de reserva de emergência",
        description: "Sua reserva de emergência atual está abaixo do ideal. Recomendamos aumentar para cobrir 6 meses de despesas.",
        category: "risk",
        priority: "high",
        timestamp: new Date(Date.now() - (2 + seed % 5) * 24 * 60 * 60 * 1000),
        agent: "planner",
        isSynthetic: false
      },
    ];
    
    insights.push(...baseInsights);
    
    // Add conditional insights based on client ID
    if (seed % 2 === 0) {
      insights.push({
        id: "ic1",
        title: "Alto potencial para redução de despesas",
        description: "Identificamos que 23% de suas despesas poderiam ser reduzidas através da renegociação de serviços recorrentes.",
        category: "budget",
        priority: "high",
        isNew: true,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        agent: "planner",
        isSynthetic: true
      });
    }
    
    if (seed % 3 === 0) {
      insights.push({
        id: "ic2",
        title: "Oportunidade para otimização tributária",
        description: "Com base no seu perfil, você poderia economizar até R$ 5.400 em impostos anualmente ajustando sua estratégia de investimentos.",
        category: "tax",
        priority: "medium",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        agent: "credit",
        isSynthetic: false
      });
    }
    
    if (seed % 5 === 0) {
      insights.push({
        id: "ic3",
        title: "Potencial ganho com realocação",
        description: "Realocando 15% de sua carteira de renda fixa para fundos multimercado selecionados, poderia aumentar seu retorno anual esperado em 1.2%.",
        category: "opportunity",
        priority: "medium",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        agent: "investor",
        isSynthetic: false
      });
    }
    
    // Add more variety based on seed
    const additionalCategories = ["goal", "education", "opportunity", "risk", "tax"];
    const additionalAgents = ["planner", "investor", "farmer", "insurancer", "credit"];
    
    for (let i = 0; i < 3 + (seed % 5); i++) {
      const randomCat = additionalCategories[Math.floor(Math.random() * additionalCategories.length)];
      const randomAgent = additionalAgents[Math.floor(Math.random() * additionalAgents.length)] as "planner" | "investor" | "farmer" | "insurancer" | "credit";
      
      insights.push({
        id: `ia${i}`,
        title: getRandomInsightTitle(randomCat, seed + i),
        description: getRandomInsightDescription(randomCat, seed + i),
        category: randomCat,
        priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as "high" | "medium" | "low",
        timestamp: new Date(Date.now() - (i + 1 + seed % 10) * 24 * 60 * 60 * 1000),
        agent: randomAgent,
        isSynthetic: Math.random() > 0.6
      });
    }
    
    return insights;
  };
  
  // Helper functions to generate insight content
  const getRandomInsightTitle = (category: string, seed: number): string => {
    const titles: Record<string, string[]> = {
      goal: [
        "Meta de aposentadoria necessita ajustes",
        "Progresso em metas financeiras desalinhado",
        "Oportunidade para revisar objetivos de longo prazo"
      ],
      education: [
        "Invista em conhecimento sobre renda variável",
        "Conheça mais sobre estratégias de hedge",
        "Entenda o impacto da inflação em seus investimentos"
      ],
      opportunity: [
        "Momento favorável para investir em renda variável",
        "Oportunidade em FIIs com bons dividendos",
        "Potencial em empresas de tecnologia sustentável"
      ],
      risk: [
        "Concentração excessiva em setor bancário",
        "Exposição elevada a um único emissor",
        "Baixa proteção contra inflação"
      ],
      tax: [
        "Planejamento sucessório pode reduzir impostos",
        "Otimize declaração de IR com estratégias legais",
        "Reduza carga tributária em resgates"
      ]
    };
    
    const options = titles[category] || ["Insight personalizado"];
    return options[seed % options.length];
  };
  
  const getRandomInsightDescription = (category: string, seed: number): string => {
    const descriptions: Record<string, string[]> = {
      goal: [
        "Com base na sua expectativa de aposentadoria, será necessário aumentar os aportes mensais em cerca de 15% para atingir o objetivo no prazo desejado.",
        "Suas metas de curto prazo estão consumindo recursos que poderiam ser direcionados para objetivos de longo prazo mais importantes.",
        "Considerando sua idade atual e objetivos, recomendamos revisitar seu plano de aposentadoria para garantir alinhamento com suas expectativas."
      ],
      education: [
        "Investidores que entendem os fundamentos da renda variável conseguem lidar melhor com volatilidade e tendem a obter melhores retornos a longo prazo.",
        "Estratégias de hedge podem proteger seu patrimônio em momentos de crise. Conheça as opções disponíveis para seu perfil.",
        "O impacto da inflação em seu poder de compra futuro é significativo. Aprenda como proteger seu patrimônio contra este risco silencioso."
      ],
      opportunity: [
        "A recente correção no mercado criou pontos de entrada atrativos em empresas de qualidade com fundamentos sólidos.",
        "Identificamos FIIs com dividend yield acima de 8% a.a. e boa qualidade de ativos que complementariam bem sua carteira atual.",
        "O setor de tecnologia sustentável apresenta perspectivas promissoras para os próximos anos, com potencial de valorização acima da média."
      ],
      risk: [
        "Sua carteira possui mais de 30% de exposição ao setor bancário, o que aumenta o risco setorial. Recomendamos maior diversificação.",
        "Você possui concentração superior a 15% em um único emissor, aumentando seu risco específico. Considere diversificar.",
        "Apenas 20% de seus investimentos possuem proteção efetiva contra inflação, o que pode comprometer seu poder de compra futuro."
      ],
      tax: [
        "Um planejamento sucessório adequado pode reduzir significativamente a carga tributária sobre a transferência de seu patrimônio para herdeiros.",
        "Estratégias legais de otimização fiscal podem reduzir em até 15% sua carga tributária anual em investimentos.",
        "Planejando adequadamente seus resgates, é possível reduzir o impacto tributário e aumentar o rendimento líquido."
      ]
    };
    
    const options = descriptions[category] || ["Este insight foi personalizado com base em seu perfil financeiro e objetivos."];
    return options[seed % options.length];
  };

  return (
    <RaioXContext.Provider value={{ 
      data, 
      hasOpenFinance, 
      selectedClient,
      refreshAIAnalysis,
      isAIAnalysisLoading,
      financialSummary: data.financialSummary,
      aiInsights
    }}>
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
