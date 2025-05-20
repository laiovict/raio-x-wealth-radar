
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code, Copy, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ApiDocs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const apiModules = [
    { id: "overview", name: "Visão Geral", 
      description: "APIs para obter uma visão geral dos dados financeiros do cliente.",
      endpoint: "/api/v1/financial-overview" },
    { id: "allocation", name: "Alocação", 
      description: "APIs para obter dados sobre a alocação de ativos do cliente.",
      endpoint: "/api/v1/allocation" },
    { id: "liquidity", name: "Reserva de Liquidez", 
      description: "APIs para analisar a reserva de liquidez do cliente.",
      endpoint: "/api/v1/liquidity-reserve" },
    { id: "goals", name: "Metas de Vida", 
      description: "APIs para gerenciar as metas financeiras do cliente.",
      endpoint: "/api/v1/life-goals" },
    { id: "projection", name: "Projeções Futuras", 
      description: "APIs para projeções futuras baseadas nos dados atuais.",
      endpoint: "/api/v1/future-projections" },
    { id: "planning", name: "Planejamento de Investimentos", 
      description: "APIs para planejamento de investimentos personalizados.",
      endpoint: "/api/v1/investment-planning" },
    { id: "insights", name: "Insights Pessoais", 
      description: "APIs para obter insights personalizados sobre o perfil financeiro.",
      endpoint: "/api/v1/personal-insights" },
    { id: "sentiment", name: "Insights de Sentimento", 
      description: "APIs para análise de sentimento do mercado.",
      endpoint: "/api/v1/sentiment-insights" },
    { id: "social", name: "Comparação Social", 
      description: "APIs para comparação com outros perfis similares.",
      endpoint: "/api/v1/social-comparison" },
    { id: "wrapped", name: "Retrospectiva", 
      description: "APIs para gerar retrospectivas financeiras anuais.",
      endpoint: "/api/v1/wrapped" },
    { id: "banking", name: "Banking", 
      description: "APIs para integração com dados bancários.",
      endpoint: "/api/v1/whole-banking" },
    { id: "onepage", name: "Plano Financeiro", 
      description: "APIs para gerenciamento do plano financeiro completo.",
      endpoint: "/api/v1/one-page-plan" },
    { id: "behavioral", name: "Finanças Comportamentais", 
      description: "APIs para análise de comportamento financeiro.",
      endpoint: "/api/v1/behavioral-finance" },
    { id: "investors", name: "Investidores Famosos", 
      description: "APIs para obter insights de investidores famosos.",
      endpoint: "/api/v1/famous-investors" },
    { id: "inteligencia", name: "Inteligência", 
      description: "APIs para análises de IA sobre o perfil financeiro.",
      endpoint: "/api/v1/intelligence" },
    { id: "futuro", name: "Meu Futuro Financeiro", 
      description: "APIs para projeções financeiras de longo prazo.",
      endpoint: "/api/v1/financial-future" },
  ];

  const generateSampleCode = (endpoint: string) => {
    return `// Exemplo usando JavaScript/Fetch API
const fetchData = async () => {
  const response = await fetch('https://api.reinvent.vc${endpoint}', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
      'X-Client-ID': 'CLIENT_ID'
    }
  });
  
  const data = await response.json();
  console.log(data);
};

fetchData();`;
  };

  const pythonSampleCode = (endpoint: string) => {
    return `# Exemplo usando Python/Requests
import requests

url = "https://api.reinvent.vc${endpoint}"

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
    "X-Client-ID": "CLIENT_ID"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] to-[#1a1a2e] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/4b258bed-71ae-4d4c-847b-12968969f2d4.png"
                alt="Reinvent Logo"
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                API Documentation
              </h1>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Dashboard
            </Button>
          </div>
          
          <div className="glass-morphism backdrop-blur-md p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold mb-2">Raio-X Financeiro API</h2>
            <p className="text-gray-300 mb-4">
              Use nossas APIs para integrar os dados financeiros em suas aplicações. 
              Todas as APIs requerem autenticação via Bearer token.
            </p>
            
            <div className="bg-black/30 p-4 rounded-md border border-white/5 mb-4">
              <div className="flex justify-between items-center">
                <p className="font-mono text-blue-400">
                  Base URL: <span className="text-green-400">https://api.reinvent.vc</span>
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard("https://api.reinvent.vc")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-900/30"
                onClick={() => window.open("https://www.postman.com/", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir no Postman
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
                onClick={() => copyToClipboard("YOUR_API_KEY")}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copiar API Key
              </Button>
            </div>
          </div>
        </header>
        
        <main>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 glass-morphism backdrop-blur-md p-4 rounded-lg border border-white/10 h-fit">
              <h3 className="font-medium text-lg mb-4">Endpoints</h3>
              <nav className="space-y-1">
                {apiModules.map((module) => (
                  <button
                    key={module.id}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      activeTab === module.id 
                        ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500" 
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => setActiveTab(module.id)}
                  >
                    {module.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="md:col-span-3">
              {apiModules.map((module) => (
                <div 
                  key={module.id} 
                  className={activeTab === module.id ? "block" : "hidden"}
                >
                  <div className="glass-morphism backdrop-blur-md p-6 rounded-lg border border-white/10 mb-6">
                    <h2 className="text-xl font-bold mb-2">{module.name}</h2>
                    <p className="text-gray-300 mb-4">{module.description}</p>
                    
                    <div className="bg-black/30 p-4 rounded-md border border-white/5 mb-4">
                      <div className="flex justify-between items-center">
                        <p className="font-mono text-green-400">{module.endpoint}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(module.endpoint)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mt-6 mb-2">Exemplo de Requisição</h3>
                    
                    <Tabs defaultValue="javascript" className="mb-4">
                      <TabsList className="mb-2">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                      </TabsList>
                      <TabsContent value="javascript">
                        <div className="relative bg-black/50 rounded-md p-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => copyToClipboard(generateSampleCode(module.endpoint))}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                            <code>{generateSampleCode(module.endpoint)}</code>
                          </pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="python">
                        <div className="relative bg-black/50 rounded-md p-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => copyToClipboard(pythonSampleCode(module.endpoint))}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                            <code>{pythonSampleCode(module.endpoint)}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6 mb-2">
                      <h3 className="font-medium text-lg mb-2">Parâmetros</h3>
                      <table className="w-full text-sm">
                        <thead className="text-left text-gray-400 border-b border-white/10">
                          <tr>
                            <th className="pb-2">Nome</th>
                            <th className="pb-2">Tipo</th>
                            <th className="pb-2">Obrigatório</th>
                            <th className="pb-2">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5">
                            <td className="py-2 text-blue-400">client_id</td>
                            <td>string</td>
                            <td>Sim</td>
                            <td>ID do cliente a ser consultado</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 text-blue-400">date_range</td>
                            <td>string</td>
                            <td>Não</td>
                            <td>Período para análise (ex: "1m", "3m", "1y")</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-blue-400">format</td>
                            <td>string</td>
                            <td>Não</td>
                            <td>Formato de resposta (default: "json")</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-purple-500 text-purple-400 hover:bg-purple-900/30"
                      >
                        <Code className="mr-2 h-4 w-4" />
                        Ver Referência Completa
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-500 text-green-400 hover:bg-green-900/30"
                      >
                        Testar API
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocs;
