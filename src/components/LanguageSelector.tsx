
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

// This component is kept for backward compatibility but will only display PT-BR
const LanguageSelector = () => {
  return (
    <span className="text-sm text-gray-400">PT-BR</span>
  );
};

export default LanguageSelector;
