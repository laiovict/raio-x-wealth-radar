
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Quote, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

interface InvestorQuote {
  investor: string;
  quote: string;
  ageRelatedInsight?: string;
  photoUrl: string;
  philosophy?: string;
  books?: string[];
}

const FamousInvestorsModule = ({ fullWidth = false }) => {
  const { t } = useLanguage();
  const { data, selectedClient } = useRaioX();
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!api) return;
    
    const updateCurrent = () => {
      if (!api) return;
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);
    
    return () => {
      if (api) {
        api.off("select", updateCurrent);
        api.off("reInit", updateCurrent);
      }
    };
  }, [api]);
  
  // Generate age-specific insights based on client's presumed age (for demo purposes)
  const clientAge = data?.clientAge || 35; // Default age if not available
  
  const investorQuotes: InvestorQuote[] = [
    {
      investor: 'Warren Buffett',
      quote: clientAge < 40 
        ? "The best investment you can make is in yourself. The more you learn, the more you'll earn."
        : "Risk comes from not knowing what you're doing. Take the time to understand your investments.",
      ageRelatedInsight: clientAge < 40 
        ? "A seu atual nível de carreira, investir em conhecimento e nas suas habilidades profissionais pode trazer um retorno mais significativo que qualquer ativo financeiro." 
        : "Com sua experiência profissional, você pode aproveitar seu conhecimento especializado para avaliar oportunidades no setor médico com mais precisão que o investidor médio.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg',
      philosophy: "Buffett é conhecido por sua abordagem de 'investimento em valor', focando em empresas sólidas, com gestão competente, e negociadas abaixo do seu valor intrínseco. Ele acredita em investimentos de longo prazo e raramente vende suas posições principais.",
      books: ["The Intelligent Investor por Benjamin Graham", "The Essays of Warren Buffett"]
    },
    {
      investor: 'Ray Dalio',
      quote: data?.assetAllocation?.equities > 50
        ? "Diversify well, understand the role of each asset, and don't think that anything is a sure bet."
        : "The biggest mistake investors make is to believe that what happened in the recent past is likely to persist.",
      ageRelatedInsight: clientAge < 45
        ? "Na sua fase de acumulação de patrimônio, considere que os princípios de diversificação de Ray Dalio podem protegê-lo da volatilidade enquanto ainda permite crescimento."
        : "À medida que se aproxima de seus objetivos financeiros, a visão de Dalio sobre 'All Weather Portfolio' pode oferecer uma abordagem balanceada entre crescimento e preservação.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Ray_Dalio_C2019.jpg',
      philosophy: "Dalio desenvolveu o conceito de 'All Weather Portfolio' e acredita fortemente na diversificação e compreensão dos ciclos econômicos. Ele defende que entender como a 'máquina econômica' funciona é essencial para investimentos bem-sucedidos.",
      books: ["Principles: Life and Work", "Big Debt Crises"]
    },
    {
      investor: 'Peter Lynch',
      quote: data?.financialInsights?.length > 3
        ? "Behind every stock is a company. Find out what it's doing."
        : "Know what you own, and know why you own it.",
      ageRelatedInsight: clientAge < 50
        ? "Com seu conhecimento específico na área médica, você tem uma vantagem competitiva que Peter Lynch chamaria de 'edge' - use essa especialização para identificar oportunidades no setor de saúde antes que se tornem óbvias para o mercado."
        : "Lynch acreditava que investidores poderiam usar seu conhecimento profissional para vantagem. Como médico estabelecido, você pode reconhecer tendências e inovações em saúde antes que impactem o mercado financeiro.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Peter_Lynch.jpg',
      philosophy: "Lynch é famoso por seu conceito de 'investir no que você conhece'. Ele acredita que consumidores comuns têm vantagens sobre analistas de Wall Street por poderem identificar bons produtos e tendências antes que se tornem mainstream financeiro.",
      books: ["One Up On Wall Street", "Beating the Street"]
    },
    {
      investor: 'Howard Marks',
      quote: "O sucesso financeiro não se baseia em prever o futuro, mas em reconhecer os riscos presentes e se preparar adequadamente para eles.",
      ageRelatedInsight: "Com seu atual nível de patrimônio, as lições de Marks sobre ciclos de mercado são particularmente relevantes - o momento em que você investe geralmente é mais importante que o que você compra.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg/440px-Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg',
      philosophy: "Marks é conhecido por sua ênfase no controle de riscos e entendimento dos ciclos de mercado. Ele acredita que 'primeiro nível' de pensamento é superficial, enquanto o 'segundo nível' considera fatores mais profundos que outros investidores ignoram.",
      books: ["The Most Important Thing", "Mastering the Market Cycle"]
    },
    {
      investor: 'Benjamin Graham',
      quote: "No curto prazo, o mercado é uma máquina de votação; no longo prazo, é uma máquina de pesar.",
      ageRelatedInsight: "Como investidor com objetivos de longo prazo, a filosofia de Graham de ver quedas no mercado como oportunidades para comprar boas empresas com desconto se alinha com seu horizonte temporal.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Benjamin_Graham.jpg',
      philosophy: "Graham, mentor de Warren Buffett, é considerado o pai do investimento em valor. Ele desenvolveu o conceito de 'margem de segurança' - comprar ações significativamente abaixo de seu valor intrínseco para limitar perdas potenciais.",
      books: ["The Intelligent Investor", "Security Analysis"]
    },
    {
      investor: 'John Bogle',
      quote: "A ideia de tentar superar o mercado é uma tolice. O tempo é seu amigo; o impulso é seu inimigo.",
      ageRelatedInsight: "Com uma alta renda ativa e capacidade de poupança, o conceito de Bogle de baixos custos e investimento passivo pode ajudar a maximizar seus retornos líquidos ao longo do tempo.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/John_Bogle.jpg',
      philosophy: "Fundador da Vanguard, Bogle revolucionou o investimento defendendo fundos indexados de baixo custo. Ele argumentava que custos são o principal determinante dos retornos de longo prazo e que poucos gestores superam consistentemente o mercado.",
      books: ["The Little Book of Common Sense Investing", "Enough"]
    },
    {
      investor: 'Charlie Munger',
      quote: "Adquira conhecimento todos os dias. A capacidade de aprender mais rápido que seus competidores é a única vantagem competitiva sustentável.",
      ageRelatedInsight: "Como profissional qualificado, a abordagem multidisciplinar de Munger para a tomada de decisões oferece um modelo para considerar fatores além dos simples números financeiros em seus investimentos.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Charlie_Munger_2011.jpg',
      philosophy: "Parceiro de negócios de Buffett, Munger é conhecido por seu pensamento multidisciplinar e 'modelos mentais'. Ele defende o uso de conhecimentos de diversas disciplinas para tomar decisões mais inteligentes em todas as áreas da vida.",
      books: ["Poor Charlie's Almanack", "Seeking Wisdom: From Darwin to Munger"]
    },
    {
      investor: 'Robert Shiller',
      quote: "Os mercados são eficientes muito do tempo, mas ocasionalmente se tornam irracionais devido ao comportamento de manada e vieses psicológicos.",
      ageRelatedInsight: "Em sua fase de acumulação, a compreensão de Shiller sobre bolhas de mercado pode ajudá-lo a evitar armadilhas comportamentais, mantendo-se fiel à sua estratégia de longo prazo mesmo durante extremos de mercado.",
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Robert_J_Shiller_2012.jpg',
      philosophy: "Economista premiado com Nobel, Shiller é pioneiro em finanças comportamentais. Seu 'Índice CAPE' é uma ferramenta popular para avaliar se mercados estão sobre ou subvalorizados numa perspectiva histórica de longo prazo.",
      books: ["Irrational Exuberance", "Animal Spirits"]
    }
  ];

  // Special case for Laio Santos (client ID 240575)
  if (selectedClient === 240275) {
    investorQuotes.push({
      investor: 'Howard Marks',
      quote: t('marksQuoteLaio'),
      ageRelatedInsight: t('marksInsightLaio'),
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg/440px-Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg',
      philosophy: "Howard Marks enfatiza particularmente a importância de compreender e controlar riscos, uma perspectiva fundamental para seu perfil específico e objetivos financeiros.",
      books: ["The Most Important Thing", "Mastering the Market Cycle"]
    });
  }

  return (
    <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''} bg-gradient-to-b from-indigo-800/40 to-purple-900/40 backdrop-blur-lg`}>
      <h2 className="text-xl font-bold text-white mb-6">{t('famousInvestorsTitle')}</h2>
      
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {investorQuotes.map((item, index) => (
            <CarouselItem key={index} className="md:basis-2/3 lg:basis-1/2 pl-4">
              <div className="space-y-4 bg-gradient-to-br from-gray-900/80 to-indigo-900/80 p-6 rounded-xl shadow-xl border border-indigo-500/30">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20 border-2 border-blue-400">
                      <AvatarImage src={item.photoUrl} alt={item.investor} className="object-cover" />
                      <AvatarFallback className="bg-blue-900 text-blue-200">
                        {item.investor.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-blue-300">{item.investor}</h3>
                    
                    <div className="mt-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 relative">
                      <Quote className="absolute top-2 left-2 h-8 w-8 text-blue-900/20" />
                      <p className="text-gray-200 italic pl-6">{item.quote}</p>
                    </div>
                    
                    {item.ageRelatedInsight && (
                      <div className="mt-3 bg-indigo-900/20 p-3 rounded-lg">
                        <p className="text-sm text-blue-200">
                          <span className="font-bold">{t('atYourAge')}: </span>
                          {item.ageRelatedInsight}
                        </p>
                      </div>
                    )}
                    
                    {item.philosophy && (
                      <div className="mt-3 bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm text-blue-200">
                          <span className="font-bold">Filosofia de Investimento: </span>
                          {item.philosophy}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {item.books && item.books.length > 0 && (
                  <div className="bg-gray-800/30 p-3 rounded-lg ml-0 md:ml-24">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-300">Livros Recomendados</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {item.books.map((book, bookIndex) => (
                        <li key={bookIndex} className="text-sm text-gray-300">{book}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex items-center justify-center mt-8 gap-2">
          <CarouselPrevious className="relative static left-0 right-auto translate-y-0 h-10 w-10" />
          
          <div className="flex gap-1">
            {Array.from({ length: investorQuotes.length }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-blue-500 w-4" : "bg-gray-500"
                }`}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <CarouselNext className="relative static right-0 left-auto translate-y-0 h-10 w-10" />
        </div>
      </Carousel>
    </Card>
  );
};

export default FamousInvestorsModule;
