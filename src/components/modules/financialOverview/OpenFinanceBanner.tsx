
import React from 'react';
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const OpenFinanceBanner = () => {
  return (
    <div className="p-4 border border-blue-500/20 rounded-lg bg-blue-900/10">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-900/30 rounded-full">
          <Lock className="h-6 w-6 text-blue-300" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Visão 360° Limitada</h3>
          <p className="text-gray-300 mb-4">
            Você está visualizando apenas seus dados de investimentos. Para acessar seu panorama financeiro completo, 
            incluindo despesas, contas bancárias e uma visão 360° do seu patrimônio, ative o OpenFinance.
          </p>
          <Button 
            variant="purpleGradient"
            onClick={() => {
              const event = new CustomEvent('activate-openfinance');
              document.dispatchEvent(event);
            }}
          >
            Ativar OpenFinance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpenFinanceBanner;
