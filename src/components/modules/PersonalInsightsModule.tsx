import React, { useEffect, useState } from "react";
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Briefcase, Wallet, Target, Calendar, 
  AlertTriangle, TrendingUp, PiggyBank, Award,
  Shield, ChartBar, Tag, BookOpen, User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { DataSourceType } from '@/types/raioXTypes';

interface PersonalInsightsModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<{
    summary: string;
    tags: string[];
    investor_name: string;
    sections: {
      professional: string;
      financial: string;
      assets: string;
      goals: string;
      timeline: string;
      risk: string;
    };
    clientAge: string;
  }>;
}

// Key sections we want to identify in the summary text
const TOPIC_KEYWORDS = {
  professional: ['profissão', 'carreira', 'trabalho', 'emprego', 'formado', 'formação', 'profissional', 'empreendendo', 'empresário'],
  financial: ['investidor', 'investimento', 'renda', 'salário', 'financeiro', 'despesas', 'gastos', 'financeira', 'dinheiro'],
  assets: ['patrimônio', 'imóveis', 'ativos', 'investimentos', 'carteira', 'ações', 'casa', 'apartamento'],
  goals: ['objetivo', 'meta', 'plano', 'aposentadoria', 'futuro', 'sonho', 'anjo', 'filho', 'pretende'],
  timeline: ['idade', 'anos', 'horizonte', 'prazo', 'tempo', 'período'],
  risk: ['risco', 'perfil', 'tolerância', 'volatilidade', 'conservador', 'moderado', 'agressivo', 'arrojado']
};

// Helper function to extract sections from the plain text summary
const extractSectionFromText = (text: string, keywords: string[], minLength: number = 30): string => {
  if (!text) return "";
  
  // Split the text into sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Find sentences that contain at least one keyword
  const relevantSentences = sentences.filter(sentence => 
    keywords.some(keyword => 
      sentence.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  // Join the relevant sentences back together
  let section = relevantSentences.join('. ');
  if (section && !section.endsWith('.')) section += '.';
  
  // If the extracted section is too short, return a larger chunk of the original text
  if (section.length < minLength) {
    // Find the first occurrence of any keyword in the text
    const firstIndex = keywords.reduce((earliest, keyword) => {
      const index = text.toLowerCase().indexOf(keyword.toLowerCase());
      return index !== -1 && (index < earliest || earliest === -1) ? index : earliest;
    }, -1);
    
    if (firstIndex !== -1) {
      // Extract a paragraph around the first occurrence
      const startIndex = Math.max(0, text.lastIndexOf('.', firstIndex) + 1);
      let endIndex = text.indexOf('.', firstIndex + 50);
      if (endIndex === -1) endIndex = text.length;
      
      return text.substring(startIndex, endIndex + 1).trim();
    }
    
    // If no keywords were found, return the beginning of the text
    return text.split('.').slice(0, 3).join('.') + '.';
  }
  
  return section;
};

// Helper function to enhance text with visual highlights
const enhanceText = (text: string): React.ReactNode => {
  if (!text) return null;
  
  // Highlight numbers and percentages
  const parts = text.split(/(\d+[\d.,]*%?)/g);
  
  return (
    <span>
      {parts.map((part, index) => {
        // Check if part is a number or percentage
        if (part.match(/\d+[\d.,]*%?/)) {
          return <strong key={index} className="text-blue-400">{part}</strong>;
        }
        
        // Highlight key terms
        const keyTerms = ['meta', 'objetivo', 'financeiro', 'investimento', 'risco', 'perfil', 'anjo', 'empreendendo', 'tenis'];
        let highlightedPart = part;
        
        keyTerms.forEach(term => {
          // Avoid partial word matches by checking for word boundaries
          const regex = new RegExp(`\\b${term}\\w*\\b`, 'gi');
          if (part.match(regex)) {
            highlightedPart = highlightedPart.replace(
              regex, 
              match => `<span class="text-emerald-400 font-medium">${match}</span>`
            );
          }
        });
        
        if (highlightedPart !== part) {
          return <span key={index} dangerouslySetInnerHTML={{ __html: highlightedPart }} />;
        }
        
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

// Helper function to extract client age from text
const extractAge = (text: string): string => {
  if (!text) return "";
  
  // Look for age patterns
  const agePattern = /\b(\d{1,2})\s*anos\b/i;
  const match = text.match(agePattern);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return "";
};

const PersonalInsightsModuleBase = ({ fullWidth = false, dataState }: PersonalInsightsModuleProps) => {
  const clientData = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  
  // Return appropriate section text, falling back if empty
  const getSectionContent = (section: keyof typeof clientData.sections): string => {
    if (!clientData || !clientData.sections) return "Informação não disponível no momento.";
    return clientData.sections[section] || "Informação não disponível no momento.";
  };
  
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-700 pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600/50 p-2">
              <Users className="h-5 w-5 text-blue-100" />
            </div>
            <CardTitle className="text-xl text-white">
              O Que Sabemos Sobre Você
              {dataSource === 'supabase' && (
                <span className="ml-1 text-green-400">
                  <span className="inline-block h-3 w-3">✓</span>
                </span>
              )}
            </CardTitle>
          </div>
          {dataSource === 'supabase' && (
            <Badge variant="outline" className="bg-green-400/20 text-green-100 border-green-400/30">
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              <span className="font-medium">Dados Validados</span>
            </Badge>
          )}
        </div>
        <p className="text-blue-200 mt-1 text-sm">
          Análise personalizada baseada em seu perfil profissional e objetivos
        </p>
      </CardHeader>
      
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 p-0">
        <div className="space-y-0">
          {/* Professional Profile Section */}
          <div className="group hover:bg-blue-900/10 transition-colors">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-3.5 shadow-md">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Perfil Profissional
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('professional'))}
                </div>
                
                {dataSource === 'supabase' && clientData?.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Show extracted tags as badges */}
                    {clientData.tags.filter(tag => typeof tag === 'string' && tag.trim()).map(tag => (
                      <Badge key={tag} variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700/30">
                        <Tag className="h-3 w-3 mr-1.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Financial Profile */}
          <div className="group hover:bg-green-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-green-600 to-teal-700 p-3.5 shadow-md">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Perfil Financeiro
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('financial'))}
                </div>
                
                {dataSource === 'supabase' && (
                  <div className="mt-3 p-3.5 bg-teal-900/30 backdrop-blur-sm rounded-lg border border-teal-700/30">
                    <div className="text-sm text-teal-200 leading-relaxed">
                      <strong className="font-semibold text-teal-100">Análise Financeira:</strong> Baseada em seu histórico e padrões de investimento, identificamos oportunidades para otimização da sua carteira em linha com seus objetivos.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Assets and Investments */}
          <div className="group hover:bg-indigo-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-3.5 shadow-md">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-indigo-400 transition-colors flex items-center">
                  Patrimônio e Investimentos
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('assets'))}
                </div>
                
                {dataSource === 'supabase' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Diversificação', 'Alocação', 'Liquidez'].map(tag => (
                      <Badge key={tag} variant="outline" className="bg-indigo-900/30 text-indigo-300 border-indigo-700/30">
                        <ChartBar className="h-3 w-3 mr-1.5" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Life Goals */}
          <div className="group hover:bg-amber-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-3.5 shadow-md">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-amber-400 transition-colors flex items-center">
                  Objetivos Financeiros
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('goals'))}
                </div>
                
                {dataSource === 'supabase' && (
                  <div className="mt-3 p-3.5 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-amber-700/30">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm text-amber-200 leading-relaxed">
                          <strong className="font-semibold text-amber-100">Projeção Financeira:</strong> As análises indicam que seus objetivos estão alinhados com sua capacidade financeira atual e potencial de crescimento.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="rounded-full h-12 w-12 border-2 border-amber-500/50 flex items-center justify-center">
                          <Award className="h-6 w-6 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Age and Timeline */}
          <div className="group hover:bg-indigo-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-3.5 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-400 transition-colors flex items-center">
                  Horizonte de Investimentos
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('timeline'))}
                </div>
                
                {(dataSource === 'supabase' && clientData?.clientAge) && (
                  <div className="mt-3 flex items-center">
                    <div className="rounded-full bg-blue-900/30 border border-blue-700/30 px-4 py-2 flex items-center">
                      <User className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-blue-300">Idade atual: <strong className="text-blue-200">{clientData.clientAge} anos</strong></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Risk Profile */}
          <div className="group hover:bg-red-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-red-600 to-red-700 p-3.5 shadow-md">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-red-400 transition-colors flex items-center">
                  Perfil de Risco
                  {dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  {enhanceText(getSectionContent('risk'))}
                </div>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-400 font-medium">Conservador</span>
                      <span className="text-gray-400 font-medium">Agressivo</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: "55%"}}></div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-sm text-gray-400">Capacidade de Risco</span>
                      <span className="text-sm font-medium text-gray-300">55%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-2.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: "42%"}}></div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-sm text-gray-400">Tolerância a Risco</span>
                      <span className="text-sm font-medium text-gray-300">42%</span>
                    </div>
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
const getRealPersonalInsightsData = (props: PersonalInsightsModuleProps) => {
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
    const clientAge = extractAge(summary);
    
    // Extract sections using keyword matching
    const sections = {
      professional: extractSectionFromText(summary, TOPIC_KEYWORDS.professional),
      financial: extractSectionFromText(summary, TOPIC_KEYWORDS.financial),
      assets: extractSectionFromText(summary, TOPIC_KEYWORDS.assets),
      goals: extractSectionFromText(summary, TOPIC_KEYWORDS.goals),
      timeline: extractSectionFromText(summary, TOPIC_KEYWORDS.timeline),
      risk: extractSectionFromText(summary, TOPIC_KEYWORDS.risk)
    };
    
    console.log("Processing client summary:", clientSummary);
    console.log("Extracted sections:", sections);
    
    return {
      summary,
      tags,
      investor_name,
      sections,
      clientAge
    };
  } catch (error) {
    console.error("Error processing client summary:", error);
    return null;
  }
};

// Get synthetic data as a fallback
const getSyntheticPersonalInsightsData = (props: PersonalInsightsModuleProps) => {
  return {
    summary: "Cliente com perfil conservador, busca estabilidade financeira e renda passiva. Trabalha no setor de tecnologia com planos de aposentadoria em 15 anos.",
    tags: ["Tecnologia", "Conservador", "Renda Passiva"],
    investor_name: "Cliente Exemplo",
    sections: {
      professional: "Trabalha no setor de tecnologia como desenvolvedor sênior. Busca equilibrar carreira e qualidade de vida.",
      financial: "Perfil financeiro conservador, priorizando segurança e fluxo de caixa sustentável.",
      assets: "Carteira diversificada com foco em renda fixa e dividendos, começando a explorar renda variável.",
      goals: "Planeja aposentadoria antecipada e deseja manter padrão de vida atual com renda passiva.",
      timeline: "Horizonte de investimento de longo prazo, com planos para independência financeira em 15 anos.",
      risk: "Perfil conservador a moderado, com tolerância limitada a volatilidade de curto prazo."
    },
    clientAge: "35"
  };
};

// Create the enhanced module with data safety
const PersonalInsightsModule = withSafeData(
  PersonalInsightsModuleBase,
  getRealPersonalInsightsData,
  getSyntheticPersonalInsightsData,
  'supabase'
);

export default PersonalInsightsModule;
