
import React from 'react';

interface RecentDividendsTableProps {
  recentDividends: any[];
}

const RecentDividendsTable: React.FC<RecentDividendsTableProps> = ({ recentDividends }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="font-medium text-white mb-4">Pagamentos Recentes</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left pb-2 text-gray-400 text-sm">Data</th>
              <th className="text-left pb-2 text-gray-400 text-sm">Ativo</th>
              <th className="text-left pb-2 text-gray-400 text-sm">Tipo</th>
              <th className="text-right pb-2 text-gray-400 text-sm">Quantidade</th>
              <th className="text-right pb-2 text-gray-400 text-sm">Valor</th>
            </tr>
          </thead>
          <tbody>
            {recentDividends.map((dividend, index) => {
              // Format the date
              const dateParts = dividend.payment_date?.split(' ')[0].split('-') || [];
              const formattedDate = dateParts.length >= 3 
                ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` 
                : dividend.payment_date;
              
              return (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-3 text-gray-300">{formattedDate}</td>
                  <td className="py-3 text-gray-300">{dividend.asset || '-'}</td>
                  <td className="py-3 text-gray-300">{dividend.type || 'Dividend'}</td>
                  <td className="py-3 text-gray-300 text-right">{dividend.quantity || '-'}</td>
                  <td className="py-3 text-green-400 text-right font-medium">{dividend.value || '-'}</td>
                </tr>
              );
            })}
            
            {recentDividends.length === 0 && (
              <tr>
                <td colSpan={5} className="py-3 text-center text-gray-400">Nenhum pagamento recente encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDividendsTable;
