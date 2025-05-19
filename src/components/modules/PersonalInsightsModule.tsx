
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wine, Wallet, Plane, Home, Briefcase, Heart, ShieldCheck, Target, TrendingUp, AlertTriangle } from "lucide-react";

interface PersonalInsightsModuleProps {
  fullWidth?: boolean;
}

const PersonalInsightsModule = ({ fullWidth = false }: PersonalInsightsModuleProps) => {
  const { data } = useRaioX();
  
  // Check if OpenFinance is integrated (in a real app this would come from context or props)
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
          {/* Family Insights */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sua Família</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.family || 
                 "Sabemos que você e Gisele estão planejando aumentar a família nos próximos 3 anos. Preparamos uma projeção financeira considerando os custos com educação e saúde para o novo membro da família. Também notamos seu compromisso com os cuidados médicos de sua mãe, algo que honramos e levamos em conta no seu planejamento."}
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800/30">
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    <strong>Análise Financeira Familiar:</strong> Identificamos gastos médicos mensais recorrentes de R$ 2.400 para sua mãe. Nossa análise sugere que um plano de previdência com cobertura VGBL poderia otimizar a proteção financeira e criar vantagens fiscais no futuro.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Passions Insights */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Suas Paixões</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.passions || 
                 "Sua meta de visitar tantos países quanto sua idade nos inspirou! Já conhecemos seu gosto por vinhos e sua aventura pela rota Beaujolais na França. Que tal nossa parceria com a Wine para oferecer acesso a rótulos exclusivos? E para o fã do Corinthians, temos ingressos VIP - pergunte ao seu assessor."}
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/30">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Análise de Gastos com Hobbies:</strong> Você investiu R$ 28.460 em viagens nos últimos 12 meses e R$ 12.800 em experiências relacionadas ao Corinthians. Nossa análise de fluxo de caixa permite que você aumente este orçamento em 15% sem impactar suas metas financeiras.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Financial Journey Insights */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sua Jornada Financeira</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.financialJourney || 
                 "Como empreendedor do mercado financeiro, você entende os desafios de construir uma empresa enquanto mantém um patrimônio sólido de R$ 1,7 milhão. Sua estratégia de alta liquidez faz sentido neste momento de sua vida, mas identificamos oportunidades para otimizar seu capital sem comprometer sua flexibilidade para o novo negócio."}
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30">
                  <p className="text-xs text-green-700 dark:text-green-300">
                    <strong>Análise de Fluxo de Caixa Empresarial:</strong> Notamos R$ 425.000 em capital parado há mais de 7 meses. Recomendamos alocar R$ 300.000 em CDBs com liquidez diária (104% CDI) e R$ 125.000 em um fundo multimercado com risco moderado, projetando um ganho adicional de R$ 35.800/ano.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Goals Insights */}
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
              <Home className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Seus Objetivos</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.goals || 
                 "Estamos monitorando o mercado imobiliário para você! Com seu plano de comprar uma casa, montamos uma estratégia que mantém capital disponível para um bom entrada, mas sem deixar seu dinheiro perdendo para a inflação. A chegada do bebê e sua nova casa são marcos que estamos preparados para acompanhar com você."}
              </p>
              {hasOpenFinance && (
                <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-800/30">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Simulação Imobiliária Personalizada:</strong> Com base nos imóveis que você visitou recentemente, criamos uma simulação de financiamento com entrada de R$ 500.000 (29% do patrimônio atual) e parcelas de R$ 7.200 (48% da sua renda mensal). Esta configuração mantém sua reserva de emergência intacta.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Risk Profile Insights - Only with OpenFinance */}
          {hasOpenFinance && (
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Seu Perfil de Risco</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Seu perfil comportamental indica tolerância moderada a risco (65/100), com tendência a preservar capital durante volatilidade. No entanto, suas escolhas de investimento atuais mostram uma exposição a risco menor que sua tolerância real (42/100), sugerindo que você pode estar deixando de capturar retornos potenciais.
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
                    <span className="text-xs text-gray-600 dark:text-gray-400">Perfil Comportamental (65%)</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">65/100</span>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{width: "42%"}}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Alocação Atual (42%)</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">42/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Future Planning Insights - Only with OpenFinance */}
          {hasOpenFinance && (
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/30">
                <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Planejamento de Longo Prazo</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Com base em seus padrões de receita/despesa, nossa projeção mostra que seu patrimônio atual de R$ 1,7 milhão pode crescer para R$ 4,8 milhões em 10 anos (taxa de 10,2% a.a.), mesmo considerando os custos da nova casa e do bebê a caminho.
                </p>
                <div className="mt-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/30">
                  <h4 className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Projeção Patrimonial (Análise Monte Carlo)</h4>
                  <div className="flex items-end h-24 gap-1">
                    <div className="w-1/6 h-1/6 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-t-sm"></div>
                    <div className="w-1/6 h-2/6 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-t-sm"></div>
                    <div className="w-1/6 h-3/6 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm"></div>
                    <div className="w-1/6 h-4/6 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm"></div>
                    <div className="w-1/6 h-5/6 bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-sm"></div>
                    <div className="w-1/6 h-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-sm"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-indigo-700 dark:text-indigo-300">Hoje</span>
                    <span className="text-indigo-700 dark:text-indigo-300">5 anos</span>
                    <span className="text-indigo-700 dark:text-indigo-300">10 anos</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Market Insights - Only with OpenFinance */}
          {hasOpenFinance && (
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Oportunidades de Mercado</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Identificamos 3 oportunidades táticas alinhadas ao seu perfil e objetivos atuais, com potencial de melhorar seu retorno ajustado ao risco:
                </p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                    <span>Fundo de Infraestrutura (XPID11) - Yield estimado de 9.8% com isenção fiscal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                    <span>ETF de Tech Internacional (IVVB11) - Diversificação geográfica alinhada ao seu setor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                    <span>Rebalanceamento de Renda Fixa - Migração parcial para inflação + prêmio</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <p className="text-sm text-gray-800 dark:text-gray-200 italic">
                "Luis, como praticante de tênis e surf, você valoriza equilíbrio. Propomos o mesmo para suas finanças: estabilidade com renda fixa e potencial de crescimento com investimentos internacionais - algo ausente na sua carteira atual, mas que pode trazer diversificação importante para seu perfil."
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
