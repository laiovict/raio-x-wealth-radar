
import React, { useEffect } from 'react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

interface CalendlyWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyWidget = ({ isOpen, onClose }: CalendlyWidgetProps) => {
  useEffect(() => {
    // Initialize Calendly when the component mounts
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        // Clean up script when component unmounts
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-[#0f0f11] text-white border-t border-white/10">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-light">
                Agendar <span className="font-medium">Consultoria Humana</span>
              </DrawerTitle>
              <DrawerClose onClick={onClose}>
                <X className="h-5 w-5 text-white/70 hover:text-white" />
              </DrawerClose>
            </div>
            <DrawerDescription className="text-white/70">
              Escolha um horário conveniente para sua consultoria financeira
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 h-[600px] overflow-hidden">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/your-advisor" 
              style={{ minWidth: '320px', height: '550px' }}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CalendlyWidget;
