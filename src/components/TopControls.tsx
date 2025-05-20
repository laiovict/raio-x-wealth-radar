
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, ExternalLink, Lock, Shield } from "lucide-react";
import { useRaioX } from "@/context/RaioXContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface TopControlsProps {
  isAdvisor: boolean;
  onOpenFinanceToggle: () => void;
}

const TopControls = ({ isAdvisor, onOpenFinanceToggle }: TopControlsProps) => {
  const { hasOpenFinance } = useRaioX();
  const { t } = useLanguage();
  const [isOpenFinanceEnabled, setIsOpenFinanceEnabled] = useState(hasOpenFinance);

  const handleOpenFinanceToggle = () => {
    setIsOpenFinanceEnabled(!isOpenFinanceEnabled);
    onOpenFinanceToggle();
    
    if (!isOpenFinanceEnabled) {
      toast({
        title: "Open Finance",
        description: "Ativando Open Finance...",
      });
    } else {
      toast({
        title: "Open Finance",
        description: "Open Finance desativado",
        variant: "destructive",
      });
    }
  };

  const handleCalendlyClick = () => {
    window.open("https://calendly.com/reinvent", "_blank");
  };

  const handleAPIAccessClick = () => {
    window.open("/api-docs", "_blank");
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-2 glass-morphism backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
        <div className="flex items-center space-x-2">
          {isOpenFinanceEnabled ? (
            <Shield className="h-5 w-5 text-green-400" />
          ) : (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
          <Label htmlFor="open-finance-mode" className="text-white">Open Finance</Label>
        </div>
        <Switch
          id="open-finance-mode"
          checked={isOpenFinanceEnabled}
          onCheckedChange={handleOpenFinanceToggle}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
          onClick={handleCalendlyClick}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Assessoria
        </Button>
        
        {isAdvisor && (
          <Button 
            variant="outline" 
            className="border-purple-500 text-purple-400 hover:bg-purple-900/30"
            onClick={handleAPIAccessClick}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Acesso à API
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopControls;
