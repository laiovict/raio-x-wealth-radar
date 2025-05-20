
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlanFooter = () => {
  return (
    <div className="mt-6 flex justify-center">
      <Button 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        onClick={() => console.log("Download full financial plan")}
      >
        Ver Plano Financeiro Completo <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlanFooter;
