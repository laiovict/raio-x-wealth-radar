import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Star } from "lucide-react";

interface FeedbackItem {
  id: string;
  clientId: number;
  feedback: string;
  rating: number;
  createdAt: string;
  isAdvisorFeedback: boolean;
}

interface FeedbackListProps {
  clientId?: number | null;
}

const FeedbackList = ({ clientId }: FeedbackListProps) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load feedback from local storage (in a real app, this would come from Supabase)
    const loadFeedback = () => {
      setIsLoading(true);
      try {
        const storedFeedback = JSON.parse(localStorage.getItem("clientFeedback") || "[]");
        
        // If clientId is provided, filter feedback for that client only
        // Otherwise, show all feedback (advisor view)
        const filteredFeedback = clientId 
          ? storedFeedback.filter((item: FeedbackItem) => item.clientId === clientId)
          : storedFeedback;
          
        setFeedbackList(filteredFeedback);
      } catch (error) {
        console.error("Error loading feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, [clientId]);

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <Card className="w-full shadow-md bg-white/5 backdrop-blur-md border border-white/10">
        <CardHeader className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-4 rounded-t-lg border-b border-white/10">
          <CardTitle className="text-xl text-white">Avaliações</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="h-40 flex items-center justify-center">
            <p className="text-gray-400">Carregando avaliações...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (feedbackList.length === 0) {
    return (
      <Card className="w-full shadow-md bg-white/5 backdrop-blur-md border border-white/10">
        <CardHeader className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-4 rounded-t-lg border-b border-white/10">
          <CardTitle className="text-xl text-white">Avaliações</CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="h-40 flex items-center justify-center">
            <p className="text-gray-400">Nenhuma avaliação ainda.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md bg-white/5 backdrop-blur-md border border-white/10">
      <CardHeader className="bg-gradient-to-r from-blue-900/70 to-indigo-900/70 pb-4 rounded-t-lg border-b border-white/10">
        <CardTitle className="text-xl text-white">
          {clientId ? "Suas Avaliações" : "Todas as Avaliações"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <Table className="text-white">
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-white/70">Data</TableHead>
              <TableHead className="text-white/70">Avaliação</TableHead>
              <TableHead className="text-white/70">Tipo</TableHead>
              <TableHead className="text-white/70">Comentário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackList.map((item) => (
              <TableRow key={item.id} className="border-white/10">
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{renderStars(item.rating)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.isAdvisorFeedback 
                      ? "bg-indigo-500/20 text-indigo-300" 
                      : "bg-blue-500/20 text-blue-300"
                  }`}>
                    {item.isAdvisorFeedback ? "Consultor" : "Cliente"}
                  </span>
                </TableCell>
                <TableCell className="max-w-md overflow-hidden text-ellipsis">
                  {item.feedback}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeedbackList;
