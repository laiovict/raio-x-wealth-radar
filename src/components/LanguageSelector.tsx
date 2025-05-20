
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

// This component is kept for backward compatibility but will only display PT-BR
const LanguageSelector = () => {
  const { language } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="text-white hover:bg-white/10"
      disabled
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">Português</span>
    </Button>
  );
};

export default LanguageSelector;
