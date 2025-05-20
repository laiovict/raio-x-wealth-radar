
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
      // For both advisor and client login, use the same password
      if (password === "America123@") {
        // Store appropriate role in localStorage
        if (showAdvisorLogin) {
          localStorage.setItem("userRole", "advisor");
        } else {
          localStorage.setItem("userRole", "client");
          localStorage.setItem("clientId", "12345678");
        }
        
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

  // Toggle between client and advisor login
  const toggleAdvisorLogin = () => {
    setShowAdvisorLogin(!showAdvisorLogin);
    setPassword("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-1/2 flex flex-col items-start justify-center p-16">
        <div className="mb-16">
          <img 
            src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
            alt="Reinvent Logo" 
            className="h-16"
          />
        </div>
        
        <div className="mb-12">
          <h1 className="text-6xl font-extralight text-white mb-3">
            Bem-vindo
          </h1>
          <p className="text-2xl text-gray-400 font-extralight">
            ao seu raio-x financeiro
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
              placeholder={showAdvisorLogin ? "Digite a senha de advisor" : "Digite a senha"}
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
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleAdvisorLogin}
              className="text-gray-400 hover:text-white text-sm underline transition-colors"
            >
              {showAdvisorLogin ? "Voltar para login de cliente" : "Sou um advisor"}
            </button>
          </div>
        </form>
        
        <div className="absolute bottom-4 left-4">
          <LanguageSelector />
        </div>
      </div>
      
      {/* Right side with background image */}
      <div 
        className="w-1/2 bg-cover bg-center" 
        style={{ backgroundImage: "url('/lovable-uploads/28d0fefb-0481-49df-80f9-5b708d52358f.png')" }}
      />
    </div>
  );
};

export default Auth;
