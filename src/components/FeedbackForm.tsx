
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Send, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackFormProps {
  clientId: number | null;
  isAdvisor?: boolean;
}

const FeedbackForm = ({ clientId, isAdvisor = false }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Aviso",
        description: "Por favor, escreva um comentário antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Aviso",
        description: "Por favor, selecione uma avaliação antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store feedback in local storage for demonstration purposes
      // In a real app, this would be stored in Supabase
      const feedbackItem = {
        id: Date.now().toString(),
        clientId: clientId || 0,
        feedback,
        rating,
        createdAt: new Date().toISOString(),
        isAdvisorFeedback: isAdvisor,
      };
      
      const existingFeedback = JSON.parse(localStorage.getItem("clientFeedback") || "[]");
      localStorage.setItem("clientFeedback", JSON.stringify([...existingFeedback, feedbackItem]));
      
      toast({
        title: "Feedback enviado",
        description: "Obrigado pelo seu feedback!",
      });
      
      setFeedback("");
      setRating(0);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar seu feedback. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !isAdvisor) {
    return (
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-md border border-white/10">
        <CardHeader className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-4 rounded-t-lg border-b border-white/10">
          <CardTitle className="text-xl flex items-center">
            <span className="text-white">Avaliação Enviada</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="rounded-full bg-green-500/20 p-4">
              <Send className="h-10 w-10 text-green-400" />
            </div>
            <p className="text-center text-gray-300">
              Seu feedback foi enviado com sucesso! Agradecemos por compartilhar sua opinião.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-md border border-white/10">
      <CardHeader className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-4 rounded-t-lg border-b border-white/10">
        <CardTitle className="text-xl flex items-center">
          <span className="text-white">
            {isAdvisor ? "Adicionar Feedback do Consultor" : "Deixe sua Avaliação"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            />
          ))}
        </div>
        
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={isAdvisor 
            ? "Compartilhe suas observações e sugestões de melhorias..." 
            : "Compartilhe sua experiência e sugestões..."
          }
          className="min-h-32 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
