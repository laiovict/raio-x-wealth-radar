
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Code, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { Download } from "lucide-react";

interface TopNavigationProps {
  selectedClient: number | null;
  userData: { clientName: string; clientId?: number };
  handleLogout: () => void;
  handleLogoClick: () => void;
  getMonthlyReportUrl: () => string;
}

const TopNavigation = ({
  selectedClient,
  userData,
  handleLogout,
  handleLogoClick,
  getMonthlyReportUrl
}: TopNavigationProps) => {
  const navigate = useNavigate();
  const isMobile = useMobileBreakpoint();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData?.clientName) return "UN";
    return userData.clientName.split(" ")
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  // Mobile menu items
  const menuItems = [
    {
      label: "API Docs",
      icon: <Code className="h-4 w-4 mr-2" />,
      onClick: () => navigate("/api-docs"),
      show: true
    },
    {
      label: "Relatório Mensal",
      icon: <Download className="h-4 w-4 mr-2" />,
      onClick: () => window.open(getMonthlyReportUrl(), '_blank'),
      show: !!selectedClient
    },
    {
      label: "Exportar PDF",
      icon: <Download className="h-4 w-4 mr-2" />,
      onClick: () => {
        document.dispatchEvent(new CustomEvent('navigate-to-tab', {
          detail: { tabId: 'pdf' }
        }));
      },
      show: !!selectedClient
    },
    {
      label: "Sair",
      icon: <ArrowLeft className="h-4 w-4 mr-2" />,
      onClick: handleLogout,
      show: true
    }
  ];

  return (
    <nav className="backdrop-blur-md bg-black/20 border-b border-white/5 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
      {/* Left section - Logo only */}
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img 
          src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
          alt="Reinvent Logo"
          className="h-7 md:h-8 w-auto"
        />
      </div>
      
      {/* Center section - Raio-X Financeiro title */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg md:text-xl font-light tracking-wider text-white">
          Raio-X <span className="font-medium">Financeiro</span>
        </h1>
      </div>
      
      {/* Right section - Action buttons */}
      <div className="flex items-center gap-2">
        {/* Desktop navigation */}
        <div className="hidden md:flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            className="bg-indigo-500/30 hover:bg-indigo-500/50 border-indigo-400/30 text-indigo-200 rounded-full text-sm font-normal px-5"
            onClick={() => navigate("/api-docs")}
          >
            <Code className="mr-2 h-4 w-4" />
            API Docs
          </Button>
        
          {selectedClient && (
            <Button 
              className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full text-sm font-normal px-5"
              onClick={() => window.open(getMonthlyReportUrl(), '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Relatório Mensal
            </Button>
          )}
          
          {/* Show PDF export for both advisor and client */}
          {selectedClient && (
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/10 rounded-full text-sm font-normal px-5"
              onClick={() => {
                document.dispatchEvent(new CustomEvent('navigate-to-tab', {
                  detail: { tabId: 'pdf' }
                }));
              }}
            >
              Exportar PDF
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
            onClick={handleLogout}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gradient-to-br from-[#171723] to-[#121218] border-l border-white/10 p-0">
            <div className="flex flex-col h-full py-6">
              <div className="px-6 mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Menu</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-5 w-5 text-white/70" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="px-4 py-2">
                  {menuItems.filter(item => item.show).map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 mb-1 rounded-md h-12 px-4"
                      onClick={() => {
                        setIsMenuOpen(false);
                        item.onClick();
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="px-6 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 bg-indigo-600/60">
                    <AvatarFallback className="text-sm text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{userData?.clientName || "Usuário"}</p>
                    <p className="text-xs text-gray-400">Conta</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* User avatar dropdown - always visible */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-0 h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 bg-indigo-600/60 hover:bg-indigo-600/80 transition-colors">
                <AvatarFallback className="text-sm text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gradient-to-br from-[#171723] to-[#121218] border border-white/10 text-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">{userData?.clientName || "Usuário"}</p>
                <p className="text-xs text-gray-400">Gerenciar Conta</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
              Preferências
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="text-white focus:bg-white/10 focus:text-white cursor-pointer"
              onClick={handleLogout}
            >
              Sair da conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopNavigation;
