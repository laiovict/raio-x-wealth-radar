
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
  const { selectedClient } = useRaioX();
  const clientData = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  
  // Even more strict conditions to not render:
  // 1. Don't render if we don't have client data 
  // 2. Don't render if the data is synthetic but no client is selected
  // 3. Don't render if the investor_name is "Cliente Exemplo" or "Cliente Padrão"
  // 4. Don't render if the data is synthetic and we have the default name pattern
  // 5. Don't render for client ID 240275 specifically
  if (!clientData || 
      (dataSource === 'synthetic' && !selectedClient) || 
      clientData.investor_name === "Cliente Exemplo" ||
      clientData.investor_name === "Cliente Padrão" ||
      (dataSource === 'synthetic' && clientData.investor_name === `Cliente ${selectedClient}`) ||
      selectedClient === 240275 || selectedClient === "240275") {
    return null;
  }
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-xl`}>
      <CardContent className="p-0 h-full">
        <div className="relative h-full">
          {/* Glass-styled overlay - improved dark theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-indigo-900/10 backdrop-blur-sm z-10"></div>
          
          {/* Background elements - enhanced for dark theme */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col">
            {/* Header - enhanced styling for dark theme */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-8 px-10 border-b border-slate-700/50">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                  <User className="h-10 w-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="mt-5 text-center">
                <h2 className="text-2xl font-light text-white tracking-wide">
                  {clientData.investor_name}
                </h2>
                {clientData.clientAge && (
                  <div className="mt-2 text-slate-400">
                    {clientData.clientAge} anos
                  </div>
                )}
                
                {dataSource === 'supabase' && (
                  <div className="flex justify-center gap-2 mt-4">
                    {clientData.tags && clientData.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-300 border border-blue-800/50 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Summary - enhanced spacing and visuals */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Current Status */}
                <div className="relative">
                  <div className="flex items-center mb-3 gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                      <User className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-blue-300">Situação Atual</h3>
                  </div>
                  <div className="pl-11">
                    <p className="text-slate-300 text-lg font-light leading-relaxed">
                      {clientData.currentStatus || "Informação não disponível."}
                    </p>
                  </div>
                </div>
                
                {/* Ambitions */}
                <div className="relative">
                  <div className="flex items-center mb-3 gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                      <Star className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-purple-300">Ambições</h3>
                  </div>
                  <div className="pl-11">
                    <p className="text-slate-300 text-lg font-light leading-relaxed">
                      {clientData.ambitions || "Informação não disponível."}
                    </p>
                  </div>
                </div>
                
                {/* Needs */}
                <div className="relative">
                  <div className="flex items-center mb-3 gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                      <Target className="h-4 w-4 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-medium text-amber-300">Necessidades</h3>
                  </div>
                  <div className="pl-11">
                    <p className="text-slate-300 text-lg font-light leading-relaxed">
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
  const { clientSummary, selectedClient } = useRaioX();

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
    const clientAge = clientSummary.clientAge || '';
    
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

// Get synthetic data as a fallback - but only when a client is selected
const getSyntheticClientProfileData = (props: ClientProfileModuleProps) => {
  const { selectedClient } = useRaioX();
  
  // Don't provide synthetic data if no client is selected or if it's client 240275
  if (!selectedClient || selectedClient === 240275) {
    return null;
  }
  
  return {
    summary: "Cliente com perfil conservador, busca estabilidade financeira e renda passiva. Trabalha no setor de tecnologia com planos de aposentadoria em 15 anos.",
    tags: ["Tecnologia", "Conservador", "Renda Passiva"],
    investor_name: `Cliente ${selectedClient}`,
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
