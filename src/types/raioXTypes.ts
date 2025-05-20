
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

// Add interfaces for portfolio data from Supabase
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

export interface RaioXContextProps {
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
  stocks?: any[];
}

export interface RaioXProviderProps {
  children: React.ReactNode;
  hasOpenFinance?: boolean;
  selectedClient?: number | null;
}
