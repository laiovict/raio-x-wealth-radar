
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  clientName: string;
  clientId?: number;
}

export function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"advisor" | "client" | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({ clientName: "Usuário" });
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const storedUserRole = localStorage.getItem("userRole");
    const clientId = localStorage.getItem("clientId");
    const selectedClientId = localStorage.getItem("selectedClientId");
    
    if (storedUserRole === "advisor") {
      setIsLoggedIn(true);
      setUserRole("advisor");
      setUserData({ clientName: "Consultor" });
      // If there's a previously selected client, use it
      if (selectedClientId) {
        setSelectedClient(parseInt(selectedClientId));
        // For demo purposes, set a client name
        setUserData({ clientName: "Cliente Selecionado", clientId: parseInt(selectedClientId) });
      }
    } else if (storedUserRole === "client" && clientId) {
      setIsLoggedIn(true);
      setUserRole("client");
      setSelectedClient(parseInt(clientId));
      setUserData({ clientName: "Cliente", clientId: parseInt(clientId) });
    } else {
      // Redirect to login if not logged in
      navigate("/auth");
    }
    
    // Garantir que a tela de loading seja exibida por completo (7 segundos)
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, [navigate]);

  const handleClientSelect = (clientId: string) => {
    console.log("Client selected in Index component:", clientId);
    localStorage.setItem("selectedClientId", clientId);
    setSelectedClient(parseInt(clientId));
    // Update user data when client is selected
    setUserData({ clientName: `Cliente ${clientId}`, clientId: parseInt(clientId) });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("clientId");
    localStorage.removeItem("selectedClientId");
    setIsLoggedIn(false);
    setUserRole(null);
    setSelectedClient(null);
    navigate("/auth");
  };

  return {
    isLoggedIn,
    userRole,
    loading,
    userData,
    selectedClient,
    handleClientSelect,
    handleLogout,
    setSelectedClient
  };
}
