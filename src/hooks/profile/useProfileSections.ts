
import { useMemo } from 'react';
import { ClientSummary } from '@/types/raioXTypes';
import useTextEnhancement from '@/hooks/profile/useTextEnhancement';

interface ProfileSection {
  title: string;
  content: string;
  tags: string[];
}

export const useProfileSections = (clientSummary?: ClientSummary | null, defaultSummary: string = '') => {
  // Use the client summary if available, otherwise fallback to default
  const summaryText = useMemo(() => {
    return clientSummary?.summary || defaultSummary;
  }, [clientSummary, defaultSummary]);
  
  // Extract sections and their content from the markdown-like summary text
  const sections = useMemo(() => {
    if (!summaryText) return [];
    
    const result: ProfileSection[] = [];
    const sectionRegex = /## ([^\n]+)\n((?:(?!## |#tags:).|\n)+)(?:#tags: ([^\n]+))?/g;
    
    let match;
    while ((match = sectionRegex.exec(summaryText)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      const tagsText = match[3] || '';
      
      // Parse tags
      const tags = tagsText
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      result.push({ title, content, tags });
    }
    
    return result;
  }, [summaryText]);
  
  // Extract all unique tags from the summary
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sections.forEach(section => {
      section.tags.forEach(tag => {
        tags.add(tag);
      });
    });
    return Array.from(tags);
  }, [sections]);
  
  return {
    sections,
    allTags,
    hasSummary: summaryText.length > 0
  };
};

export default useProfileSections;
