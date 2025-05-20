
import React from 'react';
import { ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataSourceIndicator from './DataSourceIndicator';
import { DataSourceType } from '@/types/raioXTypes';
import { toLimitedDataSource } from '@/utils/dataSourceAdapter';

interface DetailItem {
  label: string;
  value: string;
  progress?: number;
}

interface ActionItem {
  text: string;
}

export interface PlanSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic' | string;
  details: DetailItem[];
  actions: ActionItem[];
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
}

const PlanSection = ({ 
  id, 
  title, 
  icon, 
  summary, 
  dataSource, 
  details, 
  actions, 
  isExpanded, 
  onToggle 
}: PlanSectionProps) => {
  // Ensure dataSource is always a valid type for the indicator
  const safeDataSource = dataSource || 'synthetic';
  
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      <button 
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-white">{title}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-3">
            {summary}
            <DataSourceIndicator source={safeDataSource} />
          </span>
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-gray-400" /> : 
            <ChevronDown className="h-5 w-5 text-gray-400" />
          }
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="bg-white/5 rounded-lg p-3 mb-3">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Detalhes</h4>
            <ul className="space-y-2">
              {details.map((detail, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-400">{detail.label}</span>
                  <span className="text-white font-medium">{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Ações Recomendadas</h4>
            <ul className="space-y-2">
              {actions.map((action, idx) => (
                <li key={idx} className="flex items-start">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 flex items-center"
                    onClick={() => console.log(`Action clicked: ${action.text}`)}
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    <span className="text-sm">{action.text}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSection;
