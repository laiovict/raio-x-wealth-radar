
import { useState, useEffect } from 'react';
import { ClientSummary } from '@/types/raioXTypes';

interface ProfileSection {
  title: string;
  content: string;
  tags?: string[] | string;
}

export const useProfileSections = (
  clientSummary: ClientSummary | undefined,
  defaultSummary: string = ''
) => {
  const [sections, setSections] = useState<ProfileSection[]>([]);
  
  useEffect(() => {
    const extractSections = () => {
      // Default sections if no data is available
      if (!clientSummary?.summary && !defaultSummary) {
        return [
          { 
            title: 'Perfil do Investidor',
            content: 'Informações sobre o perfil não disponíveis.',
            tags: []
          }
        ];
      }
      
      // Use provided summary or default
      const summaryText = clientSummary?.summary || defaultSummary;
      
      // Try to parse sections from summary text
      // Format expected: "## Section Title\nContent\n#tags: tag1, tag2"
      try {
        const sectionRegex = /##\s*(.*?)\n([\s\S]*?)(?=##|$)/g;
        const extractedSections: ProfileSection[] = [];
        let match;
        
        while ((match = sectionRegex.exec(summaryText))) {
          const title = match[1].trim();
          const fullContent = match[2].trim();
          
          // Extract tags if they exist
          const tagsRegex = /#tags:\s*(.*?)(?=\n|$)/;
          const tagsMatch = fullContent.match(tagsRegex);
          
          let content = fullContent;
          let tags: string[] = [];
          
          if (tagsMatch) {
            // Remove tag line from content
            content = fullContent.replace(tagsMatch[0], '').trim();
            // Extract tags
            tags = tagsMatch[1].split(',').map(tag => tag.trim());
          }
          
          extractedSections.push({
            title,
            content,
            tags
          });
        }
        
        // If no sections were found, create a default one with the whole summary
        if (extractedSections.length === 0) {
          extractedSections.push({
            title: 'Perfil do Investidor',
            content: summaryText,
            tags: clientSummary?.tags || []
          });
        }
        
        return extractedSections;
      } catch (error) {
        console.error('Error parsing profile sections:', error);
        return [
          { 
            title: 'Perfil do Investidor',
            content: summaryText,
            tags: clientSummary?.tags || []
          }
        ];
      }
    };
    
    setSections(extractSections());
  }, [clientSummary, defaultSummary]);
  
  return { sections };
};

export default useProfileSections;
