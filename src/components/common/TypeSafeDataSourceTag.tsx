
import React from 'react';
import DataSourceTag from '@/components/common/DataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';

/**
 * A wrapper component for DataSourceTag that ensures type compatibility
 * between full DataSourceType and the limited 'synthetic' | 'supabase' types
 * expected by the DataSourceTag component.
 * 
 * This component handles the conversion and provides a consistent way to display
 * data source information across the application.
 */
interface TypeSafeDataSourceTagProps {
  source?: DataSourceType | string | number | null;
  className?: string;
  showLabel?: boolean;
}

const TypeSafeDataSourceTag: React.FC<TypeSafeDataSourceTagProps> = ({ 
  source, 
  className,
  showLabel = false
}) => {
  if (source === undefined || source === null) return null;

  // We'll pass the source directly to DataSourceTag which now handles different types
  return (
    <div className="flex items-center">
      <DataSourceTag source={source} className={className} />
      {showLabel && (
        <span className="text-xs ml-1 text-gray-400">
          {source !== 'synthetic' ? 'Dados reais' : 'Dados sintéticos'}
        </span>
      )}
    </div>
  );
};

export default TypeSafeDataSourceTag;
