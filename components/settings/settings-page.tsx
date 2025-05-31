"use client"

import { useState } from "react"
import { Bell, Shield, Palette, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    alerts: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "pt-BR",
    autoRefresh: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">Configurações</h1>
          <p className="text-blue-600 mt-2">Personalize sua experiência na plataforma</p>
        </div>

        <div className="grid gap-6">
          {/* Notificações */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Bell className="h-5 w-5 text-blue-600" />
                Notificações
              </CardTitle>
              <CardDescription className="text-blue-600">
                Configure como você deseja receber alertas e notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-blue-900">Notificações por Email</Label>
                  <p className="text-sm text-blue-600">Receba alertas importantes por email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-blue-900">Notificações Push</Label>
                  <p className="text-sm text-blue-600">Receba notificações no navegador</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-blue-900">Alertas de Anomalias</Label>
                  <p className="text-sm text-blue-600">Seja notificado sobre anomalias críticas</p>
                </div>
                <Switch
                  checked={notifications.alerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, alerts: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferências */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Palette className="h-5 w-5 text-blue-600" />
                Preferências
              </CardTitle>
              <CardDescription className="text-blue-600">
                Personalize a aparência e comportamento da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-900">Tema</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-900">Idioma</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-blue-900">Atualização Automática</Label>
                  <p className="text-sm text-blue-600">Atualizar dados automaticamente a cada 5 minutos</p>
                </div>
                <Switch
                  checked={preferences.autoRefresh}
                  onCheckedChange={(checked) => setPreferences({ ...preferences, autoRefresh: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="h-5 w-5 text-blue-600" />
                Segurança
              </CardTitle>
              <CardDescription className="text-blue-600">
                Gerencie suas configurações de segurança e privacidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Configurar Autenticação de Dois Fatores
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Gerenciar Sessões Ativas
              </Button>
            </CardContent>
          </Card>

          {/* Dados */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Database className="h-5 w-5 text-blue-600" />
                Dados e Exportação
              </CardTitle>
              <CardDescription className="text-blue-600">
                Configure opções de backup e exportação de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Exportar Dados do Dashboard
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Configurar Backup Automático
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                Limpar Cache Local
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Salvar Todas as Configurações</Button>
        </div>
      </div>
    </div>
  )
}
