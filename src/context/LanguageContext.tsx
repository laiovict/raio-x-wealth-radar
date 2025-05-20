import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    welcomeMessage: "Welcome",
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
    overviewTab: "How am I?",
    planTab: "What should I change?",
    futureTab: "What about my future?",
    aiTab: "What's happening?",
    chatTab: "Talk to RM",
    quickAi: "AI Insights",
    myGoals: "My Goals",
    planning: "Planning",
    quickInsights: "Insights",
    chatWithRM: "Chat with RM",
    overviewTab: "Como estou?",
    planTab: "O que preciso mudar?",
    futureTab: "E meu futuro?",
    aiTab: "O que está acontecendo?",
    chatTab: "Fale com RM",
    planningTab: "Planning",
    investmentsTab: "Investments",
    goalsTab: "Goals",
    insightsTab: "Insights",
    socialTab: "Social",
    bankingTab: "Banking",
    chatTab: "Chat",
    behaviorTab: "Behavior",
  },
  pt: {
    welcomeMessage: "Bem-vindo",
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
    overviewTab: "Como estou?",
    planTab: "O que preciso mudar?",
    futureTab: "E meu futuro?",
    aiTab: "O que está acontecendo?",
    chatTab: "Fale com RM",
    quickAi: "Insights de IA",
    myGoals: "Minhas Metas",
    planning: "Planejamento",
    quickInsights: "Insights",
    chatWithRM: "Falar com RM",
    overviewTab: "Visão Geral",
    planTab: "Plano",
    futureTab: "Futuro",
    aiTab: "IA",
    planningTab: "Planejamento",
    investmentsTab: "Investimentos",
    goalsTab: "Metas",
    insightsTab: "Insights",
    socialTab: "Social",
    bankingTab: "Bancos",
    chatTab: "Chat",
    behaviorTab: "Comportamento",
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations][key] || key;
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
