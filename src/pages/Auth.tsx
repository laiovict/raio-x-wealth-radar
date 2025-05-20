
import { useState } from "react";
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
  
  // Function to generate a password based on client account number
  // For security purposes, the actual logic implementation is hidden
  const generateClientPassword = (clientId: string) => {
    // In a real scenario, this would be computed from real CPF data
    // For demo purposes, we're using a simple algorithm based on the account number
    return clientId.substring(0, 5);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // This would need to be replaced with actual auth logic
      // For demo purposes, we'll check if the account number exists in the database
      const { data: clientExists, error: fetchError } = await supabase
        .from('investor_portfolio_summary')
        .select('investor_account_on_brokerage_house')
        .eq('investor_account_on_brokerage_house', parseInt(accountNumber))
        .limit(1);
        
      if (fetchError) {
        throw fetchError;
      }

      if (!clientExists || clientExists.length === 0) {
        setError("Conta não encontrada. Por favor verifique o número da conta.");
        return;
      }

      // For a real implementation, you would use Supabase Auth:
      const email = `${accountNumber}@reinvent.com.br`; // Dummy email format
      
      // Use the client's expected password or the provided password
      const clientPassword = password || generateClientPassword(accountNumber);
      
      // Try to sign in, if user doesn't exist, sign up
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: clientPassword,
      });

      if (signInError) {
        // If error is "Invalid login credentials", try to sign up
        if (signInError.message.includes("Invalid login credentials")) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password: clientPassword,
          });

          if (signUpError) {
            throw signUpError;
          }

          toast({
            title: "Conta criada com sucesso!",
            description: "Você será redirecionado à página principal.",
            variant: "default",
          });
        } else {
          throw signInError;
        }
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
        variant: "default",
      });

      // Redirect to home page
      navigate("/");
      
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || "Erro ao realizar login. Tente novamente.");
    } finally {
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
            />
            <p className="text-xs text-gray-500 mt-1">
              {/* No password hints provided per requirements */}
            </p>
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
