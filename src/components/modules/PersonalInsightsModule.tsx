
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
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center justify-between">
          <span>Insights Personalizados</span>
          {hasOpenFinance && (
            <div className="flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
              <ShieldCheck className="h-3 w-3 mr-1" />
              <span>OpenFinance</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Client Profile */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Perfil Profissional</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Como médico oftalmologista com sociedade em três clínicas (Núcleo Oftalmológico em Valadares, Instituto de Olhos em Teófilo Otoni e Instituto de Olhos em Caratinga), sua rotina é intensa, trabalhando de segunda a sábado com apenas um ou dois finais de semana livres por mês. Com formação em 2013 e participação recente nas sociedades (2 anos), sua carreira mostra potencial para uma transição gradual para menor carga horária até os 45 anos.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Análise Financeira Profissional:</strong> Com rendimentos mensais significativos (R$ 80-120 mil), identificamos potencial para estruturação estratégica de seus rendimentos PJ, otimizando a distribuição entre pró-labore e dividendos para maior eficiência tributária.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Location & Life */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Residência e Contexto</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Residente em Governador Valadares (MG), com experiência prévia em São Paulo, sua rotina envolve deslocamentos semanais para Teófilo Otoni e Caratinga para atendimentos em suas clínicas. Casado há 5 anos com Natalia, gerente de marketing, que contribui com renda mensal de R$ 30-35 mil, e ambos construíram casa própria há 2 anos sob regime de comunhão parcial de bens.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30">
                  <p className="text-xs text-green-700 dark:text-green-300">
                    <strong>Implicações Patrimoniais:</strong> Considerando seu patrimônio compartilhado e o regime de comunhão parcial, recomendamos uma revisão da estrutura de ativos para otimizar aspectos sucessórios e tributários do casal.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Family */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sua Família</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Você e Natalia estão casados há 5 anos, em um relacionamento sólido sob regime de comunhão parcial de bens. Entendemos a delicadeza do momento após a perda recente, e respeitamos sua abertura para a possibilidade de ampliação familiar no futuro. Seu planejamento sucessório já conta com proteção significativa através de múltiplas apólices de seguro de vida.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800/30">
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    <strong>Planejamento Sucessório:</strong> Seus seguros de vida totalizam R$ 10 milhões (duas apólices de R$ 5 milhões na Icatu, além de duas apólices da Prudential), o que representa uma sólida proteção familiar. Recomendamos uma análise periódica para garantir que as coberturas permaneçam alinhadas com o crescimento de seu patrimônio.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Life Goals */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
              <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Objetivos de Vida</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Seu plano de reduzir significativamente a carga horária de trabalho aos 45 anos, com um patrimônio alvo de R$ 5-6 milhões, está em curso. Com a atual capacidade de poupança mensal entre R$ 50-100 mil e mantendo seus rendimentos atuais, estamos traçando uma jornada consistente para alcançar sua meta de "independência profissional" e posteriormente uma aposentadoria completa aos 50 anos com renda mensal projetada de R$ 35-40 mil.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-800/30">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Projeção Financeira:</strong> Com sua taxa atual de poupança e investimentos, a meta de R$ 5-6 milhões aos 45 anos é viável, especialmente considerando suas participações societárias: 10% em Teófilo Otoni (avaliada em R$ 16 milhões) e 25% em Caratinga (avaliada entre R$ 2,5-3 milhões). A estruturação adequada destes ativos será fundamental para sua transição profissional.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Financial Profile */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Perfil Financeiro</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Com experiência em investimentos desde 2017, você passou por momentos desafiadores como a pandemia, o que moldou seu perfil de investidor. Atualmente, mantém uma carteira diversificada entre XP, ações na Clear, e investimentos internacionais (Avenue com USD 43 mil), além de participações em negócios. Seus gastos mensais em torno de R$ 25 mil representam apenas uma fração de sua renda combinada com sua esposa, permitindo uma alta capacidade de poupança.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30">
                  <p className="text-xs text-green-700 dark:text-green-300">
                    <strong>Análise de Fluxo de Caixa e Patrimônio:</strong> Sua capacidade de poupança (R$ 50-100 mil mensais) representa aproximadamente 45-65% de sua renda, muito acima da média nacional. Além dos investimentos financeiros, seu patrimônio inclui participações societárias nas clínicas, um terreno em sociedade (R$ 200 mil) e um veículo de valor significativo (R$ 220 mil).
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Assets and Investments */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <PiggyBank className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Patrimônio e Investimentos</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Seu patrimônio é diversificado entre ativos financeiros e participações em negócios. Além da significativa participação nas clínicas oftalmológicas, você possui investimentos na XP, ações na Clear, valores na Avenue (USD 43 mil), aplicações na Inco (R$ 8,5 mil), um terreno em sociedade (R$ 200 mil) e um veículo Taus (R$ 220 mil) com um financiamento sem juros de R$ 1.800 mensais.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Estratégia de Alocação:</strong> Suas participações empresariais representam a maior parte de seu patrimônio total. Recomendamos uma estratégia de diversificação que balanceie estes ativos concentrados com investimentos mais líquidos e geograficamente diversificados para mitigar riscos setoriais e regionais.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Age and Timeline */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
              <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Horizonte Temporal</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Com 37 anos atualmente, seu planejamento prevê uma transição profissional significativa aos 45 anos (redução da carga horária) e uma potencial aposentadoria completa aos 50 anos. Isso estabelece um horizonte de investimento de médio prazo (8 anos) para a primeira meta e de longo prazo (13 anos) para a segunda meta, permitindo uma estratégia de investimentos escalonada.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md border border-indigo-100 dark:border-indigo-800/30">
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    <strong>Simulação de Aposentadoria:</strong> Com sua atual taxa de poupança e considerando um rendimento anual médio de 10% em seus investimentos, projetamos que você atingirá aproximadamente R$ 5,8 milhões em 8 anos (aos 45 anos) e R$ 10,2 milhões aos 50 anos, superando suas metas financeiras estabelecidas.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Risk Profile */}
          {hasOpenFinance && (
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Seu Perfil de Risco</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Sua experiência durante a pandemia moldou significativamente sua percepção de risco nos investimentos. Embora você tenha uma alta capacidade de assumir riscos devido à sua elevada geração de caixa mensal, sua tolerância emocional a volatilidade parece ser moderada. Seus investimentos atuais refletem uma abordagem diversificada, mas com potencial para otimização.
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Conservador</span>
                    <span className="text-gray-600 dark:text-gray-400">Agressivo</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: "65%"}}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Capacidade de Risco (65%)</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">65/100</span>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: "42%"}}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Tolerância Emocional (42%)</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">42/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expectations */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
              <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Expectativas de Serviço</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Você busca uma visão clara e organizada de sua situação financeira mensal, com acompanhamento detalhado de seus investimentos e patrimônio. Entendemos que seu objetivo é ter informações transparentes e acessíveis que permitam acompanhar o progresso em direção às suas metas financeiras de médio e longo prazo.
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-teal-50 dark:bg-teal-900/20 rounded-md border border-teal-100 dark:border-teal-800/30">
                  <p className="text-xs text-teal-700 dark:text-teal-300">
                    <strong>Proposta de Valor:</strong> Com a integração do OpenFinance, podemos oferecer uma visão consolidada de seus ativos, passivos e fluxo de caixa em todas as instituições financeiras, proporcionando relatórios detalhados mensais que mostram exatamente sua evolução patrimonial e projeção atualizada para seus marcos de 45 e 50 anos.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <p className="text-sm text-gray-800 dark:text-gray-200 italic">
                "Como um médico oftalmologista de sucesso aos 37 anos, com participação em três clínicas diferentes, você valoriza tanto a excelência profissional quanto o equilíbrio de vida. Assim como oferece visão clara a seus pacientes, estamos comprometidos em proporcionar clareza em sua jornada financeira, apoiando sua meta de reduzir a carga horária aos 45 anos e alcançar independência financeira total aos 50, sempre respeitando seu perfil de investidor e valores pessoais."
              </p>
            </div>
          </div>
          
          {hasOpenFinance && (
            <div className="mt-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Dados exclusivos via OpenFinance
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Você está visualizando insights avançados baseados em seus dados completos de OpenFinance. 
                Isso nos permite analisar seu comportamento financeiro em todos os bancos e instituições, 
                gerando recomendações mais precisas e personalizadas.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInsightsModule;

