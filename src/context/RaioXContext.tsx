
import { createContext, useContext, ReactNode } from 'react';
import { clientData } from '@/data/clientData';

interface RaioXContextType {
  data: any;
  clientId: string;
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
}

export const RaioXProvider = ({ children, clientId }: RaioXProviderProps) => {
  // Get data for the selected client
  const clientInfo = clientData[clientId] || clientData.client1;

  return (
    <RaioXContext.Provider value={{ data: clientInfo, clientId }}>
      {children}
    </RaioXContext.Provider>
  );
};
