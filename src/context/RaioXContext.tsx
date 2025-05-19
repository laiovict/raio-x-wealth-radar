
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { clientData } from '@/data/clientData';

interface RaioXContextType {
  data: any;
  clientId: string;
  hasOpenFinance: boolean;
  financialSummary: FinancialSummary | null;
  aiInsights: AIInsight[];
  recommendedActions: RecommendedAction[];
  isAIAnalysisLoading: boolean;
  refreshAIAnalysis: () => void;
}

export interface FinancialSummary {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  liquidAssets: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  topRisks: { name: string; severity: 'low' | 'medium' | 'high'; impact: string }[];
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'risk' | 'opportunity' | 'goal' | 'education' | 'tax' | 'budget';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  isNew: boolean;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'complex';
  estimatedSavings?: number;
  estimatedReturn?: number;
  estimatedRiskReduction?: number;
  category: 'allocation' | 'tax' | 'cash' | 'goal' | 'risk';
  urgency: 'low' | 'medium' | 'high';
}

const RaioXContext = createContext<RaioXContextType | undefined>(undefined);

export const useRaioX = () => {
  const context = useContext(RaioXContext);
  if (!context) {
    throw new Error('useRaioX must be used within a RaioXProvider');
  }
  return context;
};

interface RaioXProviderProps {
  children: ReactNode;
  clientId: string;
  hasOpenFinance: boolean;
}

// Mock AI insights for demonstration
const generateMockInsights = (clientId: string): AIInsight[] => {
  return [
    {
      id: '1',
      title: 'Oportunidade de Tax-Loss Harvesting',
      description: 'Identificamos potencial economia de R$ 3.245 em impostos através de tax-loss harvesting com sua posição em PETR4.',
      category: 'tax',
      priority: 'high',
      timestamp: new Date(),
      isNew: true,
    },
    {
      id: '2',
      title: 'Concentração excessiva em Tecnologia',
      description: 'Seu portfolio tem 42% em ações de tecnologia, bem acima do recomendado de 25% para seu perfil.',
      category: 'risk',
      priority: 'medium',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isNew: false,
    },
    {
      id: '3',
      title: 'Meta de aposentadoria em risco',
      description: 'Com os aportes atuais, há apenas 65% de chance de atingir sua meta de aposentadoria. Considere aumentar contribuições mensais.',
      category: 'goal',
      priority: 'high',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isNew: false,
    },
    {
      id: '4',
      title: 'Oportunidade de investimento em Renda Fixa',
      description: 'Com a alta recente na taxa SELIC, identificamos CDBs com retorno acima da média para seu perfil de liquidez.',
      category: 'opportunity',
      priority: 'medium',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      isNew: false,
    },
    {
      id: '5',
      title: 'Gastos em restaurantes acima do orçamento',
      description: 'Seus gastos em restaurantes estão 35% acima do orçamento planejado para o mês atual.',
      category: 'budget',
      priority: 'low',
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      isNew: false,
    },
  ];
};

// Mock recommended actions
const generateMockRecommendations = (clientId: string): RecommendedAction[] => {
  return [
    {
      id: '1',
      title: 'Realize tax-loss harvesting com PETR4',
      description: 'Venda suas ações PETR4 com prejuízo e reinvista em ativos similares após 30 dias para economia fiscal.',
      impact: 'Economia estimada de R$ 3.245 em impostos',
      difficulty: 'easy',
      estimatedSavings: 3245,
      category: 'tax',
      urgency: 'high',
    },
    {
      id: '2',
      title: 'Rebalanceie sua exposição em tecnologia',
      description: 'Reduza a exposição ao setor de tecnologia de 42% para 25%, realocando em setores sub-representados.',
      impact: 'Redução de risco de concentração em 17%',
      difficulty: 'medium',
      estimatedRiskReduction: 17,
      category: 'allocation',
      urgency: 'medium',
    },
    {
      id: '3',
      title: 'Aumente aporte para aposentadoria',
      description: 'Aumente sua contribuição mensal para aposentadoria em R$ 850 para melhorar a probabilidade de atingir sua meta.',
      impact: 'Aumento de 15% na probabilidade de sucesso da meta de aposentadoria',
      difficulty: 'medium',
      category: 'goal',
      urgency: 'high',
    },
    {
      id: '4',
      title: 'Aproveite CDBs de alto rendimento',
      description: 'Aloque parte da sua reserva de emergência em CDBs diários pagando 102% do CDI.',
      impact: 'Aumento de 0.85% nos rendimentos da reserva de liquidez',
      difficulty: 'easy',
      estimatedReturn: 0.85,
      category: 'cash',
      urgency: 'low',
    },
    {
      id: '5',
      title: 'Revise seu orçamento de alimentação',
      description: 'Seus gastos com restaurantes estão consistentemente acima do planejado. Considere ajustar o orçamento ou os hábitos.',
      impact: 'Potencial economia mensal de R$ 450',
      difficulty: 'easy',
      estimatedSavings: 450,
      category: 'cash',
      urgency: 'low',
    },
  ];
};

// Generate mock financial summary
const generateMockFinancialSummary = (clientId: string): FinancialSummary => {
  return {
    netWorth: 1250000,
    totalAssets: 1450000,
    totalLiabilities: 200000,
    liquidAssets: 125000,
    monthlyIncome: 18500,
    monthlyExpenses: 12000,
    savingsRate: 35,
    topRisks: [
      { name: 'Concentração em Tecnologia', severity: 'high', impact: 'Exposição excessiva a um único setor' },
      { name: 'Liquidez Baixa', severity: 'medium', impact: 'Reserva de emergência abaixo do ideal' },
      { name: 'Meta de Aposentadoria em Risco', severity: 'medium', impact: 'Probabilidade de sucesso abaixo de 70%' },
    ]
  };
};

export const RaioXProvider = ({ children, clientId, hasOpenFinance }: RaioXProviderProps) => {
  // Get data for the selected client
  const clientInfo = clientData[clientId] || clientData.client1;
  
  // State for AI insights and recommendations
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [recommendedActions, setRecommendedActions] = useState<RecommendedAction[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState(true);

  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    if (hasOpenFinance) {
      setIsAIAnalysisLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setAIInsights(generateMockInsights(clientId));
        setRecommendedActions(generateMockRecommendations(clientId));
        setFinancialSummary(generateMockFinancialSummary(clientId));
        setIsAIAnalysisLoading(false);
      }, 1500);
    } else {
      setAIInsights([]);
      setRecommendedActions([]);
      setFinancialSummary(null);
      setIsAIAnalysisLoading(false);
    }
  };

  // Initialize AI analysis on mount or client/OpenFinance change
  useEffect(() => {
    refreshAIAnalysis();
  }, [clientId, hasOpenFinance]);

  return (
    <RaioXContext.Provider value={{ 
      data: clientInfo, 
      clientId, 
      hasOpenFinance, 
      aiInsights, 
      recommendedActions, 
      financialSummary, 
      isAIAnalysisLoading, 
      refreshAIAnalysis 
    }}>
      {children}
    </RaioXContext.Provider>
  );
};
