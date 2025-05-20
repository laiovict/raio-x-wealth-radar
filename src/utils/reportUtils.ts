/**
 * Generates a URL for the monthly financial report based on date and client.
 */
export const getMonthlyReportUrl = (selectedClient: number | null) => {
  const now = new Date();
  const today = now.getDate();
  const isBeforeFifthWorkingDay = today < 5; // Simplified check for 5th working day
  
  let reportMonth, reportYear;
  
  if (isBeforeFifthWorkingDay) {
    // If before 5th working day, use report from 2 months ago
    reportMonth = now.getMonth() - 1;
    reportYear = now.getFullYear();
    
    // Handle January case (need to go back to previous year)
    if (reportMonth < 0) {
      reportMonth = 11; // December
      reportYear = reportYear - 1;
    }
  } else {
    // Otherwise use report from last month
    reportMonth = now.getMonth();
    reportYear = now.getFullYear();
    
    // Handle January case (need to go back to previous year)
    if (reportMonth < 0) {
      reportMonth = 11; // December
      reportYear = reportYear - 1;
    }
  }
  
  // Format month as MM
  const formattedMonth = (reportMonth + 1).toString().padStart(2, '0');
  
  // Return the URL for the report
  return `https://report.letsreinvent.vc/reinvent/5b552db1-7aa6-4f0b-b25e-f145a2688936/report?period=${reportYear}${formattedMonth}&reportId=c767ceee-e4f4-449a-bd3e-ea00a5567880&clientId=${selectedClient || ''}`;
};
