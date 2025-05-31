"use client"

import { useState } from "react"
import { Activity, Clock, DollarSign, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { LoginForm } from "./components/login/login-form"
import { AppSidebar } from "./components/sidebar/app-sidebar"
import { ProfilePage } from "./components/profile/profile-page"
import { SettingsPage } from "./components/settings/settings-page"
import { DashboardHeader } from "./components/dashboard/header"
import { DashboardFilters } from "./components/dashboard/filters"
import { KPICard } from "./components/dashboard/kpi-card"
import { EfficiencyTab } from "./components/dashboard/efficiency-tab"
import { CostsTab } from "./components/dashboard/costs-tab"
import { RisksTab } from "./components/dashboard/risks-tab"
import { AuditTab } from "./components/dashboard/audit-tab"
import { dashboardData } from "./data/dashboard-data"
import type { User } from "./types/dashboard"

export default function HealthcareDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [selectedUnit, setSelectedUnit] = useState("all")

  // Usuário simulado
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Dr. João Silva",
    email: "joao.silva@murtaconsultoria.com.br",
    role: "Analista Sênior",
    phone: "(11) 99999-9999",
  })

  const handleLogin = (email: string, password: string) => {
    // Simular autenticação
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage("dashboard")
  }

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    setUser({ ...user, ...updatedUser })
  }

  // Função para formatar números com 2 casas decimais
  const formatNumber = (num: number): string => {
    return num.toFixed(2)
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  // Renderizar página baseada na navegação
  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage user={user} onUpdateUser={handleUpdateUser} />
      case "settings":
        return <SettingsPage />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => {
    // KPIs calculados dos dados reais
    const kpis = [
      {
        title: "Taxa de Reinternação 30 dias",
        value: `${formatNumber(dashboardData.eficiencia_assistencial.reinternacao_30_dias.percentual)}%`,
        change: `+${formatNumber(dashboardData.eficiencia_assistencial.reinternacao_30_dias.percentual - dashboardData.eficiencia_assistencial.reinternacao_30_dias.meta)}%`,
        trend: "up" as const,
        icon: Activity,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        target: `${formatNumber(dashboardData.eficiencia_assistencial.reinternacao_30_dias.meta)}%`,
      },
      {
        title: "Tempo Médio de Internação",
        value: `${formatNumber(dashboardData.eficiencia_assistencial.tempo_medio_internacao.previsto)} dias`,
        change: `+${formatNumber(dashboardData.eficiencia_assistencial.tempo_medio_internacao.previsto - dashboardData.eficiencia_assistencial.tempo_medio_internacao.meta)} dias`,
        trend: "up" as const,
        icon: Clock,
        color: "text-blue-700",
        bgColor: "bg-blue-100",
        target: `${formatNumber(dashboardData.eficiencia_assistencial.tempo_medio_internacao.meta)} dias`,
      },
      {
        title: "Eficiência Média de Custos",
        value: `${formatNumber(dashboardData.gestao_de_custos.eficiencia_ajustada_case_mix.reduce((acc, h) => acc + h.eficiencia, 0) / dashboardData.gestao_de_custos.eficiencia_ajustada_case_mix.length)}%`,
        change: "+3.00%",
        trend: "down" as const,
        icon: DollarSign,
        color: "text-blue-800",
        bgColor: "bg-blue-200",
      },
      {
        title: "Desvio Médio Faturamento",
        value: `${formatNumber(dashboardData.auditoria_e_compliance.evolucao_desvios_faturamento.reduce((acc, item) => acc + item.percentual, 0) / dashboardData.auditoria_e_compliance.evolucao_desvios_faturamento.length)}%`,
        change: "-1.00%",
        trend: "down" as const,
        icon: Shield,
        color: "text-blue-900",
        bgColor: "bg-blue-300",
      },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <DashboardHeader />

        <DashboardFilters
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />

        <div className="p-6">
          {/* KPIs em Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Tabs para organizar os gráficos */}
          <Tabs defaultValue="efficiency" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border-blue-200">
              <TabsTrigger
                value="efficiency"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Eficiência Assistencial
              </TabsTrigger>
              <TabsTrigger value="costs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Gestão de Custos
              </TabsTrigger>
              <TabsTrigger value="risks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Gestão de Riscos
              </TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Auditoria & Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="efficiency" className="space-y-6">
              <EfficiencyTab data={dashboardData} />
            </TabsContent>

            <TabsContent value="costs" className="space-y-6">
              <CostsTab data={dashboardData} />
            </TabsContent>

            <TabsContent value="risks" className="space-y-6">
              <RisksTab data={dashboardData} />
            </TabsContent>

            <TabsContent value="audit" className="space-y-6">
              <AuditTab data={dashboardData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} onLogout={handleLogout} currentPage={currentPage} onPageChange={setCurrentPage} />
      <SidebarInset>{renderPage()}</SidebarInset>
    </SidebarProvider>
  )
}
