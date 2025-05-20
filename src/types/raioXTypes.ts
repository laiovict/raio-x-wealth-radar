
// Define the AIInsight type for Raio-X insights
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'insight';
  category: string;
  impact: 'high' | 'medium' | 'low';
  actions?: string[];
  // Add missing properties
  agent?: string;
  priority?: 'high' | 'medium' | 'low';
  isNew?: boolean;
  isSynthetic?: boolean;
  timestamp: Date;
}

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
  dataSource?: 'synthetic' | 'supabase';
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
  dataSource?: 'synthetic' | 'supabase';
  [key: string]: any; // Allow other properties
}

// Define the ClientSummary type
export interface ClientSummary {
  summary_id: number;
  investor_account_on_brokerage_house: number;
  investor_name: string;
  summary: string;
  tags?: string;
  dataSource?: 'synthetic' | 'supabase';
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
  dataSource?: 'synthetic' | 'supabase';
  // Add missing properties needed for FinancialOverviewModule
  netWorth?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  totalLiabilities?: number;
  savingsRate?: number;
  liquidAssets?: number;
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
    total?: number | string;
  };
  recommended: {
    [key: string]: number;
  };
}

// Define the Liquidity type
export interface Liquidity {
  currentIdle: number | string;
  recommended: number;
  difference: number;
  currentIdleMonths: number;
  recommendedMonths: number;
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
  lifeGoals?: any[];
  financialPlans?: any[];
  financialInsightData?: any;
  openFinanceData?: OpenFinanceData;
  // Add missing properties
  allocation?: Allocation;
  liquidity?: Liquidity;
  projection?: any;
  recommendations?: any[];
  sentiment?: any;
  clientAge?: number;
  financialSummary?: FinancialSummary;
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
