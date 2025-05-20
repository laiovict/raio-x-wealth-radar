
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, User, Search, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface Client {
  investor_account_on_brokerage_house: number;
  total_portfolio_value?: string;
}

interface ClientSelectorProps {
  onClientSelect?: (clientId: string) => void;
}

const ClientSelector = ({ onClientSelect }: ClientSelectorProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCombobox, setOpenCombobox] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetch unique client accounts from the investor_portfolio_summary table
        const { data, error } = await supabase
          .from('investor_portfolio_summary')
          .select('investor_account_on_brokerage_house, total_portfolio_value')
          .order('investor_account_on_brokerage_house', { ascending: true });

        if (error) {
          console.error('Error fetching clients:', error);
          return;
        }

        // Filter out duplicates based on account number
        const uniqueClients = data.filter((client, index, self) =>
          index === self.findIndex((c) => c.investor_account_on_brokerage_house === client.investor_account_on_brokerage_house)
        );

        setClients(uniqueClients);
      } catch (error) {
        console.error('Error in client fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (value: string) => {
    setSelectedClient(value);
    setOpenCombobox(false);
    console.log(`Selected client: ${value}`);
    
    // Store the selected client ID in localStorage
    localStorage.setItem("selectedClientId", value);
    
    // Ensure the callback is called with the selected client ID
    if (onClientSelect) {
      onClientSelect(value);
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.investor_account_on_brokerage_house.toString().includes(searchQuery)
  );

  return (
    <div className="mb-8">
      <Card className="w-full bg-gradient-to-r from-blue-900/60 to-indigo-900/60 backdrop-blur-sm border-white/20 p-6 text-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-blue-300" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                Diagnóstico Financeiro Reinvent
              </h2>
              <p className="text-blue-100/90">
                Desenvolvido com IA avançada para transformar sua vida financeira. Acreditamos que podemos 
                mudar o mundo fornecendo ferramentas que capacitam pessoas a ter controle total sobre suas 
                finanças.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {loading ? (
              <div className="text-sm text-blue-200">Carregando clientes...</div>
            ) : (
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label className="text-sm text-blue-200">Selecione o cliente:</label>
                
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full sm:w-[240px] justify-between bg-white/10 border-white/20 text-white"
                    >
                      {selectedClient
                        ? `Cliente ${selectedClient}`
                        : "Selecione um cliente"}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full sm:w-[240px] p-0 bg-gray-900 border-white/20">
                    <Command>
                      <CommandInput 
                        placeholder="Buscar cliente..." 
                        className="h-9 text-white bg-transparent" 
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado</CommandEmpty>
                        <CommandGroup>
                          {filteredClients.map((client) => (
                            <CommandItem
                              key={client.investor_account_on_brokerage_house}
                              value={client.investor_account_on_brokerage_house.toString()}
                              onSelect={handleClientChange}
                              className="text-white hover:bg-blue-900 cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedClient === client.investor_account_on_brokerage_house.toString()
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              Cliente {client.investor_account_on_brokerage_house}
                              {client.total_portfolio_value && ` - ${client.total_portfolio_value}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white w-full sm:w-auto"
              onClick={handleLogin}
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClientSelector;
