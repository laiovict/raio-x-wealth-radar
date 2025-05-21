// Basic data types for the RaioX application

export type DataSourceType = 'synthetic' | 'supabase' | 'xp' | 'openfinance' | 'calculated';

export interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: string | number | null;
  financialSummary?: FinancialSummary;
  isAIAnalysisLoading?: boolean;
  refreshAIAnalysis?: () => void;
  aiInsights?: AIInsight[];
  portfolioSummary?: PortfolioSummary;
  profitability?: any;
  dividendHistory?: DividendHistory[];
  clientSummary?: ClientSummary;
  totalDividends: number;
  averageMonthlyDividends: number;
  stocks: any[];
  hasOpenFinanceData?: boolean;
  openFinanceAccounts?: any[];
  openFinanceInvestments?: any[];
  openFinanceTransactions?: any[];
  openFinanceInsights?: any;
  consolidatedFinancialReport?: any;
}

export interface RaioXProviderProps {
  children: React.ReactNode;
  hasOpenFinance?: boolean;
  selectedClient?: string | number | null;
}

export interface RaioXData {
  clientName: string;
  clientAge?: number;
  portfolioSummary?: PortfolioSummary;
  financialSummary?: FinancialSummary;
  sentiment?: any;
  allocation?: Allocation;
  liquidity?: Liquidity;
  projection?: any;
  lifeGoals?: any;
  fixedIncome: any[];
  investmentFunds: any[];
  realEstate: any[];
  stocks: any[];
  dividendHistory: DividendHistory[];
  recommendations?: any[];
  financialInsightData?: FinancialInsightData;
  socialComparison?: SocialComparisonData;
  wrapped?: WrappedData;
  openFinanceMonths?: number;
  hasOpenFinance?: boolean;
  summary?: string;
  profitability?: any;
  clientSummary?: ClientSummary;
  marketSentiment?: any;
  monthlyExpenses?: number; // Added for BehavioralFinanceModule
}

// Types for financial data and insights
export interface FinancialSummary {
  netWorth: number;
  totalAssets?: number;
  totalLiabilities?: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  liquidAssets: number;
  dataSource?: DataSourceType;
  fixedIncomePercent?: number;
  investmentBalance?: number;
  cashReserves?: number; // Added for portfolioService
  variableIncomePercent?: number; // Added for raioXUtils
  realEstatePercent?: number; // Added for raioXUtils
  otherPercent?: number; // Added for raioXUtils
  monthlyDividends?: number; // Added for raioXUtils
  annualDividends?: number; // Added for raioXUtils
  dividendYield?: number; // Added for raioXUtils
  debtTotal?: number; // Added for portfolioService
  profitability?: {
    ytd: number;
    sixMonths: number;
    twelveMonths: number;
  };
}

export interface PortfolioSummary {
  fixed_income_value: number | string;
  investment_fund_value: number | string;
  total_portfolio_value: number | string;
  stocks_value: number | string;
  real_estate_value?: number | string;
  fixed_income_representation?: number;
  stocks_representation?: number | string;
  investment_fund_representation?: number;
  investment_international_representation?: number | string;
  total_value?: number | string;
  dataSource?: DataSourceType;
}

export interface ClientSummary {
  investor_name: string;
  summary?: string;
  tags?: string[];
  dataSource?: DataSourceType;
}

export interface DividendHistory {
  id?: number | string;
  asset: string;
  payment_date: string;
  type: string;
  value: number | string;
  quantity: number | string;
  dataSource?: DataSourceType;
}

export interface Allocation {
  current: {
    [key: string]: number;
    total?: number;
  };
  recommended: {
    [key: string]: number;
  };
  dataSource?: DataSourceType;
}

export interface Liquidity {
  currentIdle: number;
  recommended: number;
  difference: number;
  currentIdleMonths: number;
  recommendedMonths: number;
  idealReserve?: number;
  monthlyExpenses?: number;
  idealMonths?: number;
  summary?: string;
  dataSource?: DataSourceType;
}

export interface SentimentData {
  assets: {
    ticker: string;
    sentiment: number;
    impact: number;
    recentNews: string;
    dataSource?: DataSourceType;
  }[];
  summary: string;
  dataSource?: DataSourceType;
}

export interface SocialComparisonData {
  peerGroup: string;
  percentileRank: number;
  returnVsPeers: number;
  diversificationScore: number;
  overallScore: number;
  summary: string;
  dataSource?: DataSourceType;
}

export interface AllocationData {
  current: { [key: string]: number };
  recommended: { [key: string]: number };
  optimizationGain?: number;
  summary?: string;
  dataSource?: DataSourceType;
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
  dataSource?: DataSourceType;
}

export interface FinancialInsightData {
  highestSpendingMonth?: {
    month: string;
    amount: number;
    categories: { name: string; amount: number }[];
    dataSource?: DataSourceType;
  };
  wastedMoney?: {
    total: number;
    categories: { name: string; amount: number }[];
    dataSource?: DataSourceType;
  };
  topCategories?: {
    categories: { name: string; amount: number; percentage: number }[];
    total: number;
    dataSource?: DataSourceType;
  };
  negativeMonths?: {
    count: number;
    months: string[];
    totalDeficit: number;
    dataSource?: DataSourceType;
  };
  investmentGrowth?: {
    annual: number;
    total: number;
    bestAsset: { name: string; growth: number };
    dataSource?: DataSourceType;
  };
  potentialSavings?: {
    amount: number;
    suggestions: string[];
    dataSource?: DataSourceType;
  };
  bestInvestment?: {
    name: string;
    return: number;
    period: string;
    dataSource?: DataSourceType;
  };
  retirementReadiness?: {
    score: number;
    years: number;
    monthlyNeeded: number;
    dataSource?: DataSourceType;
  };
  insights?: AIInsight[];
  dataSource?: DataSourceType;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  priority?: 'high' | 'medium' | 'low';
  isNew?: boolean;
  timestamp: Date;
  agent?: 'planner' | 'investor' | 'farmer' | 'insurancer' | 'credit';
  isSynthetic?: boolean;
  type?: 'risk' | 'opportunity' | 'insight';
  impact?: 'high' | 'medium' | 'low';
  dataSource?: DataSourceType;
  actions?: string[]; // Added for InsightCard compatibility
}

// Helper type for the financial behavior module
export interface FinancialBehaviorMetrics {
  investmentConsistency: {
    grade: string;
    description: string;
    dataSource: DataSourceType;
  };
  spendingDiscipline: {
    grade: string;
    description: string;
    dataSource: DataSourceType;
  };
  financialResilience: {
    grade: string;
    description: string;
    dataSource: DataSourceType;
  };
  diversification: {
    score: number;
    description: string;
    dataSource: DataSourceType;
  };
  dataSource: DataSourceType;
}
