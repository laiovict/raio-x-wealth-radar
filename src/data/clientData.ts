export const clientData: Record<string, any> = {
  client1: {
    clientId: "client1",
    clientName: "João Silva",
    age: 42,
    riskProfile: "Moderado",
    lastUpdate: "2025-05-15",
    
    // Informações personalizadas do cliente
    personalInsights: {
      family: "Você e sua esposa Ana estão considerando ter um filho nos próximos 2 anos. Sabemos que a educação é uma prioridade, por isso preparamos uma projeção dos custos com escola particular até a universidade. Também notamos seu apoio aos seus pais, algo que demonstra seus valores familiares.",
      passions: "Como torcedor do São Paulo e praticante de corrida, você já completou 3 meias maratonas! Sua paixão por livros de história e sua coleção de vinil dos anos 80 mostram seu apreço pelo clássico. Podemos te conectar com outros clientes que compartilham esses interesses.",
      financialJourney: "Seu crescimento profissional na área de TI tem sido impressionante, com 3 promoções nos últimos 5 anos. Sua disciplina em poupar 25% da sua renda coloca você entre os 10% mais disciplinados do nosso portfólio. Continue assim!",
      goals: "Sabemos que você sonha em ter uma casa de praia em Ubatuba até 2030. Com base no seu ritmo atual de investimentos e no comportamento do mercado imobiliário na região, estamos no caminho certo. Também estamos de olho na sua meta de uma viagem para o Japão em 2027."
    },
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Renda Fixa": 45.5,
        "Ações BR": 28.2,
        "Fundos": 18.6,
        "Caixa": 7.7,
        "Internacional": 0.0,
        "FIIs": 0.0,
        "Previdência": 0.0
      },
      recommended: {
        "Renda Fixa": 35.0,
        "Ações BR": 25.0,
        "Fundos": 15.0,
        "Caixa": 5.0,
        "Internacional": 10.0,
        "FIIs": 7.0,
        "Previdência": 3.0
      },
      optimizationGain: 1.8,
      summary: "Sua carteira está concentrada em renda fixa (45,5%) e ações brasileiras (28,2%), refletindo um perfil conservador. Recomendamos diversificar com 10% em investimentos internacionais e 7% em FIIs para melhor equilíbrio entre segurança e crescimento. Esta realocação pode trazer um ganho potencial de 1,8% ao ano sem aumentar significativamente seu nível de risco."
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
    summary: "Priorize aumentar sua alocação em multimercados para melhorar a diversificação. Com urgência, reveja o CDB do Banco XYZ que está com rendimento abaixo do CDI. Para uma análise mais completa, conecte suas contas adicionais quando conveniente.",

    // Insights financeiros adicionais
    financialInsights: {
      highestSpendingMonth: {
        month: "Dezembro",
        amount: 15200,
        comparison: "equivalente a 3 iPhones ou 140 lanches no iFood",
        summary: "Em dezembro, você gastou R$ 15.200, o equivalente a 3 iPhones ou 140 lanches no iFood. Foi seu recorde do ano. Respeitamos o corre, mas talvez... tenha passado da conta?"
      },
      wastedMoney: {
        category: "Assinaturas não utilizadas",
        amount: 3600,
        potentialGrowth: 4100,
        summary: "Só com assinaturas que você mal usa, gastou R$ 3.600 no ano. Se tivesse colocado metade disso num Tesouro IPCA+, teria hoje R$ 4.100. Mas tudo bem, a gente olha pra frente."
      },
      topCategories: {
        categories: ["Delivery", "Assinaturas", "Viagens"],
        foodDeliveryCount: 87,
        summary: "Top 3 categorias do seu cartão: Delivery, Assinaturas e Viagens. Spoiler: você pediu 87 vezes no iFood. Sim, a gente contou."
      },
      negativeMonths: {
        count: 3,
        summary: "Em 3 meses você gastou mais do que entrou. Chamamos isso de 'modo sobrevivência financeira'. Bora sair dele?"
      },
      investmentGrowth: {
        totalContributions: 42000,
        growthPercentage: 7.8,
        summary: "Você aportou R$ 42.000 em investimentos. Cresceu 7,8% ao longo do ano - e isso sem esforço real. Imagina se virar hábito?"
      },
      potentialSavings: {
        category: "Alimentação fora",
        savingsPercentage: 10,
        monthlySavings: 450,
        twentyYearProjection: 280000,
        goalRelation: "casa própria",
        summary: "Se reduzir 10% dos seus gastos com alimentação fora, dá pra investir R$ 450 todo mês. Isso pode virar R$ 280.000 em 20 anos - que te deixa mais perto da sua casa própria."
      },
      installments: {
        count: 14,
        summary: "Teve 14 parcelas rodando que você nem lembra mais. Seu 'eu do passado' adorava parcelar. Seu 'eu do presente' tá pagando a conta. Bora conversar com o 'eu do futuro'?"
      },
      foodSpending: {
        total: 18600,
        equivalentMcDonaldsCombos: 310,
        equivalentFancyDinners: 24,
        restaurantName: "Figueira Rubaiyat",
        summary: "Você gastou R$ 18.600 em comida fora de casa. Isso dá: 310 combos no McDonald's ou 24 jantares no Figueira Rubaiyat. E olha que nem pagamos a sobremesa."
      },
      subscriptions: {
        total: 11,
        summary: "Você tem 11 assinaturas ativas. Quantas você realmente usa? Spoiler: a gente sabe. E o seu bolso também."
      },
      financialLoop: {
        month: "março",
        income: 8500,
        expenses: 8320,
        repeatedMonths: 5,
        summary: "Em março, o ciclo foi: Entrou R$ 8.500 → Saiu R$ 8.320 → Sobrou: quase nada. Repetiu isso em 5 meses. E aí, qual vai ser o plano pra quebrar o looping?"
      },
      idleMoney: {
        amount: 28000,
        days: 45,
        potentialEarnings: 650,
        summary: "Você deixou R$ 28.000 na conta corrente por 45 dias. Esse valor podia ter rendido R$ 650 no Tesouro Selic. A gente entende, preguiça de investir. Mas e se fosse automático?"
      },
      underperformingInvestments: {
        amount: 42000,
        product: "Poupança",
        yield: 4.2,
        marketAverage: 9.8,
        summary: "Você tem R$ 42.000 aplicados em Poupança com rendimento de 4,2% ao ano. A média do mercado foi 9,8%. Bora repensar isso? Seu dinheiro merece mais respeito."
      },
      bestInvestment: {
        name: "MXRF11",
        return: 18.2,
        potentialDoubleGain: 3840,
        summary: "Seu melhor investimento foi MXRF11, com 18,2% de rentabilidade. Se tivesse colocado o dobro, teria ganhado R$ 3.840 a mais. Bora repetir a dose — mas com estratégia."
      }
    }
  },
  
  client2: {
    clientId: "client2",
    clientName: "Ana Oliveira",
    age: 35,
    riskProfile: "Arrojado",
    lastUpdate: "2025-05-14",
    
    // Informações personalizadas do cliente
    personalInsights: {
      family: "Como mãe solo de duas meninas, Júlia (8) e Beatriz (5), sabemos que a educação delas é sua prioridade. Nossa análise inclui um plano personalizado para garantir que ambas possam frequentar as melhores universidades, mesmo que no exterior como você mencionou desejar.",
      passions: "Sua paixão por fotografia não passou despercebida! Aquela exposição que você visitou em Nova York ano passado nos deu ideias para alguns eventos exclusivos com fotógrafos renomados que estamos organizando. E como fã de Fórmula 1, temos alguns convites VIP chegando em breve.",
      financialJourney: "Sua trajetória de empreendedora na área de marketing digital tem sido inspiradora. A venda de sua participação na startup por R$ 1,5 milhão ano passado foi um marco importante. Estamos focados em fazer esse capital trabalhar alinhado com seus novos projetos.",
      goals: "Sua meta de independência financeira aos 45 anos está bem encaminhada! Com sua taxa atual de investimentos e o crescimento projetado, você atingirá os R$ 4 milhões necessários para gerar a renda passiva que deseja. Também estamos monitorando oportunidades para aquele apartamento em Lisboa que você mencionou."
    },
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Ações BR": 48.2,
        "Fundos": 22.5,
        "Renda Fixa": 15.3,
        "Internacional": 8.5,
        "Caixa": 5.5,
        "FIIs": 0.0,
        "Previdência": 0.0
      },
      recommended: {
        "Ações BR": 40.0,
        "Fundos": 20.0,
        "Renda Fixa": 10.0,
        "Internacional": 20.0,
        "Caixa": 3.0,
        "FIIs": 7.0,
        "Previdência": 0.0
      },
      optimizationGain: 2.4,
      summary: "Seu perfil arrojado está bem representado na sua carteira, com foco em ações brasileiras. Sugerimos aumentar sua exposição internacional de 8,5% para 20%, aproveitando mercados mais desenvolvidos e diversificados. A adição de FIIs (7%) pode trazer renda passiva e proteção inflacionária, contribuindo para um ganho potencial de 2,4% ao ano."
    },
    
    // Projeção Futuro Próximo
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
    
    // Reserva & Liquidez Dinâmica
    liquidity: {
      currentIdle: 5000,
      idealReserve: 15000,
      monthlyExpenses: 7500,
      idealMonths: 2,
      summary: "Sua reserva de emergência está abaixo do ideal. Recomendamos aumentar em R$ 10.000 nos próximos meses, especialmente considerando seu perfil de risco mais arrojado."
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
    summary: "Priorize aumentar sua alocação em multimercados para melhorar a diversificação. Com urgência, reveja o CDB do Banco XYZ que está com rendimento abaixo do CDI. Para uma análise mais completa, conecte suas contas adicionais quando conveniente.",

    // Insights financeiros adicionais
    financialInsights: {
      highestSpendingMonth: {
        month: "Julho",
        amount: 22400,
        comparison: "equivalente a uma viagem para a Europa ou 6 meses de aluguel no seu bairro",
        summary: "Em julho, você gastou R$ 22.400, o equivalente a uma viagem para a Europa ou 6 meses de aluguel no seu bairro. Foi seu recorde do ano. O que aconteceu nesse mês?"
      },
      wastedMoney: {
        category: "Compras por impulso",
        amount: 8200,
        potentialGrowth: 9600,
        summary: "Só com compras por impulso, você gastou R$ 8.200 no ano. Se tivesse investido esse valor em ações, poderia ter R$ 9.600 hoje. Mas não se culpe, vamos planejar melhor daqui pra frente."
      },
      topCategories: {
        categories: ["Viagens", "Restaurantes", "Vestuário"],
        restaurantCount: 64,
        summary: "Top 3 categorias do seu cartão: Viagens, Restaurantes e Vestuário. Foram 64 restaurantes diferentes em um ano. Você é uma verdadeira exploradora gastronômica!"
      },
      bestInvestment: {
        name: "Small Caps FIA",
        return: 24.3,
        potentialDoubleGain: 6800,
        summary: "Seu melhor investimento foi o fundo Small Caps FIA, com impressionantes 24,3% de retorno. Se tivesse dobrado sua posição, seriam R$ 6.800 a mais no bolso. Vamos aumentar essa posição?"
      }
    }
  },
  
  client3: {
    clientId: "client3",
    clientName: "Marcos Santos",
    age: 58,
    riskProfile: "Conservador",
    lastUpdate: "2025-05-16",
    
    // Informações personalizadas do cliente
    personalInsights: {
      family: "Com seus dois filhos já formados e independentes, você e sua esposa Teresa estão entrando em uma nova fase da vida. Suas preocupações com a saúde dela foram consideradas em nosso planejamento, incluindo um fundo específico para despesas médicas não cobertas pelo plano de saúde.",
      passions: "Como amante de música clássica e frequentador assíduo do Teatro Municipal, temos uma surpresa para você! Nossa parceria com a Orquestra Sinfônica garante acesso VIP aos melhores concertos. E sabendo da sua paixão por vinhos chilenos, organizamos uma degustação exclusiva no próximo mês.",
      financialJourney: "Após 32 anos como engenheiro civil, sua aposentadoria em 2 anos marca o início de uma nova fase. O patrimônio que você construiu metodicamente ao longo dos anos é admirável - você está no top 5% dos nossos clientes em termos de disciplina de poupança.",
      goals: "Seu sonho de passar 6 meses por ano viajando após a aposentadoria está bem estruturado financeiramente. Também estamos monitorando aquela pequena vinícola no Sul que você demonstrou interesse em adquirir como projeto pós-carreira."
    },
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Renda Fixa": 68.5,
        "Fundos": 12.0,
        "Previdência": 10.0,
        "Ações BR": 5.3,
        "Internacional": 1.2,
        "Caixa": 3.0,
        "FIIs": 0.0
      },
      recommended: {
        "Renda Fixa": 60.0,
        "Fundos": 10.0,
        "Previdência": 10.0,
        "Ações BR": 5.0,
        "Internacional": 0.0,
        "Caixa": 5.0,
        "FIIs": 10.0
      },
      optimizationGain: 1.2,
      summary: "Sua carteira está adequadamente conservadora devido à proximidade da aposentadoria. Sugerimos reduzir ligeiramente a concentração em Renda Fixa (de 68,5% para 60%) e adicionar 10% em Fundos Imobiliários de tijolo, que podem oferecer renda passiva mensal com volatilidade controlada - ideal para complementar sua renda na aposentadoria."
    },
    
    // Projeção Futuro Próximo
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
    },
    
    // Reserva & Liquidez Dinâmica
    liquidity: {
      currentIdle: 136000,
      idealReserve: 90000,
      monthlyExpenses: 15000,
      idealMonths: 6,
      summary: "Você mantém R$ 136.000 em caixa, acima da reserva ideal de R$ 90.000 (6 meses de despesas). Isso reflete sua estratégia de alta liquidez para oportunidades de negócio, porém poderia alocar cerca de R$ 46.000 em produtos de maior rentabilidade com liquidez em D+1/D+3, como alguns fundos DI ou CDBs com liquidez diária."
    },
    
    // Gaps de Metas de Vida
    lifeGoals: {
      goals: [
        {
          name: "Imóvel",
          targetAmount: 1200000,
          currentAmount: 450000,
          progress: 37,
          timeframe: "3 anos",
          adjustmentNeeded: 8
        },
        {
          name: "Fundo para Educação",
          targetAmount: 700000,
          currentAmount: 120000,
          progress: 17,
          timeframe: "10 anos",
          adjustmentNeeded: 5
        },
        {
          name: "Reserva para Negócio",
          targetAmount: 500000,
          currentAmount: 300000,
          progress: 60,
          timeframe: "2 anos",
          adjustmentNeeded: 0
        }
      ],
      summary: "Sua meta para aquisição do imóvel está em 37% do caminho, precisando de um ajuste de +8% nos aportes mensais para ser atingida em 3 anos. O fundo para educação do futuro filho ainda está em estágio inicial (17%), mas com tempo suficiente para ajustes. A reserva para o negócio está bem encaminhada, com 60% da meta já alcançada."
    },
    
    // Curiosidades Wrapped
    wrapped: {
      biggestContribution: {
        amount: 180000,
        date: "2025-02-10"
      },
      longestPositiveStreak: 4,
      largestDrawdown: {
        percentage: 7.5,
        period: "Jan 2025 - Fev 2025"
      },
      mostProfitableAsset: {
        name: "BBAS3",
        return: 22.5
      },
      summary: "Seu maior aporte foi de R$ 180 mil em fevereiro/2025, demonstrando forte capacidade de poupança. Você manteve 4 meses consecutivos de rendimento positivo, mesmo durante a volatilidade do início do ano. A ação do Banco do Brasil (BBAS3) foi seu ativo mais rentável, com 22,5% de retorno."
    },
    
    // Comparativo Social
    socialComparison: {
      percentileRank: 15,
      returnVsPeers: 3.2,
      diversificationScore: 68,
      peerGroup: "Moderado Empreendedor",
      summary: "Você está entre os top 15% dos investidores com perfil Moderado Empreendedor, com retorno 3,2% acima da mediana. Sua pontuação de diversificação (68/100) reflete oportunidades para melhorar a distribuição entre classes de ativos, especialmente com a inclusão de investimentos internacionais."
    },
    
    // Insights de Sentimento
    sentiment: {
      assets: [
        {
          ticker: "BBAS3",
          sentiment: 78,
          recentNews: "Forte resultado trimestral e aumento na distribuição de dividendos",
          impact: 1.2
        },
        {
          ticker: "PETR4",
          sentiment: 42,
          recentNews: "Incertezas sobre política de preços e interferência governamental",
          impact: -0.8
        },
        {
          ticker: "IVVB11",
          sentiment: 65,
          recentNews: "Mercado americano mostrando resiliência apesar dos juros elevados",
          impact: 0.6
        }
      ],
      summary: "O sentimento positivo sobre BBAS3 contribuiu para um impacto de +1,2% em seu rendimento recente. Fique atento a PETR4, com sentimento negativo devido a incertezas políticas, contribuindo para uma queda de 0,8% neste ativo em seu portfólio."
    },
    
    // Recomendações Prioritárias
    recommendations: [
      {
        action: "Iniciar exposição internacional",
        impact: "Alto",
        urgency: "Médio",
        description: "Aloque 12% do portfólio em ETFs e fundos com exposição a mercados desenvolvidos, começando com IVVB11 (S&P 500) e EUSC (Small Caps Europeias)."
      },
      {
        action: "Implementar proteção patrimonial",
        impact: "Médio",
        urgency: "Alto",
        description: "Considerando seus planos familiares, recomendamos estruturar um seguro de vida com cobertura de pelo menos R$ 2 milhões e iniciar uma previdência privada VGBL para eficiência tributária."
      },
      {
        action: "Diversificar em FIIs",
        impact: "Médio",
        urgency: "Baixo",
        description: "Adicione uma alocação inicial de 5% em FIIs diversificados entre logística, lajes corporativas e recebíveis, objetivando renda passiva mensal e proteção inflacionária."
      }
    ],
    
    summary: "Priorize iniciar sua exposição internacional para melhorar a diversificação geográfica. Com urgência, implemente uma estratégia de proteção patrimonial, considerando seus planos familiares e novos empreendimentos. Para complementar sua estratégia, adicione FIIs ao seu portfólio quando conveniente.",
    
    // Insights financeiros adicionais
    financialInsights: {
      highestSpendingMonth: {
        month: "Março",
        amount: 42800,
        comparison: "equivalente a uma pequena reforma ou um carro popular 0km",
        summary: "Em março, você gastou R$ 42.800, o equivalente a um carro popular 0km. Foi seu recorde do ano, impulsionado principalmente pela viagem a Campos do Jordão e pelo investimento inicial no seu novo empreendimento."
      },
      wastedMoney: {
        category: "Assinaturas não utilizadas",
        amount: 5400,
        potentialGrowth: 6200,
        summary: "Com assinaturas e serviços subutilizados, você gastou R$ 5.400 no ano. Se tivesse direcionado esse valor para seu portfólio de ações, teria hoje aproximadamente R$ 6.200."
      },
      potentialSavings: {
        category: "Gastos com restaurantes premium",
        savingsPercentage: 15,
        monthlySavings: 1200,
        twentyYearProjection: 850000,
        goalRelation: "independência financeira",
        summary: "Reduzindo 15% dos seus gastos com restaurantes de alto padrão, você poderia investir R$ 1.200 adicionais por mês. Em 20 anos, isso representaria aproximadamente R$ 850.000, acelerando significativamente sua meta de independência financeira."
      }
    }
  },
  
  client4: {
    clientId: "client4",
    clientName: "Luis Fernando Souza Santos",
    age: 38,
    riskProfile: "Moderado",
    lastUpdate: "2025-05-18",
    
    // Informações personalizadas do cliente
    personalInsights: {
      family: "Sabemos que você e Gisele estão planejando aumentar a família nos próximos 3 anos. Preparamos uma projeção financeira considerando os custos com educação e saúde para o novo membro da família. Também notamos seu compromisso com os cuidados médicos de sua mãe, algo que honramos e levamos em conta no seu planejamento.",
      passions: "Como torcedor fiel do Corinthians e praticante de tênis e surf, você mantém um estilo de vida ativo que valoriza equilíbrio. Sua viagem pela rota do Beaujolais na França revelou seu gosto por vinhos refinados - algo que nosso clube de investidores em vinícolas pode interessar. E notamos que sushi está entre suas preferências culinárias, mas comida coreana não faz parte do seu radar.",
      financialJourney: "Como empreendedor no mercado financeiro, você entende os desafios e oportunidades do setor. Seu patrimônio atual de R$ 1,7 milhão e renda mensal de R$ 15 mil demonstram sua capacidade de construção de riqueza. Sua preferência por manter alta liquidez faz sentido neste momento de sua jornada empresarial.",
      goals: "Seu objetivo de comprar uma casa está em nosso radar, e estamos monitorando o mercado para as melhores oportunidades. Admiramos sua meta de visitar um número de países equivalente à sua idade - uma forma inspiradora de combinar crescimento pessoal e descoberta. Nossa equipe pode auxiliar com recomendações personalizadas para seus próximos destinos."
    },
    
    // Alocação & Diversificação 360°
    allocation: {
      current: {
        "Renda Fixa": 42.5,
        "Ações BR": 30.8,
        "Fundos": 18.7,
        "Caixa": 8.0,
        "Internacional": 0.0,
        "FIIs": 0.0,
        "Previdência": 0.0
      },
      recommended: {
        "Renda Fixa": 35.0,
        "Ações BR": 25.0,
        "Fundos": 15.0,
        "Caixa": 5.0,
        "Internacional": 12.0,
        "FIIs": 5.0,
        "Previdência": 3.0
      },
      optimizationGain: 2.1,
      summary: "Com seu perfil de empreendedor no mercado financeiro, sua carteira atual está bem estruturada, porém carece de diversificação internacional e exposição ao setor imobiliário. A adição de 12% em investimentos internacionais e 5% em FIIs traria proteção adicional e diversificação geográfica, especialmente importante considerando sua futura expansão familiar e meta de aquisição imobiliária."
    },
    
    // Projeção Futuro Próximo
    projection: {
      currentTotal: 1700000,
      monthlyContribution: 15000,
      scenarios: {
        base: {
          "1 ano": 1950000,
          "3 anos": 2560000,
          "5 anos": 3320000
        },
        stress: {
          "1 ano": 1820000,
          "3 anos": 2250000,
          "5 anos": 2780000
        }
      },
      summary: "Com sua capacidade de investir R$ 15.000 mensalmente e o crescimento do seu novo empreendimento, seu patrimônio deve alcançar R$ 3,32 milhões em 5 anos no cenário base. Mesmo no cenário de stress, ultrapassaria R$ 2,78 milhões, demonstrando resiliência. Com a realocação sugerida, o potencial de crescimento seria ainda maior."
    },
    
    // Reserva & Liquidez Dinâmica
    liquidity: {
      currentIdle: 136000,
      idealReserve: 90000,
      monthlyExpenses: 15000,
      idealMonths: 6,
      summary: "Você mantém R$ 136.000 em caixa, acima da reserva ideal de R$ 90.000 (6 meses de despesas). Isso reflete sua estratégia de alta liquidez para oportunidades de negócio, porém poderia alocar cerca de R$ 46.000 em produtos de maior rentabilidade com liquidez em D+1/D+3, como alguns fundos DI ou CDBs com liquidez diária."
    },
    
    // Gaps de Metas de Vida
    lifeGoals: {
      goals: [
        {
          name: "Imóvel",
          targetAmount: 1200000,
          currentAmount: 450000,
          progress: 37,
          timeframe: "3 anos",
          adjustmentNeeded: 8
        },
        {
          name: "Fundo para Educação",
          targetAmount: 700000,
          currentAmount: 120000,
          progress: 17,
          timeframe: "10 anos",
          adjustmentNeeded: 5
        },
        {
          name: "Reserva para Negócio",
          targetAmount: 500000,
          currentAmount: 300000,
          progress: 60,
          timeframe: "2 anos",
          adjustmentNeeded: 0
        }
      ],
      summary: "Sua meta para aquisição do imóvel está em 37% do caminho, precisando de um ajuste de +8% nos aportes mensais para ser atingida em 3 anos. O fundo para educação do futuro filho ainda está em estágio inicial (17%), mas com tempo suficiente para ajustes. A reserva para o negócio está bem encaminhada, com 60% da meta já alcançada."
    },
    
    // Curiosidades Wrapped
    wrapped: {
      biggestContribution: {
        amount: 180000,
        date: "2025-02-10"
      },
      longestPositiveStreak: 4,
      largestDrawdown: {
        percentage: 7.5,
        period: "Jan 2025 - Fev 2025"
      },
      mostProfitableAsset: {
        name: "BBAS3",
        return: 22.5
      },
      summary: "Seu maior aporte foi de R$ 180 mil em fevereiro/2025, demonstrando forte capacidade de poupança. Você manteve 4 meses consecutivos de rendimento positivo, mesmo durante a volatilidade do início do ano. A ação do Banco do Brasil (BBAS3) foi seu ativo mais rentável, com 22,5% de retorno."
    },
    
    // Comparativo Social
    socialComparison: {
      percentileRank: 15,
      returnVsPeers: 3.2,
      diversificationScore: 68,
      peerGroup: "Moderado Empreendedor",
      summary: "Você está entre os top 15% dos investidores com perfil Moderado Empreendedor, com retorno 3,2% acima da mediana. Sua pontuação de diversificação (68/100) reflete oportunidades para melhorar a distribuição entre classes de ativos, especialmente com a inclusão de investimentos internacionais."
    },
    
    // Insights de Sentimento
    sentiment: {
      assets: [
        {
          ticker: "BBAS3",
          sentiment: 78,
          recentNews: "Forte resultado trimestral e aumento na distribuição de dividendos",
          impact: 1.2
        },
        {
          ticker: "PETR4",
          sentiment: 42,
          recentNews: "Incertezas sobre política de preços e interferência governamental",
          impact: -0.8
        },
        {
          ticker: "IVVB11",
          sentiment: 65,
          recentNews: "Mercado americano mostrando resiliência apesar dos juros elevados",
          impact: 0.6
        }
      ],
      summary: "O sentimento positivo sobre BBAS3 contribuiu para um impacto de +1,2% em seu rendimento recente. Fique atento a PETR4, com sentimento negativo devido a incertezas políticas, contribuindo para uma queda de 0,8% neste ativo em seu portfólio."
    },
    
    // Recomendações Prioritárias
    recommendations: [
      {
        action: "Iniciar exposição internacional",
        impact: "Alto",
        urgency: "Médio",
        description: "Aloque 12% do portfólio em ETFs e fundos com exposição a mercados desenvolvidos, começando com IVVB11 (S&P 500) e EUSC (Small Caps Europeias)."
      },
      {
        action: "Implementar proteção patrimonial",
        impact: "Médio",
        urgency: "Alto",
        description: "Considerando seus planos familiares, recomendamos estruturar um seguro de vida com cobertura de pelo menos R$ 2 milhões e iniciar uma previdência privada VGBL para eficiência tributária."
      },
      {
        action: "Diversificar em FIIs",
        impact: "Médio",
        urgency: "Baixo",
        description: "Adicione uma alocação inicial de 5% em FIIs diversificados entre logística, lajes corporativas e recebíveis, objetivando renda passiva mensal e proteção inflacionária."
      }
    ],
    
    summary: "Priorize iniciar sua exposição internacional para melhorar a diversificação geográfica. Com urgência, implemente uma estratégia de proteção patrimonial, considerando seus planos familiares e novos empreendimentos. Para complementar sua estratégia, adicione FIIs ao seu portfólio quando conveniente.",
    
    // Insights financeiros adicionais
    financialInsights: {
      highestSpendingMonth: {
        month: "Março",
        amount: 42800,
        comparison: "equivalente a uma pequena reforma ou um carro popular 0km",
        summary: "Em março, você gastou R$ 42.800, o equivalente a um carro popular 0km. Foi seu recorde do ano, impulsionado principalmente pela viagem a Campos do Jordão e pelo investimento inicial no seu novo empreendimento."
      },
      wastedMoney: {
        category: "Assinaturas não utilizadas",
        amount: 5400,
        potentialGrowth: 6200,
        summary: "Com assinaturas e serviços subutilizados, você gastou R$ 5.400 no ano. Se tivesse direcionado esse valor para seu portfólio de ações, teria hoje aproximadamente R$ 6.200."
      },
      potentialSavings: {
        category: "Gastos com restaurantes premium",
        savingsPercentage: 15,
        monthlySavings: 1200,
        twentyYearProjection: 850000,
        goalRelation: "independência financeira",
        summary: "Reduzindo 15% dos seus gastos com restaurantes de alto padrão, você poderia investir R$ 1.200 adicionais por mês. Em 20 anos, isso representaria aproximadamente R$ 850.000, acelerando significativamente sua meta de independência financeira."
      }
    }
  }
};
