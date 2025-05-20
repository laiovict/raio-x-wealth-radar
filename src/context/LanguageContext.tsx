
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type LanguageType = 'en' | 'pt-BR' | 'es';

type Translations = {
  [key: string]: {
    [key in LanguageType]: string;
  };
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}

// Default translations
const translations: Translations = {
  welcomeMessage: {
    'pt-BR': 'Bem-vindo',
    'en': 'Welcome',
    'es': 'Bienvenido'
  },
  searchPlaceholder: {
    'pt-BR': 'Pesquisar por informações ou fazer uma pergunta...',
    'en': 'Search for information or ask a question...',
    'es': 'Buscar información o hacer una pregunta...'
  },
  quickAi: {
    'pt-BR': 'Assistente IA',
    'en': 'AI Assistant',
    'es': 'Asistente IA'
  },
  myGoals: {
    'pt-BR': 'Meus Objetivos',
    'en': 'My Goals',
    'es': 'Mis Objetivos'
  },
  planning: {
    'pt-BR': 'Planejamento',
    'en': 'Planning',
    'es': 'Planificación'
  },
  quickInsights: {
    'pt-BR': 'Insights Rápidos',
    'en': 'Quick Insights',
    'es': 'Insights Rápidos'
  },
  chatWithRM: {
    'pt-BR': 'Chat com RM',
    'en': 'Chat with RM',
    'es': 'Chat con RM'
  },
  overviewTab: {
    'pt-BR': 'Visão Geral',
    'en': 'Overview',
    'es': 'Visión General'
  },
  planTab: {
    'pt-BR': 'Plano',
    'en': 'Plan',
    'es': 'Plan'
  },
  futureTab: {
    'pt-BR': 'Futuro',
    'en': 'Future',
    'es': 'Futuro'
  },
  aiTab: {
    'pt-BR': 'IA',
    'en': 'AI',
    'es': 'IA'
  },
  planningTab: {
    'pt-BR': 'Planejamento',
    'en': 'Planning',
    'es': 'Planificación'
  },
  investmentsTab: {
    'pt-BR': 'Investimentos',
    'en': 'Investments',
    'es': 'Inversiones'
  },
  goalsTab: {
    'pt-BR': 'Objetivos',
    'en': 'Goals',
    'es': 'Objetivos'
  },
  insightsTab: {
    'pt-BR': 'Insights',
    'en': 'Insights',
    'es': 'Insights'
  },
  socialTab: {
    'pt-BR': 'Social',
    'en': 'Social',
    'es': 'Social'
  },
  bankingTab: {
    'pt-BR': 'Banking',
    'en': 'Banking',
    'es': 'Banking'
  },
  chatTab: {
    'pt-BR': 'Chat',
    'en': 'Chat',
    'es': 'Chat'
  },
  behaviorTab: {
    'pt-BR': 'Comportamento',
    'en': 'Behavior',
    'es': 'Comportamiento'
  },
  back: {
    'pt-BR': 'Voltar',
    'en': 'Back',
    'es': 'Volver'
  },
  accessAccount: {
    'pt-BR': 'Acessar sua conta',
    'en': 'Access your account',
    'es': 'Acceda a su cuenta'
  },
  enterWithXP: {
    'pt-BR': 'Entre com suas credenciais da XP',
    'en': 'Login with your XP credentials',
    'es': 'Inicie sesión con sus credenciales XP'
  },
  accountNumber: {
    'pt-BR': 'Número da Conta',
    'en': 'Account Number',
    'es': 'Número de Cuenta'
  },
  enterAccountNumber: {
    'pt-BR': 'Digite o número da sua conta',
    'en': 'Enter your account number',
    'es': 'Ingrese su número de cuenta'
  },
  password: {
    'pt-BR': 'Senha',
    'en': 'Password',
    'es': 'Contraseña'
  },
  enterPassword: {
    'pt-BR': 'Digite sua senha',
    'en': 'Enter your password',
    'es': 'Ingrese su contraseña'
  },
  processing: {
    'pt-BR': 'Processando...',
    'en': 'Processing...',
    'es': 'Procesando...'
  },
  enter: {
    'pt-BR': 'Entrar',
    'en': 'Enter',
    'es': 'Entrar'
  },
  login: {
    'pt-BR': 'Login',
    'en': 'Login',
    'es': 'Login'
  },
  loadingClients: {
    'pt-BR': 'Carregando clientes...',
    'en': 'Loading clients...',
    'es': 'Cargando clientes...'
  },
  selectClient: {
    'pt-BR': 'Selecionar Cliente',
    'en': 'Select Client',
    'es': 'Seleccionar Cliente'
  },
  noClientsFound: {
    'pt-BR': 'Nenhum cliente encontrado',
    'en': 'No clients found',
    'es': 'No se encontraron clientes'
  },
  openFinanceActive: {
    'pt-BR': 'Open Finance Ativo',
    'en': 'Open Finance Active',
    'es': 'Open Finance Activo'
  },
  openFinanceInactive: {
    'pt-BR': 'Open Finance Inativo',
    'en': 'Open Finance Inactive',
    'es': 'Open Finance Inactivo'
  },
  exportDiagnosis: {
    'pt-BR': 'Exportar Diagnóstico',
    'en': 'Export Diagnosis',
    'es': 'Exportar Diagnóstico'
  },
  pdf: {
    'pt-BR': 'PDF',
    'en': 'PDF',
    'es': 'PDF'
  },
  podcast: {
    'pt-BR': 'Podcast',
    'en': 'Podcast',
    'es': 'Podcast'
  },
  video: {
    'pt-BR': 'Vídeo',
    'en': 'Video',
    'es': 'Video'
  },
  onlyClientsFeature: {
    'pt-BR': 'apenas clientes',
    'en': 'clients only',
    'es': 'solo clientes'
  },
  you: {
    'pt-BR': 'Você',
    'en': 'You',
    'es': 'Usted'
  },
  typeMessage: {
    'pt-BR': 'Digite sua mensagem...',
    'en': 'Type your message...',
    'es': 'Escriba su mensaje...'
  },
  aiAssistantDescription: {
    'pt-BR': 'Assistente financeiro alimentado por IA avançada',
    'en': 'Financial assistant powered by advanced AI',
    'es': 'Asistente financiero potenciado por IA avanzada'
  },
  famousInvestorsTitle: {
    'pt-BR': 'O que os maiores investidores do mundo comentariam sobre seu portfólio',
    'en': 'What the world\'s greatest investors would say about your portfolio',
    'es': 'Lo que los más grandes inversores del mundo dirían sobre su cartera'
  },
  atYourAge: {
    'pt-BR': 'Na sua idade',
    'en': 'At your age',
    'es': 'A su edad'
  },
  buffettQuoteYoung: {
    'pt-BR': 'O maior erro em investimentos é tentar cronometrar o mercado. Sua disciplina e diversificação são impressionantes para alguém da sua idade.',
    'en': 'The biggest mistake in investing is trying to time the market. Your discipline and diversification are impressive for someone your age.',
    'es': 'El mayor error en inversiones es intentar cronometrar el mercado. Su disciplina y diversificación son impresionantes para alguien de su edad.'
  },
  buffettQuoteOld: {
    'pt-BR': 'As duas regras do investimento: Regra nº 1: nunca perca dinheiro. Regra nº 2: nunca esqueça a regra nº 1. Seu portfólio mostra que você entende isso.',
    'en': 'The two rules of investing: Rule No. 1: never lose money. Rule No. 2: never forget rule No. 1. Your portfolio shows you understand this.',
    'es': 'Las dos reglas de inversión: Regla n.º 1: nunca pierdas dinero. Regla n.º 2: nunca olvides la regla n.º 1. Su cartera muestra que entiende esto.'
  },
  buffettInsightYoung: {
    'pt-BR': 'Aos 35 anos, eu já havia estabelecido uma fundação sólida, mas você está mais avançado do que eu estava na sua idade.',
    'en': 'At 35, I had already established a solid foundation, but you are further ahead than I was at your age.',
    'es': 'A los 35 años, ya había establecido una base sólida, pero usted está más avanzado de lo que yo estaba a su edad.'
  },
  buffettInsightOld: {
    'pt-BR': 'Aos 50, eu já sabia que a paciência era tão importante quanto a inteligência. Vejo que você também dominou essa lição.',
    'en': 'At 50, I already knew that patience was as important as intelligence. I see you have mastered this lesson too.',
    'es': 'A los 50, ya sabía que la paciencia era tan importante como la inteligencia. Veo que tú también has dominado esta lección.'
  },
  dalioQuoteHighEquity: {
    'pt-BR': 'Sua alocação em ações mostra coragem, mas não se esqueça que diversificação é mais importante que qualquer investimento individual.',
    'en': 'Your allocation to equities shows courage, but don\'t forget that diversification is more important than any individual investment.',
    'es': 'Su asignación a acciones muestra coraje, pero no olvide que la diversificación es más importante que cualquier inversión individual.'
  },
  dalioQuoteLowEquity: {
    'pt-BR': 'Você dá importância para a diversificação e segurança, o que é sábio. Mas cuidado para não ser excessivamente conservador a ponto de não atingir seus objetivos.',
    'en': 'You value diversification and safety, which is wise. But be careful not to be overly conservative to the point of not achieving your goals.',
    'es': 'Valora la diversificación y la seguridad, lo cual es sabio. Pero tenga cuidado de no ser demasiado conservador hasta el punto de no alcanzar sus objetivos.'
  },
  dalioInsightYoung: {
    'pt-BR': 'Na sua idade, eu estava experimentando diferentes abordagens de mercado. Sua cautela é admirável, mas não tenha medo de explorar.',
    'en': 'At your age, I was experimenting with different market approaches. Your caution is admirable, but don\'t be afraid to explore.',
    'es': 'A su edad, estaba experimentando con diferentes enfoques de mercado. Su cautela es admirable, pero no tenga miedo de explorar.'
  },
  dalioInsightOld: {
    'pt-BR': 'Quando eu tinha sua idade, aprendi que o melhor portfólio não é apenas sobre retornos, mas sobre equilíbrio. Você está no caminho certo.',
    'en': 'When I was your age, I learned that the best portfolio is not just about returns, but about balance. You\'re on the right track.',
    'es': 'Cuando tenía su edad, aprendí que la mejor cartera no solo se trata de rendimientos, sino de equilibrio. Estás en el camino correcto.'
  },
  lynchQuoteInfoSeeking: {
    'pt-BR': 'O investidor médio tem vantagens que nem percebe. Você busca informação constantemente, e isso é um diferencial raro.',
    'en': 'The average investor has advantages they don\'t even realize. You constantly seek information, and that\'s a rare differentiator.',
    'es': 'El inversor promedio tiene ventajas que ni siquiera se da cuenta. Busca información constantemente, y eso es un diferenciador raro.'
  },
  lynchQuoteSimple: {
    'pt-BR': 'Saiba o que você possui e por que você o possui. Sua abordagem simples e direta ao investir é exatamente o que recomendo.',
    'en': 'Know what you own and why you own it. Your simple, straightforward approach to investing is exactly what I recommend.',
    'es': 'Sepa lo que posee y por qué lo posee. Su enfoque simple y directo para invertir es exactamente lo que recomiendo.'
  },
  lynchInsightYoung: {
    'pt-BR': 'Aos seus anos, eu já estava investigando empresas pessoalmente. Continue curioso e interessado, isso o levará longe.',
    'en': 'In your years, I was already investigating companies personally. Stay curious and interested, that will take you far.',
    'es': 'A tus años, ya estaba investigando empresas personalmente. Mantente curioso e interesado, eso te llevará lejos.'
  },
  lynchInsightOld: {
    'pt-BR': 'Nessa fase da vida, eu já entendia que o mercado sempre vai flutuar. Sua calma frente à volatilidade é uma virtude valiosa.',
    'en': 'At this stage of life, I already understood that the market will always fluctuate. Your calm in the face of volatility is a valuable virtue.',
    'es': 'En esta etapa de la vida, ya entendía que el mercado siempre fluctuará. Tu calma frente a la volatilidad es una virtud valiosa.'
  },
  marksQuoteLaio: {
    'pt-BR': 'Laio, investir com sucesso não se trata de prever o futuro, mas de conhecer o presente melhor que os outros. Você está construindo esse conhecimento.',
    'en': 'Laio, successful investing is not about predicting the future, but about knowing the present better than others. You are building that knowledge.',
    'es': 'Laio, invertir con éxito no se trata de predecir el futuro, sino de conocer el presente mejor que los demás. Estás construyendo ese conocimiento.'
  },
  marksInsightLaio: {
    'pt-BR': 'Seu interesse por tecnologia e inovação me lembra de quando eu comecei a perceber padrões emergentes. Continue explorando essas conexões.',
    'en': 'Your interest in technology and innovation reminds me of when I started noticing emerging patterns. Keep exploring these connections.',
    'es': 'Su interés por la tecnología y la innovación me recuerda cuando comencé a notar patrones emergentes. Sigue explorando estas conexiones.'
  },
  behavioralFinanceTitle: {
    'pt-BR': 'Análise de Comportamento Financeiro',
    'en': 'Behavioral Finance Analysis',
    'es': 'Análisis de Comportamiento Financiero'
  },
  behavioralFinanceLockedDesc: {
    'pt-BR': 'Esta seção está disponível apenas para clientes com pelo menos 6 meses de Open Finance ativo. Ative o Open Finance para desbloquear insights personalizados sobre seu comportamento financeiro.',
    'en': 'This section is available only for clients with at least 6 months of Open Finance active. Activate Open Finance to unlock personalized insights about your financial behavior.',
    'es': 'Esta sección está disponible solo para clientes con al menos 6 meses de Open Finance activo. Active Open Finance para desbloquear insights personalizados sobre su comportamiento financiero.'
  },
  activateOpenFinance: {
    'pt-BR': 'Ativar Open Finance',
    'en': 'Activate Open Finance',
    'es': 'Activar Open Finance'
  },
  behavioralFinanceDesc: {
    'pt-BR': 'Baseado nos seus dados de Open Finance, identificamos padrões em seu comportamento financeiro que podem impactar suas decisões de investimento.',
    'en': 'Based on your Open Finance data, we have identified patterns in your financial behavior that may impact your investment decisions.',
    'es': 'Basado en sus datos de Open Finance, hemos identificado patrones en su comportamiento financiero que pueden impactar sus decisiones de inversión.'
  },
  lossAversion: {
    'pt-BR': 'Aversão à Perda',
    'en': 'Loss Aversion',
    'es': 'Aversión a la Pérdida'
  },
  lossAversionDesc: {
    'pt-BR': 'Você tende a sentir perdas mais intensamente do que ganhos equivalentes, o que pode levar a decisões excessivamente conservadoras.',
    'en': 'You tend to feel losses more intensely than equivalent gains, which can lead to overly conservative decisions.',
    'es': 'Tiende a sentir las pérdidas con más intensidad que las ganancias equivalentes, lo que puede llevar a decisiones excesivamente conservadoras.'
  },
  lossAversionRec: {
    'pt-BR': 'Estabeleça regras claras para suas decisões de investimento e defina pontos de saída antes de investir para evitar reações emocionais.',
    'en': 'Establish clear rules for your investment decisions and define exit points before investing to avoid emotional reactions.',
    'es': 'Establezca reglas claras para sus decisiones de inversión y defina puntos de salida antes de invertir para evitar reacciones emocionales.'
  },
  recencyBias: {
    'pt-BR': 'Viés de Recência',
    'en': 'Recency Bias',
    'es': 'Sesgo de Recencia'
  },
  recencyBiasDesc: {
    'pt-BR': 'Você dá um peso maior a eventos recentes do mercado ao tomar decisões, possivelmente ignorando tendências de longo prazo.',
    'en': 'You give more weight to recent market events when making decisions, possibly ignoring long-term trends.',
    'es': 'Da más peso a los eventos recientes del mercado al tomar decisiones, posiblemente ignorando las tendencias a largo plazo.'
  },
  recencyBiasRec: {
    'pt-BR': 'Considere o desempenho de longo prazo dos investimentos e reavalie seu portfólio periodicamente com base em objetivos, não em flutuações recentes.',
    'en': 'Consider the long-term performance of investments and periodically reassess your portfolio based on objectives, not recent fluctuations.',
    'es': 'Considere el rendimiento a largo plazo de las inversiones y reevalúe periódicamente su cartera en función de los objetivos, no de las fluctuaciones recientes.'
  },
  overconfidence: {
    'pt-BR': 'Excesso de Confiança',
    'en': 'Overconfidence',
    'es': 'Exceso de Confianza'
  },
  overconfidenceDesc: {
    'pt-BR': 'Você demonstra uma tendência a superestimar seu conhecimento e habilidade de prever movimentos do mercado.',
    'en': 'You show a tendency to overestimate your knowledge and ability to predict market movements.',
    'es': 'Muestra una tendencia a sobrestimar su conocimiento y capacidad para predecir los movimientos del mercado.'
  },
  overconfidenceRec: {
    'pt-BR': 'Diversifique seu portfólio e considere estratégias passivas junto com suas escolhas ativas. Lembre-se que até especialistas raramente superam o mercado consistentemente.',
    'en': 'Diversify your portfolio and consider passive strategies alongside your active choices. Remember that even experts rarely outperform the market consistently.',
    'es': 'Diversifique su cartera y considere estrategias pasivas junto con sus elecciones activas. Recuerde que incluso los expertos rara vez superan al mercado de manera consistente.'
  },
  emotionalInvesting: {
    'pt-BR': 'Investimento Emocional',
    'en': 'Emotional Investing',
    'es': 'Inversión Emocional'
  },
  emotionalInvestingDescLaio: {
    'pt-BR': 'Laio, você tende a tomar decisões baseadas em emoções, especialmente em momentos de incerteza no mercado.',
    'en': 'Laio, you tend to make decisions based on emotions, especially in times of market uncertainty.',
    'es': 'Laio, tiende a tomar decisiones basadas en emociones, especialmente en momentos de incertidumbre en el mercado.'
  },
  emotionalInvestingRecLaio: {
    'pt-BR': 'Estabeleça um processo de decisão estruturado que você possa seguir mesmo em momentos de estresse. Considere automatizar parte das suas contribuições para investimentos.',
    'en': 'Establish a structured decision-making process that you can follow even in moments of stress. Consider automating part of your investment contributions.',
    'es': 'Establezca un proceso de toma de decisiones estructurado que pueda seguir incluso en momentos de estrés. Considere automatizar parte de sus contribuciones de inversión.'
  },
  recommendation: {
    'pt-BR': 'Recomendação',
    'en': 'Recommendation',
    'es': 'Recomendación'
  },
  accountNotFound: {
    'pt-BR': 'Conta não encontrada. Por favor verifique o número da conta.',
    'en': 'Account not found. Please check the account number.',
    'es': 'Cuenta no encontrada. Por favor verifique el número de cuenta.'
  },
  invalidPassword: {
    'pt-BR': 'Senha inválida. Por favor tente novamente.',
    'en': 'Invalid password. Please try again.',
    'es': 'Contraseña inválida. Por favor, inténtelo de nuevo.'
  },
  loginSuccess: {
    'pt-BR': 'Login realizado com sucesso!',
    'en': 'Login successful!',
    'es': '¡Inicio de sesión exitoso!'
  },
  welcomeBack: {
    'pt-BR': 'Bem-vindo de volta.',
    'en': 'Welcome back.',
    'es': 'Bienvenido de vuelta.'
  },
  loginError: {
    'pt-BR': 'Erro ao realizar login. Tente novamente.',
    'en': 'Error logging in. Please try again.',
    'es': 'Error al iniciar sesión. Inténtalo de nuevo.'
  },
  logout: {
    'pt-BR': 'Sair',
    'en': 'Logout',
    'es': 'Cerrar sesión'
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>('pt-BR');

  // Load saved language from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && ['en', 'pt-BR', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
