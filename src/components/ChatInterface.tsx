
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá, sou o assistente financeiro da Reinvent. Como posso ajudá-lo com suas finanças hoje?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    
    // Simulate AI response delay
    setTimeout(() => {
      // Mock AI response
      const aiResponses = [
        "Entendi sua dúvida sobre investimentos. Uma estratégia diversificada geralmente oferece melhor equilíbrio entre risco e retorno.",
        "Posso analisar seu portfólio atual para identificar oportunidades de otimização. Isso ajudaria a alinhar seus investimentos com seus objetivos.",
        "Considerando seu perfil, vale avaliar uma alocação em renda fixa de alta qualidade para equilibrar sua exposição a ativos de risco.",
        "Vamos revisar juntos seus objetivos financeiros para garantir que sua estratégia de investimento esteja alinhada com suas metas de curto e longo prazo.",
      ];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
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
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Envie sua mensagem..."
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
