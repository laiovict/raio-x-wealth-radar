
// Basic data types for the RaioX application

export type DataSourceType = 'synthetic' | 'supabase' | 'xp' | 'openfinance' | 'calculated';

export interface RaioXContextData {
  data: any;
  hasOpenFinance: boolean;
  isAIAnalysisLoading: boolean;
  selectedClient: string | null;
  refreshAIAnalysis: () => void;
}
