
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ProfileTagProps {
  tag: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

const ProfileTag: React.FC<ProfileTagProps> = ({ 
  tag, 
  variant = 'default' 
}) => {
  // Process tag text to ensure it's properly formatted
  const processedTag = tag.trim();
  
  // Don't render empty tags
  if (!processedTag) return null;
  
  return (
    <Badge 
      variant={variant} 
      className="mr-1 mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none"
    >
      {processedTag}
    </Badge>
  );
};

export default ProfileTag;
