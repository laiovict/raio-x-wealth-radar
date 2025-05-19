
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wine, Wallet, Plane, Home, Briefcase, Heart } from "lucide-react";

interface PersonalInsightsModuleProps {
  fullWidth?: boolean;
}

const PersonalInsightsModule = ({ fullWidth = false }: PersonalInsightsModuleProps) => {
  const { data } = useRaioX();
  
  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
          Insights Personalizados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sua Família</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.family || 
                 "Sabemos que você e Gisele estão planejando aumentar a família nos próximos 3 anos. Preparamos uma projeção financeira considerando os custos com educação e saúde para o novo membro da família. Também notamos seu compromisso com os cuidados médicos de sua mãe, algo que honramos e levamos em conta no seu planejamento."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Suas Paixões</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.passions || 
                 "Sua meta de visitar tantos países quanto sua idade nos inspirou! Já conhecemos seu gosto por vinhos e sua aventura pela rota Beaujolais na França. Que tal nossa parceria com a Wine para oferecer acesso a rótulos exclusivos? E para o fã do Corinthians, temos ingressos VIP - pergunte ao seu assessor."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
              <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sua Jornada Financeira</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.financialJourney || 
                 "Como empreendedor do mercado financeiro, você entende os desafios de construir uma empresa enquanto mantém um patrimônio sólido de R$ 1,7 milhão. Sua estratégia de alta liquidez faz sentido neste momento de sua vida, mas identificamos oportunidades para otimizar seu capital sem comprometer sua flexibilidade para o novo negócio."}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
              <Home className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Seus Objetivos</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {data.personalInsights?.goals || 
                 "Estamos monitorando o mercado imobiliário para você! Com seu plano de comprar uma casa, montamos uma estratégia que mantém capital disponível para um bom entrada, mas sem deixar seu dinheiro perdendo para a inflação. A chegada do bebê e sua nova casa são marcos que estamos preparados para acompanhar com você."}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <p className="text-sm text-gray-800 dark:text-gray-200 italic">
                "Luis, como praticante de tênis e surf, você valoriza equilíbrio. Propomos o mesmo para suas finanças: estabilidade com renda fixa e potencial de crescimento com investimentos internacionais - algo ausente na sua carteira atual, mas que pode trazer diversificação importante para seu perfil."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInsightsModule;
