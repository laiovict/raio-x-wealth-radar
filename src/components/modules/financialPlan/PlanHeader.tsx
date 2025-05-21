
import React from "react";
import { CardHeader, CardTitle, Button } from "@/components/ui";
import { RefreshCw } from "lucide-react";
import TypeSafeDataSourceTag from "@/components/common/TypeSafeDataSourceTag";
import { DataSourceType } from "@/types/raioXTypes";

export interface PlanHeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
  dataSource: DataSourceType;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ lastUpdated, onRefresh, dataSource }) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Plano Financeiro Simplificado
          <TypeSafeDataSourceTag source={dataSource} />
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Atualizado: {lastUpdated}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-8 px-2 border-gray-700 bg-transparent hover:bg-gray-800"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            <span className="text-xs">Atualizar</span>
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default PlanHeader;
