
import React from 'react';
import { CheckCircle } from "lucide-react";

interface DataSourceInfoPanelProps {
  showDataSourceInfo: boolean;
}

const DataSourceInfoPanel = ({ showDataSourceInfo }: DataSourceInfoPanelProps) => {
  if (!showDataSourceInfo) return null;

  const dataSourceInfo = {
    supabase: "Dados provenientes do Supabase, representando informações reais do cliente.",
    synthetic: "Dados sintéticos gerados para demonstração, não representam valores reais do cliente."
  };
  
  return (
    <div className="mt-2 p-2 bg-gray-800/50 rounded-md text-xs">
      <div className="flex items-center mb-1">
        <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
        <span>{dataSourceInfo.supabase}</span>
      </div>
      <div className="flex items-center">
        <span className="text-amber-400 mr-1">*</span>
        <span>{dataSourceInfo.synthetic}</span>
      </div>
    </div>
  );
};

export default DataSourceInfoPanel;
