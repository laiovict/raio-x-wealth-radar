
import React from 'react';
import { CarouselItem } from '@/components/ui/carousel';

interface CarouselSlideBaseProps {
  children: React.ReactNode;
}

const CarouselSlideBase: React.FC<CarouselSlideBaseProps> = ({ children }) => {
  return (
    <CarouselItem className="px-2">
      {children}
    </CarouselItem>
  );
};

export default CarouselSlideBase;
