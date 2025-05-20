
import React, { useEffect, useState } from 'react';
import { Brain, TrendingUp, Shield, Calculator, Leaf } from "lucide-react";

const agentQuotes = [
  {
    agent: "Planejador",
    icon: <Brain className="h-8 w-8 text-blue-400" />,
    quotes: [
      "Analisando seus objetivos financeiros...",
      "Calculando projeções de aposentadoria...",
      "Avaliando sua saúde financeira...",
      "Criando plano financeiro personalizado...",
    ],
    color: "text-blue-400"
  },
  {
    agent: "Investidor",
    icon: <TrendingUp className="h-8 w-8 text-green-400" />,
    quotes: [
      "Avaliando seu perfil de investimento...",
      "Analisando oportunidades no mercado...",
      "Simulando cenários de alocação...",
      "Identificando melhores investimentos...",
    ],
    color: "text-green-400"
  },
  {
    agent: "Segurador",
    icon: <Shield className="h-8 w-8 text-purple-400" />,
    quotes: [
      "Analisando sua proteção patrimonial...",
      "Avaliando cobertura de riscos...",
      "Identificando necessidades securitárias...",
      "Simulando planos de proteção...",
    ],
    color: "text-purple-400"
  },
  {
    agent: "Especialista em Crédito",
    icon: <Calculator className="h-8 w-8 text-yellow-400" />,
    quotes: [
      "Analisando sua capacidade de endividamento...",
      "Identificando oportunidades de crédito...",
      "Avaliando taxas e condições...",
      "Otimizando sua estrutura de dívida...",
    ],
    color: "text-yellow-400"
  },
  {
    agent: "Especialista ESG",
    icon: <Leaf className="h-8 w-8 text-emerald-400" />,
    quotes: [
      "Avaliando impacto ambiental de investimentos...",
      "Identificando empresas com boas práticas ESG...",
      "Analisando sustentabilidade da carteira...",
      "Buscando oportunidades conscientes...",
    ],
    color: "text-emerald-400"
  }
];

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Carregando..." }) => {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Change quote every 2 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => {
        const nextQuote = (prev + 1) % agentQuotes[currentAgent].quotes.length;
        // If we've gone through all quotes for this agent, move to next agent
        if (nextQuote === 0) {
          setCurrentAgent((prevAgent) => (prevAgent + 1) % agentQuotes.length);
        }
        return nextQuote;
      });
    }, 2000);

    return () => clearInterval(quoteInterval);
  }, [currentAgent]);

  const agent = agentQuotes[currentAgent];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-md p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-ping"></div>
            <div className="relative bg-gray-900/80 rounded-full p-6 border border-gray-700">
              {agent.icon}
            </div>
          </div>
          
          <h2 className={`text-xl font-bold mb-1 ${agent.color}`}>
            {agent.agent}
          </h2>
          
          <p className="text-white mb-8 min-h-[56px] flex items-center">
            {agent.quotes[currentQuote]}
          </p>
          
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
