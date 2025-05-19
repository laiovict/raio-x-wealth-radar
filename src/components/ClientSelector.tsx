
import { Card } from "@/components/ui/card";

const ClientSelector = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-semibold text-white">
          Bem-vindo ao seu Diagnóstico Financeiro
        </h2>
      </div>
      <Card className="w-full sm:w-72 bg-white/10 backdrop-blur-sm border-white/20 p-4 text-white">
        <p className="font-medium">Sua visão personalizada</p>
      </Card>
    </div>
  );
};

export default ClientSelector;
