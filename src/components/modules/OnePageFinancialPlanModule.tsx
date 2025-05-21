import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import LoadingView from './financialPlan/LoadingView';
import PlanSection from './financialPlan/PlanSection';
import PlanHeader from './financialPlan/PlanHeader';
import PlanFooter from './financialPlan/PlanFooter';
import { usePlanData } from './financialPlan/usePlanData';
import { BaseModuleProps, ModuleDataState } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { DataSourceType } from '@/types/raioXTypes';

// Define the type for financial plan data
interface FinancialPlanData {
  lastUpdated: Date;
  sections: {
    id: string;
    title: string;
    icon: string;
    summary: string;
    details: string;
    actions?: string[];
    dataSource?: DataSourceType;
  }[];
}

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
    lastUpdated: new Date(), 
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
              actions={section.actions}
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
      details: `Seu patrimônio é composto principalmente por ${portfolioSummary?.fixed_income_representation ? formatPercentage(portfolioSummary.fixed_income_representation) : '0%'} em renda fixa e ${portfolioSummary?.stocks_representation ? formatPercentage(portfolioSummary.stocks_representation) : '0%'} em renda variável.`,
      dataSource: 'supabase'
    });
  }
  
  // Investment Strategy Section - include if we have allocation data
  if (data.allocation) {
    sections.push({
      id: 'investment-strategy',
      title: 'Estratégia de Investimento',
      icon: 'trending-up',
      summary: 'Alocação atual vs. recomendada',
      details: `Sua alocação atual prioriza ${Object.entries(data.allocation.current)
        .filter(([key]) => key !== 'total')
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([key]) => key)
        .join(' e ')}.`,
      dataSource: data.allocation.dataSource || 'supabase'
    });
  }
  
  // Dividend Analysis - include if we have dividend history
  if (dividendHistory && dividendHistory.length > 0) {
    sections.push({
      id: 'dividend-analysis',
      title: 'Análise de Dividendos',
      icon: 'dollar-sign',
      summary: 'Fluxo constante de renda passiva',
      details: `Você recebeu dividendos de ${new Set(dividendHistory.map(d => d.asset)).size} ativos diferentes nos últimos 12 meses.`,
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
      details: 'Com base na sua renda atual e padrão de poupança, estamos analisando a sua trajetória para a independência financeira.',
      dataSource: financialSummary.dataSource || 'supabase'
    });
  }
  
  // Stocks Analysis - include if we have stocks data
  if (stocks && stocks.length > 0) {
    sections.push({
      id: 'stocks-analysis',
      title: 'Análise de Ações',
      icon: 'activity',
      summary: `Carteira com ${stocks.length} ações`,
      details: `Principais posições em ${stocks.slice(0, 3).map(s => s.asset).join(', ')}.`,
      dataSource: 'supabase'
    });
  }
  
  // If we have sections, return a structured financial plan
  if (sections.length > 0) {
    return {
      lastUpdated: new Date(),
      sections
    };
  }
  
  // If we couldn't build any meaningful sections, return null to use synthetic data
  return null;
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
