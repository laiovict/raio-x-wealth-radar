import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { clientData } from '@/data/clientData';
import { supabase } from "@/integrations/supabase/client";
import { 
  getClientPortfolioSummary, 
  getClientFixedIncome, 
  getClientInvestmentFunds, 
  getClientRealEstate, 
  getClientStocks, 
  getClientProfitability,
  getClientDividendHistory,
  getClientSummary
} from '@/services/portfolioService';

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
  dataSource?: 'supabase' | 'synthetic';
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
  dataSource?: 'supabase' | 'synthetic';
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
  dataSource?: 'supabase' | 'synthetic';
}

export interface Goal {
  name: string;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  timeframe: string;
  adjustmentNeeded: number;
  category?: string;
  dataSource?: 'supabase' | 'synthetic';
}

export interface SentimentAsset {
  ticker: string;
  sentiment: number;
  impact: number;
  recentNews: string;
  dataSource?: 'supabase' | 'synthetic';
}

export interface SentimentData {
  assets: SentimentAsset[];
  summary: string;
  dataSource?: 'supabase' | 'synthetic';
}

export interface SocialComparisonData {
  peerGroup: string;
  percentileRank: number;
  returnVsPeers: number;
  diversificationScore: number;
  summary: string;
  dataSource?: 'supabase' | 'synthetic';
}

export interface AllocationData {
  current: Record<string, number>;
  recommended: Record<string, number>;
  optimizationGain: number;
  summary: string;
  dataSource?: 'supabase' | 'synthetic';
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
  dataSource?: 'supabase' | 'synthetic';
}

export interface FinancialInsightData {
  highestSpendingMonth?: {
    month: string;
    amount: number;
    categories: Array<{name: string, amount: number}>;
    dataSource?: 'supabase' | 'synthetic';
  };
  wastedMoney?: {
    total: number;
    categories: Array<{name: string, amount: number}>;
    dataSource?: 'supabase' | 'synthetic';
  };
  topCategories?: {
    categories: Array<{name: string, amount: number, percentage: number}>;
    total: number;
    dataSource?: 'supabase' | 'synthetic';
  };
  negativeMonths?: {
    count: number;
    months: string[];
    totalDeficit: number;
    dataSource?: 'supabase' | 'synthetic';
  };
  investmentGrowth?: {
    annual: number;
    total: number;
    bestAsset: { name: string, growth: number };
    dataSource?: 'supabase' | 'synthetic';
  };
  potentialSavings?: {
    amount: number;
    suggestions: string[];
    dataSource?: 'supabase' | 'synthetic';
  };
  bestInvestment?: {
    name: string;
    return: number;
    period: string;
    dataSource?: 'supabase' | 'synthetic';
  };
  retirementReadiness?: {
    score: number;
    years: number;
    monthlyNeeded: number;
    dataSource?: 'supabase' | 'synthetic';
  };
  dataSource?: 'supabase' | 'synthetic';
}

// Add portfolioSummary type for the database response
export interface PortfolioSummary {
  investor_account_on_brokerage_house: number;
  total_portfolio_value: string;
  fixed_income_value: number;
  fixed_income_representation: number;
  stocks_value: string;
  stocks_representation: string;
  real_estate_value: number;
  real_estate_representation: number;
  investment_fund_value: number;
  investment_fund_representation: number;
  treasure_value: string;
  treasure_representation: string;
  investment_international_value: string;
  investment_international_representation: string;
  total_balance: string;
  total_balance_representation: string;
  private_pension_value?: number;
  private_pension_representation?: number;
  coe_value?: string;
  coe_representation?: string;
  dataSource?: 'supabase' | 'synthetic';
}

// Add interfaces for dividends and client summary
export interface DividendHistory {
  id: number;
  investor_account_on_brokerage_house: number;
  asset: string;
  type: string;
  payment_date: string;
  value: string;
  quantity: string;
  created_at: string;
  advisor_code?: number;
  imported_at?: string;
  dataSource?: 'supabase' | 'synthetic';
}

export interface ClientSummary {
  summary_id: number;
  investor_account_on_brokerage_house: number;
  investor_name: string;
  investor_copilotu_id?: string;
  summary: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
  dataSource?: 'supabase' | 'synthetic';
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
    dataSource?: 'supabase' | 'synthetic';
  };
  liquidity: {
    currentIdle: number;
    idealReserve: number;
    monthlyExpenses: number;
    idealMonths: number;
    summary: string;
    dataSource?: 'supabase' | 'synthetic';
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
    dataSource?: 'supabase' | 'synthetic';
  };
  recommendations: Array<{
    action: string;
    description: string;
    urgency: string;
    impact: string;
    dataSource?: 'supabase' | 'synthetic';
  }>;
  sentiment: SentimentData;
  socialComparison: SocialComparisonData;
  allocation: AllocationData;
  wrapped: WrappedData;
  financialInsightData?: FinancialInsightData;
  summary?: string;
  portfolioSummary?: PortfolioSummary;
  fixedIncome?: any[];
  investmentFunds?: any[];
  realEstate?: any[];
  stocks?: any[];
  profitability?: any;
  dividendHistory?: DividendHistory[];
  clientSummary?: ClientSummary;
}

interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: number | null;
  refreshAIAnalysis?: () => void;
  isAIAnalysisLoading?: boolean;
  financialSummary?: FinancialSummary;
  aiInsights: AIInsight[];
  portfolioSummary?: PortfolioSummary;
  profitability?: any;
  dividendHistory?: DividendHistory[];
  clientSummary?: ClientSummary;
  totalDividends?: number;
  averageMonthlyDividends?: number;
}

interface RaioXProviderProps {
  children: React.ReactNode;
  hasOpenFinance?: boolean;
  selectedClient?: number | null;
}

// Create mock data for the new properties with dataSource tags
const mockSentimentData: SentimentData = {
  assets: [
    {
      ticker: "PETR4",
      sentiment: 75,
      impact: 2.3,
      recentNews: "Resultados trimestrais superaram expectativas dos analistas, com aumento de 12% na produção.",
      dataSource: 'synthetic' as const
    },
    {
      ticker: "VALE3",
      sentiment: 60,
      impact: -1.5,
      recentNews: "Preocupações com desaceleração econômica na China afetam perspectivas para mineradoras.",
      dataSource: 'synthetic' as const
    }
  ],
  summary: "O sentimento geral para suas principais posições é positivo, destacando-se o setor de energia com Petrobras. Recomendamos acompanhar notícias sobre a China que podem impactar Vale.",
  dataSource: 'synthetic' as const
};

const mockSocialComparison: SocialComparisonData = {
  peerGroup: "30-40 anos | Moderado",
  percentileRank: 75,
  returnVsPeers: 3.2,
  diversificationScore: 82,
  summary: "Seu desempenho está superior a 75% dos investidores com perfil similar ao seu. Sua estratégia de diversificação está contribuindo positivamente para resultados acima da média.",
  dataSource: 'synthetic' as const
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
  summary: "Atualmente sua carteira está concentrada em renda fixa (45%) e ações brasileiras (25%), o que reflete seu perfil conservador. Como empreendedor, recomendamos diversificar com 15% em internacional e 10% em FIIs para melhor equilíbrio entre segurança e crescimento, especialmente considerando seus planos familiares futuros.",
  dataSource: 'synthetic' as const
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
  summary: "2023 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial. Seu padrão de aportes consistentes contribuiu para o bom desempenho, apesar da volatilidade no 2º trimestre.",
  dataSource: 'synthetic' as const
};

const mockFinancialInsightData: FinancialInsightData = {
  highestSpendingMonth: {
    month: "Dezembro/2023",
    amount: 15200,
    categories: [
      {name: "Presentes", amount: 4500},
      {name: "Viagens", amount: 3800},
      {name: "Alimentação", amount: 2200}
    ],
    dataSource: 'synthetic' as const
  },
  wastedMoney: {
    total: 12400,
    categories: [
      {name: "Taxas bancárias", amount: 4800},
      {name: "Serviços não utilizados", amount: 3600},
      {name: "Juros", amount: 2800}
    ],
    dataSource: 'synthetic' as const
  },
  topCategories: {
    categories: [
      {name: "Moradia", amount: 42000, percentage: 28},
      {name: "Alimentação", amount: 36000, percentage: 24},
      {name: "Transporte", amount: 24000, percentage: 16}
    ],
    total: 150000,
    dataSource: 'synthetic' as const
  },
  negativeMonths: {
    count: 2,
    months: ["Dezembro/2023", "Janeiro/2024"],
    totalDeficit: 4500,
    dataSource: 'synthetic' as const
  },
  investmentGrowth: {
    annual: 11.2,
    total: 65000,
    bestAsset: { name: "Fundo Imobiliário XP", growth: 14.8},
    dataSource: 'synthetic' as const
  },
  potentialSavings: {
    amount: 18600,
    suggestions: [
      "Renegociar contratos de serviços", 
      "Consolidar dívidas para reduzir juros",
      "Eliminar assinaturas redundantes"
    ],
    dataSource: 'synthetic' as const
  },
  bestInvestment: {
    name: "Tesouro IPCA+ 2035",
    return: 12.4,
    period: "últimos 12 meses",
    dataSource: 'synthetic' as const
  },
  retirementReadiness: {
    score: 68,
    years: 22,
    monthlyNeeded: 15000,
    dataSource: 'synthetic' as const
  },
  dataSource: 'synthetic' as const
};

// Sample AI insights with data source tags
const sampleAIInsights: AIInsight[] = [
  {
    id: "1",
    title: "Alto potencial para diversificação internacional",
    description: "Sua carteira tem baixa exposição a mercados internacionais, o que representa uma oportunidade de diversificação.",
    category: "allocation",
    priority: "medium",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    agent: "investor",
    isSynthetic: false,
    dataSource: 'synthetic' as const
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
    isSynthetic: false,
    dataSource: 'synthetic' as const
  },
  {
    id: "3",
    title: "Fluxo de caixa positivo",
    description: "Sua taxa de poupança de 43% está acima da média para sua faixa etária e renda.",
    category: "savings",
    priority: "low",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    agent: "planner",
    isSynthetic: true,
    dataSource: 'synthetic' as const
  },
  {
    id: "4",
    title: "Oportunidade em renda fixa",
    description: "Com a atual curva de juros, há oportunidade para aumentar sua alocação em títulos públicos de longo prazo.",
    category: "opportunity",
    priority: "medium",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    agent: "investor",
    isSynthetic: false,
    dataSource: 'synthetic' as const
  },
  {
    id: "5",
    title: "Despesas recorrentes elevadas",
    description: "Identificamos que suas despesas recorrentes representam 68% da sua renda mensal, acima do recomendado de 50%.",
    category: "budget",
    priority: "high",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    agent: "planner",
    isSynthetic: true,
    dataSource: 'synthetic' as const
  },
  {
    id: "6",
    title: "Oportunidade de otimização tributária",
    description: "Com base no seu perfil de investimentos, você poderia economizar até R$ 4.800 por ano em impostos com ajustes na sua carteira.",
    category: "tax",
    priority: "medium",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    agent: "credit",
    isSynthetic: false,
    dataSource: 'synthetic' as const
  }
];

// Default data with all required properties and data source tags
const defaultData: RaioXData = {
  clientName: "Cliente Padrão",
  clientAge: 35,
  financialSummary: { 
    ...(clientData.financialSummary || {}), 
    dataSource: 'synthetic' as const 
  },
  // Fix the error by safely accessing the financialInsights property
  financialInsights: (clientData.financialInsights || []).map(insight => ({ 
    ...insight, 
    dataSource: 'synthetic' as const 
  })),
  // Fix the error by safely accessing the recommendedActions property
  recommendedActions: (clientData.recommendedActions || []).map(action => ({ 
    ...action, 
    dataSource: 'synthetic' as const 
  })),
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
        category: "investment",
        dataSource: 'synthetic' as const
      },
      {
        name: "Casa própria",
        progress: 60,
        currentAmount: 300000,
        targetAmount: 500000,
        timeframe: "Médio prazo",
        adjustmentNeeded: 0,
        category: "real estate",
        dataSource: 'synthetic' as const
      }
    ],
    summary: "Você está no caminho para alcançar a maioria das suas metas, mas pode precisar aumentar suas contribuições para aposentadoria.",
    dataSource: 'synthetic' as const
  },
  liquidity: {
    currentIdle: 30000,
    idealReserve: 60000,
    monthlyExpenses: 10000,
    idealMonths: 6,
    summary: "Sua reserva de emergência cobre 3 meses de despesas, recomendamos aumentar para 6 meses.",
    dataSource: 'synthetic' as const
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
    },
    dataSource: 'synthetic' as const
  },
  recommendations: [
    {
      action: "Diversificar portfólio internacional",
      description: "Adicionar ETFs globais para reduzir a concentração no mercado doméstico",
      urgency: "Médio",
      impact: "Alto",
      dataSource: 'synthetic' as const
    },
    {
      action: "Aumentar reserva de emergência",
      description: "Atingir o equivalente a 6 meses de despesas em ativos de alta liquidez",
      urgency: "Alto",
      impact: "Médio",
      dataSource: 'synthetic' as const
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
};

const RaioXContext = createContext<RaioXContextProps>({
  data: defaultData,
  hasOpenFinance: false,
  selectedClient: null,
  aiInsights: sampleAIInsights,
  portfolioSummary: undefined,
  profitability: undefined,
  dividendHistory: undefined,
  clientSummary: undefined,
  totalDividends: 0,
  averageMonthlyDividends: 0
});

export const RaioXProvider = ({ 
  children, 
  hasOpenFinance = false,
  selectedClient = null 
}: RaioXProviderProps) => {
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState(false);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [portfolioData, setPortfolioData] = useState<RaioXData>(defaultData);
  const [totalDividends, setTotalDividends] = useState<number>(0);
  const [averageMonthlyDividends, setAverageMonthlyDividends] = useState<number>(0);
  
  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    setIsAIAnalysisLoading(true);
    setTimeout(() => {
      setIsAIAnalysisLoading(false);
    }, 1500);
  };
  
  // Fetch real data when the selectedClient changes
  useEffect(() => {
    const fetchClientData = async () => {
      if (!selectedClient) return;
      
      try {
        // Fetch the client's portfolio data
        const summary = await getClientPortfolioSummary(selectedClient);
        const fixedIncome = await getClientFixedIncome(selectedClient);
        const investmentFunds = await getClientInvestmentFunds(selectedClient);
        const realEstate = await getClientRealEstate(selectedClient);
        const stocks = await getClientStocks(selectedClient);
        const profitability = await getClientProfitability(selectedClient);
        const dividendHistory = await getClientDividendHistory(selectedClient);
        const clientSummary = await getClientSummary(selectedClient);
        
        // Calculate dividend totals
        if (dividendHistory && dividendHistory.length > 0) {
          try {
            const totalDivs = calculateTotalDividends(dividendHistory);
            const avgMonthlyDivs = calculateMonthlyAverageDividends(dividendHistory);
            
            setTotalDividends(totalDivs);
            setAverageMonthlyDividends(avgMonthlyDivs);
            
            console.log("Dividend calculations:", {
              totalDividends: totalDivs,
              avgMonthlyDividends: avgMonthlyDivs,
              dividendCount: dividendHistory.length
            });
          } catch (error) {
            console.error("Error calculating dividend stats:", error);
          }
        }
        
        // Update portfolio data with real values from Supabase
        if (summary || fixedIncome.length || investmentFunds.length || realEstate.length || stocks.length || profitability || dividendHistory.length || clientSummary) {
          setPortfolioData(prevData => {
            // Update portfolio data
            const newData = {
              ...prevData,
              portfolioSummary: summary,
              fixedIncome: fixedIncome || [],
              investmentFunds: investmentFunds || [],
              realEstate: realEstate || [],
              stocks: stocks || [],
              profitability,
              dividendHistory: dividendHistory || [],
              clientSummary
            };
            
            // If we have client summary data, update the client name
            if (clientSummary && clientSummary.investor_name) {
              newData.clientName = clientSummary.investor_name;
            }
            
            return newData;
          });
        }
        
        // Generate financial summary based on real data if available
        if (summary) {
          generateFinancialSummary(summary, dividendHistory);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    
    fetchClientData();
  }, [selectedClient]);
  
  // Generate financial summary based on real data if available
  const generateFinancialSummary = (clientData: PortfolioSummary, dividendHistory?: DividendHistory[]) => {
    // Import the dividend calculation functions
    import('@/services/portfolioService').then(({ calculateTotalDividends, calculateMonthlyAverageDividends }) => {
      // Convert client data to financial summary format
      const totalPortfolioValue = parseFloat(clientData.total_portfolio_value || "0");
      
      // Calculate dividends if we have dividend history
      const divTotal = dividendHistory && dividendHistory.length ? calculateTotalDividends(dividendHistory) : 0;
      const divMonthly = dividendHistory && dividendHistory.length ? calculateMonthlyAverageDividends(dividendHistory) : 0;
      
      setTotalDividends(divTotal);
      setAverageMonthlyDividends(divMonthly);
      
      const summary: FinancialSummary = {
        netWorth: totalPortfolioValue,
        totalAssets: totalPortfolioValue,
        totalLiabilities: 0, // Not provided in the data, could be fetched separately
        liquidAssets: clientData.fixed_income_value || 0,
        monthlyIncome: divMonthly > 0 ? divMonthly : totalPortfolioValue * 0.005, // Use dividend data if available
        monthlyExpenses: totalPortfolioValue * 0.003, // Estimate monthly expenses as 0.3% of portfolio
        savingsRate: 40, // Estimate savings rate
        investmentBalance: totalPortfolioValue,
        cashReserves: clientData.fixed_income_value || 0,
        debtTotal: 0, // Not provided in the data
        riskProfile: "Moderado", // Default value, could be determined based on allocation
        creditScore: 750, // Default value, not provided in the data
        allocationSummary: {
          stocks: parseFloat(clientData.stocks_representation || "0"),
          bonds: clientData.fixed_income_representation || 0,
          cash: 10, // Estimate
          realEstate: clientData.real_estate_representation || 0,
          alternatives: clientData.investment_fund_representation || 0
        },
        riskMetrics: [
          { name: "Volatilidade", value: 45, color: "#4CAF50" },
          { name: "Exposição a Renda Variável", value: 35, color: "#FFC107" },
          { name: "Concentração", value: 25, color: "#2196F3" }
        ],
        topRisks: [
          {
            name: "Concentração em Poucos Ativos",
            severity: "high",
            impact: "68% do patrimônio em apenas 4 ativos"
          },
          {
            name: "Baixa Reserva de Emergência",
            severity: "medium",
            impact: `Cobertura de ${(clientData.fixed_income_value / (totalPortfolioValue * 0.003)).toFixed(1)} meses de despesas`
          },
          {
            name: "Exposição Cambial",
            severity: "medium",
            impact: "30% do patrimônio sem proteção cambial"
          }
        ],
        dataSource: 'supabase' as const // Mark this as real data from Supabase
      };
      
      setFinancialSummary(summary);
    });
  };
  
  return (
    <RaioXContext.Provider
      value={{
        hasOpenFinance,
        data: portfolioData,
        selectedClient,
        financialSummary,
        isAIAnalysisLoading,
        refreshAIAnalysis,
        aiInsights: sampleAIInsights,
        portfolioSummary: portfolioData.portfolioSummary,
        profitability: portfolioData.profitability,
        dividendHistory: portfolioData.dividendHistory,
        clientSummary: portfolioData.clientSummary,
        totalDividends,
        averageMonthlyDividends
      }}
    >
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);
