
import React from 'react';
import { Badge } from "@/components/ui/badge";
import DataSourceTag from './DataSourceTag';

interface TopRisksProps {
  finData: any;
}

const TopRisks = ({ finData }: TopRisksProps) => {
  // Early return if no topRisks data
  if (!finData.topRisks) return null;
  
  return (
    <div>
      <h3 className="font-medium text-white mb-2">
        Principais Riscos
        <DataSourceTag dataSource="synthetic" />
      </h3>
      <div className="space-y-3">
        {finData.topRisks.map((risk: any, index: number) => (
          <div key={index} className="flex items-start gap-3">
            <Badge className={`
              ${risk.severity === 'high' ? 'bg-red-600' : 
                risk.severity === 'medium' ? 'bg-amber-600' : 'bg-green-600'}
            `}>
              {risk.severity === 'high' ? 'Alto' : 
                risk.severity === 'medium' ? 'Médio' : 'Baixo'}
            </Badge>
            <div>
              <div className="font-medium text-sm text-white">
                {risk.name}
                <DataSourceTag dataSource="synthetic" />
              </div>
              <div className="text-xs text-gray-400">{risk.impact}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRisks;
