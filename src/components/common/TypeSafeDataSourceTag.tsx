
import React from 'react';
import { DataSourceType } from '@/types/raioXTypes';
import { Badge } from '@/components/ui';
import { Database, Award, Sparkles } from 'lucide-react';

interface TypeSafeDataSourceTagProps {
  source?: DataSourceType;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

/**
 * A component that renders a badge with an icon representing the data source.
 * This provides a consistent way to show data sources across the application.
 */
const TypeSafeDataSourceTag: React.FC<TypeSafeDataSourceTagProps> = ({ 
  source = 'synthetic',
  size = 'sm',
  showText = false
}) => {
  // Define styles based on size
  const getSizeStyles = () => {
    switch (size) {
      case 'lg': return "ml-2 px-2.5 py-1";
      case 'md': return "ml-2 px-2 py-0.5 text-xs";
      case 'sm': 
      default: return "ml-2 px-1.5 py-0.5 text-xs";
    }
  };
  
  // Define content based on source
  const getSourceContent = () => {
    switch (source) {
      case 'supabase':
        return {
          icon: <Database className="h-3 w-3 mr-1" />,
          text: "Real",
          className: "bg-green-900/30 hover:bg-green-800/40 text-green-400 border-green-500/30"
        };
      case 'openfinance':
        return {
          icon: <Award className="h-3 w-3 mr-1" />,
          text: "Open Finance",
          className: "bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 border-blue-500/30"
        };
      case 'xp':
        return {
          icon: <Award className="h-3 w-3 mr-1" />,
          text: "XP",
          className: "bg-yellow-900/30 hover:bg-yellow-800/40 text-yellow-400 border-yellow-500/30"
        };
      case 'synthetic':
      default:
        return {
          icon: <Sparkles className="h-3 w-3 mr-1" />,
          text: "Simulado",
          className: "bg-purple-900/30 hover:bg-purple-800/40 text-purple-400 border-purple-500/30"
        };
    }
  };
  
  const sourceContent = getSourceContent();
  
  return (
    <Badge variant="outline" className={`${getSizeStyles()} ${sourceContent.className}`}>
      <div className="flex items-center">
        {sourceContent.icon}
        {showText && <span>{sourceContent.text}</span>}
      </div>
    </Badge>
  );
};

export default TypeSafeDataSourceTag;
