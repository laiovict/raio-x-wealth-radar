
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CalendlyWidget from './CalendlyWidget';

interface TopControlsProps {
  isAdvisor: boolean;
  onOpenFinanceToggle: () => void;
  hasOpenFinance?: boolean;
}

const TopControls = ({ isAdvisor, onOpenFinanceToggle, hasOpenFinance = false }: TopControlsProps) => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  
  const handleCalendlyClick = () => {
    setIsCalendlyOpen(true);
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${hasOpenFinance 
            ? 'bg-green-900/20 border border-green-500/30' 
            : 'bg-white/5 border border-white/10'}`}
        >
          <Shield className={`h-4 w-4 ${hasOpenFinance ? 'text-green-400' : 'text-gray-300'}`} />
          <span className={`text-sm ${hasOpenFinance ? 'text-green-400' : 'text-gray-300'}`}>Open Finance</span>
          <Switch 
            checked={hasOpenFinance}
            onCheckedChange={onOpenFinanceToggle}
            className={`data-[state=checked]:bg-green-500`}
          />
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="bg-white/5 border border-white/10 hover:bg-white/10 text-blue-300 flex gap-2 rounded-full px-4"
        onClick={handleCalendlyClick}
      >
        <Calendar className="h-4 w-4" />
        <span>Agendar Consultoria Humana</span>
      </Button>
      
      <CalendlyWidget 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </div>
  );
};

export default TopControls;
