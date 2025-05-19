
import { X } from "lucide-react";

interface PdfPreviewProps {
  onClose: () => void;
  clientData: any;
}

const PdfPreview = ({ onClose, clientData }: PdfPreviewProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleDownload = () => {
    // Em uma implementação real, isso geraria um PDF para download
    alert("O PDF seria baixado em uma implementação real");
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="max-w-5xl w-full max-h-[90vh] overflow-auto bg-gradient-to-b from-[#171723] to-[#101018] rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">Diagnóstico Financeiro • {clientData.clientName}</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors"
            >
              Baixar PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Resumo do Cliente */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  Seu panorama financeiro
                </h3>
                <p className="text-gray-400 mt-1">Uma visão completa da sua jornada financeira</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Data do diagnóstico</p>
                <p className="text-lg font-medium text-white">19 de Maio, 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg p-4 backdrop-blur-sm border border-blue-500/20">
                <p className="text-sm text-blue-300 mb-1">Patrimônio total</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(1250000)}</p>
                <p className="text-xs text-blue-200 mt-1">+12,5% desde o último trimestre</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 backdrop-blur-sm border border-purple-500/20">
                <p className="text-sm text-purple-300 mb-1">Score de diversificação</p>
                <p className="text-2xl font-bold text-white">73/100</p>
                <p className="text-xs text-purple-200 mt-1">Melhor que 65% dos investidores</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg p-4 backdrop-blur-sm border border-green-500/20">
                <p className="text-sm text-green-300 mb-1">Potencial de otimização</p>
                <p className="text-2xl font-bold text-white">+{formatCurrency(37500)}/ano</p>
                <p className="text-xs text-green-200 mt-1">Com ajustes na alocação atual</p>
              </div>
            </div>
          </div>
          
          {/* Narrativa Principal */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-indigo-400 mb-4">Sua história financeira em 2025</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-amber-500/20 rounded-full p-3 h-fit">
                  <span className="text-amber-500 text-xl">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-amber-400 mb-2">Você viveu no limite?</h4>
                  <p className="text-gray-300 mb-3">
                    Em março, você gastou R$ 15.800, o equivalente a 3 iPhones Pro Max ou 1 mês num apê no Jardins. 
                    Foi seu recorde do ano. Respeitamos o corre, mas talvez... tenha passado da conta?
                  </p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-red-500/20 rounded-full p-3 h-fit">
                  <span className="text-red-500 text-xl">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-2">Dinheiro que escorreu pelo ralo</h4>
                  <p className="text-gray-300 mb-3">
                    Só com assinaturas não utilizadas, você gastou R$ 4.320 no último ano.
                    Se tivesse colocado metade disso num CDB, teria hoje R$ 2.376 adicionais.
                    Mas tudo bem. A gente olha pra frente.
                  </p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-400 to-red-600" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-500/20 rounded-full p-3 h-fit">
                  <span className="text-blue-500 text-xl">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-400 mb-2">O que você mais comprou?</h4>
                  <p className="text-gray-300 mb-3">
                    Top 3 categorias do seu cartão: Delivery (R$ 12.840), Assinaturas (R$ 8.620) e Eletrônicos (R$ 7.980).
                    Spoiler: você pediu 98 vezes no iFood. Sim, a gente contou.
                  </p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-green-500/20 rounded-full p-3 h-fit">
                  <span className="text-green-500 text-xl">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-2">A hora que você brilhou</h4>
                  <p className="text-gray-300 mb-3">
                    Seu melhor investimento foi HGLG11, com 22% de rentabilidade.
                    Se tivesse colocado o dobro, teria ganho R$ 28.600 adicionais.
                    Bora repetir a dose — mas com estratégia.
                  </p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-purple-500/20 rounded-full p-3 h-fit">
                  <span className="text-purple-500 text-xl">5</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-purple-400 mb-2">E se você focasse de verdade?</h4>
                  <p className="text-gray-300 mb-3">
                    Se reduzir 15% dos seus gastos com restaurantes, dá pra investir R$ 960 todo mês.
                    Isso pode virar R$ 1.470.000 em 25 anos — que te deixa mais perto da sua independência financeira.
                  </p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recomendações */}
          <div className="bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Próximos Passos Recomendados</h3>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-md font-medium text-white">1. Otimizar sua alocação atual</h4>
                <p className="text-gray-300 mt-1">
                  Realoque 12% dos seus investimentos de renda fixa para um mix mais diversificado de FIIs e multimercados.
                  <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 24.600/ano</span>
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-md font-medium text-white">2. Revisar custos fixos mensais</h4>
                <p className="text-gray-300 mt-1">
                  Consolidar assinaturas duplicadas e renegociar pacotes bancários pode liberar até R$ 780/mês para investimentos.
                  <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 9.360/ano</span>
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-md font-medium text-white">3. Implementar automação financeira</h4>
                <p className="text-gray-300 mt-1">
                  Configure transferências automáticas para investir 25% da sua renda no primeiro dia do mês.
                  <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 75.000 em 3 anos</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Chamada para ação */}
          <div className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Vamos implementar essas melhorias juntos?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Nossa equipe está pronta para executar este plano personalmente com você.
              Agende uma call agora e vamos transformar seu diagnóstico em ação concreta.
            </p>
            <button className="px-8 py-3 bg-white text-indigo-800 rounded-full font-bold hover:bg-opacity-90 transition-all">
              Agendar Consulta Estratégica
            </button>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-8">
            <p>© 2025 Reinvent Financial Services • Diagnóstico gerado em 19/05/2025</p>
            <p className="mt-1">Dados baseados em análise de transações e portfólio até 15/05/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
