
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle,
  Badge,
  Button,
  Progress
} from "@/components/ui";
import { 
  Sparkles,
  Brain,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";
import { useRaioX } from "@/context/RaioXContext";
import { BaseModuleProps } from "@/types/moduleTypes";
import { withSafeData } from "@/components/hoc/withSafeData";
import { motion } from "framer-motion";

interface SteveJobsReportModuleProps extends BaseModuleProps {
  // Additional props specific to this module
}

const SteveJobsReportModuleBase = ({ fullWidth = false, dataState }: SteveJobsReportModuleProps & { dataState: any }) => {
  const { data } = useRaioX();

  // Animation variants for the sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Card className={`w-full border border-[#6680FF]/20 glass-morphism ${fullWidth ? "col-span-full" : ""}`}>
      <CardHeader className="pb-2 bg-gradient-to-br from-[#000000]/80 to-[#000000]/95">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#6680FF]" />
            <span className="bg-gradient-to-r from-[#6680FF] to-white bg-clip-text text-transparent font-bold">
              Por Steve Jobs: O Melhor Raio-X Financeiro da História
            </span>
          </CardTitle>
          <Badge className="bg-[#6680FF]/20 text-[#6680FF] border-[#6680FF]/30">
            Visão Reinvent
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">
          Uma reinvenção completa da visão financeira, inspirada pela atenção obsessiva aos detalhes e excelência de Steve Jobs.
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-10">
        <motion.div 
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Primeira Impressão e Onboarding */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <Lightbulb className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">Primeira Impressão & Onboarding</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">Funcional, talvez um pouco árido</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Onboarding com entrada padrão de dados, possivelmente parecendo um exercício de preenchimento 
                  de formulário sem transmitir imediatamente o "porquê" ou o "uau" por vir. 
                  A tela inicial pode carecer de conexão emocional imediata.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">Um "Limiar de Revelação"</h4>
                </div>
                <p className="text-sm text-gray-200">
                  No momento em que o aplicativo é aberto, parece que você está entrando em um espaço calmo, inteligente 
                  e profundamente personalizado. O acolhimento é caloroso, usa o nome do usuário e talvez faça uma 
                  pergunta intrigante sobre sua curiosidade financeira.
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Boas-vindas personalizadas que utilizam o nome do usuário</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Micro-copy que desperta curiosidade e constrói confiança</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Indicadores de progresso visualmente atraentes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Dashboard Principal / RaioX */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <Brain className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">Dashboard Principal / RaioX</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">Dados apresentados em gráficos e tabelas padrão</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Visualizações que podem ser claras para um analista financeiro, mas potencialmente 
                  esmagadoras ou pouco inspiradoras para um usuário comum. A metáfora do "raio-X" 
                  pode ser superficial, não profundamente integrada à arquitetura da informação.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">Sinfonia Visual de Insights</h4>
                </div>
                <p className="text-sm text-gray-200">
                  Um painel que é uma obra-prima de design de informação usando nossa fonte Lausanne e 
                  paleta Reinvent Blue/Black. Os dados são transformados em uma narrativa visualmente 
                  impressionante e intuitiva, com visualizações personalizadas que permitem exploração sem sobrecarga.
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>"Pontuação de Vitalidade Financeira" dinâmica e significativa</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Metáfora "RaioX" realizada em transições elegantes de informação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Seções como "Lente de Gastos", "Foco em Dívidas", "Claridade em Investimentos"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Clareza e Acionabilidade dos Insights */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <Star className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">Clareza e Acionabilidade dos Insights</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">Insights genéricos de aconselhamento financeiro</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Pontos como "Economize mais", "Reduza dívidas" sem personalização profunda 
                  ou próximos passos claros e gerenciáveis vinculados diretamente aos dados do usuário. 
                  A linguagem pode ser carregada de jargão financeiro.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">Sabedoria Hiper-Personalizada</h4>
                </div>
                <p className="text-sm text-gray-200">
                  Cada insight faz referência direta aos pontos de dados específicos do usuário e é 
                  enquadrado em português simples e empático. "Maria, notamos que sua 'Reserva de Tranquilidade' 
                  cobre cerca de 1.5 meses das suas despesas. Que tal explorarmos juntos uma meta para alcançar 3 meses?"
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Ação, Não Apenas Análise: "Primeiros Passos" e "Sugestões Inteligentes"</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Celebração dos aspectos positivos das finanças do usuário</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Linguagem simples, humana e ausência de jargão financeiro complexo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* "Encantamento" - Deleite e Conexão Emocional */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">"Encantamento" - Deleite e Conexão Emocional</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">UI largamente funcional</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Microinterações provavelmente padrão (estados básicos de botão, spinners de carregamento). 
                  A jornada emocional do usuário (ansiedade, esperança, confusão) não é ativamente 
                  abordada ou apoiada pelo design.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">Microinterações como "Faíscas de Alegria"</h4>
                </div>
                <p className="text-sm text-gray-200">
                  Cada ponto de interação é uma oportunidade para deleite. Animações elegantes de carregamento, 
                  feedback satisfatório de botões, transições suaves de tela, e visuais de celebração 
                  para insights positivos ou ações concluídas.
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Linguagem que abraça, não atinge: tom consistentemente calmo e empoderador</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Polimento visual e espaço para respirar: whitespace generoso, alinhamento perfeito</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Fonte Lausanne usada para máxima elegância e clareza</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Experiência de Marca e Confiança */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">Experiência de Marca e Confiança</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">Branding da Reinvent aplicado como uma camada</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Branding (logo, cores primárias) aplicado como uma pele, mas não profundamente 
                  tecido no fluxo da experiência do usuário ou no tom emocional da aplicação. 
                  A confiança pode ser presumida em vez de ativamente construída através do design.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">Reinvent, Incorporada</h4>
                </div>
                <p className="text-sm text-gray-200">
                  Toda a experiência se sente como Reinvent - precisa, inteligente, carinhosa, moderna e 
                  profundamente confiável. O Reinvent Blue (#6680FF) é usado estrategicamente para 
                  ações-chave e destaques, criando uma sensação de orientação e confiança.
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Confiança por Design: sinais visuais de segurança e clareza</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Explicações claras sobre o que está acontecendo com os dados (alinhamento LGPD)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Sensação geral de polimento profissional que garante aos usuários que estão em mãos capazes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Comunicando o Valor da IA/Agente */}
          <motion.section 
            className="bg-gradient-to-br from-black to-[#111111] rounded-2xl p-6 border border-[#6680FF]/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#6680FF] p-2 rounded-full">
                <Brain className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">Comunicando o Valor da IA/Agente</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/60 p-5 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="destructive" className="bg-red-900/60 text-red-300">DE</Badge>
                  <h4 className="font-medium text-gray-300">Inteligência implícita</h4>
                </div>
                <p className="text-sm text-gray-400">
                  A "inteligência" é provavelmente implícita - os usuários obtêm resultados, mas não 
                  necessariamente sentem uma IA avançada ou um "agente futuro" em ação. 
                  Parece mais uma calculadora sofisticada.
                </p>
              </div>

              <div className="bg-gray-900/60 p-5 rounded-lg border border-[#6680FF]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#6680FF]/80 text-white">PARA</Badge>
                  <h4 className="font-medium text-white">O "Sussurro do Agente"</h4>
                </div>
                <p className="text-sm text-gray-200">
                  A UI sutilmente sugere o motor inteligente (RLVR) e a promessa do Autopilot RM.
                  Resumos personalizados indicam: "Após uma análise detalhada dos seus dados, o RaioX 
                  identificou três áreas chave para sua atenção..."
                </p>
                <div className="mt-3 pt-3 border-t border-[#6680FF]/20">
                  <h5 className="text-xs font-medium text-[#6680FF] mb-2">ELEMENTOS CHAVE:</h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Enquadramento proativo: insights apresentados como se um guia inteligente os tivesse curado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>Aprendizado e melhoria: mecanismos de feedback sobre insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>A provocação do "Próximo Capítulo": visão de como os serviços futuros da Reinvent se basearão neste diagnóstico</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="mt-10 pt-8 border-t border-[#6680FF]/40">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white">Pronto para implementar essa visão?</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Essa visão revolucionária do RaioX Financeiro pode se tornar realidade, 
                elevando a experiência do usuário para um nível sem precedentes no setor financeiro.
              </p>
              <Button className="bg-gradient-to-r from-[#6680FF] to-[#4060DD] hover:from-[#5570EE] hover:to-[#3050CC] text-white px-6 py-2">
                <span>Iniciar transformação</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

// Get real data function for withSafeData HOC
const getRealSteveJobsData = (props: SteveJobsReportModuleProps) => {
  return {
    isReal: true
  };
};

// Get synthetic data function for withSafeData HOC
const getSyntheticSteveJobsData = (props: SteveJobsReportModuleProps) => {
  return {
    isReal: false,
    isSynthetic: true
  };
};

// Create the safe module using the HOC
const SteveJobsReportModule = withSafeData(
  SteveJobsReportModuleBase,
  getRealSteveJobsData,
  getSyntheticSteveJobsData
);

export default SteveJobsReportModule;
