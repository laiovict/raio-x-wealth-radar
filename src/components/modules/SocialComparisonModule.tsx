
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/utils/formattingUtils";
import { toNumber, compareToNumber, toString } from '@/utils/typeConversionHelpers';
import DataSourceTag from '@/components/common/DataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface SocialComparisonModuleProps {
  fullWidth?: boolean;
}

const SocialComparisonModule = ({ fullWidth = false }: SocialComparisonModuleProps) => {
  const { data } = useRaioX();
  const { socialComparison } = data;

  const getScoreLevel = (score?: string | number) => {
    const numScore = toNumber(score);
    if (compareToNumber(score, 75)) return "Excelente";
    if (compareToNumber(score, 50)) return "Bom";
    if (compareToNumber(score, 25)) return "Regular";
    return "Abaixo da média";
  };

  // Ensure we have string values for formatting functions
  const ensureString = (value: any): string => {
    if (value === undefined || value === null) return '';
    return typeof value === 'string' ? value : value.toString();
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-xl text-blue-800 dark:text-blue-200 flex items-center">
          Comparação Social
          <TypeSafeDataSourceTag source={socialComparison?.dataSource} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Grupo de Pares
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {socialComparison?.peerGroup || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ranking Percentual
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {socialComparison?.percentileRank ? `${socialComparison.percentileRank}%` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Retorno vs. Pares
              </span>
              <span className="text-lg font-semibold">
                {formatCurrency(ensureString(socialComparison?.returnVsPeers))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pontuação de Diversificação
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {socialComparison?.diversificationScore || "N/A"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Nível de Pontuação
            </h4>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {getScoreLevel(socialComparison?.overallScore)}
              </span>
            </div>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30">
            <p className="text-sm text-gray-300">
              {socialComparison?.summary || "Dados adicionais disponíveis ao conectar mais fontes financeiras."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparisonModule;
