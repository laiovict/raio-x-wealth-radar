
import { DataSourceType } from '@/types/raioXTypes';

// Songs with embedded preview URLs
export const INVESTMENT_SONGS = [
  {
    title: "Money - Pink Floyd",
    artist: "Pink Floyd",
    preview: "https://p.scdn.co/mp3-preview/67aec1c50e0f5d75f4d3f7b3cd182cffe6d947dc",
    image: "https://i.scdn.co/image/ab67616d0000b273ac4f071b654c1c52e8bab6bf"
  },
  {
    title: "Billionaire - Bruno Mars",
    artist: "Bruno Mars",
    preview: "https://p.scdn.co/mp3-preview/9a0e460dc7cfe464ccbf1e632c8b61a0e1c5a5e4",
    image: "https://i.scdn.co/image/ab67616d0000b273fc2b025b1651c505e8cd5691"
  },
  {
    title: "Can't Buy Me Love - The Beatles",
    artist: "The Beatles",
    preview: "https://p.scdn.co/mp3-preview/e747ee27499a60e6250b2edaa1df3a36b7cdb5f7",
    image: "https://i.scdn.co/image/ab67616d0000b273dcf689f9fb4f00cbc495e571"
  },
  {
    title: "Rich Girl - Hall & Oates",
    artist: "Hall & Oates",
    preview: "https://p.scdn.co/mp3-preview/fa2ffa0a3f0ba3cf60d9335f5fea82b075bb7a2a",
    image: "https://i.scdn.co/image/ab67616d0000b273c2e1584013d56fe87b979d4f"
  },
  {
    title: "If I Had $1000000 - Barenaked Ladies",
    artist: "Barenaked Ladies",
    preview: "https://p.scdn.co/mp3-preview/8d054fcf649e5b3711f35105a3587b1ed76f4e4b",
    image: "https://i.scdn.co/image/ab67616d0000b273aa6944ddc070a3d8937c8fb1"
  }
];

// Unusual investment options
export const UNUSUAL_INVESTMENTS = [
  "ETF de Metaverso",
  "Small Caps do Setor de Energia",
  "Criptomoedas Alternativas",
  "Private Equity",
  "Fundos de Cannabis",
  "Imóveis em Cidades Fantasmas",
  "Tokens NFT",
  "Vinhos Finos como Investimento",
  "Apostas em Startups de Tecnologia Espacial",
  "Ações do Novo Mercado"
];

// Famous investor comparisons
export const FAMOUS_INVESTORS = [
  {name: "Warren Buffett", compatibility: "87%", style: "Abordagem de valor de longo prazo"},
  {name: "Benjamin Graham", compatibility: "75%", style: "Investidor em valor com análise fundamentalista"},
  {name: "Ray Dalio", compatibility: "83%", style: "Visão macro e diversificação global"},
  {name: "Peter Lynch", compatibility: "85%", style: "Investindo no que você conhece"},
  {name: "John Bogle", compatibility: "82%", style: "Investidor passivo com foco em índices"},
  {name: "Cathie Wood", compatibility: "74%", style: "Apostas em inovação e tecnologia disruptiva"}
];

export interface ClientInsights {
  personalizedInsight: string;
  personalityType: string;
  mostUnusualInvestment: string;
  investmentStyle: string;
  financialSong: string;
  songPreviewUrl: string;
  songImage: string;
  songArtist: string;
  mostActiveDay: string;
  investorCompatibility: string;
  investorStyle: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
}

export interface WrappedData {
  biggestContribution?: {
    amount: number;
    date: string;
  };
  longestPositiveStreak?: number;
  largestDrawdown?: {
    percentage: number;
    period: string;
  };
  mostProfitableAsset?: {
    name: string;
    return: number;
  };
  summary?: string;
  dataSource?: DataSourceType | 'supabase' | 'synthetic';
}
