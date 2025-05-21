
import React from 'react';
import DataSourceTag from '@/components/common/DataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';
import { toSafeString } from '@/utils/typeConversionHelpers';

/**
 * A wrapper component for DataSourceTag that ensures type compatibility
 * between full DataSourceType and the limited 'synthetic' | 'supabase' types
 * expected by the DataSourceTag component.
 * 
 * This component handles the conversion and provides a consistent way to display
 * data source information across the application.
 */
interface TypeSafeDataSourceTagProps {
  source?: DataSourceType | string | number;
  className?: string;
  showLabel?: boolean;
}

const TypeSafeDataSourceTag: React.FC<TypeSafeDataSourceTagProps> = ({ 
  source, 
  className,
  showLabel = false
}) => {
  if (source === undefined || source === null) return null;
  
  // Convert source to string and then to the limited types expected by DataSourceTag
  const sourceAsString = toSafeString(source);
  const compatibleSource = toLimitedDataSource(source);
  
  return (
    <div className="flex items-center">
      <DataSourceTag source={compatibleSource} className={className} />
      {showLabel && (
        <span className="text-xs ml-1 text-gray-400">
          {compatibleSource === 'synthetic' ? 'Dados sintéticos' : 'Dados reais'}
        </span>
      )}
    </div>
  );
};

export default TypeSafeDataSourceTag;
