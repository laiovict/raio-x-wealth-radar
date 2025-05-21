
import { ReactNode } from 'react';
import { DataSourceType } from './raioXTypes';

/**
 * Base interface for all module components
 * Ensures all modules have a consistent prop interface
 */
export interface BaseModuleProps {
  /** Controls if the module renders in full width */
  fullWidth?: boolean;
  /** Controls if synthetic data should be used */
  useSyntheticData?: boolean;
  /** Optional custom className */
  className?: string;
  /** Optional children nodes */
  children?: ReactNode;
}

/**
 * Interface for module data state
 */
export interface ModuleDataState<T> {
  /** The data being displayed */
  data: T;
  /** Source of the data */
  dataSource: DataSourceType;
  /** Whether this is real or synthetic data */
  isSynthetic: boolean;
}

/**
 * Interface for savings rate data returned by calculateSavingsRate
 */
export interface SavingsRateData {
  /** The savings rate as a formatted string (with decimal places) */
  rate: string;
  /** The trend compared to a previous period */
  trend: string;
  /** The source of this data */
  dataSource: DataSourceType;
}
