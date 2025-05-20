
import { useState, useEffect } from 'react';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';
import { DataSourceType } from '@/types/raioXTypes';
import { ensureNumber, ensureString } from '@/utils/typeConversionHelpers';

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
  const [adaptedData, setAdaptedData] = useState<T>((dataObject || {}) as T);
  
  useEffect(() => {
    if (!dataObject) return;
    
    // Create a copy of the object
    const adaptedObject = { ...dataObject } as Record<string, any>;
    
    // Convert any DataSourceType properties
    Object.entries(adaptedObject).forEach(([key, value]) => {
      // Handle DataSource types
      if (key === 'dataSource' && typeof value === 'string') {
        adaptedObject[key] = toLimitedDataSource(value as DataSourceType);
      } 
      // Handle nested objects
      else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays of objects
          adaptedObject[key] = value.map(item => {
            if (item && typeof item === 'object') {
              // Process each item in array
              const processedItem = { ...item };
              
              // Handle dataSource property in array items
              if ('dataSource' in item) {
                processedItem.dataSource = toLimitedDataSource(item.dataSource as DataSourceType);
              }
              
              return processedItem;
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
