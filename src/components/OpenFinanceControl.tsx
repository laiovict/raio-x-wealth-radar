
import React, { useState } from "react";
import PluggyConnectModal from "@/components/PluggyConnectModal";

interface OpenFinanceControlProps {
  hasOpenFinance: boolean;
  setHasOpenFinance: (value: boolean) => void;
}

const OpenFinanceControl = ({ hasOpenFinance, setHasOpenFinance }: OpenFinanceControlProps) => {
  const [showPluggyModal, setShowPluggyModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleOpenFinanceActivate = () => {
    setShowPluggyModal(true);
  };

  const handlePluggySuccess = () => {
    setShowPluggyModal(false);
    setHasOpenFinance(true);
  };

  const handlePluggyClose = () => {
    setShowPluggyModal(false);
  };

  const handleOpenFinanceToggle = () => {
    if (!hasOpenFinance) {
      setShowPluggyModal(true);
    } else {
      setHasOpenFinance(false);
    }
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
    </>
  );
};

export default OpenFinanceControl;
