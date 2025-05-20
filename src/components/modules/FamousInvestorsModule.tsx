
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useLanguage } from "@/context/LanguageContext";

interface FamousInvestorsModuleProps {
  fullWidth?: boolean;
}

const FamousInvestorsModule = ({ fullWidth = false }: FamousInvestorsModuleProps) => {
  const { data } = useRaioX();
  const { t } = useLanguage();

  // Exemplo de dados de investidores famosos
  const investors = [
    {
      name: "Warren Buffett",
      quote: "Seja ganancioso quando outros estão com medo, e tenha medo quando outros estão gananciosos.",
      strategy: "Investimento em valor, empresas com vantagens competitivas duradouras",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg",
      backgroundColor: "from-blue-800/40 to-blue-600/20",
    },
    {
      name: "Ray Dalio",
      quote: "O dinheiro é só uma ferramenta para ajudar você a conseguir o que quer, não é o objetivo em si.",
      strategy: "Diversificação global, alocação em todas as condições de mercado",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Raymond_Dalio_World_Economic_Forum_2013.jpg/440px-Raymond_Dalio_World_Economic_Forum_2013.jpg",
      backgroundColor: "from-emerald-800/40 to-emerald-600/20",
    },
    {
      name: "Benjamin Graham",
      quote: "No curto prazo, o mercado é uma máquina de votação, mas no longo prazo, é uma máquina de pesagem.",
      strategy: "Margem de segurança, análise fundamental detalhada",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Benjamin_Graham.jpg/300px-Benjamin_Graham.jpg",
      backgroundColor: "from-amber-800/40 to-amber-600/20",
    },
    {
      name: "Peter Lynch",
      quote: "Invista no que você conhece.",
      strategy: "Crescimento a preço razoável, vantagens competitivas claras",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Peter_Lynch_%28cropped%29.jpg/440px-Peter_Lynch_%28cropped%29.jpg",
      backgroundColor: "from-purple-800/40 to-purple-600/20",
    },
    {
      name: "Howard Marks",
      quote: "As coisas mais perigosas são aquelas em que os riscos não são visíveis.",
      strategy: "Contrário, ciclos de mercado, psicologia do investidor",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Howard_Marks_in_2013.jpg/440px-Howard_Marks_in_2013.jpg",
      backgroundColor: "from-red-800/40 to-red-600/20",
    }
  ];

  return (
    <Card className={`glass-morphism ${fullWidth ? "col-span-full" : ""}`}>
      <CardHeader>
        <CardTitle>{t('famousInvestorsTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {investors.map((investor, index) => (
              <CarouselItem key={index}>
                <div className={`rounded-xl bg-gradient-to-br ${investor.backgroundColor} border border-white/10 p-1 h-full`}>
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 h-full flex flex-col">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
                        <img 
                          src={investor.image} 
                          alt={investor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                          {investor.name}
                        </h3>
                        <p className="text-xl italic text-white/80 mb-4">
                          "{investor.quote}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <h4 className="text-lg font-medium text-white/90 mb-1">Estratégia de Investimento:</h4>
                      <p className="text-white/70">{investor.strategy}</p>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-white/50">
                        Deslize para ver mais investidores
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="relative inline-flex h-10 w-10" />
            <CarouselNext className="relative inline-flex h-10 w-10" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default FamousInvestorsModule;
