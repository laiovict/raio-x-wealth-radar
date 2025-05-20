
import React from 'react';
import { RefreshCw } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface LoadingViewProps {
  fullWidth: boolean;
}

const LoadingView = ({ fullWidth }: LoadingViewProps) => {
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Meu Panorama Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-400">Atualizando seu panorama financeiro...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingView;
