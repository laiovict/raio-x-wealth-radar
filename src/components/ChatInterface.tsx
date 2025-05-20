
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRaioX } from "@/context/RaioXContext";
import { useLanguage } from "@/context/LanguageContext";
import StreamingText from "@/components/StreamingText";
import { useStreamingContent } from "@/hooks/use-streaming-content";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isStreaming?: boolean;
};

const ChatInterface = () => {
  const { data, selectedClient, hasOpenFinance } = useRaioX();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const { isStreaming } = useStreamingContent(false, 500);
  
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
    
    // Add temporary streaming message with loading indicator
    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => [...prev, {
      id: tempId,
      content: "",
      sender: "assistant",
      timestamp: new Date(),
      isStreaming: true
    }]);
    
    // Generate contextually relevant response after a delay
    setTimeout(() => {
      const responseContent = generateContextAwareResponse(userMessage.content);
      
      // Replace streaming message with final message
      setMessages((prev) => prev.map(msg => 
        msg.id === tempId ? {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          sender: "assistant",
          timestamp: new Date(),
          isStreaming: false
        } : msg
      ));
      
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Gravação finalizada",
        description: "Sua mensagem está sendo processada...",
      });
      
      // Simulate voice message after a delay
      setTimeout(() => {
        const voiceMessage: Message = {
          id: Date.now().toString(),
          content: "Quais são meus objetivos financeiros de longo prazo?",
          sender: "user",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, voiceMessage]);
        
        // Add temporary streaming message with loading indicator
        const tempId = `temp-${Date.now()}`;
        setMessages((prev) => [...prev, {
          id: tempId,
          content: "",
          sender: "assistant",
          timestamp: new Date(),
          isStreaming: true
        }]);
        
        // Generate response to voice message after a delay
        setTimeout(() => {
          const responseContent = generateContextAwareResponse(voiceMessage.content);
          
          // Replace streaming message with final message
          setMessages((prev) => prev.map(msg => 
            msg.id === tempId ? {
              id: (Date.now() + 1).toString(),
              content: responseContent,
              sender: "assistant",
              timestamp: new Date(),
              isStreaming: false
            } : msg
          ));
        }, 1500);
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Gravando mensagem",
        description: "Fale sua pergunta ou comando...",
      });
    }
  };

  // Create a ref for the message container to scroll to bottom on new messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="glass-morphism w-full border border-white/10 h-[85vh] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/40 to-indigo-900/40">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Reinvent RM</h2>
            <p className="text-xs text-blue-200/70">Assistente financeiro inteligente</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "assistant" ? "justify-start" : "justify-end"} animate-fade-in`}
          >
            <div
              className={`max-w-[90%] rounded-2xl p-4 ${
                message.sender === "assistant"
                  ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 shadow-lg"
                  : "bg-gradient-to-br from-blue-600/70 to-indigo-700/70 border border-blue-400/20 shadow-lg"
              }`}
            >
              {message.isStreaming ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2 items-center py-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Reinvent RM está escrevendo...</p>
                </div>
              ) : message.sender === "assistant" ? (
                <>
                  <StreamingText 
                    text={message.content} 
                    speed={15} 
                    delay={300}
                    className="text-white leading-relaxed"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs font-medium text-blue-300">Reinvent RM</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white leading-relaxed">{message.content}</p>
                  <p className="text-xs text-right text-gray-300 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-t border-white/5">
        <div className="flex gap-2">
          <Button
            onClick={toggleRecording}
            className={`${isRecording ? 'bg-red-600 hover:bg-red-700 animate-pulse shadow-lg' : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg'} rounded-full h-12 w-12 flex items-center justify-center`}
            size="icon"
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? "Send your message..." : "Envie sua mensagem..."}
            className="bg-gray-800/40 border-gray-700/50 text-white rounded-full h-12 px-6 shadow-inner focus:ring-blue-500/50 focus:border-blue-400/50"
            disabled={isRecording}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputMessage.trim() || isLoading || isRecording}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-12 w-12 rounded-full shadow-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
