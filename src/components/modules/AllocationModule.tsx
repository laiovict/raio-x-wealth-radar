
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";

interface AllocationModuleProps {
  fullWidth?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AllocationModule = ({ fullWidth = false }: AllocationModuleProps) => {
  const { data } = useRaioX();
  const { allocation } = data;

  const currentAllocationData = Object.keys(allocation.current).map(key => ({
    name: key,
    value: allocation.current[key]
  }));

  const recommendedAllocationData = Object.keys(allocation.recommended).map(key => ({
    name: key,
    value: allocation.recommended[key]
  }));

  const radarData = Object.keys(allocation.current).map(key => ({
    subject: key,
    current: allocation.current[key],
    recommended: allocation.recommended[key],
    fullMark: 100
  }));

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700 dark:text-blue-300 flex items-center justify-between">
          <span>Alocação & Diversificação 360°</span>
          <span className="text-sm font-normal text-green-600 dark:text-green-400">
            +{allocation.optimizationGain}% potencial
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${fullWidth ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}>
          <div className="space-y-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Atual" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Recomendada" dataKey="recommended" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-64 md:h-52">
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
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                {allocation.summary}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationModule;
