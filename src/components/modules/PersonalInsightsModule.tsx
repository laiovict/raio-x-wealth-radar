
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wine, Wallet, Plane, Home, Briefcase, Heart, ShieldCheck, Target, TrendingUp, AlertTriangle, Calendar, MapPin, Car, Award, PiggyBank } from "lucide-react";

interface PersonalInsightsModuleProps {
  fullWidth?: boolean;
}

const PersonalInsightsModule = ({ fullWidth = false }: PersonalInsightsModuleProps) => {
  const { data } = useRaioX();
  
  // Check if OpenFinance is integrated
  const hasOpenFinance = data.hasOpenFinance || false;
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600/50 p-2">
              <Users className="h-5 w-5 text-blue-100" />
            </div>
            <CardTitle className="text-xl text-white">
              O Que Sabemos Sobre Você
            </CardTitle>
          </div>
          {hasOpenFinance && (
            <div className="flex items-center bg-green-400/20 text-green-100 text-xs px-3 py-1.5 rounded-full border border-green-400/30">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
              <span className="font-medium">OpenFinance</span>
            </div>
          )}
        </div>
        <p className="text-blue-200 mt-1 text-sm">
          Análise financeira personalizada baseada em seu perfil profissional e objetivos
        </p>
      </CardHeader>
      
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 p-0">
        <div className="space-y-0">
          {/* Client Profile */}
          <div className="group hover:bg-blue-900/10 transition-colors">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-3.5 shadow-md">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Perfil Profissional
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Médico oftalmologista com sociedade em três clínicas (Núcleo Oftalmológico em Valadares, Instituto de Olhos em Teófilo Otoni e Instituto de Olhos em Caratinga), com rotina de trabalho intenso de segunda a sábado. Formado em 2013 com participação recente nas sociedades (2 anos).
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-700/30">
                    <p className="text-sm text-blue-200 leading-relaxed">
                      <strong className="font-semibold text-blue-100">Análise Financeira Profissional:</strong> Rendimentos mensais de R$ 80-120 mil, com potencial para otimização tributária na estrutura PJ entre pró-labore e dividendos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Financial Profile */}
          <div className="group hover:bg-green-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-green-600 to-teal-700 p-3.5 shadow-md">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Perfil Financeiro
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Investidor desde 2017, com carteira diversificada entre XP, Clear e Avenue (USD 43 mil). Gastos mensais de R$ 25 mil representam pequena fração da renda combinada com a esposa (R$ 30-35 mil adicionais), permitindo alta capacidade de poupança (R$ 50-100 mil/mês).
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-700/30">
                    <p className="text-sm text-teal-200 leading-relaxed">
                      <strong className="font-semibold text-teal-100">Fluxo de Caixa:</strong> Taxa de poupança de 45-65% da renda total, muito acima da média nacional. Patrimônio inclui participações societárias nas clínicas, um terreno em sociedade (R$ 200 mil) e veículo (R$ 220 mil).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Assets and Investments */}
          <div className="group hover:bg-indigo-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-3.5 shadow-md">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-indigo-400 transition-colors flex items-center">
                  Patrimônio e Investimentos
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Patrimônio diversificado: participações nas clínicas oftalmológicas, investimentos na XP, ações na Clear, USD 43 mil na Avenue, R$ 8,5 mil na Inco, terreno em sociedade (R$ 200 mil) e veículo (R$ 220 mil) com financiamento sem juros (R$ 1.800/mês).
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-indigo-900/30 backdrop-blur-sm rounded-lg border border-indigo-700/30">
                    <p className="text-sm text-indigo-200 leading-relaxed">
                      <strong className="font-semibold text-indigo-100">Estratégia de Alocação:</strong> Diversificação necessária para balancear concentração em ativos empresariais com investimentos mais líquidos e geograficamente diversificados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Life Goals */}
          <div className="group hover:bg-amber-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-3.5 shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-amber-400 transition-colors flex items-center">
                  Objetivos Financeiros
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Meta de reduzir carga horária aos 45 anos com patrimônio de R$ 5-6 milhões. Plano de aposentadoria completa aos 50 anos com renda mensal projetada de R$ 35-40 mil.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-amber-700/30">
                    <p className="text-sm text-amber-200 leading-relaxed">
                      <strong className="font-semibold text-amber-100">Projeção Financeira:</strong> Meta viável considerando participações societárias: 10% em Teófilo Otoni (avaliada em R$ 16 milhões) e 25% em Caratinga (R$ 2,5-3 milhões) com potencial de alcançar R$ 5,8 milhões em 8 anos e R$ 10,2 milhões aos 50 anos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Age and Timeline */}
          <div className="group hover:bg-indigo-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-3.5 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Horizonte de Investimentos
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Atual idade: 37 anos. Horizonte de investimento de médio prazo (8 anos) para primeira meta de redução de trabalho e longo prazo (13 anos) para aposentadoria completa, permitindo estratégia de investimentos escalonada.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-700/30">
                    <p className="text-sm text-blue-200 leading-relaxed">
                      <strong className="font-semibold text-blue-100">Simulação de Aposentadoria:</strong> Taxa atual de poupança com rendimento anual médio de 10% projeta R$ 5,8 milhões em 8 anos e R$ 10,2 milhões aos 50 anos, superando as metas estabelecidas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Risk Profile */}
          {hasOpenFinance && (
            <div className="group hover:bg-red-900/10 transition-colors border-t border-white/5">
              <div className="p-6 flex items-start gap-5">
                <div className="rounded-xl bg-gradient-to-br from-red-600 to-red-700 p-3.5 shadow-md">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-100 group-hover:text-red-400 transition-colors flex items-center">
                    Perfil de Risco
                  </h3>
                  <p className="text-gray-300 mt-2 leading-relaxed">
                    Experiência com volatilidade durante a pandemia moldou percepção de risco. Alta capacidade de assumir riscos devido à elevada geração de caixa mensal, mas tolerância emocional à volatilidade moderada.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400 font-medium">Conservador</span>
                        <span className="text-gray-400 font-medium">Agressivo</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: "65%"}}></div>
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-sm text-gray-400">Capacidade de Risco</span>
                        <span className="text-sm font-medium text-gray-300">65%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-2.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: "42%"}}></div>
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-sm text-gray-400">Tolerância Emocional</span>
                        <span className="text-sm font-medium text-gray-300">42%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expectations */}
          <div className="group hover:bg-teal-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-3.5 shadow-md">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Serviços Financeiros Essenciais
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Necessita de visão clara e organizada da situação financeira mensal, com acompanhamento detalhado de investimentos e patrimônio para acompanhar o progresso em direção às metas de médio e longo prazo.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-700/30">
                    <p className="text-sm text-teal-200 leading-relaxed">
                      <strong className="font-semibold text-teal-100">Proposta de Valor:</strong> Visão consolidada de ativos, passivos e fluxo de caixa em todas as instituições financeiras, com relatórios mensais detalhados de evolução patrimonial e projeção atualizada para metas de 45 e 50 anos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {hasOpenFinance && (
            <div className="border-t border-white/5 p-6">
              <div className="bg-gradient-to-r from-blue-800/20 to-indigo-800/20 p-5 rounded-lg backdrop-blur-sm border border-blue-700/20">
                <h3 className="font-semibold text-lg text-blue-300 mb-2 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Dados exclusivos via OpenFinance
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Visualizando insights avançados baseados em seus dados completos de OpenFinance,
                  permitindo análise de comportamento financeiro em todos os bancos e instituições
                  para recomendações mais precisas e personalizadas.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInsightsModule;
