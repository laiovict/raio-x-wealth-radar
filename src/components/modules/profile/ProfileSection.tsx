
import React from 'react';
import { cn } from '@/lib/utils';
import ProfileTag from './ProfileTag';

interface ProfileSectionProps {
  title: string;
  content: string;
  tags?: string[] | string;
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  title, 
  content, 
  tags, 
  className 
}) => {
  // Process tags to ensure they're always an array
  const processTags = (): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    
    // If it's a string, split by comma or semicolon
    return tags.split(/[,;]/).map(tag => tag.trim()).filter(Boolean);
  };
  
  const tagList = processTags();
  
  return (
    <div className={cn("mb-4", className)}>
      <h3 className="text-md font-medium text-indigo-300 mb-1">
        {title}
      </h3>
      <p className="text-gray-200 mb-2 whitespace-pre-line">
        {content}
      </p>
      {tagList.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {tagList.map((tag, index) => (
            <ProfileTag key={index} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
