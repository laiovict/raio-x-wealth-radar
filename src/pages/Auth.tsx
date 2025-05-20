
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Auth = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvisorLogin, setShowAdvisorLogin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // For testing purposes, allow simple password login
      if (password === "America123@") {
        // Store a special flag in localStorage to indicate advisor mode
        localStorage.setItem("userRole", "advisor");
        toast({
          title: t('loginSuccess'),
          description: t('welcomeBack'),
          variant: "default",
        });
        navigate("/");
        return;
      }
      
      // For client login, check if password matches expected value
      // This is simplified for demo purposes
      if (password === "123456") {
        // Store client info in localStorage
        localStorage.setItem("userRole", "client");
        localStorage.setItem("clientId", "12345678");
        
        toast({
          title: t('loginSuccess'),
          description: t('welcomeBack'),
          variant: "default",
        });

        // Redirect to home page
        navigate("/");
      } else {
        setError(t('invalidPassword'));
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  // Get current month name in Portuguese
  const getCurrentMonth = () => {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", 
      "Maio", "Junho", "Julho", "Agosto", 
      "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return months[new Date().getMonth()];
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-1/2 flex flex-col items-start justify-center p-16">
        <div className="mb-16">
          <img 
            src="/lovable-uploads/e32de997-8c6d-4904-8099-d688fa8427e4.png" 
            alt="Reinvent Logo" 
            className="h-10"
          />
        </div>
        
        <div className="mb-12">
          <h1 className="text-6xl font-extralight text-white mb-3">
            Bem-vindo
          </h1>
          <p className="text-2xl text-gray-400 font-extralight">
            a retrospectiva do mês<br />
            de {getCurrentMonth()}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 w-full max-w-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-6">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800/80 border-none rounded-full h-16 px-6 text-white placeholder-gray-500 w-full"
              placeholder="Digite a senha"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white rounded-full h-16 text-lg font-light"
            disabled={loading}
          >
            {loading ? "Processando..." : "Entrar"}
          </Button>
        </form>
        
        <div className="absolute bottom-4 left-4">
          <LanguageSelector />
        </div>
      </div>
      
      {/* Right side with background image */}
      <div 
        className="w-1/2 bg-cover bg-center" 
        style={{ backgroundImage: "url('/lovable-uploads/2871ba5c-71e3-4373-978e-8cbbccf53f26.png')" }}
      />
    </div>
  );
};

export default Auth;
