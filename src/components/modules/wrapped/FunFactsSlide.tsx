
import React from 'react';
import { BadgePercent, Play } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';
import { TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { DataSourceType } from '@/types/raioXTypes';

interface FunFactsSlideProps {
  financialSong: string;
  songArtist: string;
  songPreviewUrl: string;
  mostActiveDay: string;
  investorCompatibility: string;
  investorStyle: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
  isPlaying: boolean;
  audioUrl: string;
  onTogglePlay: (url: string) => void;
}

const FunFactsSlide: React.FC<FunFactsSlideProps> = ({ 
  financialSong, 
  songArtist,
  songPreviewUrl,
  mostActiveDay,
  investorCompatibility,
  investorStyle,
  dataSource,
  isPlaying,
  audioUrl,
  onTogglePlay
}) => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-purple-900 to-fuchsia-900 p-6 rounded-lg h-[400px] border border-purple-700/30 flex flex-col">
        <div className="mb-4 p-2 bg-purple-700/40 rounded-full self-center">
          <BadgePercent className="w-8 h-8 text-purple-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Curiosidades Financeiras</h3>
        
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-300 mb-1">Se sua carteira fosse uma música:</p>
                <p className="text-lg font-bold text-white">
                  {financialSong}
                </p>
                <p className="text-xs text-purple-300 mt-1">{songArtist}</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button 
                      className="p-2.5 bg-purple-700 rounded-full hover:bg-purple-600 transition-colors"
                      onClick={() => onTogglePlay(songPreviewUrl)}
                    >
                      {isPlaying && audioUrl === songPreviewUrl ? (
                        <span className="w-3 h-3 block bg-white rounded"></span>
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying && audioUrl === songPreviewUrl ? "Pausar prévia" : "Ouvir prévia"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
            <p className="text-sm text-purple-300 mb-1">Seu dia mais ativo para investimentos:</p>
            <p className="text-lg font-bold text-white">{mostActiveDay}</p>
          </div>
          
          <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
            <p className="text-sm text-purple-300 mb-1">Investidor famoso com quem você se parece:</p>
            <p className="text-lg font-bold text-white">
              {investorCompatibility}
              {dataSource === 'supabase' && (
                <span className="ml-1 text-green-400">
                  <span className="inline-block h-3 w-3">✓</span>
                </span>
              )}
            </p>
            <p className="text-xs text-purple-300 mt-1">"{investorStyle}"</p>
          </div>
        </div>
      </div>
    </CarouselSlideBase>
  );
};

export default FunFactsSlide;
