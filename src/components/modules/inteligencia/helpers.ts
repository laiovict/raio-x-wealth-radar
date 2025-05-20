
import { PieChart, ArrowUp, BadgeCheck } from 'lucide-react';
import React from 'react';

export const getRecommendedActions = () => {
  return [
    {
      id: 'diversify',
      title: 'Diversificar portfólio',
      description: 'Aumente sua exposição a ativos internacionais para reduzir risco local',
      potentialImpact: '+2.4% a.a.',
      urgency: 'Médio',
      icon: <PieChart className="h-10 w-10 text-blue-600 dark:text-blue-400 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md" />
    },
    {
      id: 'emergency',
      title: 'Reserva de emergência',
      description: 'Sua reserva atual cobre 4 meses de despesas, aumente para 6 meses de segurança',
      potentialImpact: 'Risco -30%',
      urgency: 'Alto',
      icon: <ArrowUp className="h-10 w-10 text-red-600 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/30 rounded-md" />
    },
    {
      id: 'tax',
      title: 'Otimização tributária',
      description: 'Considere migrar parte dos investimentos para produtos com isenção fiscal',
      potentialImpact: 'Economia R$ 3.200',
      urgency: 'Médio',
      icon: <BadgeCheck className="h-10 w-10 text-green-600 dark:text-green-400 p-2 bg-green-100 dark:bg-green-900/30 rounded-md" />
    }
  ];
};

export const getDefaultInsights = () => {
  return [
    {
      id: "market-shift",
      title: "Mudança de cenário macroeconômico",
      description: "A recente redução na taxa Selic deve impactar os rendimentos de renda fixa. Considere diversificar para ativos com maior potencial de valorização.",
      category: "opportunity",
      priority: "medium"
    },
    {
      id: "concentration-risk",
      title: "Concentração excessiva em renda fixa",
      description: "Sua carteira tem 68% em renda fixa, o que pode limitar retornos no cenário atual de juros em queda.",
      category: "risk", 
      priority: "high"
    },
    {
      id: "dividend-increase",
      title: "Aumento de dividendos",
      description: "Seus rendimentos em dividendos aumentaram 24% nos últimos 6 meses, mostrando boa escolha de ativos pagadores.",
      category: "savings",
      priority: "low"
    }
  ];
};
