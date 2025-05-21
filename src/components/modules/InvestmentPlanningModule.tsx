
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/utils/formattingUtils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, PieChart } from "lucide-react";
import { toNumber } from '@/utils/typeConversionHelpers';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface InvestmentPlanningModuleProps {
  fullWidth?: boolean;
}

const InvestmentPlanningModule = ({ fullWidth = false }: InvestmentPlanningModuleProps) => {
  const { data } = useRaioX();

  const recommendations = [
    {
      asset: "Tesouro Selic 2029",
      currentAllocation: "R$ 25.000",
      recommendedAllocation: "R$ 15.000",
      reason: "Reduzir exposição a longo prazo",
    },
    {
      asset: "CDB Banco XP 130% CDI",
      currentAllocation: "R$ 15.000",
      recommendedAllocation: "R$ 20.000",
      reason: "Aproveitar taxas de juros mais altas",
    },
    {
      asset: "Fundo Multimercado",
      currentAllocation: "R$ 10.000",
      recommendedAllocation: "R$ 15.000",
      reason: "Diversificar para ativos de maior retorno",
    },
  ];

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/80 shadow-lg`}>
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg">
        <CardTitle className="text-xl text-white flex items-center">
          Planejamento de Investimentos
          <TypeSafeDataSourceTag source={data.allocation?.dataSource as DataSourceType} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Asset Allocation Chart */}
            <div className="border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-2 rounded-full">
                  <PieChart className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-blue-400 mb-1">
                      Alocação de Ativos
                    </h3>
                    <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                      {formatPercentage(78)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Sua alocação de ativos atual, comparada com a recomendada.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                      Renda Fixa
                    </Badge>
                    <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                      Ações
                    </Badge>
                    <Badge className="bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border border-blue-500/30">
                      Fundos
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Recommendations */}
            <div className="border border-green-500/20 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-green-700 to-green-900 p-2 rounded-full">
                  <BarChart className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-green-400 mb-1">
                      Recomendações de Investimento
                    </h3>
                    <Badge className="bg-green-900/50 text-green-200 hover:bg-green-800/50 border border-green-500/30">
                      {recommendations.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Sugestões para otimizar sua carteira.
                  </p>
                  <div className="space-y-4">
                    {recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-700/50 rounded-md"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-green-200">
                            {recommendation.asset}
                          </div>
                          <div className="text-green-300 font-medium">
                            {recommendation.reason}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-400">
                            Alocação Atual:{" "}
                            <div className="text-base font-medium">{formatCurrency(toNumber(recommendation.currentAllocation))}</div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Alocação Recomendada:{" "}
                            <div className="text-base font-medium">{formatCurrency(toNumber(recommendation.recommendedAllocation))}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="border border-red-500/20 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-red-700 to-red-900 p-2 rounded-full">
                  <BarChart className="w-5 h-5 text-red-300" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-red-400 mb-1">
                      Análise de Risco
                    </h3>
                    <Badge className="bg-red-900/50 text-red-200 hover:bg-red-800/50 border border-red-500/30">
                      Alto
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Identificação de riscos e oportunidades na sua carteira.
                  </p>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded-md">
                      <div className="text-sm font-medium text-red-200">
                        Concentração em um único ativo
                      </div>
                      <div className="text-xs text-gray-400">
                        Reduza a exposição para diminuir riscos.
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-md">
                      <div className="text-sm font-medium text-red-200">
                        Falta de diversificação internacional
                      </div>
                      <div className="text-xs text-gray-400">
                        Explore mercados globais para equilibrar a carteira.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InvestmentPlanningModule;
