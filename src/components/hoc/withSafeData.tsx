
import React from 'react';
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Higher Order Component (HOC) that wraps module components to handle data safely.
 * This ensures that all data is validated and synthetic data is used as a fallback.
 * 
 * @param Component The component to wrap
 * @param getRealData Function to get real data
 * @param getSyntheticData Function to get synthetic data
 * @param dataSourceType Source of the real data
 * @returns A new component with safe data handling
 */
export function withSafeData<TProps extends BaseModuleProps, TData>(
  Component: React.ComponentType<TProps & { dataState: ModuleDataState<TData> }>,
  getRealData: (props: TProps) => TData | null | undefined,
  getSyntheticData: (props: TProps) => TData,
  dataSourceType: DataSourceType = 'supabase'
) {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const SafeDataComponent = (props: TProps) => {
    // Get the real data
    const realData = getRealData(props);
    
    // Determine if we should use synthetic data based on prop or missing real data
    const shouldUseSynthetic = props.useSyntheticData || !realData;
    
    // Build the data state
    const dataState: ModuleDataState<TData> = {
      data: shouldUseSynthetic ? getSyntheticData(props) : realData as TData,
      dataSource: shouldUseSynthetic ? 'synthetic' : dataSourceType,
      isSynthetic: shouldUseSynthetic
    };
    
    // Pass the data state to the component
    return <Component {...props} dataState={dataState} />;
  };
  
  SafeDataComponent.displayName = `withSafeData(${displayName})`;
  
  return SafeDataComponent;
}

/**
 * Generic function to safely extract or create properties from data objects
 * @param source The source object to extract from
 * @param property The property to extract
 * @param fallback The fallback value if the property is not found
 * @returns The property value or fallback
 */
export function safeExtract<T, K extends keyof T>(
  source: T | null | undefined,
  property: K, 
  fallback: T[K]
): T[K] {
  if (!source) return fallback;
  return source[property] !== undefined ? source[property] : fallback;
}
