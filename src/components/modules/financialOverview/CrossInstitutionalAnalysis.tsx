
import React from 'react';
import DataSourceTag from './DataSourceTag';

const CrossInstitutionalAnalysis = () => {
  // Cross-institutional analysis data - this is all synthetic
  const crossInstitutionalData = {
    bankComparisons: [
      { name: "Banco A", rate: 2.1, color: "#FF6B6B", dataSource: 'synthetic' as const },
      { name: "Banco B", rate: 1.4, color: "#FFD166", dataSource: 'synthetic' as const },
      { name: "Reinvent", rate: 0.8, color: "#06D6A0", dataSource: 'synthetic' as const }
    ],
    potentialSavings: 8750,
    dataSource: 'synthetic' as const
  };
  
  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium text-white">
        Análise Cross-Institucional
        <DataSourceTag dataSource="synthetic" />
      </h4>
      
      <div className="p-3 bg-white/5 rounded-lg">
        <div className="mb-2 text-sm font-medium text-white">
          Comparação de taxas em diferentes instituições:
          <DataSourceTag dataSource="synthetic" />
        </div>
        
        {crossInstitutionalData.bankComparisons.map((bank) => (
          <div key={bank.name} className="mb-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>
                {bank.name}
                <DataSourceTag dataSource={bank.dataSource} />
              </span>
              <span>{bank.rate}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{
                  width: `${(bank.rate/3)*100}%`,
                  backgroundColor: bank.color
                }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="mt-3 text-sm">
          <div className="text-gray-400">
            Economia potencial anual:
            <DataSourceTag dataSource={crossInstitutionalData.dataSource} />
          </div>
          <div className="font-medium text-green-400">R$ {crossInstitutionalData.potentialSavings}</div>
        </div>
      </div>
    </div>
  );
};

export default CrossInstitutionalAnalysis;
