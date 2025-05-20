
import React from 'react';
import DataSourceTag from '@/components/common/DataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';
import { toCompatibleDataSource } from '@/utils/dataSourceAdapter';

/**
 * A wrapper component for DataSourceTag that ensures type compatibility
 * between full DataSourceType and the limited 'synthetic' | 'supabase' types
 * expected by the DataSourceTag component
 */
interface TypeSafeDataSourceTagProps {
  source?: DataSourceType | string;
  className?: string;
}

const TypeSafeDataSourceTag: React.FC<TypeSafeDataSourceTagProps> = ({ source, className }) => {
  if (!source) return null;
  
  // Convert any DataSourceType to the limited types expected by DataSourceTag
  const compatibleSource = toCompatibleDataSource(source as DataSourceType);
  
  return <DataSourceTag source={compatibleSource} className={className} />;
};

export default TypeSafeDataSourceTag;
