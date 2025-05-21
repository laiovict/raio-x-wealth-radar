import { useRaioX } from "@/context/RaioXContext";
import React from "react";

interface WholeBankingModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;  // Adding this prop
}

const WholeBankingModule = ({ fullWidth = false, useSyntheticData = false }: WholeBankingModuleProps) => {
  const { hasOpenFinance, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();

  // Format currency helper
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "R$ 0";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Mock data for insurance products
  const insuranceProducts = [
    { 
      type: "Seguro de Vida", 
      provider: "Seguradora Confiança", 
      coverage: 500000, 
      monthlyPremium: 180,
      dueDate: "15/06/2025",
      status: "Ativo"
    },
    { 
      type: "Seguro Residencial", 
      provider: "Seguradora Proteção Total", 
      coverage: 350000, 
      monthlyPremium: 90,
      dueDate: "03/09/2025",
      status: "Ativo"
    }
  ];

  // Mock data for credit operations
  const creditOperations = [
    {
      type: "Financiamento Imobiliário",
      bank: "Banco Nacional",
      remainingBalance: 320000,
      totalAmount: 450000,
      monthlyPayment: 2800,
      interestRate: "9.5% a.a.",
      dueDate: "10/2042",
      status: "Em dia"
    },
    {
      type: "Empréstimo Pessoal",
      bank: "Banco Digital",
      remainingBalance: 15000,
      totalAmount: 25000,
      monthlyPayment: 1200,
      interestRate: "18% a.a.",
      dueDate: "05/2026",
      status: "Em dia"
    }
  ];

  // Mock data for recurring expenses
  const recurringExpenses = [
    {
      description: "Streaming Services",
      amount: 120,
      frequency: "Mensal",
      category: "Entretenimento",
      lastDebit: "05/05/2025"
    },
    {
      description: "Academia",
      amount: 175,
      frequency: "Mensal",
      category: "Saúde",
      lastDebit: "02/05/2025"
    },
    {
      description: "Plano de Saúde",
      amount: 950,
      frequency: "Mensal",
      category: "Saúde",
      lastDebit: "10/05/2025"
    }
  ];

  // Mock data for consortium
  const consortiumAgreements = [
    {
      type: "Consórcio Imobiliário",
      administrator: "Consórcios Premier",
      totalValue: 500000,
      monthlyContribution: 3200,
      paymentsCompleted: 24,
      totalPayments: 120,
      nextDraw: "15/06/2025",
      status: "Ativo"
    }
  ];

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Whole Banking: Além dos Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-purple-500/20 rounded-lg bg-purple-900/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-900/30 rounded-full">
                <Lock className="h-6 w-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Conecte seu Open Banking</h3>
                <p className="text-gray-300 mb-4">
                  Para acessar informações além dos investimentos como crédito, seguros, consórcios e despesas recorrentes, 
                  ative o OpenFinance para permitir uma análise completa de sua vida financeira.
                </p>
                <div className="flex space-x-4">
                  <Button 
                    variant="success" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:from-purple-700 hover:to-indigo-800"
                    onClick={() => {
                      const event = new CustomEvent('activate-openfinance');
                      document.dispatchEvent(event);
                    }}
                  >
                    Ativar OpenFinance
                  </Button>
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-blue-400" />
                Crédito
              </h4>
              <p className="text-gray-300 text-sm">
                Visualize seus financiamentos, empréstimos e linhas de crédito após ativar o OpenFinance.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/20">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Seguros
              </h4>
              <p className="text-gray-300 text-sm">
                Acompanhe seus seguros e proteja seu patrimônio com uma visão integrada após ativar o OpenFinance.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/20">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <Repeat className="w-4 h-4 mr-2 text-amber-400" />
                Despesas Recorrentes
              </h4>
              <p className="text-gray-300 text-sm">
                Monitore assinaturas e despesas fixas para otimizar seu orçamento após ativar o OpenFinance.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 border border-indigo-500/20">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <Handshake className="w-4 h-4 mr-2 text-indigo-400" />
                Consórcios
              </h4>
              <p className="text-gray-300 text-sm">
                Acompanhe o progresso dos seus consórcios e planeje suas conquistas após ativar o OpenFinance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAIAnalysisLoading) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Whole Banking: Além dos Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400">Carregando seus produtos e serviços bancários...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Whole Banking: Além dos Investimentos
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Insurance Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-lg">Seguros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insuranceProducts.map((insurance, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white mb-1">{insurance.type}</h4>
                    <p className="text-sm text-gray-400">{insurance.provider}</p>
                  </div>
                  <Badge className="bg-green-600">{insurance.status}</Badge>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Cobertura:</span>
                    <span className="text-sm text-white">{formatCurrency(insurance.coverage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Prêmio Mensal:</span>
                    <span className="text-sm text-white">{formatCurrency(insurance.monthlyPremium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Validade:</span>
                    <span className="text-sm text-white">{insurance.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Credit Operations Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-lg">Operações de Crédito</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {creditOperations.map((credit, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white mb-1">{credit.type}</h4>
                    <p className="text-sm text-gray-400">{credit.bank}</p>
                  </div>
                  <Badge className={credit.status === "Em dia" ? "bg-green-600" : "bg-red-600"}>{credit.status}</Badge>
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Saldo Devedor:</span>
                      <span className="text-sm text-white">{formatCurrency(credit.remainingBalance)}</span>
                    </div>
                    <Progress 
                      value={(1 - (credit.remainingBalance / credit.totalAmount)) * 100} 
                      className="h-2 bg-blue-900/40"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Total Financiado: {formatCurrency(credit.totalAmount)}</span>
                      <span className="text-xs text-gray-500">{Math.round((1 - (credit.remainingBalance / credit.totalAmount)) * 100)}% quitado</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Parcela Mensal:</span>
                    <span className="text-sm text-white">{formatCurrency(credit.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Taxa de Juros:</span>
                    <span className="text-sm text-white">{credit.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Término:</span>
                    <span className="text-sm text-white">{credit.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recurring Expenses Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Repeat className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-lg">Gastos Recorrentes</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-sm text-gray-400 font-medium text-left py-2">Descrição</th>
                  <th className="text-sm text-gray-400 font-medium text-center py-2">Valor</th>
                  <th className="text-sm text-gray-400 font-medium text-center py-2">Frequência</th>
                  <th className="text-sm text-gray-400 font-medium text-center py-2">Categoria</th>
                  <th className="text-sm text-gray-400 font-medium text-right py-2">Último Débito</th>
                </tr>
              </thead>
              <tbody>
                {recurringExpenses.map((expense, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-3 text-white text-sm">{expense.description}</td>
                    <td className="py-3 text-white text-sm text-center">{formatCurrency(expense.amount)}</td>
                    <td className="py-3 text-white text-sm text-center">{expense.frequency}</td>
                    <td className="py-3 text-white text-sm text-center">
                      <Badge 
                        className={
                          expense.category === "Saúde" ? "bg-green-600" : 
                          expense.category === "Entretenimento" ? "bg-purple-600" : 
                          "bg-blue-600"
                        }
                      >
                        {expense.category}
                      </Badge>
                    </td>
                    <td className="py-3 text-white text-sm text-right">{expense.lastDebit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <span className="text-sm text-gray-400">Total Mensal: {formatCurrency(recurringExpenses.reduce((acc, expense) => acc + expense.amount, 0))}</span>
          </div>
        </div>
        
        {/* Consortium Agreements Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-lg">Consórcios</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {consortiumAgreements.length > 0 ? (
              consortiumAgreements.map((consortium, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 border border-indigo-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white mb-1">{consortium.type}</h4>
                      <p className="text-sm text-gray-400">{consortium.administrator}</p>
                    </div>
                    <Badge className="bg-green-600">{consortium.status}</Badge>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Progresso:</span>
                        <span className="text-sm text-white">{consortium.paymentsCompleted} de {consortium.totalPayments} parcelas</span>
                      </div>
                      <Progress 
                        value={(consortium.paymentsCompleted / consortium.totalPayments) * 100} 
                        className="h-2 bg-indigo-900/40"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Total: {formatCurrency(consortium.totalValue)}</span>
                        <span className="text-xs text-gray-500">{Math.round((consortium.paymentsCompleted / consortium.totalPayments) * 100)}% concluído</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Contribuição Mensal:</span>
                      <span className="text-sm text-white">{formatCurrency(consortium.monthlyContribution)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Próximo Sorteio:</span>
                      <span className="text-sm text-white">{consortium.nextDraw}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-lg bg-gradient-to-br from-gray-800/40 to-gray-700/20 border border-gray-700/20 text-center">
                <p className="text-gray-400">Nenhum consórcio ativo no momento</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WholeBankingModule;
