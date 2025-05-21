import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Define the structure of our feature flags
export interface FeatureFlags {
  synthetic_data: boolean;
  enable_metrics: boolean;
  dashboard_debug: boolean;
  advanced_insights: boolean;
  steve_jobs: boolean;
  openfinance: boolean; // Added openfinance flag
}

// Establish the default state for all flags
export const defaultFlags: FeatureFlags = {
  synthetic_data: true,
  enable_metrics: true,
  dashboard_debug: false,
  advanced_insights: true,
  steve_jobs: true,
  openfinance: false, // Default to false
};

// Create a context with the default flags
interface FeatureFlagContextProps {
  flags: FeatureFlags;
  enableFlag: (flag: keyof FeatureFlags) => void;
  disableFlag: (flag: keyof FeatureFlags) => void;
  toggleFlag: (flag: keyof FeatureFlags) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextProps>({
  flags: defaultFlags,
  enableFlag: () => {},
  disableFlag: () => {},
  toggleFlag: () => {},
});

// Provider component that wraps the app and provides the flag context
interface FeatureFlagProviderProps {
  children: React.ReactNode;
  initialFlags?: Partial<FeatureFlags>;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ 
  children, 
  initialFlags 
}) => {
  // Initialize state with default flags and any initial flags passed in
  const [flags, setFlags] = useState<FeatureFlags>({
    ...defaultFlags,
    ...(initialFlags || {})
  });

  // Load flags from localStorage on mount
  useEffect(() => {
    const loadedFlags: Partial<FeatureFlags> = {};
    let hasChanges = false;
    
    (Object.keys(defaultFlags) as Array<keyof FeatureFlags>).forEach(flag => {
      const savedValue = localStorage.getItem(`featureFlag_${flag}`);
      if (savedValue) {
        loadedFlags[flag] = savedValue === 'enabled';
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      setFlags(prevFlags => ({ ...prevFlags, ...loadedFlags }));
    }
  }, []);

  // Enable a feature flag
  const enableFlag = useCallback((flag: keyof FeatureFlags) => {
    setFlags(prevFlags => ({ ...prevFlags, [flag]: true }));
    localStorage.setItem(`featureFlag_${flag}`, 'enabled');
  }, []);

  // Disable a feature flag
  const disableFlag = useCallback((flag: keyof FeatureFlags) => {
    setFlags(prevFlags => ({ ...prevFlags, [flag]: false }));
    localStorage.setItem(`featureFlag_${flag}`, 'disabled');
  }, []);

  // Toggle a feature flag
  const toggleFlag = useCallback((flag: keyof FeatureFlags) => {
    setFlags(prevFlags => ({ ...prevFlags, [flag]: !prevFlags[flag] }));
    localStorage.setItem(`featureFlag_${flag}`, flags[flag] ? 'disabled' : 'enabled');
  }, [flags]);

  // Provide the context value
  const value: FeatureFlagContextProps = {
    flags,
    enableFlag,
    disableFlag,
    toggleFlag,
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// Custom hook to consume the feature flag context
export const useFeatureFlags = () => {
  return useContext(FeatureFlagContext);
};
