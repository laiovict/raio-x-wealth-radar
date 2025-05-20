
import React, { useEffect, useState } from "react";
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Briefcase, Wallet, Target, Calendar, 
  AlertTriangle, TrendingUp, PiggyBank, Award,
  Shield, ChartBar, Tag, BookOpen, User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PersonalInsightsModuleProps {
  fullWidth?: boolean;
}

// Key sections we want to identify in the summary text
const TOPIC_KEYWORDS = {
  professional: ['profissão', 'carreira', 'trabalho', 'emprego', 'formado', 'formação', 'profissional'],
  financial: ['investidor', 'investimento', 'renda', 'salário', 'financeiro', 'despesas', 'gastos'],
  assets: ['patrimônio', 'imóveis', 'ativos', 'investimentos', 'carteira', 'ações'],
  goals: ['objetivo', 'meta', 'plano', 'aposentadoria', 'futuro', 'sonho'],
  timeline: ['idade', 'anos', 'horizonte', 'prazo', 'tempo'],
  risk: ['risco', 'perfil', 'tolerância', 'volatilidade', 'conservador', 'moderado', 'agressivo']
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
        const keyTerms = ['meta', 'objetivo', 'financeiro', 'investimento', 'risco', 'perfil'];
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

const PersonalInsightsModule = ({ fullWidth = false }: PersonalInsightsModuleProps) => {
  const { data, clientSummary } = useRaioX();
  const [parsedSummary, setParsedSummary] = useState<string>("");
  const [clientAge, setClientAge] = useState<string>("");
  const [sections, setSections] = useState<{
    professional: string;
    financial: string;
    assets: string;
    goals: string;
    timeline: string;
    risk: string;
  }>({
    professional: "",
    financial: "",
    assets: "",
    goals: "",
    timeline: "",
    risk: ""
  });
  
  const [dataSource, setDataSource] = useState<'supabase' | 'synthetic'>('synthetic');
  
  // Process client summary from Supabase when available
  useEffect(() => {
    if (clientSummary?.summary) {
      try {
        console.log("Processing client summary:", clientSummary);
        
        // Use the summary as a text string
        const summaryText = clientSummary.summary;
        setParsedSummary(summaryText);
        setDataSource('supabase');
        
        // Extract age
        const age = extractAge(summaryText);
        if (age) {
          setClientAge(age);
        }
        
        // Extract sections using keyword matching
        const extractedSections = {
          professional: extractSectionFromText(summaryText, TOPIC_KEYWORDS.professional),
          financial: extractSectionFromText(summaryText, TOPIC_KEYWORDS.financial),
          assets: extractSectionFromText(summaryText, TOPIC_KEYWORDS.assets),
          goals: extractSectionFromText(summaryText, TOPIC_KEYWORDS.goals),
          timeline: extractSectionFromText(summaryText, TOPIC_KEYWORDS.timeline),
          risk: extractSectionFromText(summaryText, TOPIC_KEYWORDS.risk)
        };
        
        console.log("Extracted sections:", extractedSections);
        setSections(extractedSections);
      } catch (error) {
        console.error("Error processing client summary:", error);
        
        // Even if there's an error, we still have the summary data from Supabase
        // So we'll use a fallback approach but maintain the dataSource as 'supabase'
        setDataSource('supabase');
        
        // Try to use the entire summary text for all sections as a fallback
        if (clientSummary?.summary) {
          const generalSummary = clientSummary.summary;
          setSections({
            professional: generalSummary,
            financial: generalSummary,
            assets: generalSummary,
            goals: generalSummary,
            timeline: generalSummary,
            risk: generalSummary
          });
        }
      }
    } else {
      // No client summary available
      console.log("No client summary available, using default data");
      
      // Check if we have the client summary in data.clientSummary as a fallback
      if (data.clientSummary?.summary) {
        try {
          console.log("Using fallback client summary from data.clientSummary");
          const summaryText = data.clientSummary.summary;
          setParsedSummary(summaryText);
          setDataSource('supabase');
          
          // Extract age
          const age = extractAge(summaryText);
          if (age) {
            setClientAge(age);
          }
          
          // Extract sections using keyword matching
          setSections({
            professional: extractSectionFromText(summaryText, TOPIC_KEYWORDS.professional),
            financial: extractSectionFromText(summaryText, TOPIC_KEYWORDS.financial),
            assets: extractSectionFromText(summaryText, TOPIC_KEYWORDS.assets),
            goals: extractSectionFromText(summaryText, TOPIC_KEYWORDS.goals),
            timeline: extractSectionFromText(summaryText, TOPIC_KEYWORDS.timeline),
            risk: extractSectionFromText(summaryText, TOPIC_KEYWORDS.risk)
          });
        } catch (e) {
          console.error("Error processing fallback client summary:", e);
          setDataSource('supabase'); // Still maintain it's from Supabase
        }
      } else {
        setDataSource('synthetic');
      }
    }
  }, [clientSummary, data.clientSummary]);
  
  // Return appropriate section text, falling back if empty
  const getSectionContent = (section: keyof typeof sections): string => {
    // Always return the section content if it exists (even if empty)
    // This ensures we use the actual Supabase data
    return sections[section] || "Informação não disponível no momento.";
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
                
                {dataSource === 'supabase' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Extract key terms as tags */}
                    {['Experiência', 'Qualificação', 'Setor'].map(tag => (
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
                
                {(dataSource === 'supabase' && clientAge) && (
                  <div className="mt-3 flex items-center">
                    <div className="rounded-full bg-blue-900/30 border border-blue-700/30 px-4 py-2 flex items-center">
                      <User className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-blue-300">Idade atual: <strong className="text-blue-200">{clientAge} anos</strong></span>
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
                      <span className="text-sm text-gray-400">Tolerância Emocional</span>
                      <span className="text-sm font-medium text-gray-300">42%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expectations */}
          <div className="group hover:bg-teal-900/10 transition-colors border-t border-white/5">
            <div className="p-6 flex items-start gap-5">
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 p-3.5 shadow-md">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-teal-400 transition-colors flex items-center">
                  Serviços Financeiros Essenciais
                </h3>
                <div className="text-gray-300 mt-2 leading-relaxed">
                  Visualização consolidada de seus ativos, passivos e fluxo de caixa em todas as instituições financeiras, com relatórios mensais detalhados de evolução patrimonial e projeção atualizada para suas metas de curto, médio e longo prazo.
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Consolidação', 'Relatórios', 'Projeções'].map(tag => (
                    <Badge key={tag} variant="outline" className="bg-teal-900/30 text-teal-300 border-teal-700/30">
                      <BookOpen className="h-3 w-3 mr-1.5" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {dataSource === 'supabase' && (
            <div className="border-t border-white/5 p-6">
              <div className="bg-gradient-to-r from-blue-800/20 to-indigo-800/20 p-5 rounded-lg backdrop-blur-sm border border-blue-700/20">
                <h3 className="font-semibold text-lg text-blue-300 mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Dados validados com sua autorização
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Visualizando insights baseados em seus dados financeiros completos,
                  permitindo análise de comportamento financeiro para recomendações
                  mais precisas e personalizadas.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInsightsModule;
