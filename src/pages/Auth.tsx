
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogIn, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Auth = () => {
  const [accountNumber, setAccountNumber] = useState("");
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
      // Special case for advisor login with the correct password
      if (showAdvisorLogin && accountNumber === "login" && password === "America123@") {
        // Store a special flag in localStorage to indicate advisor mode
        localStorage.setItem("userRole", "advisor");
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, assessor.",
          variant: "default",
        });
        navigate("/");
        return;
      }
      
      // For regular client logins, validate account number exists
      if (!showAdvisorLogin) {
        const { data: clientExists, error: fetchError } = await supabase
          .from('investor_portfolio_summary')
          .select('investor_account_on_brokerage_house')
          .eq('investor_account_on_brokerage_house', parseInt(accountNumber))
          .limit(1);
          
        if (fetchError) {
          throw fetchError;
        }

        if (!clientExists || clientExists.length === 0) {
          setError(t('accountNotFound'));
          setLoading(false);
          return;
        }

        // For client login, check if password matches the first 6 digits of their account number
        const expectedPassword = accountNumber.substring(0, 6);
        
        if (password !== expectedPassword) {
          setError(t('invalidPassword'));
          setLoading(false);
          return;
        }
        
        // Store the client ID in localStorage
        localStorage.setItem("userRole", "client");
        localStorage.setItem("clientId", accountNumber);
        
        toast({
          title: t('loginSuccess'),
          description: t('welcomeBack'),
          variant: "default",
        });

        // Redirect to home page
        navigate("/");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || t('loginError'));
      setLoading(false);
    }
  };

  const toggleAdvisorLogin = () => {
    setShowAdvisorLogin(!showAdvisorLogin);
    setAccountNumber("");
    setPassword("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white p-0 mb-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('back')}
          </Button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white mb-1">
              {showAdvisorLogin ? "Acesso Assessor" : t('accessAccount')}
            </h1>
            
            <img 
              src="https://media.licdn.com/dms/image/C4D0BAQEgQpIxQEJvEA/company-logo_200_200/0/1674674650337?e=1716422400&v=beta&t=Gpl4UQRl_o7ArkhZeKM347sOWfO2xdrG5qHZW5kAUyI"
              alt="Reinvent Logo"
              className="h-8 w-auto"
            />
          </div>
          <p className="text-gray-400">
            {showAdvisorLogin ? "Entre com suas credenciais de assessor" : t('enterWithXP')}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-300 mb-1">
              {showAdvisorLogin ? "Login" : t('accountNumber')}
            </label>
            <Input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 w-full"
              placeholder={showAdvisorLogin ? "Digite seu login" : t('enterAccountNumber')}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              {t('password')}
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 w-full"
              placeholder={t('enterPassword')}
              required
            />
            {!showAdvisorLogin && (
              <p className="text-xs text-gray-500 mt-1">Use os primeiros 6 dígitos da sua conta como senha</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? t('processing') : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                {t('enter')}
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAdvisorLogin}
            className="text-gray-400 hover:text-white text-sm"
          >
            <User className="h-4 w-4 mr-1" />
            {showAdvisorLogin ? "Sou cliente" : "Sou um advisor"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
