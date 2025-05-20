
import React from 'react';
import { Globe as LucideGlobe } from 'lucide-react';

export const Globe: React.FC<React.ComponentProps<typeof LucideGlobe>> = (props) => {
  return <LucideGlobe {...props} />;
};
