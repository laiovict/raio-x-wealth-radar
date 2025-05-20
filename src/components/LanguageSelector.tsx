
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl">
        <DropdownMenuItem
          onClick={() => setLanguage('pt')}
          className={`cursor-pointer ${language === 'pt' || language === 'pt-BR' ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
        >
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
