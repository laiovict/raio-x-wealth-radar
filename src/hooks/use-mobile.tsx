
import { useState, useEffect } from 'react';

export function useMobileBreakpoint(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < breakpoint);

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);
  
  return isMobile;
}
