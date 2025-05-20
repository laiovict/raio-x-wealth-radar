
// Define the AIInsight type for Raio-X insights
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'insight';
  category: string;
  impact: 'high' | 'medium' | 'low';
  actions?: string[];
  agent?: string;
  priority?: 'high' | 'medium' | 'low';
  isNew?: boolean;
  isSynthetic?: boolean;
  timestamp: Date;
  dataSource?: DataSourceType;
}

// Define the DataSourceType for source tagging
export type DataSourceType = 'xp' | 'openfinance' | 'synthetic';

// Define the PortfolioSummary type
export interface PortfolioSummary {
  investor_account_on_brokerage_house: number;
  fixed_income_value: string | number;
  fixed_income_representation: number;
  investment_fund_value: string | number;
  investment_fund_representation: number;
  real_estate_value: string | number;
  real_estate_representation: number;
  stocks_value: string | number;
  stocks_representation: string | number;
  private_pension_value: number;
  private_pension_representation: number;
  total_portfolio_value: string | number;
  dataSource?: DataSourceType;
  [key: string]: any; // Allow other properties
}

// Define the DividendHistory type
export interface DividendHistory {
  id: number;
  investor_account_on_brokerage_house: number;
  type: string;
  quantity: string;
  value: string;
  payment_date: string;
  asset: string;
  dataSource?: DataSourceType;
  [key: string]: any; // Allow other properties
}

// Define the ClientSummary type
export interface ClientSummary {
  summary_id: number;
  investor_account_on_brokerage_house: number;
  investor_name: string;
  summary: string;
  tags?: string;
  dataSource?: DataSourceType;
  [key: string]: any; // Allow other properties
}

// Define the FinancialSummary type for consolidated summary data
export interface FinancialSummary {
  totalAssets: number;
  fixedIncomePercent: number;
  variableIncomePercent: number;
  realEstatePercent: number;
  otherPercent: number;
  monthlyDividends: number;
  annualDividends: number;
  dividendYield: number;
  profitability: {
    ytd: number;
    sixMonths: number;
    twelveMonths: number;
  };
  dataSource?: DataSourceType;
  // Additional properties needed for FinancialOverviewModule
  netWorth?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  totalLiabilities?: number;
  savingsRate?: number;
  liquidAssets?: number;
  investmentBalance?: number;
  cashReserves?: number;
  debtTotal?: number;
  riskProfile?: string;
  allocationSummary?: {
    stocks: number;
    bonds: number;
    cash: number;
    realEstate: number;
    alternatives: number;
  };
  riskMetrics?: {
    name: string;
    value: number;
    color: string;
  }[];
  creditScore?: number;
}

// Define the OpenFinanceData type
export interface OpenFinanceData {
  hasOpenFinanceData: boolean;
  openFinanceAccounts: string[];
  openFinanceInvestments: any[];
  openFinanceTransactions: any[];
  openFinanceInsights: any;
}

// Define the Allocation type
export interface Allocation {
  current: {
    [key: string]: number;
  };
  recommended: {
    [key: string]: number;
  };
  optimizationGain?: number;
  summary?: string;
  dataSource?: DataSourceType;
}

// Define the Liquidity type
export interface Liquidity {
  currentIdle: number | string;
  recommended: number;
  difference: number;
  currentIdleMonths: number;
  recommendedMonths: number;
  // Add missing properties
  idealReserve?: number;
  monthlyExpenses?: number;
  idealMonths?: number;
  summary?: string;
  dataSource?: DataSourceType;
}

// Define SentimentData type
export interface SentimentData {
  assets?: Array<{
    ticker: string;
    sentiment: number;
    impact: number;
    recentNews: string;
    dataSource?: DataSourceType;
  }>;
  summary?: string;
  overallScore?: number;
  categories?: {
    investment: number;
    planning: number;
    protection: number;
  };
  dataSource?: DataSourceType;
}

// Define SocialComparisonData
export interface SocialComparisonData {
  peerGroup?: string;
  percentileRank?: number;
  returnVsPeers?: number;
  diversificationScore?: number;
  summary?: string;
  dataSource?: DataSourceType;
}

// Define AllocationData
export interface AllocationData extends Allocation {
  // Additional properties specific to allocation data
}

// Define WrappedData
export interface WrappedData {
  biggestContribution?: {
    amount: number;
    date: string;
  };
  longestPositiveStreak?: number;
  largestDrawdown?: {
    percentage: number;
    period: string;
  };
  mostProfitableAsset?: {
    name: string;
    return: number;
  };
  summary?: string;
  dataSource?: DataSourceType;
}

// Define FinancialInsightData
export interface FinancialInsightData {
  highestSpendingMonth?: {
    month: string;
    amount: number;
    categories: {name: string; amount: number}[];
    dataSource?: DataSourceType;
  };
  wastedMoney?: {
    total: number;
    categories: {name: string; amount: number}[];
    dataSource?: DataSourceType;
  };
  topCategories?: {
    categories: {name: string; amount: number; percentage: number}[];
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
    bestAsset: {name: string; growth: number};
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
  insights?: any[];
  dataSource?: DataSourceType;
}

// Complete Raio-X data structure for easy access to all client information
export interface RaioXData {
  clientName: string;
  clientSummary?: ClientSummary;
  portfolioSummary?: PortfolioSummary;
  fixedIncome: any[];
  investmentFunds: any[];
  realEstate: any[];
  stocks: any[];
  profitability?: any;
  dividendHistory: DividendHistory[];
  lifeEvents?: any[];
  lifeGoals?: {
    goals?: any[];
    summary?: string;
    dataSource?: DataSourceType;
  };
  financialPlans?: any[];
  financialInsightData?: FinancialInsightData;
  openFinanceData?: OpenFinanceData;
  allocation?: Allocation;
  liquidity?: Liquidity;
  projection?: any;
  recommendations?: any[];
  sentiment?: SentimentData;
  clientAge?: number;
  financialSummary?: FinancialSummary;
  summary?: any; // Added for RecommendationsModule
  socialComparison?: SocialComparisonData; // Added for SocialComparisonModule
  wrapped?: WrappedData; // Added for WrappedModule
}

// Props for the Raio-X context provider
export interface RaioXProviderProps {
  children: React.ReactNode;
  hasOpenFinance?: boolean;
  selectedClient?: number | null;
}

// Context type definition for Raio-X
export interface RaioXContextProps {
  data: RaioXData;
  hasOpenFinance: boolean;
  selectedClient: number | null;
  financialSummary?: FinancialSummary | null;
  isAIAnalysisLoading?: boolean;
  refreshAIAnalysis?: () => void;
  aiInsights: AIInsight[];
  portfolioSummary?: PortfolioSummary;
  profitability?: any;
  dividendHistory?: DividendHistory[];
  clientSummary?: ClientSummary;
  totalDividends: number;
  averageMonthlyDividends: number;
  stocks: any[];
  hasOpenFinanceData: boolean;
  openFinanceAccounts: string[];
  openFinanceInvestments: any[];
  openFinanceTransactions: any[];
  openFinanceInsights: any;
  consolidatedFinancialReport: any;
}
