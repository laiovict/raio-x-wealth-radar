
import React, { useState, useEffect } from "react";
import PluggyConnectModal from "@/components/PluggyConnectModal";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useAuthentication } from "@/hooks/useAuthentication";
import { toast } from "@/hooks/use-toast";

interface OpenFinanceControlProps {
  hasOpenFinance: boolean;
  setHasOpenFinance: (value: boolean) => void;
}

const OpenFinanceControl = ({ hasOpenFinance, setHasOpenFinance }: OpenFinanceControlProps) => {
  const [showPluggyModal, setShowPluggyModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const isMobile = useMobileBreakpoint();
  const { isLoggedIn } = useAuthentication();

  // Listen for the custom event to activate OpenFinance
  useEffect(() => {
    const handleOpenFinanceEvent = () => {
      // Check if user is logged in before showing the modal
      if (!isLoggedIn) {
        toast({
          title: "Faça login primeiro",
          description: "Você precisa estar logado para usar o Open Finance.",
          variant: "destructive"
        });
        return;
      }
      setShowPluggyModal(true);
    };
    
    document.addEventListener('activate-openfinance', handleOpenFinanceEvent);
    return () => {
      document.removeEventListener('activate-openfinance', handleOpenFinanceEvent);
    };
  }, [isLoggedIn]);

  const handlePluggySuccess = () => {
    setShowPluggyModal(false);
    setHasOpenFinance(true);
  };

  const handlePluggyClose = () => {
    setShowPluggyModal(false);
  };

  const handleOpenFinanceToggle = () => {
    if (!isLoggedIn) {
      toast({
        title: "Faça login primeiro",
        description: "Você precisa estar logado para usar o Open Finance.",
        variant: "destructive"
      });
      return;
    }
    
    if (!hasOpenFinance) {
      setShowPluggyModal(true);
    } else {
      setHasOpenFinance(false);
    }
  };

  // Mobile button at the bottom of screen
  const renderMobileFloatingButton = () => {
    if (!isMobile || hasOpenFinance) return null;
    
    return (
      <div className="fixed bottom-6 inset-x-0 flex justify-center z-20">
        <Button
          onClick={() => {
            if (!isLoggedIn) {
              toast({
                title: "Faça login primeiro",
                description: "Você precisa estar logado para usar o Open Finance.",
                variant: "destructive"
              });
              return;
            }
            setShowPluggyModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 rounded-full shadow-lg"
        >
          <Shield className="mr-2 h-5 w-5" />
          Ativar Open Finance
        </Button>
      </div>
    );
  };

  return (
    <>
      <PluggyConnectModal
        isOpen={showPluggyModal}
        onClose={handlePluggyClose}
        onSuccess={handlePluggySuccess}
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
      />
      
      {renderMobileFloatingButton()}
    </>
  );
};

export default OpenFinanceControl;
