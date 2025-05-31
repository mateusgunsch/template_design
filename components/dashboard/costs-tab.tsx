import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { newDashboardData } from "../../data/dashboard-data"

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

// Componente customizado para Boxplot
const BoxPlot = ({ data }: { data: any[] }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="text-sm font-medium text-blue-900">{item.diagnostico}</div>
          <div className="relative h-8 bg-blue-50 rounded">
            {/* Quartis */}
            <div
              className="absolute h-full bg-blue-200 rounded"
              style={{
                left: `${(item.q1 / 80000) * 100}%`,
                width: `${((item.q3 - item.q1) / 80000) * 100}%`,
              }}
            />
            {/* Mediana */}
            <div className="absolute h-full w-0.5 bg-blue-800" style={{ left: `${(item.mediana / 80000) * 100}%` }} />
            {/* Outliers */}
            {item.outliers.map((outlier: number, oIndex: number) => (
              <div
                key={oIndex}
                className="absolute w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2 top-1/2"
                style={{ left: `${(outlier / 80000) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-blue-600">
            <span>Q1: {formatCurrency(item.q1)}</span>
            <span>Mediana: {formatCurrency(item.mediana)}</span>
            <span>Q3: {formatCurrency(item.q3)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function CostsTab() {
  // Detectar anomalias (pontos fora da linha de tendência)
  const anomalias = newDashboardData.anomalias_faturamento.filter(
    (item) => Math.abs(item.observado - item.esperado) / item.esperado > 0.3,
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Estimativa de custo por paciente - Boxplot MELHORADO */}
      {/* Estimativa de custo por paciente - Boxplot */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Estimativa de Custo por Paciente
          </CardTitle>
          <CardDescription className="text-blue-600">
            Distribuição de custos por faixa de diagnóstico (outliers em vermelho)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BoxPlot data={newDashboardData.custo_por_paciente} />
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Outliers detectados:</span>
              <span className="font-medium text-red-600">
                {newDashboardData.custo_por_paciente.reduce((acc, item) => acc + item.outliers.length, 0)} casos
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previsão de custo total de atendimento - Colunas empilhadas */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Previsão de Custo Total de Atendimento
          </CardTitle>
          <CardDescription className="text-blue-600">
            Breakdown de custos por categoria ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={newDashboardData.custo_total_atendimento}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} axisLine={{ stroke: "#3b82f6" }} />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value as number),
                  name === "Exames" ? "Exames" : name === "Internação" ? "Internação" : "Medicação",
                ]}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <Legend />
              <Bar dataKey="exames" stackId="a" fill="#93c5fd" name="Exames" />
              <Bar dataKey="internacao" stackId="a" fill="#3b82f6" name="Internação" />
              <Bar dataKey="medicacao" stackId="a" fill="#1e40af" name="Medicação" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Custo médio mensal:</span>
              <span className="font-medium text-blue-900">R$ 2.18M</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detecção de anomalias no faturamento - Dispersão */}
      <Card className="border-blue-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Detecção de Anomalias no Faturamento
          </CardTitle>
          <CardDescription className="text-blue-600">
            Valores esperados vs observados - pontos fora da curva destacados em vermelho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis
                type="number"
                dataKey="esperado"
                name="Esperado"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="number"
                dataKey="observado"
                name="Observado"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value as number),
                  name === "esperado" ? "Esperado" : "Observado",
                ]}
                labelFormatter={(label, payload) => `Hospital ${payload?.[0]?.payload?.hospital}`}
                contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #3b82f6" }}
              />
              <ReferenceLine
                stroke="#60a5fa"
                strokeDasharray="5 5"
                segment={[
                  { x: 5000, y: 5000 },
                  { x: 30000, y: 30000 },
                ]}
              />
              <Scatter
                data={newDashboardData.anomalias_faturamento.filter(
                  (item) => Math.abs(item.observado - item.esperado) / item.esperado <= 0.3,
                )}
                fill="#3b82f6"
                name="Normal"
              />
              <Scatter data={anomalias} fill="#ef4444" name="Anomalia" />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-900">{anomalias.length}</div>
              <div className="text-blue-600">Anomalias detectadas</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-900">
                {formatNumber((anomalias.length / newDashboardData.anomalias_faturamento.length) * 100)}%
              </div>
              <div className="text-blue-600">Taxa de anomalia</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-900">
                {formatCurrency(anomalias.reduce((acc, item) => acc + Math.abs(item.observado - item.esperado), 0))}
              </div>
              <div className="text-blue-600">Impacto financeiro</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
