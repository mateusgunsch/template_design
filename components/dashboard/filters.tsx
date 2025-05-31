"use client"

import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  selectedPeriod: string
  setSelectedPeriod: (value: string) => void
  selectedUnit: string
  setSelectedUnit: (value: string) => void
}

export function DashboardFilters({ selectedPeriod, setSelectedPeriod, selectedUnit, setSelectedUnit }: FiltersProps) {
  return (
    <div className="bg-white border-b border-blue-100 px-6 py-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Filtros:</span>
        </div>

        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedUnit} onValueChange={setSelectedUnit}>
          <SelectTrigger className="w-48 border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="Unidade de Saúde" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Unidades</SelectItem>
            <SelectItem value="uti">UTI</SelectItem>
            <SelectItem value="emergencia">Emergência</SelectItem>
            <SelectItem value="clinica">Clínica Médica</SelectItem>
            <SelectItem value="cirurgia">Cirurgia</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="Faixa Etária" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="0-18">0-18 anos</SelectItem>
            <SelectItem value="19-65">19-65 anos</SelectItem>
            <SelectItem value="65+">65+ anos</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40 border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="Fonte Pagadora" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="sus">SUS</SelectItem>
            <SelectItem value="convenio">Convênio</SelectItem>
            <SelectItem value="particular">Particular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
