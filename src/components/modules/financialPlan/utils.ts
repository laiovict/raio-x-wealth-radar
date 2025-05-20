import { toNumber } from '@/utils/typeConversionHelpers';
import { formatCurrency } from '@/utils/raioXUtils';

// Create a summary for investment section based on portfolio data
export const createInvestmentSummary = (investmentData: any) => {
  let summary = `Carteira atual de ${formatCurrency(investmentData.totalValue.toString())} com concentração em `;
  
  // Find the asset class with highest percentage
  const assets = [
    { name: "renda fixa", percentage: investmentData.fixedIncomePercentage },
    { name: "renda variável", percentage: investmentData.stocksPercentage },
    { name: "fundos de investimento", percentage: investmentData.fundsPercentage },
    { name: "FIIs", percentage: investmentData.fiisPercentage },
    { name: "internacional", percentage: investmentData.internationalPercentage },
    { name: "alternativos", percentage: investmentData.alternativesPercentage }
  ];
  
  const highestAsset = assets.sort((a, b) => b.percentage - a.percentage)[0];
  summary += `${highestAsset.name} (${Math.round(highestAsset.percentage)}%).`;
  
  return summary;
};

// Calculate investment data from portfolio summary
export const calculateInvestmentData = (portfolioSummary: any, profitability: any) => {
  // Default values if no portfolio summary is available
  let totalValue = 325000;
  let fixedIncomeValue = 211250;
  let fixedIncomePercentage = 65;
  let stocksValue = 81250;
  let stocksPercentage = 25;
  let fundsValue = 16250;
  let fundsPercentage = 5;
  let fiisValue = 8125;
  let fiisPercentage = 2.5;
  let internationalValue = 8125; 
  let internationalPercentage = 2.5;
  let alternativesValue = 0;
  let alternativesPercentage = 0;
  let ytdReturn = 7.8;
  let benchmarkReturn = 8.5;
  let dataSource = 'synthetic';

  // If we have real data from Supabase, use it
  if (portfolioSummary) {
    totalValue = parseFloat(portfolioSummary.total_portfolio_value || "0");
    
    // Fixed Income values
    fixedIncomeValue = toNumber(portfolioSummary.fixed_income_value || 0);
    fixedIncomePercentage = toNumber(portfolioSummary.fixed_income_representation || 0);
    
    // Stocks values - handling string values from API
    stocksValue = parseFloat(portfolioSummary.stocks_value || "0");
    stocksPercentage = parseFloat(portfolioSummary.stocks_representation || "0");
    
    // Investment Funds as separate category
    fundsValue = toNumber(portfolioSummary.investment_fund_value || 0);
    fundsPercentage = toNumber(portfolioSummary.investment_fund_representation || 0);
    
    // Real Estate Funds (FIIs) as separate category
    fiisValue = toNumber(portfolioSummary.real_estate_value || 0);
    fiisPercentage = toNumber(portfolioSummary.real_estate_representation || 0);
    
    // International investments as separate category
    internationalValue = parseFloat(portfolioSummary.investment_international_value || "0");
    internationalPercentage = parseFloat(portfolioSummary.investment_international_representation || "0");
    
    // Alternatives - now excluding real estate and international
    alternativesValue = 0; 
    alternativesPercentage = 0;
    
    // Set data source
    dataSource = portfolioSummary.dataSource || 'synthetic';
  }

  // If we have profitability data, use it
  if (profitability) {
    ytdReturn = toNumber(profitability.ytd || 7.8);
    // Benchmark is often not provided in the data, so we'll keep the default
    dataSource = profitability.dataSource || dataSource;
  }

  return {
    totalValue,
    fixedIncomeValue,
    fixedIncomePercentage,
    stocksValue,
    stocksPercentage,
    fundsValue,
    fundsPercentage,
    fiisValue,
    fiisPercentage,
    internationalValue,
    internationalPercentage,
    alternativesValue,
    alternativesPercentage,
    ytdReturn,
    benchmarkReturn,
    dataSource
  };
};
