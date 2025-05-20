
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, Download, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileNavigationProps {
  selectedClient: number | null;
  userData: { clientName: string; clientId?: number };
  handleLogout: () => void;
  getMonthlyReportUrl: () => string;
  hasOpenFinance?: boolean;
  onOpenFinanceToggle?: () => void;
}

const MobileNavigation = ({
  selectedClient,
  userData,
  handleLogout,
  getMonthlyReportUrl,
  hasOpenFinance = false,
  onOpenFinanceToggle
}: MobileNavigationProps) => {
  const navigate = useNavigate();
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
    <nav className="backdrop-blur-md bg-black/20 border-b border-white/5 px-4 py-3 flex items-center justify-between gap-2 sticky top-0 z-10">
      {/* Left section - Logo only */}
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
          alt="Reinvent Logo"
          className="h-7 w-auto"
        />
      </div>
      
      {/* Center section - Raio-X Financeiro title */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg font-light tracking-wider text-white">
          Raio-X <span className="font-medium">Financeiro</span>
        </h1>
      </div>
      
      {/* Right section - Mobile menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
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
                {onOpenFinanceToggle && (
                  <div className="flex items-center justify-between mb-3 px-4 py-3 rounded-lg bg-opacity-10 bg-white">
                    <div className="flex items-center gap-2">
                      <Shield className={`h-4 w-4 ${hasOpenFinance ? 'text-green-400' : 'text-gray-300'}`} />
                      <span className={`text-sm ${hasOpenFinance ? 'text-green-400' : 'text-gray-300'}`}>Open Finance</span>
                    </div>
                    <Button 
                      variant={hasOpenFinance ? "default" : "outline"}
                      size="sm"
                      className={hasOpenFinance ? "bg-green-600 hover:bg-green-700" : "border-white/20"}
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenFinanceToggle();
                      }}
                    >
                      {hasOpenFinance ? "Ativo" : "Ativar"}
                    </Button>
                  </div>
                )}
                
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
    </nav>
  );
};

export default MobileNavigation;
