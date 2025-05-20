
import { useState, useEffect } from 'react';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Hook to adapt objects with full DataSourceType to legacy components
 * that only support 'synthetic' | 'supabase'
 * 
 * @param dataObject The object with DataSourceType properties
 * @returns Adapted object for legacy components
 */
export const useLegacyComponentAdapter = <T extends Record<string, any>>(
  dataObject: T | null | undefined
): T => {
  const [adaptedData, setAdaptedData] = useState<T>(dataObject as T);
  
  useEffect(() => {
    if (!dataObject) return;
    
    // Create a copy of the object
    const adaptedObject = { ...dataObject };
    
    // Convert any DataSourceType properties
    Object.entries(adaptedObject).forEach(([key, value]) => {
      if (key === 'dataSource' && typeof value === 'string') {
        // @ts-ignore - We'll fix this properly in the return statement
        adaptedObject[key] = toLimitedDataSource(value as DataSourceType);
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays of objects
          adaptedObject[key] = value.map(item => {
            if (item && typeof item === 'object' && 'dataSource' in item) {
              return {
                ...item,
                dataSource: toLimitedDataSource(item.dataSource as DataSourceType)
              };
            }
            return item;
          });
        } else if ('dataSource' in value) {
          // Handle nested objects with dataSource
          adaptedObject[key] = {
            ...value,
            dataSource: toLimitedDataSource(value.dataSource as DataSourceType)
          };
        }
      }
    });
    
    setAdaptedData(adaptedObject as T);
  }, [dataObject]);
  
  return adaptedData;
};
