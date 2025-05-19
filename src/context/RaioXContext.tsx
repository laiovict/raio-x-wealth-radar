
import { createContext, useContext, ReactNode } from 'react';
import { clientData } from '@/data/clientData';

interface RaioXContextType {
  data: any;
  clientId: string;
  hasOpenFinance: boolean;
}

const RaioXContext = createContext<RaioXContextType | undefined>(undefined);

export const useRaioX = () => {
  const context = useContext(RaioXContext);
  if (!context) {
    throw new Error('useRaioX must be used within a RaioXProvider');
  }
  return context;
};

interface RaioXProviderProps {
  children: ReactNode;
  clientId: string;
  hasOpenFinance: boolean;
}

export const RaioXProvider = ({ children, clientId, hasOpenFinance }: RaioXProviderProps) => {
  // Get data for the selected client
  const clientInfo = clientData[clientId] || clientData.client1;

  return (
    <RaioXContext.Provider value={{ data: clientInfo, clientId, hasOpenFinance }}>
      {children}
    </RaioXContext.Provider>
  );
};
