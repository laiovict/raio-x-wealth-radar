
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Auth = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      if (accountNumber === "login" && password === "America123@") {
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

      // For client login, check if password matches the first 5 digits of their account number
      const expectedPassword = accountNumber.substring(0, 5);
      
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
      
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || t('loginError'));
      setLoading(false);
    }
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
          
          <h1 className="text-2xl font-bold text-white mb-1">{t('accessAccount')}</h1>
          <p className="text-gray-400">{t('enterWithXP')}</p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-300 mb-1">
              {t('accountNumber')}
            </label>
            <Input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 w-full"
              placeholder={t('enterAccountNumber')}
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
      </Card>
    </div>
  );
};

export default Auth;
