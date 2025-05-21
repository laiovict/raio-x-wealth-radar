
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ClientSelector from "@/components/ClientSelector";
import RaioXDashboard from "@/components/RaioXDashboard";
import { RaioXProvider } from "@/context/RaioXContext";
import OpenFinanceControl from "@/components/OpenFinanceControl";
import LoadingScreen from "@/components/LoadingScreen";
import TopNavigation from "@/components/TopNavigation";
import TopControls from "@/components/TopControls";
import { useAuthentication } from "@/hooks/useAuthentication";
import { getMonthlyReportUrl } from "@/utils/reportUtils";
import { FeatureFlagProvider } from "@/context/FeatureFlagContext";

const Index = () => {
  // States
  const [hasOpenFinance, setHasOpenFinance] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [mediaType, setMediaType] = useState("pdf");
  
  // Custom authentication hook
  const {
    isLoggedIn,
    userRole,
    loading,
    userData,
    selectedClient,
    handleClientSelect,
    handleLogout
  } = useAuthentication();
  
  useEffect(() => {
    // Setup body styling
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    // Listen for custom event for OpenFinance activation
    const handleOpenFinanceEvent = () => {
      document.dispatchEvent(new CustomEvent('activate-openfinance'));
    };
    
    document.addEventListener('activate-openfinance', handleOpenFinanceEvent);
    
    return () => {
      document.removeEventListener('activate-openfinance', handleOpenFinanceEvent);
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  // Handle PDF preview functionality
  const handlePdfPreview = (type: string) => {
    setMediaType(type);
    setShowPdfPreview(true);
  };
  
  // Handle logo click - return to home/default page
  const handleLogoClick = () => {
    // Reset to default view
    document.dispatchEvent(new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'overview' }
    }));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading screen if still loading
  if (loading) {
    return <LoadingScreen forceShow={true} />;
  }

  // Redirect to auth if not logged in
  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <FeatureFlagProvider initialFlags={{
      synthetic_data: true, // Changed to true to enable the Steve Jobs experience
      openfinance: hasOpenFinance,
      beta_features: true,
      steve_jobs: true // Added new feature flag for Steve Jobs tab
    }}>
      <RaioXProvider 
        hasOpenFinance={hasOpenFinance}
        selectedClient={selectedClient}
      >
        <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] text-white">
          <TopNavigation 
            selectedClient={selectedClient}
            userData={userData}
            handleLogout={handleLogout}
            handleLogoClick={handleLogoClick}
            getMonthlyReportUrl={() => getMonthlyReportUrl(selectedClient)}
          />
          
          <div className="flex-grow overflow-auto">
            <div className="container mx-auto px-3 sm:px-6 pt-4">
              <div className="mb-6">
                {userRole === "advisor" && <ClientSelector onClientSelect={handleClientSelect} />}
                
                {selectedClient && (
                  <TopControls 
                    isAdvisor={userRole === "advisor"} 
                    onOpenFinanceToggle={() => setHasOpenFinance(!hasOpenFinance)} 
                    hasOpenFinance={hasOpenFinance}
                  />
                )}
              </div>

              <RaioXDashboard
                showPdfPreview={showPdfPreview}
                onClosePdfPreview={() => setShowPdfPreview(false)}
                mediaType={mediaType}
                isClientFull={hasOpenFinance}
                onOpenFinanceActivate={() => setHasOpenFinance(true)}
                userRole={userRole}
              />
            </div>
          </div>
          
          <OpenFinanceControl
            hasOpenFinance={hasOpenFinance}
            setHasOpenFinance={setHasOpenFinance}
          />
        </div>
      </RaioXProvider>
    </FeatureFlagProvider>
  );
};

export default Index;
