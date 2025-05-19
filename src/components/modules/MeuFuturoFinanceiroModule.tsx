
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, TrendingUp, Shield, AlertTriangle } from "lucide-react";
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
    <Card className={`overflow-hidden ${fullWidth ? "w-full" : "w-full"}`}>
      <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 pb-3">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-300" />
          Meu Futuro Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Financial Diagnostic Summary - Top Section */}
        <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <h3 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-300 border-b pb-2 border-blue-200 dark:border-blue-800">
            DIAGNÓSTICO FINANCEIRO
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Financial Summary */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 text-sm uppercase">
                  Resumo Financeiro
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-700 dark:text-gray-300">Renda Mensal</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(diagnostic.finances.totalMonthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-700 dark:text-gray-300">Gastos Mensais</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{formatCurrency(diagnostic.finances.monthlyExpenses)}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Saldo</span>
                    <span className={`font-bold ${diagnostic.finances.surplus > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(diagnostic.finances.surplus)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 text-sm uppercase">
                  Patrimônio Atual
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between py-1">
                    <span className="text-gray-700 dark:text-gray-300">Imóvel</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(diagnostic.assets.property)}</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span className="text-gray-700 dark:text-gray-300">Investimentos</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(diagnostic.assets.investments)}</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span className="text-gray-700 dark:text-gray-300">Veículos</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(diagnostic.assets.vehicles.reduce((acc, vehicle) => acc + vehicle.value, 0))}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Strengths and Alerts */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm uppercase">
                    Pontos Fortes
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {diagnostic.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400 text-sm uppercase">
                    Alertas Críticos
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {diagnostic.alerts.map((alert, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{alert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Plan Phases - Bottom Section */}
        <div className="p-5 bg-white dark:bg-gray-900">
          <h3 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-300 border-b pb-2 border-blue-200 dark:border-blue-800">
            CRONOGRAMA DE MELHORIA
          </h3>
          
          <div className="space-y-4">
            {diagnostic.phases.map((phase, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="bg-blue-50 dark:bg-blue-900/50 border-b border-gray-200 dark:border-gray-700 p-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                      {phase.name}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
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
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Ver Plano Financeiro Completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeuFuturoFinanceiroModule;
