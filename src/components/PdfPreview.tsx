
import { X, FileDown, Podcast, Video, Lock, Shield, Share2 } from "lucide-react";

interface PdfPreviewProps {
  onClose: () => void;
  clientData: any;
  mediaType?: string;
  isClientFull?: boolean;
  hasOpenFinance?: boolean;
  onShare?: () => void;
}

const PdfPreview = ({ 
  onClose, 
  clientData, 
  mediaType = "pdf",
  isClientFull = true,
  hasOpenFinance = false,
  onShare
}: PdfPreviewProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleDownload = () => {
    // Em uma implementação real, isso geraria um PDF para download
    alert("O conteúdo seria baixado em uma implementação real");
  };

  const renderMediaTypeIcon = () => {
    switch (mediaType) {
      case "podcast":
        return <Podcast className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default: // pdf
        return <FileDown className="h-5 w-5" />;
    }
  };

  const renderMediaTypeTitle = () => {
    switch (mediaType) {
      case "podcast":
        return "Podcast Financeiro";
      case "video":
        return "Vídeo Diagnóstico";
      default: // pdf
        return "Diagnóstico Financeiro";
    }
  };

  const renderMediaTypePreview = () => {
    switch (mediaType) {
      case "podcast":
        return (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="rounded-full bg-indigo-500/20 p-6 inline-flex mb-4">
              <Podcast className="h-16 w-16 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Seu Diagnóstico em Áudio</h3>
            <p className="text-gray-300 mb-6">
              Escute onde quiser o seu diagnóstico completo, com insights personalizados e dicas para otimizar seus investimentos.
            </p>
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-6 mb-6">
              <div className="w-full bg-white/10 h-2 rounded-full mb-3">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full rounded-full w-0"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>00:00</span>
                <span>23:45</span>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
              >
                Download MP3
              </button>
            </div>
          </div>
        );
      case "video":
        return (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg mb-6 flex items-center justify-center">
              <Video className="h-20 w-20 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Seu Diagnóstico em Vídeo</h3>
            <p className="text-gray-300 mb-6">
              Assista ao seu diagnóstico completo em um vídeo interativo, com gráficos detalhados e análises visuais da sua carteira.
            </p>
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-6 mb-6">
              <div className="w-full bg-white/10 h-2 rounded-full mb-3">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full w-0"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>00:00</span>
                <span>12:18</span>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
              >
                Download MP4
              </button>
            </div>
          </div>
        );
      default: // pdf
        return renderPdfContent();
    }
  };

  const renderPdfContent = () => {
    return (
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
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-400">Data do diagnóstico</p>
              <p className="text-lg font-medium text-white">19 de Maio, 2025</p>
              
              {hasOpenFinance && (
                <div className="mt-2 bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full flex items-center dark:bg-green-900/30 dark:text-green-400">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>OpenFinance</span>
                </div>
              )}
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
        
        {/* OpenFinance Analytics (if enabled) */}
        {hasOpenFinance && (
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-bold text-white">Dados OpenFinance</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-medium mb-2">Seu Comportamento Financeiro</h4>
                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Recorrência de Investimentos</span>
                      <span className="text-sm font-medium text-green-400">A+</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Investiu consistentemente nos últimos 24 meses</p>
                  </div>
                  
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Disciplina de Gastos</span>
                      <span className="text-sm font-medium text-yellow-400">B</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Excedeu o orçamento em 18% em 3 dos últimos 6 meses</p>
                  </div>
                  
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Resiliência Financeira</span>
                      <span className="text-sm font-medium text-green-400">A</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Reserva de emergência cobre 8 meses de despesas</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Análise Cross-Institucional</h4>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-3">Comparação de taxas em diferentes instituições:</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-gray-400">Banco A</span>
                      <div className="flex-grow h-2 bg-gray-700 rounded-full">
                        <div className="h-full bg-red-500 rounded-full" style={{width: "85%"}}></div>
                      </div>
                      <span className="ml-2 text-xs text-red-400">2.1%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-gray-400">Banco B</span>
                      <div className="flex-grow h-2 bg-gray-700 rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{width: "60%"}}></div>
                      </div>
                      <span className="ml-2 text-xs text-yellow-400">1.4%</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-gray-400">Reinvent</span>
                      <div className="flex-grow h-2 bg-gray-700 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{width: "35%"}}></div>
                      </div>
                      <span className="ml-2 text-xs text-green-400">0.8%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Economia potencial anual:</span>
                      <span className="text-green-400 font-medium">{formatCurrency(8750)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
        
        {/* Recomendações - diferentes para prospects e clientes */}
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
            
            {isClientFull ? (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-md font-medium text-white">2. Revisar custos fixos mensais</h4>
                  <p className="text-gray-300 mt-1">
                    Consolidar assinaturas duplicadas e renegociar pacotes bancários pode liberar até R$ 780/mês para investimentos.
                    <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 9.360/ano</span>
                  </p>
                </div>
                
                {hasOpenFinance && (
                  <div className="bg-white/10 rounded-lg p-4 border-l-2 border-green-500">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <h4 className="text-md font-medium text-white">3. Otimização cross-institucional</h4>
                    </div>
                    <p className="text-gray-300 mt-1">
                      De acordo com seus dados OpenFinance, consolidar seus investimentos do Banco A para Reinvent pode reduzir taxas administrativas em 62%.
                      <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 8.750/ano</span>
                    </p>
                  </div>
                )}
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-md font-medium text-white">{hasOpenFinance ? "4" : "3"}. Implementar automação financeira</h4>
                  <p className="text-gray-300 mt-1">
                    Configure transferências automáticas para investir 25% da sua renda no primeiro dia do mês.
                    <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 75.000 em 3 anos</span>
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-md font-medium text-white">{hasOpenFinance ? "5" : "4"}. Realocar investimentos de baixa performance</h4>
                  <p className="text-gray-300 mt-1">
                    Três de seus fundos tiveram performance abaixo do benchmark por 18 meses consecutivos. Recomendamos realocação.
                    <span className="text-blue-300 block mt-1">Impacto estimado: +R$ 12.850/ano</span>
                  </p>
                </div>
                
                {hasOpenFinance && (
                  <div className="bg-white/10 rounded-lg p-4 border-l-2 border-green-500">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <h4 className="text-md font-medium text-white">6. Estratégia tributária avançada</h4>
                    </div>
                    <p className="text-gray-300 mt-1">
                      Usando dados consolidados OpenFinance, identificamos oportunidade para compensação de perdas fiscais em múltiplas instituições.
                      <span className="text-blue-300 block mt-1">Impacto estimado: -R$ 12.960 em impostos</span>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-indigo-300" />
                  <h4 className="text-lg font-medium text-indigo-300">Recomendações detalhadas</h4>
                </div>
                <p className="text-gray-300">
                  Como prospect, você tem acesso a uma prévia do nosso diagnóstico. Para obter acesso completo 
                  a todas as recomendações específicas e detalhadas, incluindo estratégias avançadas de 
                  otimização fiscal e de performance, torne-se um cliente.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Chamada para ação */}
        <div className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Vamos implementar essas melhorias juntos?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Nossa equipe está pronta para executar este plano personalmente com você.
            {hasOpenFinance ? " Com OpenFinance, temos todos os dados necessários para agir imediatamente." : ""}
            Agende uma call agora e vamos transformar seu diagnóstico em ação concreta.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-800 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Agendar Consulta Estratégica
          </button>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© 2025 Reinvent Financial Services • Diagnóstico gerado em 19/05/2025</p>
          <p className="mt-1">Dados baseados em análise de transações e portfólio até 15/05/2025</p>
          {hasOpenFinance && <p className="mt-1 text-green-500">Com dados enriquecidos via OpenFinance</p>}
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="max-w-5xl w-full max-h-[90vh] overflow-auto bg-gradient-to-b from-[#171723] to-[#101018] rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {renderMediaTypeIcon()}
            {renderMediaTypeTitle()} • {clientData.clientName}
            {hasOpenFinance && (
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-full flex items-center dark:bg-green-900/30 dark:text-green-400">
                <Shield className="h-3 w-3 mr-1" />
                <span>OpenFinance</span>
              </span>
            )}
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShare}
              className="px-4 py-2 bg-green-500/30 hover:bg-green-500/50 border border-green-500/30 rounded-full text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Enviar via WhatsApp
            </button>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              {mediaType === "pdf" ? "Baixar PDF" : mediaType === "podcast" ? "Baixar MP3" : "Baixar MP4"}
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {renderMediaTypePreview()}
      </div>
    </div>
  );
};

export default PdfPreview;
