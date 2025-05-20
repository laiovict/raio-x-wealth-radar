
import { useState, useEffect } from 'react';

export function useStreamingContent(initialState: boolean = false, delay: number = 1000) {
  const [isStreaming, setIsStreaming] = useState(initialState);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStreaming(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const handleStreamingComplete = () => {
    setIsComplete(true);
  };

  return {
    isStreaming,
    isComplete,
    handleStreamingComplete
  };
}
