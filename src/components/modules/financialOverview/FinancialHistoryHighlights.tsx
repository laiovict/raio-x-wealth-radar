
import React from 'react';
import DataSourceTag from './DataSourceTag';

interface FinancialHistoryHighlightsProps {
  showBehavioralInsights: boolean;
}

const FinancialHistoryHighlights = ({ showBehavioralInsights }: FinancialHistoryHighlightsProps) => {
  // Financial history highlights data - this is all synthetic
  const financialHistoryData = [
    {
      id: 1,
      title: "Você viveu no limite?",
      description: "Em março, você gastou R$ 15.800, o equivalente a 3 iPhones Pro Max ou 1 mês num apê no Jardins. Foi seu recorde do ano.",
      progress: 85,
      color: "#FFD166",
      dataSource: 'synthetic' as const
    },
    {
      id: 2,
      title: "Dinheiro que escorreu pelo ralo",
      description: "Só com assinaturas não utilizadas, você gastou R$ 4.320 no último ano. Se tivesse colocado metade disso num CDB, teria hoje R$ 2.376 adicionais.",
      progress: 60,
      color: "#FF6B6B",
      dataSource: 'synthetic' as const
    },
    {
      id: 3,
      title: "O que você mais comprou?",
      description: "Top 3 categorias do seu cartão: Delivery (R$ 12.840), Assinaturas (R$ 8.620) e Eletrônicos (R$ 7.980). Spoiler: você pediu 98 vezes no iFood.",
      progress: 75,
      color: "#4D96FF",
      dataSource: 'synthetic' as const
    },
    {
      id: 4,
      title: "A hora que você brilhou",
      description: "Seu melhor investimento foi HGLG11, com 22% de rentabilidade. Se tivesse colocado o dobro, teria ganho R$ 28.600 adicionais.",
      progress: 100,
      color: "#06D6A0",
      dataSource: 'synthetic' as const
    },
    {
      id: 5,
      title: "E se você focasse de verdade?",
      description: "Se reduzir 15% dos seus gastos com restaurantes, dá pra investir R$ 960 todo mês. Isso pode virar R$ 1.470.000 em 25 anos.",
      progress: 50,
      color: "#9C27B0",
      dataSource: 'synthetic' as const
    }
  ];

  if (!showBehavioralInsights) return null;
  
  return (
    <div className="space-y-4">
      {financialHistoryData.map((item) => (
        <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
              {item.id}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-medium text-white mb-1">
                {item.title}
                <DataSourceTag dataSource={item.dataSource} />
              </h4>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: item.color
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialHistoryHighlights;
