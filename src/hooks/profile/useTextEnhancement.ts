
import { useMemo } from 'react';

interface TextEnhancementOptions {
  highlightTerms?: string[];
  boldTerms?: string[];
  maxLength?: number;
}

export const useTextEnhancement = (text: string | undefined, options: TextEnhancementOptions = {}) => {
  const { highlightTerms = [], boldTerms = [], maxLength } = options;
  
  const enhancedText = useMemo(() => {
    if (!text) return '';
    
    let processedText = text;
    
    // Trim text if maxLength is specified
    if (maxLength && text.length > maxLength) {
      processedText = `${text.substring(0, maxLength)}...`;
    }
    
    // Process highlighting and formatting
    // This is a simple implementation - could be expanded with more sophisticated formatting
    highlightTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      processedText = processedText.replace(regex, '<span class="text-indigo-300">$1</span>');
    });
    
    boldTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      processedText = processedText.replace(regex, '<strong>$1</strong>');
    });
    
    return processedText;
  }, [text, highlightTerms, boldTerms, maxLength]);
  
  return enhancedText;
};

export default useTextEnhancement;
