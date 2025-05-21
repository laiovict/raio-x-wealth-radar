
import { useRaioX } from "@/context/RaioXContext";
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

// Proper interface for this component
interface WrappedModuleProps extends BaseModuleProps {
  // Additional props specific to this module
}

// Carousel slide interfaces
interface CarouselSlideProps {
  children: React.ReactNode;
}

// Hook to get wrapped data
const useWrappedData = (isSynthetic = false) => {
  // This would be implemented to fetch real or synthetic data based on the isSynthetic flag
  // For now, return a placeholder
  return {
    wrappedData: {
      dataSource: isSynthetic ? 'synthetic' as DataSourceType : 'supabase' as DataSourceType,
      summary: "2023 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial."
    },
    clientInsights: {
      personalizedInsight: "Seu estilo de investimento mostra disciplina consistente.",
      personalityType: "Investidor Conservador com tendências de crescimento",
      dataSource: isSynthetic ? 'synthetic' as DataSourceType : 'supabase' as DataSourceType,
      mostUnusualInvestment: "ETF de Empresas de Videogame",
      investmentStyle: "Diversificador Estratégico",
      financialSong: "Money - Pink Floyd",
      songArtist: "Pink Floyd",
      songPreviewUrl: "https://example.com/preview.mp3",
      mostActiveDay: "Terças-feiras",
      investorCompatibility: "Warren Buffett",
      investorStyle: "Valor"
    }
  };
};

// Base component without safe data wrapping
const WrappedModuleBase = ({ 
  fullWidth = false, 
  dataState 
}: WrappedModuleProps & { 
  dataState: any // Typed properly in a complete implementation
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Use our custom hook to get wrapped data
  const { wrappedData, clientInsights } = useWrappedData(dataState.isSynthetic);
  
  // Handle audio playback
  const togglePlay = (previewUrl: string) => {
    if (audioRef.current) {
      if (isPlaying && audioUrl === previewUrl) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setAudioUrl(previewUrl);
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  // Handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-purple-800 to-fuchsia-800 pb-3 border-b border-purple-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-purple-600/50 p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5 text-purple-100"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center">
              Seu Ano em Investimentos
              <TypeSafeDataSourceTag source={wrappedData?.dataSource} />
            </CardTitle>
          </div>
          <span className="text-xs px-3 py-1 bg-purple-700/50 rounded-full text-purple-200 border border-purple-500/30">
            #SuaJornadaFinanceira
          </span>
        </div>
        <p className="text-purple-200 mt-1 text-sm">
          Reveja sua jornada financeira e descubra insights exclusivos
        </p>
      </CardHeader>
      
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 p-0">
        {/* We would import and use the refactored slide components here */}
        <Carousel className="w-full py-4">
          <CarouselContent>
            {/* Placeholder for where slide components would go */}
            <div className="p-6">
              <p className="text-white">Carousel slides would be implemented here</p>
            </div>
          </CarouselContent>
          
          <div className="flex items-center justify-center mt-4">
            <CarouselPrevious className="relative -left-0 mr-2 bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="relative -right-0 ml-2 bg-white/10 hover:bg-white/20 border-white/20" />
          </div>
        </Carousel>
        
        <div className="p-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            {wrappedData.summary || "2023 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial."}
            {wrappedData.dataSource === 'supabase' && (
              <span className="ml-1 text-green-400">
                <span className="inline-block h-3 w-3">✓</span>
              </span>
            )}
          </p>
        </div>
      </CardContent>
      
      {/* Hidden audio player */}
      <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden" />
    </Card>
  );
};

// Get real data function for withSafeData HOC
const getRealWrappedData = (props: WrappedModuleProps) => {
  // Here we would extract real data from the RaioX context
  // For now just return null as a placeholder
  return null;
};

// Get synthetic data function for withSafeData HOC
const getSyntheticWrappedData = (props: WrappedModuleProps) => {
  // Return synthetic data
  return {
    // Synthetic data structure would go here
    isSynthetic: true
  };
};

// Create the safe module using the HOC
const WrappedModule = withSafeData(
  WrappedModuleBase,
  getRealWrappedData,
  getSyntheticWrappedData
);

export default WrappedModule;
