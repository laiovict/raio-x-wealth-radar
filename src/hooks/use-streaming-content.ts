
import { useState, useEffect, useCallback } from 'react';

export function useStreamingContent(initialState: boolean = false, delay: number = 1000, autoComplete: boolean = true, duration: number = 3000) {
  const [isStreaming, setIsStreaming] = useState(initialState);
  const [isComplete, setIsComplete] = useState(false);
  
  // Start streaming effect after the specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStreaming(true);
      
      // If autoComplete is true, automatically set isComplete after duration
      if (autoComplete) {
        const completeTimer = setTimeout(() => {
          setIsComplete(true);
          setIsStreaming(false);
        }, duration);
        
        return () => clearTimeout(completeTimer);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, autoComplete, duration]);
  
  // Manual way to complete streaming
  const handleStreamingComplete = useCallback(() => {
    setIsComplete(true);
    setIsStreaming(false);
  }, []);
  
  // Reset the streaming state
  const resetStreaming = useCallback(() => {
    setIsStreaming(false);
    setIsComplete(false);
  }, []);

  return {
    isStreaming,
    isComplete,
    handleStreamingComplete,
    resetStreaming
  };
}
