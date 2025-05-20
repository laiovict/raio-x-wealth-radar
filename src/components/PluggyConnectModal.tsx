
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface PluggyConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isConnecting?: boolean;
  setIsConnecting?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PluggyConnectModal: React.FC<PluggyConnectModalProps> = ({ 
  isOpen, 
  onClose,
  onSuccess,
  isConnecting = false, 
  setIsConnecting
}) => {
  const [connectToken, setConnectToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only initialize Pluggy when the modal is open
    if (isOpen) {
      initializePluggy();
    }
    
    return () => {
      // Clean up Pluggy widget when component unmounts or modal closes
      const pluggyContainer = document.getElementById('pluggy-connect');
      if (pluggyContainer) {
        pluggyContainer.innerHTML = '';
      }
    };
  }, [isOpen]);
  
  const initializePluggy = async () => {
    setLoading(true);
    setError(null);
    
    // Update isConnecting state if the prop is provided
    if (setIsConnecting) {
      setIsConnecting(true);
    }
    
    try {
      // Here you would fetch your connect token from your backend
      // This is a placeholder - replace with your actual implementation
      // Example: fetch('https://your-backend.com/api/token')
      
      // Simulate token fetch for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = "mock-connect-token"; // Replace with actual token fetch
      setConnectToken(mockToken);
      
      // In a real implementation, you would load the Pluggy script and initialize the widget
      // Example of how it might look (commented out as it's not fully implemented):
      /*
      const script = document.createElement('script');
      script.src = 'https://cdn.pluggy.ai/pluggy-connect/v2.0/pluggy-connect.js';
      script.async = true;
      script.onload = () => {
        const pluggyConnect = (window as any).PluggyConnect.default.init({
          connectToken: mockToken,
          includeSandbox: process.env.NODE_ENV === 'development',
          onSuccess: (data: any) => {
            console.log('Pluggy connection successful', data);
            onSuccess();
            onClose();
            if (setIsConnecting) {
              setIsConnecting(false);
            }
          },
          onError: (error: any) => {
            console.error('Pluggy connection error', error);
            setError('Houve um erro ao conectar suas contas. Por favor, tente novamente.');
            if (setIsConnecting) {
              setIsConnecting(false);
            }
          },
          onClose: () => {
            onClose();
            if (setIsConnecting) {
              setIsConnecting(false);
            }
          }
        });
        
        pluggyConnect.open();
      };
      document.body.appendChild(script);
      */
      
      setLoading(false);
      // If setIsConnecting prop is provided, update it after loading
      if (setIsConnecting) {
        setIsConnecting(false);
      }
    } catch (err) {
      console.error('Error initializing Pluggy', err);
      setError('Não foi possível inicializar a conexão. Por favor, tente novamente mais tarde.');
      setLoading(false);
      // If setIsConnecting prop is provided, update it after error
      if (setIsConnecting) {
        setIsConnecting(false);
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f0f11] border border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Conectar ao OpenFinance
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Conecte suas contas bancárias para obter uma visão completa da sua vida financeira.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mb-4" />
              <p className="text-gray-400">Inicializando conexão segura...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Button 
                variant="outline" 
                onClick={initializePluggy}
                className="bg-white/10 hover:bg-white/20"
              >
                Tentar Novamente
              </Button>
            </div>
          )}
          
          {!loading && !error && (
            <div className="min-h-[400px] flex flex-col">
              {/* This div will be replaced by the Pluggy widget */}
              <div 
                id="pluggy-connect" 
                className="flex-1 flex items-center justify-center"
              >
                <p className="text-gray-400">
                  Em uma implementação real, o widget do Pluggy seria carregado aqui.
                  <br />
                  Para demonstração, considere a conexão como bem-sucedida.
                </p>
              </div>
              
              {/* For demo purposes, we'll add a button to simulate success */}
              <Button 
                onClick={onSuccess} 
                variant="default"
                className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                Simular Conexão Bem-sucedida
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PluggyConnectModal;
