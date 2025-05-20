
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = 'pt-BR' | 'en' | 'es';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// All translations go here
const translations: Translations = {
  welcomeMessage: {
    'pt-BR': 'Bem vindo',
    'en': 'Welcome',
    'es': 'Bienvenido'
  },
  dashboard: {
    'pt-BR': 'Painel',
    'en': 'Dashboard',
    'es': 'Panel'
  },
  overviewTab: {
    'pt-BR': 'Visão Geral',
    'en': 'Overview',
    'es': 'Vista General'
  },
  planTab: {
    'pt-BR': 'Plano Financeiro',
    'en': 'Financial Plan',
    'es': 'Plan Financiero'
  },
  futureTab: {
    'pt-BR': 'Meu Futuro',
    'en': 'My Future',
    'es': 'Mi Futuro'
  },
  aiTab: {
    'pt-BR': 'Assistente IA',
    'en': 'AI Assistant',
    'es': 'Asistente IA'
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
    'es': 'Banca'
  },
  searchPlaceholder: {
    'pt-BR': 'Como posso facilitar sua vida?',
    'en': 'How can I make your life easier?',
    'es': '¿Cómo puedo facilitar tu vida?'
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
  quickAi: {
    'pt-BR': 'Assistente IA',
    'en': 'AI Assistant',
    'es': 'Asistente IA'
  },
  quickInsights: {
    'pt-BR': 'Insights',
    'en': 'Insights',
    'es': 'Insights'
  },
  exportDiagnosis: {
    'pt-BR': 'Exportar Diagnóstico',
    'en': 'Export Diagnosis',
    'es': 'Exportar Diagnóstico'
  },
  executeButton: {
    'pt-BR': 'Executar',
    'en': 'Execute',
    'es': 'Ejecutar'
  },
  urgencyLabel: {
    'pt-BR': 'Urgência:',
    'en': 'Urgency:',
    'es': 'Urgencia:'
  },
  impactLabel: {
    'pt-BR': 'Impacto:',
    'en': 'Impact:',
    'es': 'Impacto:'
  },
  selectClient: {
    'pt-BR': 'Selecione um cliente:',
    'en': 'Select a client:',
    'es': 'Seleccione un cliente:'
  },
  login: {
    'pt-BR': 'Login',
    'en': 'Login',
    'es': 'Acceso'
  },
  noClientsFound: {
    'pt-BR': 'Nenhum cliente encontrado',
    'en': 'No clients found',
    'es': 'No se encontraron clientes'
  },
  loadingClients: {
    'pt-BR': 'Carregando clientes...',
    'en': 'Loading clients...',
    'es': 'Cargando clientes...'
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
    'pt-BR': 'Apenas clientes',
    'en': 'Only clients',
    'es': 'Solo clientes'
  },
  openFinanceActive: {
    'pt-BR': 'OpenFinance Ativo',
    'en': 'OpenFinance Active',
    'es': 'OpenFinance Activo'
  },
  openFinanceInactive: {
    'pt-BR': 'OpenFinance Inativo',
    'en': 'OpenFinance Inactive',
    'es': 'OpenFinance Inactivo'
  },
  priorityRecommendations: {
    'pt-BR': 'Recomendações Prioritárias',
    'en': 'Priority Recommendations',
    'es': 'Recomendaciones Prioritarias'
  },
  // Auth page translations
  accessAccount: {
    'pt-BR': 'Acesse sua conta',
    'en': 'Access your account',
    'es': 'Accede a tu cuenta'
  },
  enterWithXP: {
    'pt-BR': 'Entre com seu número de conta XP',
    'en': 'Enter with your XP account number',
    'es': 'Ingrese con su número de cuenta XP'
  },
  back: {
    'pt-BR': 'Voltar',
    'en': 'Back',
    'es': 'Volver'
  },
  accountNumber: {
    'pt-BR': 'Número da Conta XP',
    'en': 'XP Account Number',
    'es': 'Número de Cuenta XP'
  },
  password: {
    'pt-BR': 'Senha',
    'en': 'Password',
    'es': 'Contraseña'
  },
  enterAccountNumber: {
    'pt-BR': 'Digite seu número de conta',
    'en': 'Enter your account number',
    'es': 'Ingrese su número de cuenta'
  },
  enterPassword: {
    'pt-BR': 'Digite sua senha',
    'en': 'Enter your password',
    'es': 'Ingrese su contraseña'
  },
  enter: {
    'pt-BR': 'Entrar',
    'en': 'Enter',
    'es': 'Entrar'
  },
  processing: {
    'pt-BR': 'Processando...',
    'en': 'Processing...',
    'es': 'Procesando...'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: () => '',
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language');
    if (storedLanguage === 'en' || storedLanguage === 'es' || storedLanguage === 'pt-BR') {
      setLanguage(storedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
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
