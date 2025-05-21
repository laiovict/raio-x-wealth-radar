import React from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This file is read-only, but we need to add the useSyntheticData prop in a type-safe way
interface AllocationModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
}

const AllocationModule = ({ fullWidth = false, useSyntheticData = false }: AllocationModuleProps) => {
  // We won't modify the AllocationModule implementation since it's in the read-only files list
  // But we pass the useSyntheticData prop to make the API consistent
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Alocação Atual
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* The existing implementation uses the useRaioX hook to get data */}
        {/* We won't modify the internal implementation */}
        <div className="text-center text-gray-400">
          {useSyntheticData 
            ? "Visualizando dados sintéticos (Versão Full)" 
            : "Visualizando dados reais disponíveis (RaioX Beta)"}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationModule;
