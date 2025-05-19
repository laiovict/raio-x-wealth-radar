
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const clients = [
  { id: "client1", name: "João Silva" },
  { id: "client2", name: "Ana Oliveira" },
  { id: "client3", name: "Marcos Santos" }
];

interface ClientSelectorProps {
  selectedClient: string;
  setSelectedClient: (clientId: string) => void;
}

const ClientSelector = ({ 
  selectedClient, 
  setSelectedClient 
}: ClientSelectorProps) => {
  const handleValueChange = (value: string) => {
    setSelectedClient(value);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-semibold text-white">
          Cliente Selecionado
        </h2>
      </div>
      <Select value={selectedClient} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full sm:w-72 bg-white/10 backdrop-blur-sm border-white/20 text-black font-medium">
          <SelectValue placeholder="Selecione um cliente" className="text-white" />
        </SelectTrigger>
        <SelectContent className="bg-white/90 backdrop-blur-md border border-white/20">
          {clients.map((client) => (
            <SelectItem 
              key={client.id} 
              value={client.id}
              className="text-black font-medium hover:bg-blue-100 cursor-pointer"
            >
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientSelector;
