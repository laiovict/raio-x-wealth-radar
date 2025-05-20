
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
  forceShow?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Carregando...", forceShow = false }) => {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Inicialmente, mostrar apenas o logo
    setTimeout(() => {
      setLogoVisible(true);
    }, 500);

    // Após 2 segundos, começar a mostrar as mensagens dos agentes
    setTimeout(() => {
      // Simulação de progresso de carregamento - aumentado para 7 segundos
      // Ajustamos a velocidade para completar em aproximadamente 7 segundos
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 2; // Velocidade reduzida para estender o tempo total
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);

      // Change quote every 3 seconds (um pouco mais lento para dar tempo de ler)
      const quoteInterval = setInterval(() => {
        setCurrentQuote((prev) => {
          const nextQuote = (prev + 1) % agentQuotes[currentAgent].quotes.length;
          // If we've gone through all quotes for this agent, move to next agent
          if (nextQuote === 0) {
            setCurrentAgent((prevAgent) => (prevAgent + 1) % agentQuotes.length);
          }
          return nextQuote;
        });
      }, 3000);

      // Só oculta a tela de carregamento caso não tenha a propriedade forceShow
      if (!forceShow) {
        // Após 7 segundos completos, esconder a tela de carregamento
        const hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 7000);
        
        return () => {
          clearTimeout(hideTimeout);
          clearInterval(quoteInterval);
          clearInterval(progressInterval);
        };
      } else {
        return () => {
          clearInterval(quoteInterval);
          clearInterval(progressInterval);
        };
      }
    }, 2000);
  }, [currentAgent, forceShow]);

  const agent = agentQuotes[currentAgent];

  // Função para criar SVG do logo R da Reinvent
  const ReinventLogo = () => (
    <div className="relative w-32 h-32">
      {/* SVG do R da Reinvent */}
      <svg 
        className="w-full h-full" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M40 40L100 40L160 40L160 100L100 160L40 100L40 40Z" 
          fill="url(#gradient)" 
          className={`transition-all duration-1000 ${logoVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        <defs>
          <linearGradient id="gradient" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Efeito de pulsação/glow */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
      
      {/* Círculo rotativo */}
      <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!isVisible && !forceShow) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-95 backdrop-blur-md z-50">
      <div className="max-w-md p-8 text-center space-y-12">
        {/* Logo da Reinvent com efeitos */}
        <div className="flex flex-col items-center justify-center mb-8">
          <ReinventLogo />
          
          {/* Progress bar */}
          <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            {Math.floor(loadingProgress)}% completo
          </div>
        </div>
        
        {/* Informações dos agentes */}
        <div className={`transition-opacity duration-500 ${logoVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative p-3 bg-gray-900/80 rounded-full border border-gray-700 mr-3">
              {agent.icon}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            
            <h2 className={`text-xl font-bold ${agent.color}`}>
              {agent.agent}
            </h2>
          </div>
          
          <p className="text-white text-lg mb-8 min-h-[56px] flex items-center justify-center">
            {agent.quotes[currentQuote]}
          </p>
          
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div className="text-sm text-gray-400 mt-12">
          Os algoritmos da Reinvent estão processando seus dados financeiros...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
