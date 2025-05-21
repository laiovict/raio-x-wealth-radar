
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Base props interface for all module components
 */
export interface BaseModuleProps {
  /** Whether the module should take full width */
  fullWidth?: boolean;
  /** Whether to use synthetic data instead of real data */
  useSyntheticData?: boolean;
}

/**
 * The state of data for a module, including source information
 */
export interface ModuleDataState<T> {
  /** The actual data for the module */
  data: T;
  /** The source of the data (supabase, synthetic, calculated, etc) */
  dataSource: DataSourceType;
  /** Flag indicating if synthetic data is being used */
  isSynthetic: boolean;
}
