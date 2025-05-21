
import React from 'react';
import { ArrowRight, AlertCircle, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface TopRisksProps {
  finData: any;
  useSyntheticData?: boolean;
}

const TopRisks = ({ finData, useSyntheticData = false }: TopRisksProps) => {
  // For real data in the Beta version, we'd use a different source, but for now we just check the flag
  const dataSource = useSyntheticData ? 'synthetic' : 'calculated';
  
  return (
    <div className="mt-8">
      <div className="mb-4">
        <div className="text-lg font-medium text-white">
          Principais riscos identificados
          <TypeSafeDataSourceTag source={dataSource} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-900/10">
          <div className="flex items-start mb-3">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Concentração excessiva</div>
              <div className="text-sm text-gray-400 mb-3">
                38% de seus recursos estão em uma única instituição financeira,
                aumentando o risco de exposição.
              </div>
              <Button variant="outline" size="sm" className="text-xs border-red-500/20 hover:bg-red-900/30 hover:text-white">
                Ver alternativas <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-orange-500/20 bg-orange-900/10">
          <div className="flex items-start mb-3">
            <ShieldAlert className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Falta de proteção</div>
              <div className="text-sm text-gray-400 mb-3">
                Não identificamos seguros de vida ou planos de previdência
                adequados para sua faixa de renda.
              </div>
              <Button variant="outline" size="sm" className="text-xs border-orange-500/20 hover:bg-orange-900/30 hover:text-white">
                Explorar opções <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-900/10">
          <div className="flex items-start mb-3">
            <Zap className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Sensibilidade a juros</div>
              <div className="text-sm text-gray-400 mb-3">
                Seu portfólio tem alta sensibilidade a mudanças nas taxas de juros,
                o que pode impactar seus retornos.
              </div>
              <Button variant="outline" size="sm" className="text-xs border-yellow-500/20 hover:bg-yellow-900/30 hover:text-white">
                Ver simulações <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10">
          <div className="flex items-start mb-3">
            <AlertCircle className="h-5 w-5 text-purple-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Baixa liquidez</div>
              <div className="text-sm text-gray-400 mb-3">
                25% dos seus ativos têm baixa liquidez, o que pode ser um risco
                em caso de necessidade financeira imediata.
              </div>
              <Button variant="outline" size="sm" className="text-xs border-purple-500/20 hover:bg-purple-900/30 hover:text-white">
                Melhorar liquidez <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRisks;
