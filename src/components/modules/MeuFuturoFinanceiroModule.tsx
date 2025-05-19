
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useMobileBreakpoint } from "@/hooks/use-mobile";

interface MeuFuturoFinanceiroModuleProps {
  fullWidth?: boolean;
}

const MeuFuturoFinanceiroModule = ({ fullWidth = false }: MeuFuturoFinanceiroModuleProps) => {
  const { data } = useRaioX();
  const isMobile = useMobileBreakpoint();
  
  // Diagnostic data inspired by the Instagram posts
  const diagnostic = {
    profile: {
      location: "São Paulo",
      profession1: "Profissional Autônomo",
      profession2: "Investidor Iniciante",
      age1: 42,
      age2: 38,
      children: [
        { age: 14, education: "Ensino médio particular" },
        { age: 10, education: "Ensino fundamental particular" }
      ]
    },
    finances: {
      monthlyIncome1: 32000,
      monthlyIncome2: 24000,
      totalMonthlyIncome: 56000,
      monthlyExpenses: 51200,
      surplus: 4800
    },
    assets: {
      property: 1800000,
      investments: 245000,
      vehicles: [
        { model: "SUV Premium", value: 280000, installment: 5600, remaining: 36 },
        { model: "Sedã Executivo", value: 160000, installment: 3200, remaining: 28 }
      ],
      totalVehiclePayments: 8800
    },
    phases: [
      {
        name: "Fase 1 — Reorganização",
        timeframe: "0 a 3 meses",
        actions: [
          "Renegociar custos escolares (buscar bolsas ou reajustes menores)",
          "Reduzir gastos com lazer em 30%",
          "Revisar plano de saúde para opção mais custo-efetiva",
          "Avaliar venda de um dos veículos financiados"
        ]
      },
      {
        name: "Fase 2 — Construção de Reserva",
        timeframe: "4 a 6 meses",
        actions: [
          "Estabelecer fundo de emergência: mínimo de R$ 150.000 (3 meses de custo fixo)",
          "Congelar padrão de vida e destinar excedente para investimentos",
          "Cancelar serviços e assinaturas duplicadas/desnecessárias"
        ]
      },
      {
        name: "Fase 3 — Aporte e Crescimento",
        timeframe: "7 a 12 meses",
        actions: [
          "Investir pelo menos 15% da renda líquida mensalmente",
          "Diversificar: incluir fundos imobiliários, previdência privada e multimercados",
          "Estudar aquisição de patrimônio gerador de renda passiva"
        ]
      }
    ],
    strengths: [
      "Boa renda conjunta",
      "Investimentos iniciais já realizados",
      "Idade produtiva e carreira estabelecida",
      "Patrimônio imobiliário significativo"
    ],
    alerts: [
      "Gastos mensais próximos da renda (margem pequena)",
      "Reserva de emergência insuficiente",
      "Parcelas de veículos comprometendo 15% da renda",
      "Custo com educação compromete 20% da renda mensal"
    ]
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Meu Futuro Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Diagnostic */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-5">
          <h3 className="font-bold text-lg mb-3 text-blue-800 dark:text-blue-200">DIAGNÓSTICO FINANCEIRO</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Renda Mensal</span>
                  <span className="font-bold text-green-700 dark:text-green-400">{formatCurrency(diagnostic.finances.totalMonthlyIncome)}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Gastos Mensais</span>
                  <span className="font-bold text-red-700 dark:text-red-400">{formatCurrency(diagnostic.finances.monthlyExpenses)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Saldo</span>
                  <span className={`font-bold ${diagnostic.finances.surplus > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {formatCurrency(diagnostic.finances.surplus)}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Patrimônio Atual:</h4>
                <ul className="space-y-1">
                  <li className="flex justify-between">
                    <span>• Imóvel</span>
                    <span className="font-medium">{formatCurrency(diagnostic.assets.property)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>• Investimentos</span>
                    <span className="font-medium">{formatCurrency(diagnostic.assets.investments)}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Pontos Fortes:</h4>
              <ul className="space-y-1 mb-4">
                {diagnostic.strengths.map((strength, index) => (
                  <li key={index}>• {strength}</li>
                ))}
              </ul>
              
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Alertas Críticos:</h4>
              <ul className="space-y-1">
                {diagnostic.alerts.map((alert, index) => (
                  <li key={index} className="text-amber-800 dark:text-amber-300">• {alert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Plan Phases */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-200">CRONOGRAMA DE MELHORIA</h3>
          
          <div className="space-y-4">
            {diagnostic.phases.map((phase, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800/50 shadow-sm rounded-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
              >
                <div className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {phase.name}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {phase.timeframe}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {phase.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start">
                        <ChevronRight className="h-4 w-4 mt-1 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Ver Plano Financeiro Completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeuFuturoFinanceiroModule;
