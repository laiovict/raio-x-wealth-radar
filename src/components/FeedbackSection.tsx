
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthentication } from "@/hooks/useAuthentication";

interface FeedbackSectionProps {
  sectionId: string; // Unique identifier for the section
}

const FeedbackSection = ({ sectionId }: FeedbackSectionProps) => {
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userVoted, setUserVoted] = useState<'like' | 'dislike' | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuthentication();

  // Fetch existing feedback counts and user's vote when component mounts
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        // Get total likes count
        const { count: likesCount, error: likesError } = await supabase
          .from('section_feedback')
          .select('*', { count: 'exact', head: true })
          .eq('section_id', sectionId)
          .eq('vote_type', 'like');

        if (likesError) throw likesError;
        setLikesCount(likesCount || 0);

        // Get total dislikes count
        const { count: dislikesCount, error: dislikesError } = await supabase
          .from('section_feedback')
          .select('*', { count: 'exact', head: true })
          .eq('section_id', sectionId)
          .eq('vote_type', 'dislike');

        if (dislikesError) throw dislikesError;
        setDislikesCount(dislikesCount || 0);

        // If user is logged in, check if they've already voted
        if (isLoggedIn) {
          const { data: userVoteData, error: userVoteError } = await supabase
            .from('section_feedback')
            .select('vote_type')
            .eq('section_id', sectionId)
            .maybeSingle();

          if (userVoteError) throw userVoteError;
          setUserVoted(userVoteData?.vote_type as 'like' | 'dislike' | null);
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar feedback",
          description: "Não foi possível carregar os dados de feedback."
        });
      }
    };

    fetchFeedbackData();
  }, [sectionId, isLoggedIn]);

  // Handle like/dislike votes
  const handleVote = async (type: 'like' | 'dislike') => {
    if (loading) return;
    
    // If not logged in, show a toast notification
    if (!isLoggedIn) {
      toast({
        title: "Faça login primeiro",
        description: "Você precisa estar logado para votar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // If user already voted with this type, remove their vote
      if (userVoted === type) {
        // Delete the vote from the database
        const { error } = await supabase
          .from('section_feedback')
          .delete()
          .eq('section_id', sectionId);

        if (error) throw error;

        // Update UI state
        setUserVoted(null);
        if (type === 'like') {
          setLikesCount(prev => Math.max(0, prev - 1));
        } else {
          setDislikesCount(prev => Math.max(0, prev - 1));
        }

        toast({
          title: "Voto removido",
          description: "Sua avaliação foi removida com sucesso."
        });
      } else {
        // If user has not voted or is changing their vote
        // First, check if there's an existing vote to update
        if (userVoted) {
          // Update the existing vote
          const { error } = await supabase
            .from('section_feedback')
            .update({ vote_type: type, updated_at: new Date().toISOString() })
            .eq('section_id', sectionId);

          if (error) throw error;

          // Update UI state for vote change
          if (userVoted === 'like') {
            setLikesCount(prev => Math.max(0, prev - 1));
            setDislikesCount(prev => prev + 1);
          } else {
            setLikesCount(prev => prev + 1);
            setDislikesCount(prev => Math.max(0, prev - 1));
          }
        } else {
          // Insert a new vote
          const { error } = await supabase
            .from('section_feedback')
            .insert({
              section_id: sectionId,
              vote_type: type
            });

          if (error) throw error;

          // Update UI state for new vote
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
      }
    } catch (error) {
      console.error('Error updating vote:', error);
      toast({
        variant: "destructive",
        title: "Erro ao registrar voto",
        description: "Não foi possível registrar seu voto. Tente novamente."
      });
    } finally {
      setLoading(false);
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
          disabled={loading}
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
          disabled={loading}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <span className={`text-xs ${userVoted === 'dislike' ? 'text-red-400' : 'text-gray-400'}`}>{dislikesCount}</span>
      </div>
    </div>
  );
};

export default FeedbackSection;
