import { Activity, TrendingUp, Home, AlertTriangle, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { newDashboardData } from "../../data/dashboard-data"

const BLUE_COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"]

// Função para formatar números com 2 casas decimais
const formatNumber = (num: number): string => {
  return num.toFixed(2)
}

// Componente para mapa de calor
const HeatMapCell = ({ value, max }: { value: number; max: number }) => {
  const intensity = value / max
  const opacity = Math.max(0.1, intensity)
  return (
    <div
      className="w-full h-8 flex items-center justify-center text-white text-xs font-medium rounded"
      style={{ backgroundColor: `rgba(30, 64, 175, ${opacity})` }}
    >
      {value}
    </div>
  )
}

export function EfficiencyTab() {
  const maxRisk = Math.max(
    ...newDashboardData.risco_evento_adverso.flatMap((item) => [item.iatrogênico, item.clínico, item.infeccioso]),
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Previsão de Reinternação em 30 dias */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Activity className="h-5 w-5 text-blue-600" />
            Previsão de Reinternação em 30 dias
          </CardTitle>
          <CardDescription className="text-blue-600">
            Comparação entre reinternações previstas e reais por período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={newDashboardData.previsao_reinternacao}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="periodo" tick={{ fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
              <Tooltip
                formatter={(value, name) => [value, name === "previsto" ? "Previsto" : "Real"]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="previsto"
                stroke="#60a5fa"
                strokeWidth={3}
                name="Previsto"
                dot={{ fill: "#60a5fa", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="real"
                stroke="#1e40af"
                strokeWidth={3}
                name="Real"
                dot={{ fill: "#1e40af", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Acurácia da previsão:</span>
              <span className="font-medium text-green-600">87.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detecção de pacientes para desospitalização */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Pacientes Elegíveis para Alta
          </CardTitle>
          <CardDescription className="text-blue-600">
            Pacientes por unidade com potencial para desospitalização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={newDashboardData.desospitalizacao}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, "dataMax + 5"]}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
              />
              <YAxis
                dataKey="unidade"
                type="category"
                tick={{ fontSize: 11 }}
                width={80}
                axisLine={{ stroke: "#3b82f6" }}
              />
              <Tooltip
                formatter={(value) => [`${value} pacientes`, "Elegíveis para Alta"]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                wrapperStyle={{ zIndex: 100 }}
              />
              <Bar dataKey="pacientes" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              <Eye className="h-4 w-4 mr-2" />
              Ver Lista de Pacientes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Elegibilidade para internação domiciliar - CORRIGIDO */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Home className="h-5 w-5 text-blue-600" />
            Elegibilidade para Internação Domiciliar
          </CardTitle>
          <CardDescription className="text-blue-600">
            Classificação de pacientes elegíveis para cuidados domiciliares
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <Pie
                data={newDashboardData.elegibilidade_domiciliar}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="valor"
                nameKey="categoria"
              >
                {newDashboardData.elegibilidade_domiciliar.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-blue-900">186 pacientes</div>
            <div className="text-sm text-blue-600">elegíveis para internação domiciliar</div>
          </div>
        </CardContent>
      </Card>

      {/* Risco de evento adverso - Mapa de calor */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Risco de Evento Adverso por Setor
          </CardTitle>
          <CardDescription className="text-blue-600">
            Mapa de calor mostrando riscos por tipo de evento e setor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-blue-800">
              <div></div>
              <div className="text-center">Iatrogênico</div>
              <div className="text-center">Clínico</div>
              <div className="text-center">Infeccioso</div>
            </div>
            {newDashboardData.risco_evento_adverso.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center">
                <div className="text-sm font-medium text-blue-900 pr-2">{item.setor}</div>
                <HeatMapCell value={item.iatrogênico} max={maxRisk} />
                <HeatMapCell value={item.clínico} max={maxRisk} />
                <HeatMapCell value={item.infeccioso} max={maxRisk} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-blue-600">
            <span>Baixo risco</span>
            <span>Alto risco</span>
          </div>
          <div className="mt-2 h-2 bg-gradient-to-r from-blue-100 to-blue-900 rounded"></div>
        </CardContent>
      </Card>
    </div>
  )
}
