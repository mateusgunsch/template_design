import { Clock, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
  Cell,
} from "recharts"
import { newDashboardData } from "../../data/dashboard-data"

const BLUE_COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"]

// Função para formatar números com 2 casas decimais
const formatNumber = (num: number): string => {
  return num.toFixed(2)
}

// Função para formatar moeda
const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num)
}

// Componente customizado para gráfico de risco (substituindo treemap)
const CustomRiskChart = ({ data }: { data: any[] }) => {
  // Preparar dados para o gráfico de barras
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.size,
    complexity: item.complexity,
  }))

  // Ordenar por tamanho
  chartData.sort((a, b) => b.value - a.value)

  // Cores por complexidade
  const getBarColor = (complexity: string) => {
    switch (complexity) {
      case "Alta":
        return "#1e40af"
      case "Média":
        return "#3b82f6"
      case "Baixa":
        return "#93c5fd"
      default:
        return "#60a5fa"
    }
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#3b82f6" }}
          tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
        />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={60} axisLine={{ stroke: "#3b82f6" }} />
        <Tooltip
          formatter={(value) => [formatCurrency(value as number), "Impacto Financeiro"]}
          labelFormatter={(name) => `${name}`}
          contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
        />
        <Bar dataKey="value" name="Impacto Financeiro" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.complexity)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RisksTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tempo de internação previsto - CORRIGIDO para começar em 0 */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Clock className="h-5 w-5 text-blue-600" />
            Tempo de Internação Previsto
          </CardTitle>
          <CardDescription className="text-blue-600">
            Mediana e variações do tempo de internação por período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={newDashboardData.tempo_internacao} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="periodo" tick={{ fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
              <YAxis
                domain={[0, "dataMax"]}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                tickFormatter={(value) => `${Math.floor(value) + 1} dias`}
              />
              <Tooltip
                formatter={(value) => [`${formatNumber(value as number)} dias`, "Tempo"]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Line
                type="monotone"
                dataKey="mediana"
                stroke="#1e40af"
                strokeWidth={3}
                dot={{ fill: "#1e40af", strokeWidth: 2, r: 6 }}
                name="Mediana"
              >
                <ErrorBar dataKey="min" width={4} stroke="#60a5fa" />
                <ErrorBar dataKey="max" width={4} stroke="#60a5fa" />
              </Line>
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Tempo médio atual:</span>
              <span className="font-medium text-blue-900">4.42 dias</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classificação de internações com alto risco de custo - CENTRALIZADO */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Alto Risco de Custo por Complexidade
          </CardTitle>
          <CardDescription className="text-blue-600">Categorias por complexidade e impacto financeiro</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full">
            <CustomRiskChart data={newDashboardData.alto_risco_custo} />
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#1e40af" }}></div>
              <span className="text-blue-700">Alta Complexidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#3b82f6" }}></div>
              <span className="text-blue-700">Média Complexidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#93c5fd" }}></div>
              <span className="text-blue-700">Baixa Complexidade</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eficiência ajustada por Case-Mix */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Eficiência Ajustada por Case-Mix
          </CardTitle>
          <CardDescription className="text-blue-600">Comparação multidimensional entre prestadores</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={newDashboardData.eficiencia_case_mix} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="prestador" tick={{ fontSize: 11 }} axisLine={{ stroke: "#3b82f6" }} />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value, name) => [`${formatNumber(value as number)}%`, `${name}`]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Legend />
              <Bar dataKey="qualidade" name="Qualidade" fill="#1e40af" />
              <Bar dataKey="custo" name="Custo" fill="#3b82f6" />
              <Bar dataKey="tempo" name="Tempo" fill="#60a5fa" />
              <Bar dataKey="satisfacao" name="Satisfação" fill="#93c5fd" />
              <Bar dataKey="eficiencia" name="Eficiência" fill="#bfdbfe" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Criticidade clínica baseada no CID - Barras empilhadas */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Criticidade Clínica por CID
          </CardTitle>
          <CardDescription className="text-blue-600">
            Distribuição por faixas de criticidade (leve, moderado, grave)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={newDashboardData.criticidade_cid} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis
                dataKey="cid"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
                axisLine={{ stroke: "#3b82f6" }}
              />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value, name, props) => {
                  const label = name === "Leve" ? "Leve" : name === "Moderado" ? "Moderado" : "Grave"
                  return [`${formatNumber(value as number)}%`, label]
                }}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Legend />
              <Bar dataKey="leve" stackId="a" fill="#93c5fd" name="Leve" />
              <Bar dataKey="moderado" stackId="a" fill="#3b82f6" name="Moderado" />
              <Bar dataKey="grave" stackId="a" fill="#1e40af" name="Grave" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Casos graves (média):</span>
              <span className="font-medium text-red-600">
                {formatNumber(
                  newDashboardData.criticidade_cid.reduce((acc, item) => acc + item.grave, 0) /
                    newDashboardData.criticidade_cid.length,
                )}
                %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
