
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart as LineChartIcon, ListChecks, PieChart } from "lucide-react";

interface InvestmentPlanningModuleProps {
  fullWidth?: boolean;
}

const InvestmentPlanningModule = ({ fullWidth = false }: InvestmentPlanningModuleProps) => {
  const { data, hasOpenFinance } = useRaioX();
  
  // Mock data for contribution plans
  const contributionPlan = [
    { period: "Anos 1-5", objetivo: "Casa própria", percentual: 81.2 },
    { period: "Anos 1-5", objetivo: "Faculdade dos filhos", percentual: 47.6 },
    { period: "Anos 1-5", objetivo: "Casa na Praia", percentual: 12.5 },
    { period: "Anos 1-5", objetivo: "Viagem a Paris", percentual: 3.3 },
    { period: "Anos 1-5", objetivo: "Aposentadoria", percentual: 0.1 },
    { period: "Anos 6-10", objetivo: "Faculdade dos filhos", percentual: 78.2 },
    { period: "Anos 6-10", objetivo: "Casa própria", percentual: 25.7 },
    { period: "Anos 6-10", objetivo: "Casa na Praia", percentual: 4.7 },
    { period: "Anos 6-10", objetivo: "Aposentadoria", percentual: 0.4 },
    { period: "Anos 11-15", objetivo: "Casa própria", percentual: 89.1 },
    { period: "Anos 11-15", objetivo: "Casa na Praia", percentual: 42.6 },
    { period: "Anos 16-30", objetivo: "Aposentadoria", percentual: 64.3 },
    { period: "Anos 16-30", objetivo: "Casa na Praia", percentual: 35.7 },
  ];

  // Mock data for financial goals
  const financialGoals = [
    { 
      objetivo: "Reserva de emergência", 
      prioridade: 5, 
      horizonte: 0, 
      retorno: 9.0,
      valorAtual: 120000,
      valorFuturo: 120000,
      valorObtido: 120000,
      percentAtingido: 100.0,
      percentCapitalInicial: 12.0,
      capitalInicial: 120000,
    },
    { 
      objetivo: "Aposentadoria", 
      prioridade: 4, 
      horizonte: 35, 
      retorno: 13.0,
      valorAtual: 9000000,
      valorFuturo: 64750164.92,
      valorObtido: 64750164.92,
      percentAtingido: 100.0,
      percentCapitalInicial: 47.0,
      capitalInicial: 470000,
    },
    { 
      objetivo: "Casa própria", 
      prioridade: 3, 
      horizonte: 15, 
      retorno: 13.0,
      valorAtual: 2000000,
      valorFuturo: 4659239.24,
      valorObtido: 4659239.24,
      percentAtingido: 100.0,
      percentCapitalInicial: 16.8,
      capitalInicial: 168000,
    },
    { 
      objetivo: "Faculdade dos filhos", 
      prioridade: 2, 
      horizonte: 10, 
      retorno: 11.0,
      valorAtual: 500000,
      valorFuturo: 878671.79,
      valorObtido: 878671.79,
      percentAtingido: 100.0,
      percentCapitalInicial: 12.4,
      capitalInicial: 124000,
    },
    { 
      objetivo: "Casa na Praia", 
      prioridade: 1, 
      horizonte: 20, 
      retorno: 13.0,
      valorAtual: 1000000,
      valorFuturo: 3088256.43,
      valorObtido: 3088256.43,
      percentAtingido: 100.0,
      percentCapitalInicial: 5.6,
      capitalInicial: 56000,
    },
    { 
      objetivo: "Viagem a Paris", 
      prioridade: 1, 
      horizonte: 3, 
      retorno: 9.0,
      valorAtual: 40000,
      valorFuturo: 47371.48,
      valorObtido: 47371.48,
      percentAtingido: 100.0,
      percentCapitalInicial: 6.2,
      capitalInicial: 62000,
    },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get priority label
  const getPriorityLabel = (priority: number) => {
    switch(priority) {
      case 5: return "Crítica";
      case 4: return "Alta";
      case 3: return "Média";
      case 2: return "Moderada";
      case 1: return "Baixa";
      default: return "N/A";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority: number) => {
    switch(priority) {
      case 5: return "bg-red-600";
      case 4: return "bg-orange-600";
      case 3: return "bg-amber-600";
      case 2: return "bg-blue-600";
      case 1: return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Planejamento de Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-amber-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Planejamento de Investimentos Indisponível</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Ative o OpenFinance para desbloquear seu planejamento completo de investimentos, com recomendações personalizadas de aportes e análise de objetivos financeiros.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Planejamento de Investimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="mb-4 glass-morphism rounded-lg">
            <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
              <ListChecks className="h-4 w-4 mr-2" />
              Objetivos Financeiros
            </TabsTrigger>
            <TabsTrigger value="contributions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Plano de Aportes
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-700 data-[state=active]:text-white">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Progressão de Capital
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-900/40 mb-4">
              <div className="flex items-center mb-2">
                <span className="bg-blue-600/40 text-blue-100 p-1 rounded mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </span>
                <h3 className="font-medium text-blue-100">Recursos Disponíveis</h3>
              </div>
              <p className="text-blue-100">
                <span className="font-semibold">Capital Inicial:</span> {formatCurrency(1000000)} · 
                <span className="font-semibold ml-2">Capacidade de Aporte Anual:</span> {formatCurrency(180000)}
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-blue-900/20 border-b border-gray-700">
                    <TableHead className="text-gray-300">Objetivo</TableHead>
                    <TableHead className="text-gray-300 text-center">Prioridade</TableHead>
                    <TableHead className="text-gray-300 text-center">Horizonte</TableHead>
                    <TableHead className="text-gray-300 text-center">Retorno</TableHead>
                    <TableHead className="text-gray-300 text-right">Valor Atual</TableHead>
                    <TableHead className="text-gray-300 text-right">Valor Futuro</TableHead>
                    <TableHead className="text-gray-300 text-center">% Atingido</TableHead>
                    <TableHead className="text-gray-300 text-center">% Capital</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialGoals.map((goal, i) => (
                    <TableRow key={i} className="hover:bg-white/5 border-b border-gray-800">
                      <TableCell className="font-medium text-gray-200">{goal.objetivo}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getPriorityColor(goal.prioridade)}`}>
                          {getPriorityLabel(goal.prioridade)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {goal.horizonte === 0 ? 'Imediato' : `${goal.horizonte} anos`}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">{goal.retorno}%</TableCell>
                      <TableCell className="text-right text-gray-300">{formatCurrency(goal.valorAtual)}</TableCell>
                      <TableCell className="text-right text-gray-300">{formatCurrency(goal.valorFuturo)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <div className="mr-2 text-sm text-gray-300">{goal.percentAtingido}%</div>
                          <div className="w-16">
                            <Progress value={goal.percentAtingido} className="h-2" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-gray-300">{goal.percentCapitalInicial}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="contributions">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-blue-900/20 border-b border-gray-700">
                    <TableHead className="text-gray-300">Período</TableHead>
                    <TableHead className="text-gray-300">Objetivo</TableHead>
                    <TableHead className="text-gray-300 text-right">% do Aporte</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributionPlan.map((plan, i) => (
                    <TableRow key={i} className="hover:bg-white/5 border-b border-gray-800">
                      <TableCell className="font-medium text-gray-200">{plan.period}</TableCell>
                      <TableCell className="text-gray-300">{plan.objetivo}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="mr-2 text-gray-300">{plan.percentual}%</div>
                          <div className="w-16">
                            <Progress value={plan.percentual} className="h-2" />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 p-4 rounded-lg bg-gray-900/50">
                <h3 className="text-md font-medium text-gray-200 mb-2">Projeção de Objetivos Financeiros</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { year: 'Ano 0', value: 12000000 },
                        { year: 'Ano 5', value: 18500000 },
                        { year: 'Ano 10', value: 28700000 },
                        { year: 'Ano 15', value: 41900000 },
                        { year: 'Ano 20', value: 57300000 },
                        { year: 'Ano 30', value: 98400000 },
                        { year: 'Ano 40', value: 169000000 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="year" stroke="#999" />
                      <YAxis 
                        stroke="#999" 
                        tickFormatter={(value) => {
                          if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                          return value;
                        }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${formatCurrency(value)}`, "Patrimônio Projetado"]}
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '4px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-4 rounded-lg bg-gray-900/50">
                <h3 className="text-md font-medium text-gray-200 mb-2">Distribuição de Capital Inicial</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialGoals.sort((a, b) => b.percentCapitalInicial - a.percentCapitalInicial)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        type="number" 
                        stroke="#999"
                        domain={[0, 50]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="objetivo" 
                        stroke="#999" 
                        width={150}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, "Porcentagem do Capital Inicial"]}
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '4px' }}
                      />
                      <Bar dataKey="percentCapitalInicial" radius={[0, 4, 4, 0]}>
                        {financialGoals.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={
                              index === 0 ? "#8884d8" :
                              index === 1 ? "#4A90E2" :
                              index === 2 ? "#50C878" :
                              index === 3 ? "#F5A623" :
                              index === 4 ? "#E74C3C" : "#8884d8"
                            } 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InvestmentPlanningModule;
