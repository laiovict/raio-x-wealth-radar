
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import LoadingView from './financialPlan/LoadingView';
import PlanSection from './financialPlan/PlanSection';
import PlanHeader from './financialPlan/PlanHeader';
import PlanFooter from './financialPlan/PlanFooter';
import { usePlanData } from './financialPlan/usePlanData';
import { BaseModuleProps, ModuleDataState, FinancialPlanData, DetailItem, ActionItem } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { DataSourceType } from '@/types/raioXTypes';

// Extending the BaseModuleProps interface ensures consistency across modules
interface OnePageFinancialPlanModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<FinancialPlanData>;
}

// Component without safe data
const OnePageFinancialPlanModuleBase = ({ 
  fullWidth = false, 
  dataState 
}: OnePageFinancialPlanModuleProps) => {
  const { isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  
  // Use the financial plan data from the dataState
  const financialPlan = dataState?.data || { 
    lastUpdated: new Date().toISOString(), 
    sections: [] 
  };
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  if (isAIAnalysisLoading) {
    return <LoadingView fullWidth={fullWidth} />;
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <PlanHeader 
        lastUpdated={financialPlan.lastUpdated}
        onRefresh={refreshAIAnalysis}
        dataSource={dataState?.dataSource || 'synthetic'}
      />
      <CardContent>
        <div className="space-y-4">
          {financialPlan.sections.map((section) => (
            <PlanSection
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              summary={section.summary}
              dataSource={section.dataSource || dataState?.dataSource || 'synthetic'}
              details={section.details}
              actions={section.actions || []}
              isExpanded={expandedSections[section.id] || false}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
        
        <PlanFooter />
      </CardContent>
    </Card>
  );
};

// Helper functions for formatting
const formatCurrency = (value: any): string => {
  const numValue = Number(value);
  if (isNaN(numValue)) return 'R$ 0';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue);
};

const formatPercentage = (value: any): string => {
  const numValue = Number(value);
  if (isNaN(numValue)) return '0%';
  return `${numValue.toFixed(1)}%`;
};

// Get real data function for withSafeData HOC
const getRealFinancialPlanData = (props: OnePageFinancialPlanModuleProps): FinancialPlanData | null => {
  const { data, portfolioSummary, clientSummary, dividendHistory, stocks, financialSummary } = useRaioX();
  
  // If we don't have any real data, return null to use synthetic data instead
  if (!portfolioSummary && !financialSummary && !data.stocks?.length) {
    return null;
  }
  
  // Otherwise, construct real financial plan using available data
  const sections = [];
  
  // Financial Overview Section - always included if we have portfolio summary
  if (portfolioSummary || financialSummary) {
    sections.push({
      id: 'financial-overview',
      title: 'Visão Geral Financeira',
      icon: 'chart-bar',
      summary: `Patrimônio total de ${financialSummary?.totalAssets ? formatCurrency(financialSummary.totalAssets) : formatCurrency(portfolioSummary?.total_portfolio_value || 0)}`,
      details: [
        {
          label: 'Patrimônio Total',
          value: `${formatCurrency(financialSummary?.totalAssets || portfolioSummary?.total_portfolio_value || 0)}`
        },
        {
          label: 'Renda Fixa',
          value: `${formatPercentage(portfolioSummary?.fixed_income_representation || 0)}`
        },
        {
          label: 'Renda Variável',
          value: `${formatPercentage(portfolioSummary?.stocks_representation || 0)}`
        }
      ],
      dataSource: 'supabase'
    });
  }
  
  // Investment Strategy Section - include if we have allocation data
  if (data.allocation) {
    const allocationKeys = Object.entries(data.allocation.current)
      .filter(([key]) => key !== 'total')
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([key]) => key);
    
    sections.push({
      id: 'investment-strategy',
      title: 'Estratégia de Investimento',
      icon: 'trending-up',
      summary: 'Alocação atual vs. recomendada',
      details: allocationKeys.map(key => ({
        label: key,
        value: `${formatPercentage(data.allocation.current[key] || 0)}`
      })),
      dataSource: data.allocation.dataSource || 'supabase'
    });
  }
  
  // Dividend Analysis - include if we have dividend history
  if (dividendHistory && dividendHistory.length > 0) {
    const uniqueAssets = new Set(dividendHistory.map(d => d.asset)).size;
    const totalDividends = dividendHistory.reduce((sum, d) => sum + Number(d.value), 0);
    
    sections.push({
      id: 'dividend-analysis',
      title: 'Análise de Dividendos',
      icon: 'dollar-sign',
      summary: 'Fluxo constante de renda passiva',
      details: [
        {
          label: 'Total Recebido (12m)',
          value: formatCurrency(totalDividends)
        },
        {
          label: 'Quantidade de Ativos',
          value: `${uniqueAssets} ativos`
        },
        {
          label: 'Média Mensal',
          value: formatCurrency(totalDividends / 12)
        }
      ],
      dataSource: 'supabase'
    });
  }
  
  // Retirement Planning - include if we have financial summary with income data
  if (financialSummary?.monthlyIncome) {
    sections.push({
      id: 'retirement-planning',
      title: 'Planejamento de Aposentadoria',
      icon: 'calendar',
      summary: 'Preparação para o futuro financeiro',
      details: [
        {
          label: 'Renda Mensal Atual',
          value: formatCurrency(financialSummary.monthlyIncome)
        },
        {
          label: 'Patrimônio Atual',
          value: formatCurrency(financialSummary.totalAssets)
        },
        {
          label: 'Taxa de Poupança',
          value: `${formatPercentage((financialSummary.savingsRate || 0) * 100)}`
        }
      ],
      dataSource: financialSummary.dataSource || 'supabase'
    });
  }
  
  // Stocks Analysis - include if we have stocks data
  if (stocks && stocks.length > 0) {
    const topStocks = stocks.slice(0, 3).map(s => s.asset).join(', ');
    const totalValue = stocks.reduce((sum, s) => sum + Number(s.total_value || 0), 0);
    
    sections.push({
      id: 'stocks-analysis',
      title: 'Análise de Ações',
      icon: 'activity',
      summary: `Carteira com ${stocks.length} ações`,
      details: [
        {
          label: 'Valor Total',
          value: formatCurrency(totalValue)
        },
        {
          label: 'Principais Posições',
          value: topStocks
        },
        {
          label: 'Diversificação',
          value: `${stocks.length} ativos diferentes`
        }
      ],
      dataSource: 'supabase'
    });
  }
  
  // If we have sections, return a structured financial plan
  if (sections.length > 0) {
    return {
      lastUpdated: new Date().toISOString(),
      sections
    };
  }
  
  // If we couldn't build any meaningful sections, return null to use synthetic data
  return null;
};

// Get synthetic data function for withSafeData HOC
const getSyntheticFinancialPlanData = (props: OnePageFinancialPlanModuleProps): FinancialPlanData => {
  // Example data from usePlanData
  const { financialPlan } = usePlanData();
  return financialPlan;
};

// Create the safe module using the HOC
const OnePageFinancialPlanModule = withSafeData(
  OnePageFinancialPlanModuleBase,
  getRealFinancialPlanData,
  getSyntheticFinancialPlanData,
  'supabase'
);

export default OnePageFinancialPlanModule;
