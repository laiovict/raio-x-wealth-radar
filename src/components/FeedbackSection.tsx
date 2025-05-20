
import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FeedbackSectionProps {
  sectionId: string; // Unique identifier for the section
}

const FeedbackSection = ({ sectionId }: FeedbackSectionProps) => {
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userVoted, setUserVoted] = useState<'like' | 'dislike' | null>(null);

  // Handle like/dislike votes
  const handleVote = (type: 'like' | 'dislike') => {
    if (userVoted === type) {
      // User is un-voting
      setUserVoted(null);
      if (type === 'like') {
        setLikesCount(prev => prev - 1);
      } else {
        setDislikesCount(prev => prev - 1);
      }
      toast({
        title: "Voto removido",
        description: "Sua avaliação foi removida com sucesso."
      });
    } else {
      // User is changing vote or voting for first time
      if (userVoted) {
        // Switch vote
        if (userVoted === 'like') {
          setLikesCount(prev => prev - 1);
          setDislikesCount(prev => prev + 1);
        } else {
          setLikesCount(prev => prev + 1);
          setDislikesCount(prev => prev - 1);
        }
      } else {
        // First vote
        if (type === 'like') {
          setLikesCount(prev => prev + 1);
        } else {
          setDislikesCount(prev => prev + 1);
        }
      }
      setUserVoted(type);
      toast({
        title: type === 'like' ? "Você gostou desta seção" : "Você não gostou desta seção",
        description: "Obrigado pelo seu feedback! Estamos sempre buscando melhorar."
      });

      // In a real implementation, you would send this feedback to the server
      console.log(`Feedback for section ${sectionId}: ${type}`);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`${userVoted === 'like' ? 'bg-green-900/20 text-green-400' : 'text-gray-400'} hover:bg-green-900/10 hover:text-green-300`}
          onClick={() => handleVote('like')}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <span className={`text-xs ${userVoted === 'like' ? 'text-green-400' : 'text-gray-400'}`}>{likesCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`${userVoted === 'dislike' ? 'bg-red-900/20 text-red-400' : 'text-gray-400'} hover:bg-red-900/10 hover:text-red-300`}
          onClick={() => handleVote('dislike')}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <span className={`text-xs ${userVoted === 'dislike' ? 'text-red-400' : 'text-gray-400'}`}>{dislikesCount}</span>
      </div>
    </div>
  );
};

export default FeedbackSection;
