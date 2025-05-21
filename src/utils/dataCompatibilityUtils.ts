
import { DataSourceType } from '@/types/raioXTypes';
import { toNumber } from '@/utils/typeConversionHelpers';

// Import formatCurrency and formatPercentage from typeConversionHelpers
import { 
  formatCurrency as formatCurrencyHelper, 
  formatPercentage as formatPercentageHelper 
} from '@/utils/typeConversionHelpers';

// Re-export these functions for backward compatibility
export const formatCurrency = formatCurrencyHelper;
export const formatPercentage = formatPercentageHelper;

/**
 * Safe type conversion utility for legacy code
 * @param value Value to convert
 * @returns Number
 */
export const ensureSafeNumber = (value: any): number => {
  return toNumber(value);
};

/**
 * Helper to convert between data source types
 */
export const convertDataSourceType = (source?: string): DataSourceType => {
  if (!source) return 'synthetic';
  
  if (source === 'xp') return 'supabase';
  if (source === 'openfinance') return 'openfinance';
  if (source === 'calculated') return 'calculated';
  if (source === 'supabase') return 'supabase';
  
  return 'synthetic';
};
