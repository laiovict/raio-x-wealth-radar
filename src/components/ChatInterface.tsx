
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRaioX } from "@/context/RaioXContext";
import { useLanguage } from "@/context/LanguageContext";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const ChatInterface = () => {
  const { data, selectedClient, hasOpenFinance } = useRaioX();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Update welcome message based on client data when component mounts or client changes
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome",
      content: `Olá${data.clientName ? `, ${data.clientName}` : ""}! Sou o assistente financeiro da Reinvent. Como posso ajudá-lo com suas finanças hoje?`,
      sender: "assistant" as const,
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
  }, [data.clientName, selectedClient]);

  const generateContextAwareResponse = (userMessage: string) => {
    // This function analyzes the user message and generates a response using client data
    // In a real implementation, this would call an AI service with proper context
    
    const clientContext = {
      name: data.clientName || "Cliente",
      portfolio: {
        totalValue: data.allocation?.current?.total || "desconhecido",
        allocation: data.allocation?.current || {},
        liquidity: data.liquidity?.currentIdle || "desconhecido",
      },
      goals: data.lifeGoals || { goals: [], summary: "" },
      hasOpenFinance: hasOpenFinance,
    };
    
    // Simple response templates based on detected keywords
    if (userMessage.toLowerCase().includes("portfólio") || userMessage.toLowerCase().includes("portfolio")) {
      return `Seu portfólio total está avaliado em R$ ${clientContext.portfolio.totalValue}. Posso ajudar com alguma análise específica?`;
    }
    
    if (userMessage.toLowerCase().includes("liquidez") || userMessage.toLowerCase().includes("reserva")) {
      return `Sua reserva de liquidez está em R$ ${clientContext.portfolio.liquidity}. Recomendo manter essa reserva equivalente a pelo menos 6 meses de despesas.`;
    }
    
    if (userMessage.toLowerCase().includes("objetivo") || userMessage.toLowerCase().includes("meta")) {
      const goals = Array.isArray(clientContext.goals) ? clientContext.goals : clientContext.goals.goals;
      if (goals && goals.length > 0) {
        return `Você possui ${goals.length} objetivos financeiros registrados. Gostaria de discutir algum específico?`;
      } else {
        return "Não vejo objetivos financeiros registrados. Gostaria de definir alguns para orientar seu planejamento financeiro?";
      }
    }
    
    if (userMessage.toLowerCase().includes("open finance") || userMessage.toLowerCase().includes("openfinance")) {
      if (clientContext.hasOpenFinance) {
        return "Você já tem o Open Finance ativado! Isso me permite oferecer insights mais completos sobre sua vida financeira.";
      } else {
        return "Você ainda não ativou o Open Finance. Ativar essa funcionalidade me permitiria ter uma visão mais completa das suas finanças e oferecer recomendações mais personalizadas.";
      }
    }
    
    // Default responses based on portfolio data
    const portfolioValue = clientContext.portfolio.totalValue;
    const responses = [
      `Analisando seu portfólio atual de R$ ${portfolioValue}, posso ajudar a identificar oportunidades para otimização de acordo com seus objetivos.`,
      `Com base no seu perfil financeiro, posso sugerir estratégias que equilibrem risco e retorno para seu patrimônio atual.`,
      `Considerando sua alocação atual, há espaço para diversificação que pode melhorar o desempenho do seu portfólio.`,
      `Vamos revisar juntos seus objetivos financeiros para garantir que sua estratégia de investimento esteja alinhada com suas metas de curto e longo prazo.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Generate contextually relevant response
    setTimeout(() => {
      const responseContent = generateContextAwareResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Create a ref for the message container to scroll to bottom on new messages
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="glass-morphism w-full border border-white/10 h-[85vh] flex flex-col">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Reinvent RM</h2>
            <p className="text-xs text-gray-400">Assistente financeiro inteligente</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "assistant"
                  ? "bg-gray-800/80 border border-gray-700"
                  : "bg-blue-900/70 border border-blue-800"
              }`}
            >
              <p className="text-white">{message.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? "Send your message..." : "Envie sua mensagem..."}
            className="bg-gray-800/50 border-gray-700 text-white"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
