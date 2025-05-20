
import { 
  SentimentData, 
  SocialComparisonData, 
  AllocationData, 
  WrappedData, 
  FinancialInsightData, 
  AIInsight,
  RaioXData,
  DataSourceType
} from '@/types/raioXTypes';
import { clientData } from '@/data/clientData';

// Sample AI insights with data source tags
export const sampleAIInsights: AIInsight[] = [
  {
    id: "1",
    title: "Alto potencial para diversificação internacional",
    description: "Sua carteira tem baixa exposição a mercados internacionais, o que representa uma oportunidade de diversificação.",
    category: "allocation",
    priority: "medium",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    agent: "investor",
    isSynthetic: false,
    type: "opportunity",
    impact: "medium",
    dataSource: 'synthetic'
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
    type: "risk",
    impact: "high",
    dataSource: 'synthetic'
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
    type: "insight",
    impact: "low",
    dataSource: 'synthetic'
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
    type: "opportunity",
    impact: "medium",
    dataSource: 'synthetic'
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
    type: "risk",
    impact: "high",
    dataSource: 'synthetic'
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
    type: "opportunity",
    impact: "medium",
    dataSource: 'synthetic'
  }
];

// Create mock data for the new properties with dataSource tags
export const mockSentimentData: SentimentData = {
  assets: [
    {
      ticker: "PETR4",
      sentiment: 75,
      impact: 2.3,
      recentNews: "Resultados trimestrais superaram expectativas dos analistas, com aumento de 12% na produção.",
      dataSource: 'synthetic'
    },
    {
      ticker: "VALE3",
      sentiment: 60,
      impact: -1.5,
      recentNews: "Preocupações com desaceleração econômica na China afetam perspectivas para mineradoras.",
      dataSource: 'synthetic'
    }
  ],
  summary: "O sentimento geral para suas principais posições é positivo, destacando-se o setor de energia com Petrobras. Recomendamos acompanhar notícias sobre a China que podem impactar Vale.",
  dataSource: 'synthetic'
};

export const mockSocialComparison: SocialComparisonData = {
  peerGroup: "30-40 anos | Moderado",
  percentileRank: 75,
  returnVsPeers: 3.2,
  diversificationScore: 82,
  summary: "Seu desempenho está superior a 75% dos investidores com perfil similar ao seu. Sua estratégia de diversificação está contribuindo positivamente para resultados acima da média.",
  dataSource: 'synthetic'
};

export const mockAllocationData: AllocationData = {
  current: {
    "Renda Fixa": 45.0,
    "Ações BR": 25.0,
    "Fundos": 20.0,
    "Caixa": 10.0,
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
  dataSource: 'synthetic'
};

export const mockWrappedData: WrappedData = {
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
  dataSource: 'synthetic'
};

export const mockFinancialInsightData: FinancialInsightData = {
  highestSpendingMonth: {
    month: "Dezembro/2023",
    amount: 15200,
    categories: [
      {name: "Presentes", amount: 4500},
      {name: "Viagens", amount: 3800},
      {name: "Alimentação", amount: 2200}
    ],
    dataSource: 'synthetic'
  },
  wastedMoney: {
    total: 12400,
    categories: [
      {name: "Taxas bancárias", amount: 4800},
      {name: "Serviços não utilizados", amount: 3600},
      {name: "Juros", amount: 2800}
    ],
    dataSource: 'synthetic'
  },
  topCategories: {
    categories: [
      {name: "Moradia", amount: 42000, percentage: 28},
      {name: "Alimentação", amount: 36000, percentage: 24},
      {name: "Transporte", amount: 24000, percentage: 16}
    ],
    total: 150000,
    dataSource: 'synthetic'
  },
  negativeMonths: {
    count: 2,
    months: ["Dezembro/2023", "Janeiro/2024"],
    totalDeficit: 4500,
    dataSource: 'synthetic'
  },
  investmentGrowth: {
    annual: 11.2,
    total: 65000,
    bestAsset: { name: "Fundo Imobiliário XP", growth: 14.8},
    dataSource: 'synthetic'
  },
  potentialSavings: {
    amount: 18600,
    suggestions: [
      "Renegociar contratos de serviços", 
      "Consolidar dívidas para reduzir juros",
      "Eliminar assinaturas redundantes"
    ],
    dataSource: 'synthetic'
  },
  bestInvestment: {
    name: "Tesouro IPCA+ 2035",
    return: 12.4,
    period: "últimos 12 meses",
    dataSource: 'synthetic'
  },
  retirementReadiness: {
    score: 68,
    years: 22,
    monthlyNeeded: 15000,
    dataSource: 'synthetic'
  },
  dataSource: 'synthetic'
};

// Default data with all required properties and data source tags
export const defaultRaioXData: RaioXData = {
  clientName: "Cliente Padrão",
  clientAge: 35,
  financialSummary: { 
    ...(clientData.financialSummary || {}), 
    dataSource: 'synthetic' 
  },
  financialInsights: (clientData.financialInsights || []).map(insight => ({ 
    ...insight, 
    dataSource: 'synthetic' 
  })),
  recommendedActions: (clientData.recommendedActions || []).map(action => ({ 
    ...action, 
    dataSource: 'synthetic' 
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
        dataSource: 'synthetic'
      },
      {
        name: "Casa própria",
        progress: 60,
        currentAmount: 300000,
        targetAmount: 500000,
        timeframe: "Médio prazo",
        adjustmentNeeded: 0,
        category: "real estate",
        dataSource: 'synthetic'
      }
    ],
    summary: "Você está no caminho para alcançar a maioria das suas metas, mas pode precisar aumentar suas contribuições para aposentadoria.",
    dataSource: 'synthetic'
  },
  liquidity: {
    currentIdle: 30000,
    recommended: 60000,
    difference: -30000,
    currentIdleMonths: 3,
    recommendedMonths: 6,
    idealReserve: 60000,
    monthlyExpenses: 10000,
    idealMonths: 6,
    summary: "Sua reserva de emergência cobre 3 meses de despesas, recomendamos aumentar para 6 meses.",
    dataSource: 'synthetic'
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
    dataSource: 'synthetic'
  },
  recommendations: [
    {
      action: "Diversificar portfólio internacional",
      description: "Adicionar ETFs globais para reduzir a concentração no mercado doméstico",
      urgency: "Médio",
      impact: "Alto",
      dataSource: 'synthetic'
    },
    {
      action: "Aumentar reserva de emergência",
      description: "Atingir o equivalente a 6 meses de despesas em ativos de alta liquidez",
      urgency: "Alto",
      impact: "Médio",
      dataSource: 'synthetic'
    }
  ],
  sentiment: mockSentimentData,
  socialComparison: mockSocialComparison,
  allocation: mockAllocationData,
  wrapped: mockWrappedData,
  financialInsightData: mockFinancialInsightData,
  openFinanceMonths: 0,
  hasOpenFinance: false,
  summary: "Seu portfólio está bem diversificado, mas poderia se beneficiar de maior exposição internacional. Sua saúde financeira está em ótimo estado, com fluxo de caixa positivo e bons índices de poupança.",
  fixedIncome: [],
  investmentFunds: [],
  realEstate: [],
  stocks: [],
  dividendHistory: []
};
