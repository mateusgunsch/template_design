"use client"

import { useState } from "react"
import { FileText, Download, Search, Filter, ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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

// Função para determinar cor do score
const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-100 text-green-800"
  if (score >= 75) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

// Função para determinar risco do score
const getScoreRisk = (score: number) => {
  if (score >= 90) return "Baixo"
  if (score >= 75) return "Médio"
  return "Alto"
}

export function AuditTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filterUnidade, setFilterUnidade] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filtrar dados
  const filteredData = newDashboardData.pacientes_detalhes.filter((paciente) => {
    const matchesSearch =
      paciente.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.diagnostico.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUnidade = filterUnidade === "all" || paciente.unidade === filterUnidade
    return matchesSearch && matchesUnidade
  })

  // Ordenar dados
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    const aStr = String(aValue).toLowerCase()
    const bStr = String(bValue).toLowerCase()

    if (sortDirection === "asc") {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
    }
  })

  // Paginar dados
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Função para ordenar
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Função para exportar
  const handleExport = (format: "csv" | "pdf") => {
    // Simular exportação
    alert(`Exportando dados em formato ${format.toUpperCase()}...`)
  }

  // Obter unidades únicas
  const unidades = [...new Set(newDashboardData.pacientes_detalhes.map((p) => p.unidade))]

  return (
    <div className="space-y-6">
      {/* Estatísticas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-900">{newDashboardData.pacientes_detalhes.length}</div>
            <div className="text-sm text-blue-600">Total de Pacientes</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {newDashboardData.pacientes_detalhes.filter((p) => p.score >= 85).length}
            </div>
            <div className="text-sm text-blue-600">Alto Risco</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(
                newDashboardData.pacientes_detalhes.reduce((acc, p) => acc + p.custo, 0) /
                  newDashboardData.pacientes_detalhes.length,
              )}
            </div>
            <div className="text-sm text-blue-600">Custo Médio</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-900">
              {formatNumber(
                newDashboardData.pacientes_detalhes.reduce((acc, p) => acc + p.tempo, 0) /
                  newDashboardData.pacientes_detalhes.length,
              )}{" "}
              dias
            </div>
            <div className="text-sm text-blue-600">Tempo Médio</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela principal */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <FileText className="h-5 w-5 text-blue-600" />
            Drill-Down de Pacientes
          </CardTitle>
          <CardDescription className="text-blue-600">
            Análise detalhada com scores preditivos, custos estimados e tempo de internação
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros e busca */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Buscar por paciente ou diagnóstico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
            <Select value={filterUnidade} onValueChange={setFilterUnidade}>
              <SelectTrigger className="w-48 border-blue-200 focus:border-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Unidades</SelectItem>
                {unidades.map((unidade) => (
                  <SelectItem key={unidade} value={unidade}>
                    {unidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          {/* Tabela */}
          <div className="border border-blue-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("paciente")}
                  >
                    <div className="flex items-center gap-2">
                      Paciente
                      {sortField === "paciente" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("diagnostico")}
                  >
                    <div className="flex items-center gap-2">
                      Diagnóstico
                      {sortField === "diagnostico" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("score")}
                  >
                    <div className="flex items-center gap-2">
                      Score Preditivo
                      {sortField === "score" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("unidade")}
                  >
                    <div className="flex items-center gap-2">
                      Unidade
                      {sortField === "unidade" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("custo")}
                  >
                    <div className="flex items-center gap-2">
                      Custo Estimado
                      {sortField === "custo" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-blue-100 text-blue-800"
                    onClick={() => handleSort("tempo")}
                  >
                    <div className="flex items-center gap-2">
                      Tempo Previsto
                      {sortField === "tempo" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((paciente) => (
                  <TableRow key={paciente.id} className="hover:bg-blue-50">
                    <TableCell className="font-medium text-blue-900">{paciente.paciente}</TableCell>
                    <TableCell className="text-blue-700">{paciente.diagnostico}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getScoreColor(paciente.score)}>{paciente.score}</Badge>
                        <span className="text-xs text-blue-600">{getScoreRisk(paciente.score)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-700">{paciente.unidade}</TableCell>
                    <TableCell className="font-medium text-blue-900">{formatCurrency(paciente.custo)}</TableCell>
                    <TableCell className="text-blue-700">{paciente.tempo} dias</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-blue-600">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
              {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length} resultados
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50"
              >
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page ? "bg-blue-600 text-white" : "border-blue-200 text-blue-700 hover:bg-blue-50"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50"
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
