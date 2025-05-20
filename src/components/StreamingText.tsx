
import React, { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em ms por caractere
  delay?: number; // Atraso antes de começar a digitação
  className?: string;
  onComplete?: () => void; // Função de callback quando a digitação terminar
}

const StreamingText: React.FC<StreamingTextProps> = ({ 
  text, 
  speed = 20, 
  delay = 0, 
  className = "",
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    let timeout: number;
    
    // Atraso inicial antes de começar a digitação
    timeout = window.setTimeout(() => {
      setIsTyping(true);
      
      let index = 0;
      const interval = window.setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-1 h-4 bg-blue-500 ml-0.5 animate-pulse"></span>
      )}
    </span>
  );
};

export default StreamingText;
