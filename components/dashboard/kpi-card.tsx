import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  color: string
  bgColor: string
  target?: string
}

export function KPICard({ title, value, change, trend, icon: Icon, color, bgColor, target }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden border-blue-100 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <Badge
            variant={trend === "up" ? "destructive" : "default"}
            className={`text-xs ${trend === "up" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {change}
          </Badge>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-blue-700">{title}</h3>
          <p className="text-2xl font-bold text-blue-900 mt-1">{value}</p>
          {target && <p className="text-xs text-blue-600 mt-1">Meta: {target}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
