"use client"

import { useState } from "react"
import { User, Mail, Phone, Edit, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User as DashboardUser } from "../../types/dashboard"

interface ProfilePageProps {
  user: DashboardUser
  onUpdateUser: (updatedUser: Partial<DashboardUser>) => void
}

export function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "(11) 99999-9999",
  })

  const handleSave = () => {
    onUpdateUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "(11) 99999-9999",
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">Meu Perfil</h1>
          <p className="text-blue-600 mt-2">Gerencie suas informações pessoais</p>
        </div>

        <Card className="border-blue-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-blue-900">{user.name}</CardTitle>
            <CardDescription className="text-blue-600">{user.role}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-end">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-800 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Completo
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-blue-50 rounded-md text-blue-900 font-medium">{user.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-800 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-blue-50 rounded-md text-blue-900 font-medium">{user.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-800 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                ) : (
                  <div className="p-3 bg-blue-50 rounded-md text-blue-900 font-medium">
                    {user.phone || "(11) 99999-9999"}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Informações da Conta</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Cargo:</span>
                  <div className="font-medium text-blue-900">{user.role}</div>
                </div>
                <div>
                  <span className="text-blue-600">ID do Usuário:</span>
                  <div className="font-medium text-blue-900">{user.id}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
