
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Quote } from "lucide-react";

interface InvestorQuote {
  investor: string;
  quote: string;
  ageRelatedInsight?: string;
  photoUrl: string;
}

const FamousInvestorsModule = ({ fullWidth = false }) => {
  const { t } = useLanguage();
  const { data, selectedClient } = useRaioX();
  
  // Generate age-specific insights based on client's presumed age (for demo purposes)
  const clientAge = data?.clientAge || 35; // Default age if not available
  
  const investorQuotes: InvestorQuote[] = [
    {
      investor: 'Warren Buffett',
      quote: clientAge < 40 
        ? t('buffettQuoteYoung') 
        : t('buffettQuoteOld'),
      ageRelatedInsight: clientAge < 40 
        ? t('buffettInsightYoung') 
        : t('buffettInsightOld'),
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg'
    },
    {
      investor: 'Ray Dalio',
      quote: data?.assetAllocation?.equities > 50
        ? t('dalioQuoteHighEquity')
        : t('dalioQuoteLowEquity'),
      ageRelatedInsight: clientAge < 45
        ? t('dalioInsightYoung')
        : t('dalioInsightOld'),
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Ray_Dalio_C2019.jpg'
    },
    {
      investor: 'Peter Lynch',
      quote: data?.financialInsights?.length > 3
        ? t('lynchQuoteInfoSeeking')
        : t('lynchQuoteSimple'),
      ageRelatedInsight: clientAge < 50
        ? t('lynchInsightYoung')
        : t('lynchInsightOld'),
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Peter_Lynch.jpg'
    }
  ];

  // Special case for Laio Santos (client ID 240575)
  if (selectedClient === 240275) {
    investorQuotes.push({
      investor: 'Howard Marks',
      quote: t('marksQuoteLaio'),
      ageRelatedInsight: t('marksInsightLaio'),
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg/440px-Howard_Marks_at_the_95th_St%C3%A9phane_Bern_Foundation.jpg'
    });
  }

  return (
    <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
      <h2 className="text-xl font-bold text-white mb-4">{t('famousInvestorsTitle')}</h2>
      
      <div className="space-y-6">
        {investorQuotes.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
                <img 
                  src={item.photoUrl} 
                  alt={item.investor}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-blue-300">{item.investor}</h3>
              
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
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FamousInvestorsModule;
