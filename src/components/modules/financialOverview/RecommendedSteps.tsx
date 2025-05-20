
import React from 'react';
import { Badge } from "@/components/ui/badge";
import DataSourceTag from './DataSourceTag';

const RecommendedSteps = () => {
  // Recommended next steps - this is all synthetic
  const recommendedSteps = [
    {
      id: 1,
      title: "Otimizar sua alocação atual",
      description: "Realoque 12% dos seus investimentos de renda fixa para um mix mais diversificado de FIIs e multimercados.",
      impact: "+R$ 24.600/ano",
      dataSource: 'synthetic' as const
    },
    {
      id: 2,
      title: "Revisar custos fixos mensais",
      description: "Consolidar assinaturas duplicadas e renegociar pacotes bancários pode liberar até R$ 780/mês para investimentos.",
      impact: "+R$ 9.360/ano",
      dataSource: 'synthetic' as const
    }
  ];

  return (
    <div className="mt-6">
      <div className="mb-4 border-b border-white/10 pb-2">
        <div className="text-lg font-medium text-white">
          Próximos Passos Recomendados
          <DataSourceTag dataSource="synthetic" />
        </div>
      </div>
      
      <div className="space-y-4">
        {recommendedSteps.map((step) => (
          <div key={step.id} className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-base font-medium text-white">
                {step.id}. {step.title}
                <DataSourceTag dataSource={step.dataSource} />
              </h4>
              <Badge className="bg-green-600">{step.impact}</Badge>
            </div>
            <p className="text-sm text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSteps;
