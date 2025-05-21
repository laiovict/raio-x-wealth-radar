
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface RiskProfileProps {
  riskScore: number;
  riskLabel: string;
}

const RiskProfile: React.FC<RiskProfileProps> = ({ 
  riskScore = 50, 
  riskLabel = 'Moderado' 
}) => {
  // Get appropriate color based on risk score
  const getRiskColor = (score: number): string => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <h3 className="text-md font-medium text-indigo-300">
          Perfil de Risco
        </h3>
        <span className="text-white font-medium">
          {riskLabel}
        </span>
      </div>
      <Progress 
        value={riskScore} 
        max={100}
        className="h-2"
        indicatorClassName={getRiskColor(riskScore)}
      />
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>Conservador</span>
        <span>Moderado</span>
        <span>Arrojado</span>
      </div>
    </div>
  );
};

export default RiskProfile;
