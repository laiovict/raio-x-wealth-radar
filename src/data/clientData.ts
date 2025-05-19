
export const clientData: Record<string, any> = {
  client1: {
    clientId: "client1",
    clientName: "João Silva",
    age: 42,
    riskProfile: "Moderado",
    lastUpdate: "2025-05-15",
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Fundos": 53.5,
        "Renda Fixa": 22.8,
        "Ações": 15.2,
        "Internacional": 5.5,
        "Caixa": 3.0
      },
      recommended: {
        "Fundos": 40,
        "Renda Fixa": 25,
        "Ações": 20,
        "Internacional": 10,
        "Caixa": 5
      },
      optimizationGain: 1.2,
      summary: "Sua carteira está concentrada demais em Fundos (53,5% vs 40% ideal). Uma realocação proporcionaria um ganho potencial de 1,2% ao ano com o mesmo risco. Sua exposição internacional está abaixo do recomendado para o perfil moderado."
    },
    
    // Projeção Futuro Próximo
    projection: {
      currentTotal: 430000,
      monthlyContribution: 1000,
      scenarios: {
        base: {
          "1 ano": 458000,
          "3 anos": 518000,
          "5 anos": 589000
        },
        stress: {
          "1 ano": 421000,
          "3 anos": 476000,
          "5 anos": 535000
        }
      },
      summary: "Com seu aporte mensal de R$ 1.000, você deve alcançar R$ 589 mil em 5 anos no cenário base. Mesmo no cenário de stress, seu patrimônio deve superar R$ 535 mil, mostrando resiliência. Um aumento de R$ 500 no aporte mensal elevaria o valor final para R$ 650 mil."
    },
    
    // Reserva & Liquidez Dinâmica
    liquidity: {
      currentIdle: 7000,
      idealReserve: 12000,
      monthlyExpenses: 6000,
      idealMonths: 2,
      summary: "Você tem R$ 7.000 em caixa, mas sua reserva ideal seria de R$ 12.000 (2 meses de despesas). Recomendamos aumentar sua reserva em R$ 5.000 nos próximos 3 meses para maior tranquilidade, utilizando aplicações de alta liquidez como CDBs diários."
    },
    
    // Gaps de Metas de Vida
    lifeGoals: {
      goals: [
        {
          name: "Imóvel",
          targetAmount: 250000,
          currentAmount: 100000,
          progress: 40,
          timeframe: "5 anos",
          adjustmentNeeded: 5
        },
        {
          name: "Aposentadoria",
          targetAmount: 1500000,
          currentAmount: 400000,
          progress: 27,
          timeframe: "15 anos",
          adjustmentNeeded: 10
        },
        {
          name: "Educação Filhos",
          targetAmount: 180000,
          currentAmount: 32000,
          progress: 18,
          timeframe: "8 anos",
          adjustmentNeeded: 8
        }
      ],
      summary: "Sua meta para o imóvel está em 40% do caminho, mas precisará de um ajuste de +5% nos aportes mensais para atingi-la no prazo. A meta de aposentadoria requer atenção especial com ajuste de +10% para se manter no caminho certo."
    },
    
    // Curiosidades Wrapped
    wrapped: {
      biggestContribution: {
        amount: 80000,
        date: "2024-12-10"
      },
      longestPositiveStreak: 3,
      largestDrawdown: {
        percentage: 8.2,
        period: "Mar 2024 - Abr 2024"
      },
      mostProfitableAsset: {
        name: "LGCP11",
        return: 14.5
      },
      summary: "Seu maior aporte foi de R$ 80 mil em dezembro/2024, demonstrando excelente capacidade de poupança. Você manteve 3 meses consecutivos de rendimento positivo, mesmo durante a volatilidade de mercado. O FII LGCP11 foi seu ativo mais rentável, com 14,5% de retorno."
    },
    
    // Comparativo Social
    socialComparison: {
      percentileRank: 20,
      returnVsPeers: 2.2,
      diversificationScore: 75,
      peerGroup: "Moderado Growth",
      summary: "Você está no top 20% dos investidores com perfil Moderado Growth, com retorno 2,2% acima da mediana. Sua diversificação é boa (75/100), mas você poderia se beneficiar de uma exposição mais equilibrada entre classes de ativos."
    },
    
    // Insights de Sentimento
    sentiment: {
      assets: [
        {
          ticker: "LGCP11",
          sentiment: 85,
          recentNews: "Expansão de portfólio com aquisição de novo galpão logístico",
          impact: 0.8
        },
        {
          ticker: "PETR4",
          sentiment: 45,
          recentNews: "Instabilidade na política de dividendos preocupa mercado",
          impact: -1.2
        },
        {
          ticker: "BOVA11",
          sentiment: 62,
          recentNews: "Mercado reagindo positivamente a novos dados econômicos",
          impact: 0.5
        }
      ],
      summary: "As notícias positivas sobre LGCP11 impactaram em +0,8% seu rendimento na semana. Fique atento a PETR4, com sentimento negativo devido à política de dividendos, contribuindo para uma queda de 1,2% neste ativo em seu portfólio."
    },
    
    // Recomendações Prioritárias
    recommendations: [
      {
        action: "Aumentar alocação em Multimercados",
        impact: "Alto",
        urgency: "Médio",
        description: "Realoque 5% de fundos de renda fixa para multimercados com estratégia macro, melhorando diversificação e retorno potencial."
      },
      {
        action: "Reduzir exposição ao CDB do Banco XYZ",
        impact: "Médio",
        urgency: "Alto",
        description: "Este CDB está rendendo abaixo do CDI há 3 meses. Recomendamos migrar para opções mais rentáveis."
      },
      {
        action: "Conectar contas adicionais",
        impact: "Alto",
        urgency: "Baixo",
        description: "Conecte sua conta no Banco ABC e a corretora DEF via Pluggy para termos uma visão completa de seus investimentos."
      }
    ],
    summary: "Priorize aumentar sua alocação em multimercados para melhorar a diversificação. Com urgência, reveja o CDB do Banco XYZ que está com rendimento abaixo do CDI. Para uma análise mais completa, conecte suas contas adicionais quando conveniente."
  },
  
  client2: {
    clientId: "client2",
    clientName: "Ana Oliveira",
    age: 35,
    riskProfile: "Arrojado",
    lastUpdate: "2025-05-14",
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Ações": 45.2,
        "Fundos": 28.5,
        "Renda Fixa": 15.3,
        "Internacional": 8.5,
        "Caixa": 2.5
      },
      recommended: {
        "Ações": 50,
        "Fundos": 20,
        "Renda Fixa": 10,
        "Internacional": 15,
        "Caixa": 5
      },
      optimizationGain: 1.8,
      summary: "Sua carteira está bem alinhada com seu perfil arrojado, mas poderia se beneficiar de um aumento na exposição internacional (8,5% vs 15% ideal). Uma realocação proporcionaria um ganho potencial de 1,8% ao ano sem aumento significativo de risco."
    },
    
    // Outros módulos seguiriam o mesmo padrão...
    projection: {
      currentTotal: 280000,
      monthlyContribution: 2000,
      scenarios: {
        base: {
          "1 ano": 314000,
          "3 anos": 395000,
          "5 anos": 490000
        },
        stress: {
          "1 ano": 285000,
          "3 anos": 350000,
          "5 anos": 425000
        }
      },
      summary: "Com seu aporte mensal de R$ 2.000, seu patrimônio pode atingir R$ 490 mil em 5 anos no cenário base. Seu perfil arrojado traz mais volatilidade, mas também maior potencial de crescimento."
    },
    
    // Apenas exemplos simplificados para o cliente 2...
    liquidity: {
      currentIdle: 5000,
      idealReserve: 15000,
      monthlyExpenses: 7500,
      idealMonths: 2,
      summary: "Sua reserva de emergência está abaixo do ideal. Recomendamos aumentar em R$ 10.000 nos próximos meses, especialmente considerando seu perfil de risco mais arrojado."
    }
  },
  
  client3: {
    clientId: "client3",
    clientName: "Marcos Santos",
    age: 58,
    riskProfile: "Conservador",
    lastUpdate: "2025-05-16",
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Renda Fixa": 68.5,
        "Fundos": 22.0,
        "Ações": 5.3,
        "Internacional": 1.2,
        "Caixa": 3.0
      },
      recommended: {
        "Renda Fixa": 60,
        "Fundos": 25,
        "Ações": 10,
        "Internacional": 0,
        "Caixa": 5
      },
      optimizationGain: 0.5,
      summary: "Sua carteira está adequadamente conservadora devido à proximidade da aposentadoria. Uma leve redução na concentração em Renda Fixa poderia trazer um ganho modesto de 0,5% ao ano mantendo um risco controlado."
    },
    
    // Apenas exemplos simplificados para o cliente 3...
    projection: {
      currentTotal: 850000,
      monthlyContribution: 3000,
      scenarios: {
        base: {
          "1 ano": 905000,
          "3 anos": 1025000,
          "5 anos": 1170000
        },
        stress: {
          "1 ano": 890000,
          "3 anos": 985000,
          "5 anos": 1090000
        }
      },
      summary: "Sua carteira conservadora mostra estabilidade mesmo em cenários de stress. Com seu aporte mensal, deve atingir sua meta de aposentadoria dentro do prazo previsto, com baixa volatilidade."
    }
  }
};
