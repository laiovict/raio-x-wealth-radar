
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const ClientSelector = () => {
  return (
    <div className="mb-8">
      <Card className="w-full bg-gradient-to-r from-blue-900/60 to-indigo-900/60 backdrop-blur-sm border-white/20 p-6 text-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Sparkles className="h-6 w-6 text-blue-300" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">
              Diagnóstico Financeiro Reinvent
            </h2>
            <p className="text-blue-100/90">
              Desenvolvido com IA avançada para transformar sua vida financeira. Acreditamos que podemos 
              mudar o mundo fornecendo ferramentas que capacitam pessoas a ter controle total sobre suas 
              finanças.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClientSelector;
