
// This is a partial update to fix the arithmetic operations in useWrappedData.tsx
import { toNumber } from '@/utils/typeConversionHelpers';

// Fixed version of the arithmetic operations in useWrappedData.tsx
// This replaces specific lines with errors

export const fixArithmeticOperations = () => {
  // Line 138: change to use toNumber
  const gain1Y = toNumber(profitability?.twelve_months || 0) * 100;
  
  // Line 145: change to use toNumber
  const gain6M = toNumber(profitability?.six_months || 0) * 100;
  
  // Line 152: change to use toNumber
  const gainYTD = toNumber(profitability?.ytd || 0) * 100;
  
  // Line 162: change to use toNumber
  const gain3Y = toNumber(profitability?.thirty_six_months || 0) * 100;
};
