import { Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-white/20" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard Preditivo</h1>
            <p className="text-blue-100 mt-1">Análise inteligente para gestão hospitalar - Murta Consultoria</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
            <Eye className="h-4 w-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>
    </div>
  )
}
