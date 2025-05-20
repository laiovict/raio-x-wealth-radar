
/**
 * Helper functions for handling type conversions
 * to fix TypeScript errors with mixed string/number types
 */

/**
 * Convert any value to a number safely
 * @param value Value to convert to number
 * @param defaultValue Default value if conversion fails
 * @returns Number
 */
export const toNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') return value;
  if (!value) return defaultValue;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Convert any value to a string safely
 * @param value Value to convert to string
 * @param defaultValue Default value if conversion fails
 * @returns String
 */
export const toString = (value: any, defaultValue: string = ''): string => {
  if (value === null || value === undefined) return defaultValue;
  return String(value);
};

/**
 * Safely compare a value to a number
 * @param value Value to compare (could be string or number)
 * @param compareValue Number to compare against
 * @param operator Comparison operator ('>', '<', '>=', '<=', '==', '===')
 * @returns Boolean result of comparison
 */
export const compareToNumber = (
  value: string | number, 
  compareValue: number, 
  operator: '>' | '<' | '>=' | '<=' | '==' | '===' = '>'
): boolean => {
  const numValue = toNumber(value);
  
  switch (operator) {
    case '>': return numValue > compareValue;
    case '<': return numValue < compareValue;
    case '>=': return numValue >= compareValue;
    case '<=': return numValue <= compareValue;
    case '==': return numValue == compareValue;
    case '===': return numValue === compareValue;
    default: return false;
  }
};

/**
 * Safely perform arithmetic operations between potentially string or number values
 * @param value1 First value (could be string or number)
 * @param value2 Second value (could be string or number)
 * @param operation Mathematical operation to perform
 * @returns Result as number
 */
export const arithmeticOperation = (
  value1: string | number,
  value2: string | number,
  operation: '+' | '-' | '*' | '/' = '+'
): number => {
  const num1 = toNumber(value1);
  const num2 = toNumber(value2);
  
  switch (operation) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 !== 0 ? num1 / num2 : 0;
    default: return 0;
  }
};

/**
 * Fix default Liquidity values to align with the interface
 * @param liquidityData Partial liquidity data
 * @returns Complete liquidity data object
 */
export const fixLiquidityDefaults = (liquidityData: any): any => {
  return {
    currentIdle: toNumber(liquidityData?.currentIdle || 0),
    recommended: toNumber(liquidityData?.recommended || 0) || toNumber(liquidityData?.idealReserve || 0),
    difference: toNumber(liquidityData?.difference || 0),
    currentIdleMonths: toNumber(liquidityData?.currentIdleMonths || 0),
    recommendedMonths: toNumber(liquidityData?.recommendedMonths || 0) || toNumber(liquidityData?.idealMonths || 0),
    idealReserve: toNumber(liquidityData?.idealReserve || 0) || toNumber(liquidityData?.recommended || 0),
    monthlyExpenses: toNumber(liquidityData?.monthlyExpenses || 0),
    idealMonths: toNumber(liquidityData?.idealMonths || 0) || toNumber(liquidityData?.recommendedMonths || 0),
    summary: liquidityData?.summary || '',
    dataSource: liquidityData?.dataSource || 'synthetic'
  };
};

/**
 * Fix Allocation values to align with the interface
 * @param allocationData Partial allocation data
 * @returns Fixed allocation data
 */
export const fixAllocationDefaults = (allocationData: any): any => {
  if (!allocationData) return null;
  
  return {
    current: allocationData.current || {},
    recommended: allocationData.recommended || {},
    optimizationGain: toNumber(allocationData.optimizationGain),
    summary: allocationData.summary || '',
    dataSource: allocationData.dataSource || 'synthetic'
  };
};
