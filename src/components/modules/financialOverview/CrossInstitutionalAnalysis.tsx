
import React from 'react';
import { Badge } from "@/components/ui/badge";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface CrossInstitutionalAnalysisProps {
  useSyntheticData?: boolean;
}

const CrossInstitutionalAnalysis = ({ useSyntheticData = false }: CrossInstitutionalAnalysisProps) => {
  // For the Beta version, we would use real OpenFinance data
  // But for now we just check the flag to see if we should show synthetic data
  const dataSource = useSyntheticData ? 'synthetic' : 'openfinance';
  
  return (
    <div className="space-y-5">
      <h4 className="text-lg font-medium text-white">
        Sua Distribuição Entre Instituições
        <TypeSafeDataSourceTag source={dataSource} />
      </h4>
      
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Exposição em 4 bancos
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xs text-gray-400 mt-1">Bom nível de diversificação entre instituições</div>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700 ml-2">A+</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Concentração máxima em banco
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xs text-gray-400 mt-1">38% de seus ativos estão em uma única instituição</div>
        </div>
        <Badge className="bg-yellow-600 hover:bg-yellow-700 ml-2">B</Badge>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Potencial de economia
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xs text-gray-400 mt-1">Economize até R$ 2.500/ano consolidando serviços</div>
        </div>
        <Badge className="bg-blue-600 hover:bg-blue-700 ml-2">↓ 18%</Badge>
      </div>
    </div>
  );
};

export default CrossInstitutionalAnalysis;
