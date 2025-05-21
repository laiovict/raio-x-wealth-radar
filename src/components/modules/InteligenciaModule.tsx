
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Lightbulb, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRaioX } from "@/context/RaioXContext";
import { DataSourceType } from '@/types/raioXTypes';
import useTabContent from "@/hooks/useTabContent";

// Import subcomponents
import InsightsTabContent from "./inteligencia/InsightsTabContent";
import ActionsTabContent from "./inteligencia/ActionsTabContent";
import RecommendationsTabContent from "./inteligencia/RecommendationsTabContent";
import { getRecommendedActions } from "./inteligencia/helpers";

interface InteligenciaModuleProps {
  fullWidth?: boolean;
}

const InteligenciaModule = ({ fullWidth = false }: InteligenciaModuleProps) => {
  const { isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  
  // Define a random client seed to ensure varied mock data
  const clientSeed = useMemo(() => Math.floor(Math.random() * 10000), []);
  
  // Use custom hook for tab content management
  const {
    activeContent,
    isLoading,
    mockInsights,
    mockActions,
    mockRecommendations,
    handleContentClick
  } = useTabContent({ clientSeed });
  
  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={fullWidth ? "w-full" : "w-full"}
    >
      <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-950">
        <CardHeader className="pb-6 pt-8 bg-gradient-to-r from-indigo-950/40 to-purple-950/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-900/30">
                <BrainCircuit className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl font-light tracking-wide bg-gradient-to-r from-indigo-300 to-purple-200 text-transparent bg-clip-text">
                  Inteligência Financeira
                </h2>
                <div className="flex items-center mt-1">
                  <Badge className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-xs py-1 pl-1.5 pr-2 gap-1 border-none shadow-inner shadow-black/10">
                    <Sparkles className="h-3 w-3 text-indigo-200" />
                    <span className="font-normal tracking-wide">Powered by AI</span>
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button
              onClick={refreshAIAnalysis}
              disabled={isAIAnalysisLoading}
              variant="ghost"
              className="text-xs bg-white/5 hover:bg-white/10 text-indigo-300 font-normal"
            >
              {isAIAnalysisLoading ? "Atualizando..." : "Atualizar análise"}
              <Zap className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-0.5">
            {/* Insights Card Button */}
            <Button 
              onClick={() => handleContentClick("insights")} 
              variant="ghost"
              className={`flex flex-col items-center justify-center py-8 m-0 rounded-none border-b-2 transition-all duration-300 h-full
                ${activeContent === "insights" ? 
                  "border-indigo-500 bg-gradient-to-b from-indigo-900/20 to-indigo-900/5" : 
                  "border-transparent hover:bg-slate-800/50"}`}
            >
              <div className={`p-3 rounded-full mb-3 transition-all duration-300
                ${activeContent === "insights" ? 
                  "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-900/30" : 
                  "bg-slate-800/80"}`}>
                <Lightbulb className={`h-6 w-6 ${activeContent === "insights" ? "text-white" : "text-indigo-400"}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-light tracking-wide">Insights</h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[180px] text-center">
                Descubra padrões e oportunidades em seus investimentos
              </p>
            </Button>
            
            {/* Actions Card Button */}
            <Button 
              onClick={() => handleContentClick("actions")} 
              variant="ghost"
              className={`flex flex-col items-center justify-center py-8 m-0 rounded-none border-b-2 transition-all duration-300 h-full
                ${activeContent === "actions" ? 
                  "border-emerald-500 bg-gradient-to-b from-emerald-900/20 to-emerald-900/5" : 
                  "border-transparent hover:bg-slate-800/50"}`}
            >
              <div className={`p-3 rounded-full mb-3 transition-all duration-300
                ${activeContent === "actions" ? 
                  "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-900/30" : 
                  "bg-slate-800/80"}`}>
                <CheckCircle2 className={`h-6 w-6 ${activeContent === "actions" ? "text-white" : "text-emerald-400"}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-light tracking-wide">Ações</h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[180px] text-center">
                Acompanhe ações recomendadas para otimizar seus investimentos
              </p>
            </Button>
            
            {/* Recommendations Card Button */}
            <Button 
              onClick={() => handleContentClick("recommendations")} 
              variant="ghost"
              className={`flex flex-col items-center justify-center py-8 m-0 rounded-none border-b-2 transition-all duration-300 h-full
                ${activeContent === "recommendations" ? 
                  "border-amber-500 bg-gradient-to-b from-amber-900/20 to-amber-900/5" : 
                  "border-transparent hover:bg-slate-800/50"}`}
            >
              <div className={`p-3 rounded-full mb-3 transition-all duration-300
                ${activeContent === "recommendations" ? 
                  "bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-900/30" : 
                  "bg-slate-800/80"}`}>
                <ArrowRight className={`h-6 w-6 ${activeContent === "recommendations" ? "text-white" : "text-amber-400"}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-light tracking-wide">Recomendações</h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[180px] text-center">
                Receba sugestões personalizadas para seus objetivos financeiros
              </p>
            </Button>
          </div>
          
          {/* Content Area */}
          {activeContent && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              className="overflow-hidden"
            >
              {isLoading ? (
                <div className="p-8 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute w-16 h-16 rounded-full border-4 border-indigo-600/20 animate-ping"></div>
                    <div className="w-16 h-16 rounded-full border-4 border-l-indigo-500 border-r-indigo-500 border-t-transparent border-b-transparent animate-spin"></div>
                  </div>
                  <p className="text-indigo-300 text-sm animate-pulse">
                    Processando com inteligência artificial...
                  </p>
                </div>
              ) : activeContent === "insights" ? (
                <InsightsTabContent 
                  insights={mockInsights} 
                  loadingStates={{ insights: false }}
                  financialInsightData={{ insights: mockInsights }}
                />
              ) : activeContent === "actions" ? (
                <ActionsTabContent 
                  getRecommendedActions={() => mockActions}
                  actionStatuses={mockActions}
                />
              ) : (
                <RecommendationsTabContent recommendations={mockRecommendations} />
              )}
            </motion.div>
          )}
          
          {/* Empty State - When nothing is selected */}
          {!activeContent && (
            <div className="p-8 text-center">
              <p className="text-slate-400 text-sm">
                Selecione uma opção acima para ver análises personalizadas
              </p>
            </div>
          )}
          
          {/* Footer with AI Badge */}
          <div className="p-4 bg-gradient-to-r from-slate-900/80 to-slate-950/80 border-t border-white/5 flex justify-center">
            <div className="flex items-center gap-2 text-xs text-indigo-300/60">
              <Sparkles className="h-3 w-3" />
              <span>Análises geradas com inteligência artificial</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InteligenciaModule;
