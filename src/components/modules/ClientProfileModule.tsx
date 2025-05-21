import React from "react";
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent } from "@/components/ui/card";
import { User, Star, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { DataSourceType } from '@/types/raioXTypes';

interface ClientProfileModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<{
    summary: string;
    tags: string[];
    investor_name: string;
    currentStatus: string;
    ambitions: string;
    needs: string;
    clientAge: string;
  }>;
}

// Helper function to extract client profile sections from the text
const extractProfileSections = (summary: string) => {
  if (!summary) {
    return {
      currentStatus: "",
      ambitions: "",
      needs: ""
    };
  }
  
  // Simple approach - split the text into roughly three parts
  const sentences = summary.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalSentences = sentences.length;
  
  // Current status - first third of sentences
  const currentStatusSentences = sentences.slice(0, Math.floor(totalSentences / 3) + 1);
  // Ambitions - middle third of sentences
  const ambitionsSentences = sentences.slice(Math.floor(totalSentences / 3) + 1, Math.floor(2 * totalSentences / 3) + 1);
  // Needs - last third of sentences
  const needsSentences = sentences.slice(Math.floor(2 * totalSentences / 3) + 1);
  
  return {
    currentStatus: currentStatusSentences.join('. ') + (currentStatusSentences.length > 0 ? '.' : ''),
    ambitions: ambitionsSentences.join('. ') + (ambitionsSentences.length > 0 ? '.' : ''),
    needs: needsSentences.join('. ') + (needsSentences.length > 0 ? '.' : '')
  };
};

const ClientProfileModuleBase = ({ fullWidth = false, dataState }: ClientProfileModuleProps) => {
  const clientData = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  
  if (!clientData) {
    return <div>Carregando...</div>;
  }
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none bg-[#fafafa] dark:bg-slate-900`}>
      <CardContent className="p-0 h-full">
        <div className="relative h-full">
          {/* Glass-styled overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-900/90 dark:to-slate-800/80 backdrop-blur-sm z-10"></div>
          
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 py-8 px-10 border-b border-slate-200 dark:border-slate-700/50">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                  <User className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-light text-slate-800 dark:text-white tracking-wide">
                  {clientData.investor_name || "Perfil do Cliente"}
                </h2>
                {clientData.clientAge && (
                  <div className="mt-1 text-slate-500 dark:text-slate-400">
                    {clientData.clientAge} anos
                  </div>
                )}
                
                {dataSource === 'supabase' && (
                  <div className="flex justify-center gap-2 mt-3">
                    {clientData.tags && clientData.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Summary */}
            <div className="flex-1 p-10 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Current Status */}
                <div className="relative">
                  <div className="flex items-center mb-2 gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                      <User className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Situação Atual</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed">
                      {clientData.currentStatus || "Informação não disponível."}
                    </p>
                  </div>
                </div>
                
                {/* Ambitions */}
                <div className="relative">
                  <div className="flex items-center mb-2 gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                      <Star className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Ambições</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed">
                      {clientData.ambitions || "Informação não disponível."}
                    </p>
                  </div>
                </div>
                
                {/* Needs */}
                <div className="relative">
                  <div className="flex items-center mb-2 gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                      <Target className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300">Necessidades</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed">
                      {clientData.needs || "Informação não disponível."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Get real data from the RaioX context
const getRealClientProfileData = (props: ClientProfileModuleProps) => {
  // Extract data from context
  const { clientSummary } = useRaioX();

  // If there's no client summary, return null to use synthetic data
  if (!clientSummary || !clientSummary.summary) {
    console.log("No client summary available, using default data");
    return null;
  }
  
  try {
    // Extract data from client summary
    const summary = clientSummary.summary;
    // Handle tags which could be either a string or an array
    const tags = typeof clientSummary.tags === 'string' 
      ? (clientSummary.tags as string).split(',').map(tag => tag.trim()) 
      : (Array.isArray(clientSummary.tags) ? clientSummary.tags : []);
    
    const investor_name = clientSummary.investor_name || '';
    const clientAge = clientSummary.clientAge || ''; // Updated property name to match type
    
    // Extract profile sections
    const { currentStatus, ambitions, needs } = extractProfileSections(summary);
    
    return {
      summary,
      tags,
      investor_name,
      currentStatus,
      ambitions,
      needs,
      clientAge
    };
  } catch (error) {
    console.error("Error processing client summary:", error);
    return null;
  }
};

// Get synthetic data as a fallback
const getSyntheticClientProfileData = (props: ClientProfileModuleProps) => {
  return {
    summary: "Cliente com perfil conservador, busca estabilidade financeira e renda passiva. Trabalha no setor de tecnologia com planos de aposentadoria em 15 anos.",
    tags: ["Tecnologia", "Conservador", "Renda Passiva"],
    investor_name: "Cliente Exemplo",
    currentStatus: "Profissional de tecnologia com sólida carreira e estabilidade financeira, mas sem estratégia clara para o futuro.",
    ambitions: "Busca alcançar independência financeira e aposentadoria antecipada nos próximos 15 anos, com foco em qualidade de vida e equilíbrio.",
    needs: "Necessita diversificar investimentos, criar fontes de renda passiva e estruturar um plano robusto de aposentadoria.",
    clientAge: "35"
  };
};

// Create the enhanced module with data safety
const ClientProfileModule = withSafeData(
  ClientProfileModuleBase,
  getRealClientProfileData,
  getSyntheticClientProfileData,
  'supabase'
);

export default ClientProfileModule;
