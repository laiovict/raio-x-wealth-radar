
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Generates mock insights based on client seed
 * @param clientSeed A seed to ensure consistent random data for the same client
 * @returns Array of mock insights
 */
export const generateMockInsights = (clientSeed: number) => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      const insights = [
        {
          id: `insight-${clientSeed}-1`,
          title: "Concentração excessiva em FIIs",
          description: "Sua carteira tem mais de 40% alocado em fundos imobiliários, o que pode aumentar seu risco setorial. Considere diversificar em outras classes de ativos.",
          type: "risk",
          impact: "high",
          actions: [
            "Reduzir exposição a FIIs para no máximo 25% da carteira",
            "Aumentar alocação em ações de outros setores"
          ],
          isNew: true,
          dataSource: "synthetic" as DataSourceType
        },
        {
          id: `insight-${clientSeed}-2`,
          title: "Oportunidade em dividendos",
          description: "Os dividendos recebidos aumentaram 22% em relação ao mesmo período do ano passado, indicando bom desempenho dos ativos de renda.",
          type: "opportunity",
          impact: "medium",
          actions: [
            "Aumentar posição em ações pagadoras de dividendos",
            "Reinvestir automaticamente os dividendos recebidos"
          ],
          dataSource: "synthetic" as DataSourceType
        },
        {
          id: `insight-${clientSeed}-3`,
          title: "Desbalanceamento da carteira",
          description: `A distribuição atual da sua carteira desviou ${clientSeed % 10 + 5}% da alocação estratégica ideal. Uma realocação pode otimizar o retorno considerando seu perfil de risco.`,
          type: "insight",
          impact: "medium",
          actions: [
            "Realizar rebalanceamento trimestral",
            "Ajustar alocação entre renda fixa e variável"
          ],
          dataSource: "synthetic" as DataSourceType
        }
      ];
      
      resolve(insights);
    }, 1200);
  });
};

/**
 * Generates mock action statuses based on client seed
 * @param clientSeed A seed to ensure consistent random data for the same client
 * @returns Array of mock action statuses
 */
export const generateMockActions = (clientSeed: number) => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      const actionStatuses = [
        { id: 'liquidity', label: 'Reserva de emergência', status: 'pending' },
        { id: 'risk', label: 'Perfil de risco', status: 'complete' },
        { id: 'diversification', label: 'Diversificação', status: 'partial' },
        { id: `action-${clientSeed}`, label: 'Rebalanceamento', status: clientSeed % 2 === 0 ? 'pending' : 'complete' }
      ];
      
      resolve(actionStatuses);
    }, 1000);
  });
};

/**
 * Generates mock recommendations based on client seed
 * @param clientSeed A seed to ensure consistent random data for the same client
 * @returns Array of mock recommendations
 */
export const generateMockRecommendations = (clientSeed: number) => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      const recommendations = [
        {
          id: `rec-${clientSeed}-1`,
          title: "Aumente sua reserva de emergência",
          description: "Sua reserva atual cobre apenas 3 meses de despesas. O ideal é ter entre 6 a 12 meses.",
          urgency: "Alto",
          impact: "Alto",
        },
        {
          id: `rec-${clientSeed}-2`,
          title: "Diversifique internacionalmente",
          description: "Sua carteira está 100% no Brasil. Uma exposição de 15-30% ao mercado internacional pode reduzir riscos.",
          urgency: "Médio",
          impact: "Médio",
        },
        {
          id: `rec-${clientSeed}-3`,
          title: `Reveja seus seguros`,
          description: `Os seguros atuais podem não cobrir adequadamente suas necessidades financeiras e familiares.`,
          urgency: "Baixo",
          impact: "Alto",
        }
      ];
      
      resolve(recommendations);
    }, 1500);
  });
};

export default {
  generateMockInsights,
  generateMockActions,
  generateMockRecommendations
};
