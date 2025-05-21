
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import LoadingView from './financialPlan/LoadingView';
import PlanSection from './financialPlan/PlanSection';
import PlanHeader from './financialPlan/PlanHeader';
import PlanFooter from './financialPlan/PlanFooter';
import { usePlanData } from './financialPlan/usePlanData';
import { BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';

// Extending the BaseModuleProps interface ensures consistency across modules
interface OnePageFinancialPlanModuleProps extends BaseModuleProps {
  // Any additional props specific to this module
}

// Component without safe data
const OnePageFinancialPlanModuleBase = ({ 
  fullWidth = false, 
  dataState 
}: OnePageFinancialPlanModuleProps & { 
  dataState: any // We'll type this properly in a complete implementation
}) => {
  const { isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const { financialPlan, expandedSections, toggleSection } = usePlanData(dataState.isSynthetic);

  if (isAIAnalysisLoading) {
    return <LoadingView fullWidth={fullWidth} />;
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <PlanHeader 
        lastUpdated={financialPlan.lastUpdated}
        onRefresh={refreshAIAnalysis}
        dataSource={dataState.dataSource}
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
              dataSource={section.dataSource || dataState.dataSource}
              details={section.details}
              actions={section.actions}
              isExpanded={expandedSections[section.id]}
              onToggle={toggleSection}
            />
          ))}
        </div>
        
        <PlanFooter />
      </CardContent>
    </Card>
  );
};

// Get real data function for withSafeData HOC
const getRealFinancialPlanData = (props: OnePageFinancialPlanModuleProps) => {
  // Here we would extract real data from the RaioX context
  // For now just return null as a placeholder
  return null;
};

// Get synthetic data function for withSafeData HOC
const getSyntheticFinancialPlanData = (props: OnePageFinancialPlanModuleProps) => {
  // Return synthetic data
  return {
    // Synthetic data structure would go here
    isSynthetic: true
  };
};

// Create the safe module using the HOC
const OnePageFinancialPlanModule = withSafeData(
  OnePageFinancialPlanModuleBase,
  getRealFinancialPlanData,
  getSyntheticFinancialPlanData
);

export default OnePageFinancialPlanModule;
