
// Export all UI components from a central location
// This helps standardize imports across the application

// Base UI components
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
export { Button } from './button';
export { Badge } from './badge';
export { Progress } from './progress';
export { SafeProgress } from './safe-progress';
export { Input } from './input';
export { Label } from './label';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
export { Popover, PopoverContent, PopoverTrigger } from './popover';

// Use these exports in all components to ensure consistency and reduce errors
