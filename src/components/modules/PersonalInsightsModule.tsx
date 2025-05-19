
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} overflow-hidden border-none shadow-lg`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-white">
            Insights Personalizados
          </CardTitle>
          {hasOpenFinance && (
            <div className="flex items-center bg-green-400/20 text-green-100 text-xs px-3 py-1.5 rounded-full border border-green-400/30">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
              <span className="font-medium">OpenFinance</span>
            </div>
          )}
        </div>
        <p className="text-blue-100 mt-2 text-sm">
          Uma análise personalizada baseada no seu contexto de vida e objetivos financeiros
        </p>
      </div>
      
      <CardContent className="p-0">
        <div className="space-y-0">
          {/* Client Profile */}
          <div className="group hover:bg-blue-50/5 transition-colors">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3.5 shadow-md">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Perfil Profissional
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Como médico oftalmologista com sociedade em três clínicas (Núcleo Oftalmológico em Valadares, Instituto de Olhos em Teófilo Otoni e Instituto de Olhos em Caratinga), sua rotina é intensa, trabalhando de segunda a sábado com apenas um ou dois finais de semana livres por mês. Com formação em 2013 e participação recente nas sociedades (2 anos), sua carreira mostra potencial para uma transição gradual para menor carga horária até os 45 anos.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-700/30">
                    <p className="text-sm text-blue-200 leading-relaxed">
                      <strong className="font-semibold text-blue-100">Análise Financeira Profissional:</strong> Com rendimentos mensais significativos (R$ 80-120 mil), identificamos potencial para estruturação estratégica de seus rendimentos PJ, otimizando a distribuição entre pró-labore e dividendos para maior eficiência tributária.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Location & Life */}
          <div className="group hover:bg-green-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-3.5 shadow-md">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-green-400 transition-colors flex items-center">
                  Residência e Contexto
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Residente em Governador Valadares (MG), com experiência prévia em São Paulo, sua rotina envolve deslocamentos semanais para Teófilo Otoni e Caratinga para atendimentos em suas clínicas. Casado há 5 anos com Natalia, gerente de marketing, que contribui com renda mensal de R$ 30-35 mil, e ambos construíram casa própria há 2 anos sob regime de comunhão parcial de bens.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-green-900/30 backdrop-blur-sm rounded-lg border border-green-700/30">
                    <p className="text-sm text-green-200 leading-relaxed">
                      <strong className="font-semibold text-green-100">Implicações Patrimoniais:</strong> Considerando seu patrimônio compartilhado e o regime de comunhão parcial, recomendamos uma revisão da estrutura de ativos para otimizar aspectos sucessórios e tributários do casal.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Family */}
          <div className="group hover:bg-purple-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3.5 shadow-md">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-purple-400 transition-colors flex items-center">
                  Sua Família
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Você e Natalia estão casados há 5 anos, em um relacionamento sólido sob regime de comunhão parcial de bens. Entendemos a delicadeza do momento após a perda recente, e respeitamos sua abertura para a possibilidade de ampliação familiar no futuro. Seu planejamento sucessório já conta com proteção significativa através de múltiplas apólices de seguro de vida.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-purple-900/30 backdrop-blur-sm rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-200 leading-relaxed">
                      <strong className="font-semibold text-purple-100">Planejamento Sucessório:</strong> Seus seguros de vida totalizam R$ 10 milhões (duas apólices de R$ 5 milhões na Icatu, além de duas apólices da Prudential), o que representa uma sólida proteção familiar. Recomendamos uma análise periódica para garantir que as coberturas permaneçam alinhadas com o crescimento de seu patrimônio.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Life Goals */}
          <div className="group hover:bg-amber-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-3.5 shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-amber-400 transition-colors flex items-center">
                  Objetivos de Vida
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Seu plano de reduzir significativamente a carga horária de trabalho aos 45 anos, com um patrimônio alvo de R$ 5-6 milhões, está em curso. Com a atual capacidade de poupança mensal entre R$ 50-100 mil e mantendo seus rendimentos atuais, estamos traçando uma jornada consistente para alcançar sua meta de "independência profissional" e posteriormente uma aposentadoria completa aos 50 anos com renda mensal projetada de R$ 35-40 mil.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-amber-700/30">
                    <p className="text-sm text-amber-200 leading-relaxed">
                      <strong className="font-semibold text-amber-100">Projeção Financeira:</strong> Com sua taxa atual de poupança e investimentos, a meta de R$ 5-6 milhões aos 45 anos é viável, especialmente considerando suas participações societárias: 10% em Teófilo Otoni (avaliada em R$ 16 milhões) e 25% em Caratinga (avaliada entre R$ 2,5-3 milhões). A estruturação adequada destes ativos será fundamental para sua transição profissional.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Financial Profile */}
          <div className="group hover:bg-green-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-green-500 to-teal-600 p-3.5 shadow-md">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Perfil Financeiro
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Com experiência em investimentos desde 2017, você passou por momentos desafiadores como a pandemia, o que moldou seu perfil de investidor. Atualmente, mantém uma carteira diversificada entre XP, ações na Clear, e investimentos internacionais (Avenue com USD 43 mil), além de participações em negócios. Seus gastos mensais em torno de R$ 25 mil representam apenas uma fração de sua renda combinada com sua esposa, permitindo uma alta capacidade de poupança.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-700/30">
                    <p className="text-sm text-teal-200 leading-relaxed">
                      <strong className="font-semibold text-teal-100">Análise de Fluxo de Caixa e Patrimônio:</strong> Sua capacidade de poupança (R$ 50-100 mil mensais) representa aproximadamente 45-65% de sua renda, muito acima da média nacional. Além dos investimentos financeiros, seu patrimônio inclui participações societárias nas clínicas, um terreno em sociedade (R$ 200 mil) e um veículo de valor significativo (R$ 220 mil).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Assets and Investments */}
          <div className="group hover:bg-blue-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3.5 shadow-md">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-indigo-400 transition-colors flex items-center">
                  Patrimônio e Investimentos
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Seu patrimônio é diversificado entre ativos financeiros e participações em negócios. Além da significativa participação nas clínicas oftalmológicas, você possui investimentos na XP, ações na Clear, valores na Avenue (USD 43 mil), aplicações na Inco (R$ 8,5 mil), um terreno em sociedade (R$ 200 mil) e um veículo Taus (R$ 220 mil) com um financiamento sem juros de R$ 1.800 mensais.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-indigo-900/30 backdrop-blur-sm rounded-lg border border-indigo-700/30">
                    <p className="text-sm text-indigo-200 leading-relaxed">
                      <strong className="font-semibold text-indigo-100">Estratégia de Alocação:</strong> Suas participações empresariais representam a maior parte de seu patrimônio total. Recomendamos uma estratégia de diversificação que balanceie estes ativos concentrados com investimentos mais líquidos e geograficamente diversificados para mitigar riscos setoriais e regionais.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Age and Timeline */}
          <div className="group hover:bg-indigo-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-3.5 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Horizonte Temporal
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Com 37 anos atualmente, seu planejamento prevê uma transição profissional significativa aos 45 anos (redução da carga horária) e uma potencial aposentadoria completa aos 50 anos. Isso estabelece um horizonte de investimento de médio prazo (8 anos) para a primeira meta e de longo prazo (13 anos) para a segunda meta, permitindo uma estratégia de investimentos escalonada.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-700/30">
                    <p className="text-sm text-blue-200 leading-relaxed">
                      <strong className="font-semibold text-blue-100">Simulação de Aposentadoria:</strong> Com sua atual taxa de poupança e considerando um rendimento anual médio de 10% em seus investimentos, projetamos que você atingirá aproximadamente R$ 5,8 milhões em 8 anos (aos 45 anos) e R$ 10,2 milhões aos 50 anos, superando suas metas financeiras estabelecidas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Risk Profile */}
          {hasOpenFinance && (
            <div className="group hover:bg-red-50/5 transition-colors border-t border-white/5">
              <div className="p-6 flex items-start gap-5">
                <div className="rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-3.5 shadow-md">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-100 group-hover:text-red-400 transition-colors flex items-center">
                    Seu Perfil de Risco
                  </h3>
                  <p className="text-gray-300 mt-2 leading-relaxed">
                    Sua experiência durante a pandemia moldou significativamente sua percepção de risco nos investimentos. Embora você tenha uma alta capacidade de assumir riscos devido à sua elevada geração de caixa mensal, sua tolerância emocional a volatilidade parece ser moderada. Seus investimentos atuais refletem uma abordagem diversificada, mas com potencial para otimização.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400 font-medium">Conservador</span>
                        <span className="text-gray-400 font-medium">Agressivo</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: "65%"}}></div>
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-sm text-gray-400">Capacidade de Risco</span>
                        <span className="text-sm font-medium text-gray-300">65%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="h-2.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
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
          <div className="group hover:bg-teal-50/5 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-3.5 shadow-md">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Expectativas de Serviço
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Você busca uma visão clara e organizada de sua situação financeira mensal, com acompanhamento detalhado de seus investimentos e patrimônio. Entendemos que seu objetivo é ter informações transparentes e acessíveis que permitam acompanhar o progresso em direção às suas metas financeiras de médio e longo prazo.
                </p>
                {hasOpenFinance && (
                  <div className="mt-3 p-3.5 bg-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-700/30">
                    <p className="text-sm text-teal-200 leading-relaxed">
                      <strong className="font-semibold text-teal-100">Proposta de Valor:</strong> Com a integração do OpenFinance, podemos oferecer uma visão consolidada de seus ativos, passivos e fluxo de caixa em todas as instituições financeiras, proporcionando relatórios detalhados mensais que mostram exatamente sua evolução patrimonial e projeção atualizada para seus marcos de 45 e 50 anos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 p-6">
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 italic leading-relaxed">
                  "Como um médico oftalmologista de sucesso aos 37 anos, com participação em três clínicas diferentes, você valoriza tanto a excelência profissional quanto o equilíbrio de vida. Assim como oferece visão clara a seus pacientes, estamos comprometidos em proporcionar clareza em sua jornada financeira, apoiando sua meta de reduzir a carga horária aos 45 anos e alcançar independência financeira total aos 50, sempre respeitando seu perfil de investidor e valores pessoais."
                </p>
              </div>
            </div>
          </div>
          
          {hasOpenFinance && (
            <div className="border-t border-white/5 p-6">
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-5 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold text-lg text-blue-300 mb-2 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Dados exclusivos via OpenFinance
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Você está visualizando insights avançados baseados em seus dados completos de OpenFinance. 
                  Isso nos permite analisar seu comportamento financeiro em todos os bancos e instituições, 
                  gerando recomendações mais precisas e personalizadas para sua jornada de prosperidade financeira.
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
