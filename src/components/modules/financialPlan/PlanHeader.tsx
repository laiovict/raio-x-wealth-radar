
import React from 'react';
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/raioXUtils";

interface PlanHeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
}

const PlanHeader = ({ lastUpdated, onRefresh }: PlanHeaderProps) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Plano Financeiro (One-Page)
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span className="hidden md:inline">Atualizar</span>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Última atualização: {formatDate(lastUpdated, { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-green-400">✓ Dados reais</span>
          <span className="text-xs text-amber-400">* Dados estimados</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default PlanHeader;
