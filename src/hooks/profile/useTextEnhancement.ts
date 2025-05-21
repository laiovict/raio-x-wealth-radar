
import { useState, useEffect } from 'react';

interface TextEnhancementOptions {
  highlightTerms?: string[];
  boldTerms?: string[];
  linkTerms?: Record<string, string>; // term: url
}

export const useTextEnhancement = (
  text: string,
  options: TextEnhancementOptions = {}
) => {
  const [enhancedText, setEnhancedText] = useState(text);
  
  useEffect(() => {
    if (!text) {
      setEnhancedText('');
      return;
    }
    
    let processedText = text;
    const { highlightTerms = [], boldTerms = [], linkTerms = {} } = options;
    
    // Apply bold formatting
    if (boldTerms.length > 0) {
      const boldRegex = new RegExp(`(${boldTerms.join('|')})`, 'gi');
      processedText = processedText.replace(boldRegex, '<strong>$1</strong>');
    }
    
    // Apply highlighting
    if (highlightTerms.length > 0) {
      const highlightRegex = new RegExp(`(${highlightTerms.join('|')})`, 'gi');
      processedText = processedText.replace(highlightRegex, '<span class="text-indigo-300">$1</span>');
    }
    
    // Apply links
    Object.entries(linkTerms).forEach(([term, url]) => {
      const linkRegex = new RegExp(`(${term})`, 'gi');
      processedText = processedText.replace(linkRegex, `<a href="${url}" class="text-blue-400 hover:underline">$1</a>`);
    });
    
    setEnhancedText(processedText);
  }, [text, options]);
  
  return { 
    enhancedText,
    getEnhancedHTML: () => ({ __html: enhancedText })
  };
};

export default useTextEnhancement;
