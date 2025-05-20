import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { useMobileBreakpoint } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface AllocationModuleProps {
  fullWidth?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#9467bd'];

const AllocationModule = ({ fullWidth = false }: AllocationModuleProps) => {
  const { data, selectedClient } = useRaioX();
  const isMobile = useMobileBreakpoint();
  const [allocationData, setAllocationData] = useState({
    current: {
      "Renda Fixa": 45.0,
      "Ações BR": 25.0,
      "Fundos": 20.0,
      "Caixa": 10.0,
      "Internacional": 0.0,
      "FIIs": 0.0,
      "Previdência": 0.0,
      "Alternativos": 0.0
    },
    recommended: {
      "Renda Fixa": 30.0,
      "Ações BR": 20.0,
      "Fundos": 15.0,
      "Caixa": 5.0,
      "Internacional": 15.0,
      "FIIs": 10.0,
      "Previdência": 5.0,
      "Alternativos": 0.0
    },
    optimizationGain: 2.4
  });

  useEffect(() => {
    // Calculate actual allocation from real data if available
    if (data.portfolioSummary) {
      try {
        const summary = data.portfolioSummary;
        const total = parseFloat(summary.total_portfolio_value || "0");
        
        if (total > 0) {
          // Create allocation data based on real portfolio values
          const currentAllocation = {
            "Renda Fixa": summary.fixed_income_representation || 0,
            "Ações BR": summary.stocks_representation ? parseFloat(summary.stocks_representation) : 0,
            "Fundos": summary.investment_fund_representation || 0,
            "FIIs": summary.real_estate_representation || 0,
            "Internacional": summary.investment_international_representation ? parseFloat(summary.investment_international_representation) : 0,
            "Caixa": 5.0, // Estimate or could be calculated from another source
            "Previdência": summary.private_pension_representation || 0,
            "Alternativos": 0.0 // Setting this to 0 since we're now separating FIIs and International
          };
          
          // Create client-specific recommended allocation based on current allocation
          // This is just an example approach - in a real system this would be more sophisticated
          const recommendedAllocation = { ...currentAllocation };
          
          // Make some recommendation shifts (this is simplified)
          if (recommendedAllocation["Renda Fixa"] > 40) {
            const excess = recommendedAllocation["Renda Fixa"] - 40;
            recommendedAllocation["Renda Fixa"] = 40;
            recommendedAllocation["FIIs"] += excess * 0.4;
            recommendedAllocation["Internacional"] += excess * 0.6;
          }
          
          if (recommendedAllocation["Internacional"] < 10) {
            const deficit = 10 - recommendedAllocation["Internacional"];
            recommendedAllocation["Internacional"] = 10;
            if (recommendedAllocation["Renda Fixa"] > deficit) {
              recommendedAllocation["Renda Fixa"] -= deficit;
            } else {
              recommendedAllocation["Renda Fixa"] -= deficit * 0.5;
              recommendedAllocation["Fundos"] -= deficit * 0.5;
            }
          }
          
          // Calculate potential optimization gain (simplified)
          const optimizationGain = Math.round((recommendedAllocation["Internacional"] * 0.1 + 
                                             recommendedAllocation["FIIs"] * 0.05 + 
                                             recommendedAllocation["Ações BR"] * 0.02) * 10) / 10;
          
          setAllocationData({
            current: currentAllocation,
            recommended: recommendedAllocation,
            optimizationGain
          });
        }
      } catch (error) {
        console.error("Error calculating allocation from real data:", error);
        // Keep default allocation if error occurs
      }
    } else {
      // Use synthetic data based on client ID
      if (selectedClient) {
        switch (selectedClient) {
          case 240275: // Laio Santos
            setAllocationData({
              current: {
                "Renda Fixa": 30.0,
                "Ações BR": 35.0,
                "Fundos": 15.0,
                "Caixa": 5.0,
                "Internacional": 10.0,
                "FIIs": 5.0,
                "Previdência": 0.0,
                "Alternativos": 0.0
              },
              recommended: {
                "Renda Fixa": 25.0,
                "Ações BR": 30.0,
                "Fundos": 15.0,
                "Caixa": 5.0,
                "Internacional": 15.0,
                "FIIs": 7.0,
                "Previdência": 3.0,
                "Alternativos": 0.0
              },
              optimizationGain: 3.2
            });
            break;
          // Add more client-specific allocations as needed
          default:
            // Keep default allocation
        }
      }
    }
  }, [data.portfolioSummary, selectedClient]);

  const currentAllocationData = Object.keys(allocationData.current).map(key => ({
    name: key,
    value: allocationData.current[key]
  }));

  const recommendedAllocationData = Object.keys(allocationData.recommended).map(key => ({
    name: key,
    value: allocationData.recommended[key]
  }));

  const radarData = Object.keys(allocationData.recommended).map(key => ({
    subject: key,
    current: allocationData.current[key] || 0,
    recommended: allocationData.recommended[key],
    fullMark: 100
  }));
  
  // Format label to be smaller on mobile
  const renderPieLabel = ({ name, percent }) => {
    if (isMobile) {
      // For mobile, show just the percentage
      return `${(percent * 100).toFixed(0)}%`;
    }
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center justify-between flex-wrap">
          <span>Alocação & Diversificação 360°</span>
          <span className="text-sm font-normal text-green-600 dark:text-green-400">
            +{allocationData.optimizationGain}% potencial
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${fullWidth && !isMobile ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}>
          <div className="space-y-2">
            <div className={`${isMobile ? "h-[220px]" : "h-[300px]"}`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Radar name="Atual" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Recomendada" dataKey="recommended" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`${isMobile ? "h-52" : "h-64 md:h-52"}`}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium text-center mb-2">Alocação Atual</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={isMobile ? 40 : 60}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderPieLabel}
                      >
                        {currentAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-sm font-medium text-center mb-2">Alocação Recomendada</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={recommendedAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={isMobile ? 40 : 60}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderPieLabel}
                      >
                        {recommendedAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {allocationData.optimizationGain > 3 ? 
                  `Sua carteira mostra um bom equilíbrio entre renda fixa (${allocationData.current["Renda Fixa"]}%) e renda variável (${allocationData.current["Ações BR"]}%), mas poderia se beneficiar de maior diversificação internacional. Recomendamos aumentar sua exposição internacional para ${allocationData.recommended["Internacional"]}% e FIIs para ${allocationData.recommended["FIIs"]}% para melhor proteção contra volatilidade do mercado local.` :
                  `Atualmente sua carteira está concentrada em renda fixa (${allocationData.current["Renda Fixa"]}%) e ações brasileiras (${allocationData.current["Ações BR"]}%), o que reflete seu perfil moderado. Recomendamos diversificar com ${allocationData.recommended["Internacional"]}% em internacional e ${allocationData.recommended["FIIs"]}% em FIIs para melhor equilíbrio entre segurança e crescimento.`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationModule;
