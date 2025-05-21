
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the available feature flags
export type FeatureFlag = 
  | 'synthetic_data' 
  | 'openfinance' 
  | 'beta_features'
  | 'advanced_insights'
  | 'financial_plan'
  | 'behavioral_finance';

interface FeatureFlagContextType {
  flags: Record<FeatureFlag, boolean>;
  enableFlag: (flag: FeatureFlag) => void;
  disableFlag: (flag: FeatureFlag) => void;
  toggleFlag: (flag: FeatureFlag) => void;
  isEnabled: (flag: FeatureFlag) => boolean;
}

// Default state for feature flags
const defaultFlags: Record<FeatureFlag, boolean> = {
  synthetic_data: false,
  openfinance: false,
  beta_features: true,
  advanced_insights: false,
  financial_plan: false,
  behavioral_finance: false
};

// Create the context
const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: defaultFlags,
  enableFlag: () => {},
  disableFlag: () => {},
  toggleFlag: () => {},
  isEnabled: () => false
});

// Hook to use the feature flag context
export const useFeatureFlags = () => useContext(FeatureFlagContext);

// Provider component
export const FeatureFlagProvider = ({ children, initialFlags = {} }: { 
  children: ReactNode;
  initialFlags?: Partial<Record<FeatureFlag, boolean>>;
}) => {
  // Merge default flags with provided initial flags
  const [flags, setFlags] = useState<Record<FeatureFlag, boolean>>({
    ...defaultFlags,
    ...initialFlags
  });
  
  // Enable a flag
  const enableFlag = (flag: FeatureFlag) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      [flag]: true
    }));
  };
  
  // Disable a flag
  const disableFlag = (flag: FeatureFlag) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      [flag]: false
    }));
  };
  
  // Toggle a flag
  const toggleFlag = (flag: FeatureFlag) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      [flag]: !prevFlags[flag]
    }));
  };
  
  // Check if a flag is enabled
  const isEnabled = (flag: FeatureFlag) => flags[flag];
  
  return (
    <FeatureFlagContext.Provider value={{
      flags,
      enableFlag,
      disableFlag,
      toggleFlag,
      isEnabled
    }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
