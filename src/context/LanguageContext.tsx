
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our translations
type TranslationKeys = {
  welcomeMessage: string;
  welcomeMessagePortfolio: string;
  searchPlaceholder: string;
  openFinanceActive: string;
  activateOpenFinance: string;
  behavioralFinanceTitle: string;
  behavioralFinanceLockedDesc: string;
  behavioralFinanceDesc: string;
  lossAversion: string;
  lossAversionDesc: string;
  lossAversionRec: string;
  recencyBias: string;
  recencyBiasDesc: string;
  recencyBiasRec: string;
  overconfidence: string;
  overconfidenceDesc: string;
  overconfidenceRec: string;
  emotionalInvesting: string;
  emotionalInvestingDescLaio: string;
  emotionalInvestingRecLaio: string;
  recommendation: string;
  exportPdf: string;
  quickAi: string;
  myGoals: string;
  planning: string;
  quickInsights: string;
  chatWithRM: string;
  overviewTab: string;
  planTab: string;
  futureTab: string;
  aiTab: string;
  chatTab: string;
  planningTab: string;
  investmentsTab: string;
  goalsTab: string;
  insightsTab: string;
  socialTab: string;
  bankingTab: string;
  behaviorTab: string;
  loadingClients: string;
  selectClient: string;
  noClientsFound: string;
  login: string;
  
  // Additional keys for modules
  famousInvestorsTitle: string;
  atYourAge: string;
  buffettQuoteYoung: string;
  buffettQuoteOld: string;
  buffettInsightYoung: string;
  buffettInsightOld: string;
  dalioQuoteHighEquity: string;
  dalioQuoteLowEquity: string;
  dalioInsightYoung: string;
  dalioInsightOld: string;
  lynchQuoteInfoSeeking: string;
  lynchQuoteSimple: string;
  lynchInsightYoung: string;
  lynchInsightOld: string;
  marksQuoteLaio: string;
  marksInsightLaio: string;
  
  // Additional keys for other modules
  priorityRecommendations: string;
  urgencyLabel: string;
  impactLabel: string;
  executeButton: string;
  recommendedActions: string;
  aiSuggestions: string;
  impact: string;
  effort: string;
  
  // Auth related keys
  loginSuccess: string;
  welcomeBack: string;
  invalidPassword: string;
  loginError: string;
};

type Translations = {
  en: TranslationKeys;
  pt: TranslationKeys;
  es?: TranslationKeys;
};

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations: Translations = {
  en: {
    welcomeMessage: "Welcome",
    welcomeMessagePortfolio: "Here's your financial snapshot",
    searchPlaceholder: "Search...",
    openFinanceActive: "Open Finance Active",
    activateOpenFinance: "Activate Open Finance",
    behavioralFinanceTitle: "Behavioral Finance",
    behavioralFinanceLockedDesc: "Activate Open Finance to unlock Behavioral Finance insights.",
    behavioralFinanceDesc: "Here's how your behavior affects your investments.",
    lossAversion: "Loss Aversion",
    lossAversionDesc: "You tend to avoid losses more than you enjoy gains.",
    lossAversionRec: "Consider a balanced portfolio to mitigate risk.",
    recencyBias: "Recency Bias",
    recencyBiasDesc: "You overemphasize recent events, ignoring long-term trends.",
    recencyBiasRec: "Focus on long-term investment strategies.",
    overconfidence: "Overconfidence",
    overconfidenceDesc: "You overestimate your investment skills.",
    overconfidenceRec: "Seek advice from financial advisors.",
    emotionalInvesting: "Emotional Investing",
    emotionalInvestingDescLaio: "You make investment decisions based on emotions rather than logic.",
    emotionalInvestingRecLaio: "Create a well-thought-out investment plan and stick to it.",
    recommendation: "Recommendation",
    exportPdf: "Export PDF",
    quickAi: "AI Insights",
    myGoals: "My Goals",
    planning: "Planning",
    quickInsights: "Insights",
    chatWithRM: "Chat with RM",
    overviewTab: "How am I?",
    planTab: "What should I change?",
    futureTab: "What about my future?",
    aiTab: "What's happening?",
    chatTab: "Talk to RM",
    planningTab: "Planning",
    investmentsTab: "Investments",
    goalsTab: "Goals",
    insightsTab: "Insights",
    socialTab: "Social",
    bankingTab: "Banking",
    behaviorTab: "Behavior",
    loadingClients: "Loading clients...",
    selectClient: "Select client",
    noClientsFound: "No clients found",
    login: "Login",
    
    // Additional keys for modules
    famousInvestorsTitle: "Famous Investors Insights",
    atYourAge: "At your age",
    buffettQuoteYoung: "The best investment you can make is in yourself.",
    buffettQuoteOld: "Risk comes from not knowing what you're doing.",
    buffettInsightYoung: "Focus on building skills and knowledge. Your human capital is your greatest asset.",
    buffettInsightOld: "With your experience, now's the time to focus on steady investments and reduced risk.",
    dalioQuoteHighEquity: "Diversification is the holy grail of investing.",
    dalioQuoteLowEquity: "Cash is trash, but you still need some.",
    dalioInsightYoung: "Your portfolio has time to recover from volatility, but don't put all eggs in one basket.",
    dalioInsightOld: "Consider increasing allocation to fixed income while maintaining some growth potential.",
    lynchQuoteInfoSeeking: "Know what you own, and know why you own it.",
    lynchQuoteSimple: "Never invest in an idea you can't illustrate with a crayon.",
    lynchInsightYoung: "Your curiosity is an asset. Research thoroughly before making investment decisions.",
    lynchInsightOld: "Keep it simple. Focus on investments you understand completely.",
    marksQuoteLaio: "The greatest investment opportunities come not from following the crowd, but from diverging from it.",
    marksInsightLaio: "Your thinking process shows independence - this is a strength in long-term investing.",
    
    // Additional keys for other modules
    priorityRecommendations: "Priority Recommendations",
    urgencyLabel: "Urgency",
    impactLabel: "Impact",
    executeButton: "Execute",
    recommendedActions: "Recommended Actions",
    aiSuggestions: "AI-Generated Suggestions",
    impact: "Impact",
    effort: "Effort",
    
    // Auth related keys
    loginSuccess: "Login successful",
    welcomeBack: "Welcome back",
    invalidPassword: "Invalid password",
    loginError: "Login error"
  },
  pt: {
    welcomeMessage: "Bem-vindo",
    welcomeMessagePortfolio: "Aqui está seu panorama financeiro",
    searchPlaceholder: "Pesquisar...",
    openFinanceActive: "Open Finance Ativo",
    activateOpenFinance: "Ativar Open Finance",
    behavioralFinanceTitle: "Finanças Comportamentais",
    behavioralFinanceLockedDesc: "Ative o Open Finance para desbloquear insights de Finanças Comportamentais.",
    behavioralFinanceDesc: "Veja como seu comportamento afeta seus investimentos.",
    lossAversion: "Aversão à Perda",
    lossAversionDesc: "Você tende a evitar perdas mais do que aproveitar ganhos.",
    lossAversionRec: "Considere uma carteira equilibrada para mitigar riscos.",
    recencyBias: "Viés de Recência",
    recencyBiasDesc: "Você superenfatiza eventos recentes, ignorando tendências de longo prazo.",
    recencyBiasRec: "Concentre-se em estratégias de investimento de longo prazo.",
    overconfidence: "Excesso de Confiança",
    overconfidenceDesc: "Você superestima suas habilidades de investimento.",
    overconfidenceRec: "Procure aconselhamento de consultores financeiros.",
    emotionalInvesting: "Investimento Emocional",
    emotionalInvestingDescLaio: "Você toma decisões de investimento com base em emoções, em vez de lógica.",
    emotionalInvestingRecLaio: "Crie um plano de investimento bem pensado e siga-o.",
    recommendation: "Recomendação",
    exportPdf: "Exportar PDF",
    quickAi: "Insights de IA",
    myGoals: "Minhas Metas",
    planning: "Planejamento",
    quickInsights: "Insights",
    chatWithRM: "Falar com RM",
    overviewTab: "Como estou?",
    planTab: "O que preciso mudar?",
    futureTab: "E meu futuro?",
    aiTab: "O que está acontecendo?",
    chatTab: "Fale com RM",
    planningTab: "Planejamento",
    investmentsTab: "Investimentos",
    goalsTab: "Metas",
    insightsTab: "Insights",
    socialTab: "Social",
    bankingTab: "Bancos",
    behaviorTab: "Comportamento",
    loadingClients: "Carregando clientes...",
    selectClient: "Selecionar cliente",
    noClientsFound: "Nenhum cliente encontrado",
    login: "Entrar",
    
    // Additional keys for modules
    famousInvestorsTitle: "Insights de Investidores Famosos",
    atYourAge: "Na sua idade",
    buffettQuoteYoung: "O melhor investimento que você pode fazer é em si mesmo.",
    buffettQuoteOld: "O risco vem de não saber o que você está fazendo.",
    buffettInsightYoung: "Concentre-se em desenvolver habilidades e conhecimento. Seu capital humano é seu maior ativo.",
    buffettInsightOld: "Com sua experiência, agora é hora de focar em investimentos estáveis e reduzir riscos.",
    dalioQuoteHighEquity: "A diversificação é o santo graal dos investimentos.",
    dalioQuoteLowEquity: "Dinheiro em espécie é lixo, mas você ainda precisa de algum.",
    dalioInsightYoung: "Seu portfólio tem tempo para se recuperar da volatilidade, mas não coloque todos os ovos em uma cesta.",
    dalioInsightOld: "Considere aumentar a alocação em renda fixa, mantendo algum potencial de crescimento.",
    lynchQuoteInfoSeeking: "Saiba o que você possui e saiba por que você o possui.",
    lynchQuoteSimple: "Nunca invista em uma ideia que você não possa ilustrar com um giz de cera.",
    lynchInsightYoung: "Sua curiosidade é um ativo. Pesquise completamente antes de tomar decisões de investimento.",
    lynchInsightOld: "Mantenha simples. Concentre-se em investimentos que você entenda completamente.",
    marksQuoteLaio: "As maiores oportunidades de investimento vêm não de seguir a multidão, mas de divergir dela.",
    marksInsightLaio: "Seu processo de pensamento mostra independência - isso é uma força no investimento de longo prazo.",
    
    // Additional keys for other modules
    priorityRecommendations: "Recomendações Prioritárias",
    urgencyLabel: "Urgência",
    impactLabel: "Impacto",
    executeButton: "Executar",
    recommendedActions: "Ações Recomendadas",
    aiSuggestions: "Sugestões Geradas por IA",
    impact: "Impacto",
    effort: "Esforço",
    
    // Auth related keys
    loginSuccess: "Login bem-sucedido",
    welcomeBack: "Bem-vindo de volta",
    invalidPassword: "Senha inválida",
    loginError: "Erro de login"
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Set initial language from localStorage or use 'pt' as default
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Updated translation function with proper type checking
  const t = (key: keyof TranslationKeys): string => {
    // Check if the language exists in our translations
    if (!translations[language as keyof typeof translations]) {
      console.warn(`Language "${language}" not found in translations. Using "pt" as fallback.`);
      return translations.pt[key] || String(key);
    }
    
    // Check if the key exists in the current language
    const translation = translations[language as keyof typeof translations][key];
    if (!translation) {
      console.warn(`Translation key "${String(key)}" not found for language "${language}". Using key as fallback.`);
      return String(key);
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
