
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface SocialComparisonModuleProps {
  fullWidth?: boolean;
}

const SocialComparisonModule = ({ fullWidth = false }: SocialComparisonModuleProps) => {
  const { data } = useRaioX();
  const { socialComparison } = data;

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-xl text-white flex items-center">
          <span>Comparativo Social</span>
          <Badge className="ml-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
            Grupo: {socialComparison.peerGroup}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white dark:bg-gray-900 pt-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Users className="w-4 h-4 mr-1" /> 
                Ranking Percentil
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Top {socialComparison.percentileRank}%
              </span>
            </div>
            <Progress value={100 - socialComparison.percentileRank} className="h-3" />
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <span>Top 100%</span>
              <span>Top 1%</span>
            </div>
          </div>
          
          <div className={`grid ${fullWidth ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
            <div className="bg-green-50 dark:bg-green-900/40 p-3 rounded-lg border border-green-200 dark:border-green-800/50">
              <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                Retorno vs Pares
              </p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                +{socialComparison.returnVsPeers}% acima
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Em relação à mediana
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                Score de Diversificação
              </p>
              <div className="flex items-center">
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {socialComparison.diversificationScore}/100
                </p>
                <Badge className="ml-2 bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100" variant={socialComparison.diversificationScore > 70 ? "default" : "secondary"}>
                  {socialComparison.diversificationScore > 70 ? "Bom" : "Média"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {socialComparison.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparisonModule;
