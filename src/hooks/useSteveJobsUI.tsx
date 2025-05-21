
import { useMemo } from 'react';
import { useFeatureFlags } from '@/context/FeatureFlagContext';

// Define types for Steve Jobs UI components and settings
type SteveJobsTheme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  borderStyle: string;
  cardStyle: string;
  headingStyle: string;
  buttonStyle: string;
};

// Hook to get steve jobs UI settings
export const useSteveJobsUI = (steveJobsMode = false) => {
  const { flags } = useFeatureFlags();

  const isEnabled = useMemo(() => {
    return steveJobsMode || flags.steve_jobs;
  }, [steveJobsMode, flags.steve_jobs]);

  const theme: SteveJobsTheme = useMemo(() => {
    return {
      primaryColor: '#6680FF', // Reinvent Blue
      secondaryColor: '#000000', // Black
      accentColor: '#FFFFFF', // White
      textColor: isEnabled ? 'text-white' : 'text-gray-900 dark:text-white',
      borderStyle: isEnabled ? 'border border-[#6680FF]/20' : 'border border-gray-200 dark:border-gray-800',
      cardStyle: isEnabled ? 'bg-gradient-to-br from-black to-[#111111]' : 'bg-white dark:bg-gray-900',
      headingStyle: isEnabled 
        ? 'text-xl font-semibold bg-gradient-to-r from-[#6680FF] to-white bg-clip-text text-transparent' 
        : 'text-xl font-semibold',
      buttonStyle: isEnabled 
        ? 'bg-gradient-to-r from-[#6680FF] to-[#4060DD] hover:from-[#5570EE] hover:to-[#3050CC] text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white',
    };
  }, [isEnabled]);

  return {
    isEnabled,
    theme
  };
};
