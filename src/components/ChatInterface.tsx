
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá, sou o Reinvent RM. Como posso ajudá-lo hoje com seus investimentos?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate API call to ChatGPT
    setTimeout(() => {
      // Create a response based on user's question
      let responseContent = "";
      
      if (inputMessage.toLowerCase().includes("investimento") || 
          inputMessage.toLowerCase().includes("aplicar") || 
          inputMessage.toLowerCase().includes("investir")) {
        responseContent = language === 'pt-BR' 
          ? "Antes de recomendar qualquer investimento, preciso entender seu perfil de risco e objetivos financeiros. Podemos analisar seu portfólio atual e sugerir estratégias personalizadas." 
          : language === 'es'
          ? "Antes de recomendar cualquier inversión, necesito entender su perfil de riesgo y objetivos financieros. Podemos analizar su cartera actual y sugerir estrategias personalizadas."
          : "Before recommending any investments, I need to understand your risk profile and financial goals. We can analyze your current portfolio and suggest personalized strategies.";
      } else if (inputMessage.toLowerCase().includes("risco") || 
                inputMessage.toLowerCase().includes("perfil")) {
        responseContent = language === 'pt-BR'
          ? "Seu perfil de investimento atual parece moderado. Considerando sua idade e objetivos, podemos ajustar sua carteira para um equilíbrio melhor entre crescimento e segurança."
          : language === 'es'
          ? "Su perfil de inversión actual parece moderado. Considerando su edad y objetivos, podemos ajustar su cartera para un mejor equilibrio entre crecimiento y seguridad."
          : "Your current investment profile seems moderate. Considering your age and goals, we can adjust your portfolio for a better balance between growth and security.";
      } else {
        responseContent = language === 'pt-BR'
          ? "Obrigado por sua pergunta. Estamos trabalhando para integrar nosso sistema proprietário Reinvent RM. Por enquanto, posso ajudar com informações básicas sobre seus investimentos e estratégias financeiras."
          : language === 'es'
          ? "Gracias por su pregunta. Estamos trabajando para integrar nuestro sistema propietario Reinvent RM. Por ahora, puedo ayudar con información básica sobre sus inversiones y estrategias financieras."
          : "Thank you for your question. We are working to integrate our proprietary Reinvent RM system. For now, I can help with basic information about your investments and financial strategies.";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[500px] bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">Reinvent RM</h3>
        <p className="text-sm text-blue-100/80">{t('aiAssistantDescription')}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-800/70 text-gray-100 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <Bot className="h-4 w-4 mr-2 text-blue-300" />
                ) : (
                  <User className="h-4 w-4 mr-2 text-blue-300" />
                )}
                <span className="text-xs text-blue-300">
                  {message.sender === 'user' ? t('you') : 'Reinvent RM'}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/70 text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-xs text-blue-300">Reinvent RM</span>
              </div>
              <div className="flex space-x-1 mt-2 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10 bg-gray-900/30">
        <div className="flex items-end">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('typeMessage')}
            className="flex-1 bg-gray-800/50 border-gray-700 text-white resize-none"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="ml-2 bg-blue-600 text-white hover:bg-blue-700 h-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
