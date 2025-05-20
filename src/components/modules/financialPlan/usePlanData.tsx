
import { useState, useMemo } from 'react';
import { Clock, TrendingUp, Shield } from "lucide-react";
import { Target, FileClock, Users } from './CustomIcons';
import { useRaioX } from "@/context/RaioXContext";
import { toNumber } from '@/utils/typeConversionHelpers';
import { calculateInvestmentData, createInvestmentSummary } from './utils';
import { formatCurrency } from '@/utils/formattingUtils';
import { FinancialPlanData, InvestmentData } from './types';
import { DataSourceType } from '@/types/raioXTypes';

export const usePlanData = () => {
  const { portfolioSummary, profitability, financialSummary } = useRaioX();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "cashFlow": true,
    "investments": false,
    "goals": false,
    "protection": false,
    "taxes": false,
    "estate": false
  });

  // Toggle a section's expanded state
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate investment data from portfolio summary
  const investmentData = useMemo(() => {
    return calculateInvestmentData(portfolioSummary, profitability);
  }, [portfolioSummary, profitability]);

  // Fix variable assignments for financial summary
  const totalAssets = toNumber(financialSummary?.totalAssets);
  const totalLiabilities = toNumber(financialSummary?.totalLiabilities);
  const netWorth = totalAssets - totalLiabilities;

  const monthlyIncome = toNumber(financialSummary?.monthlyIncome);
  const monthlyExpenses = toNumber(financialSummary?.monthlyExpenses);
  const monthlySavings = monthlyIncome - monthlyExpenses;

  // Generate data for the financial plan
  const financialPlan: FinancialPlanData = {
    lastUpdated: "2023-05-15T10:30:00Z",
    sections: [
      {
        id: "cashFlow",
        title: "Fluxo de Caixa",
        icon: <Clock className="h-5 w-5 text-green-500" />,
        summary: "Renda mensal líquida de R$ 12.500 com despesas fixas de R$ 8.750 (70% da renda).",
        dataSource: (investmentData.dataSource || 'synthetic') as DataSourceType,
        details: [
          { label: "Receita total", value: "R$ 15.000/mês" },
          { label: "Impostos", value: "R$ 2.500 (16,7%)" },
          { label: "Despesas fixas", value: "R$ 8.750 (70% da receita líquida)" },
          { label: "Despesas variáveis", value: "R$ 2.500 (20% da receita líquida)" },
          { label: "Poupança atual", value: "R$ 1.250 (10% da receita líquida)" }
        ],
        actions: [
          { text: "Aumentar taxa de poupança para 20%" },
          { text: "Reduzir gastos com streaming em 30%" },
          { text: "Revisar plano de telefonia" }
        ]
      },
      {
        id: "investments",
        title: "Investimentos",
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
        summary: createInvestmentSummary(investmentData),
        dataSource: (investmentData.dataSource || 'synthetic') as DataSourceType,
        details: [
          { label: "Valor total investido", value: formatCurrency(investmentData.totalValue.toString()) },
          { label: "Renda fixa", value: `${formatCurrency(investmentData.fixedIncomeValue.toString())} (${Math.round(investmentData.fixedIncomePercentage)}%)` },
          { label: "Renda variável", value: `${formatCurrency(investmentData.stocksValue.toString())} (${Math.round(investmentData.stocksPercentage)}%)` },
          { label: "Fundos de Investimento", value: `${formatCurrency(investmentData.fundsValue.toString())} (${Math.round(investmentData.fundsPercentage)}%)` },
          { label: "FIIs", value: `${formatCurrency(investmentData.fiisValue.toString())} (${Math.round(investmentData.fiisPercentage)}%)` },
          { label: "Internacional", value: `${formatCurrency(investmentData.internationalValue.toString())} (${Math.round(investmentData.internationalPercentage)}%)` },
          ...(investmentData.alternativesPercentage > 0 ? [{ label: "Alternativos", value: `${formatCurrency(investmentData.alternativesValue.toString())} (${Math.round(investmentData.alternativesPercentage)}%)` }] : []),
          { label: "Rentabilidade YTD", value: `${investmentData.ytdReturn.toFixed(1)}% (vs. benchmark ${investmentData.benchmarkReturn}%)` }
        ],
        actions: [
          { text: "Rebalancear carteira para 50/35/15" },
          { text: "Diversificar exposição internacional" },
          { text: "Avaliar fundos de dividendos" }
        ]
      },
      {
        id: "goals",
        title: "Objetivos Financeiros",
        icon: <Target className="h-5 w-5 text-purple-500" />,
        summary: "3 objetivos principais definidos, com gap de 35% no financeiro para aposentadoria.",
        dataSource: 'synthetic' as DataSourceType,
        details: [
          { 
            label: "Aposentadoria", 
            value: `Meta: R$ 4,5M (2043) / Atual: ${formatCurrency((investmentData.totalValue * 0.6).toString())}`, 
            progress: 35
          },
          { 
            label: "Educação filhos", 
            value: `Meta: R$ 500.000 (2030) / Atual: ${formatCurrency((investmentData.totalValue * 0.1).toString())}`, 
            progress: 60 
          },
          { 
            label: "Imóvel de veraneio", 
            value: `Meta: R$ 800.000 (2027) / Atual: ${formatCurrency((investmentData.totalValue * 0.05).toString())}`, 
            progress: 45
          }
        ],
        actions: [
          { text: "Aumentar aportes para aposentadoria em R$ 1.500/mês" },
          { text: "Revisar estratégia para objetivo de curto prazo" }
        ]
      },
      {
        id: "protection",
        title: "Proteção Patrimonial",
        icon: <Shield className="h-5 w-5 text-red-500" />,
        summary: "Cobertura básica de seguros, com gaps em seguro de vida e previdência.",
        dataSource: 'synthetic' as DataSourceType,
        details: [
          { label: "Seguro de vida", value: "R$ 500.000 (recomendado: R$ 1,2M)" },
          { label: "Seguro saúde", value: "Plano empresarial completo" },
          { label: "Seguro patrimonial", value: `Residência segurada (80% do valor)` },
          { label: "Previdência privada", value: "Não possui" }
        ],
        actions: [
          { text: "Contratar seguro de vida complementar" },
          { text: "Avaliar PGBL/VGBL com benefício fiscal" },
          { text: "Revisar coberturas do seguro residencial" }
        ]
      },
      {
        id: "taxes",
        title: "Planejamento Tributário",
        icon: <FileClock className="h-5 w-5 text-amber-500" />,
        summary: "Potencial economia de R$ 9.500/ano com otimizações tributárias.",
        dataSource: 'synthetic' as DataSourceType,
        details: [
          { label: "IR pessoa física", value: "Alíquota efetiva: 15,5%" },
          { label: "Declaração completa", value: "Sim (mais vantajosa)" },
          { label: "Despesas dedutíveis", value: "R$ 28.000/ano" },
          { label: "Ganhos isentos", value: "R$ 35.000/ano" }
        ],
        actions: [
          { text: "Avaliar uso de holding familiar" },
          { text: "Otimizar declaração com despesas médicas" },
          { text: "Revisar estratégia de previdência privada" }
        ]
      },
      {
        id: "estate",
        title: "Planejamento Sucessório",
        icon: <Users className="h-5 w-5 text-indigo-500" />,
        summary: "Sem planejamento sucessório formal estabelecido.",
        dataSource: 'synthetic' as DataSourceType,
        details: [
          { label: "Testamento", value: "Não possui" },
          { label: "Holding familiar", value: "Não possui" },
          { label: "Doação em vida", value: "Não realizada" },
          { label: "Seguro vida com beneficiários", value: "Parcial (R$ 500.000)" }
        ],
        actions: [
          { text: "Elaborar testamento" },
          { text: "Consultar sobre planejamento sucessório" },
          { text: "Revisar beneficiários do seguro" }
        ]
      }
    ]
  };

  return {
    financialPlan,
    expandedSections,
    toggleSection
  };
};
