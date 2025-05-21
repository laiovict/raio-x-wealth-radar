
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRaioX } from "@/context/RaioXContext";
import { useFeatureFlags } from "@/context/FeatureFlagContext";

// Import new profile components
import ProfileHeader from './profile/ProfileHeader';
import ProfileSection from './profile/ProfileSection';
import RiskProfile from './profile/RiskProfile';

// Import new profile hooks
import useProfileSections from '@/hooks/profile/useProfileSections';

interface PersonalInsightsModuleProps {
  fullWidth?: boolean;
}

const PersonalInsightsModule: React.FC<PersonalInsightsModuleProps> = ({ fullWidth = false }) => {
  const { data, clientSummary, selectedClient } = useRaioX();
  const { flags } = useFeatureFlags();

  // Determine data source for the component
  const dataSource = clientSummary?.dataSource || 'synthetic';
  
  // Skip the default summary for better UX when no real data is available
  const defaultSummary = '';

  // Use new hook to extract sections
  const { sections } = useProfileSections(clientSummary, defaultSummary);
  
  // Calculate risk profile
  const riskProfile = useMemo(() => {
    // In a real-world scenario, this would be calculated based on actual client data
    // For now, we're using a simplified implementation
    const conservativeTerms = ['conservador', 'segurança', 'preservação', 'baixo risco'];
    const aggressiveTerms = ['arrojado', 'agressivo', 'alto risco', 'crescimento'];
    
    let score = 50; // Default to moderate
    let label = 'Moderado';
    
    if (clientSummary?.summary) {
      const summary = clientSummary.summary.toLowerCase();
      
      // Adjust score based on terms found in summary
      conservativeTerms.forEach(term => {
        if (summary.includes(term)) score -= 10;
      });
      
      aggressiveTerms.forEach(term => {
        if (summary.includes(term)) score += 10;
      });
      
      // Ensure score stays within bounds
      score = Math.max(10, Math.min(score, 90));
      
      // Set appropriate label
      if (score < 30) label = 'Conservador';
      else if (score > 70) label = 'Arrojado';
    }
    
    return { score, label };
  }, [clientSummary]);

  // Don't render anything if there's no real client data and no selected client
  if ((!clientSummary || !clientSummary.summary) && (!data.clientName || data.clientName === "Cliente Padrão") && !selectedClient) {
    return null;
  }
  
  // If we have no sections (meaning no real or synthetic data), don't render the component
  if (sections.length === 0) {
    return null;
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism h-full`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Insights Personalizados
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Profile Header Component */}
        <ProfileHeader
          clientSummary={clientSummary}
          clientName={data.clientName !== "Cliente Padrão" ? data.clientName : ""}
          dataSource={dataSource}
        />
        
        {/* Risk Profile Component - Only show if we have real data */}
        {clientSummary?.summary && (
          <RiskProfile
            riskScore={riskProfile.score}
            riskLabel={riskProfile.label}
          />
        )}
        
        {/* Profile Sections */}
        <div className="space-y-4 mt-4">
          {sections.map((section, index) => (
            <ProfileSection
              key={index}
              title={section.title}
              content={section.content}
              tags={section.tags}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInsightsModule;
