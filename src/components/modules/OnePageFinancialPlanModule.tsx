
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import LoadingView from './financialPlan/LoadingView';
import PlanSection from './financialPlan/PlanSection';
import PlanHeader from './financialPlan/PlanHeader';
import PlanFooter from './financialPlan/PlanFooter';
import { usePlanData } from './financialPlan/usePlanData';

interface OnePageFinancialPlanModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
}

const OnePageFinancialPlanModule = ({ fullWidth = false, useSyntheticData = false }: OnePageFinancialPlanModuleProps) => {
  const { isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const { financialPlan, expandedSections, toggleSection } = usePlanData();

  if (isAIAnalysisLoading) {
    return <LoadingView fullWidth={fullWidth} />;
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <PlanHeader 
        lastUpdated={financialPlan.lastUpdated}
        onRefresh={refreshAIAnalysis}
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
              dataSource={section.dataSource}
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

export default OnePageFinancialPlanModule;
