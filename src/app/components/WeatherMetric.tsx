import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface WeatherMetricProps {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  label: string
  value: string
}

export default function WeatherMetric({ icon: Icon, iconColor, iconBg, label, value }: WeatherMetricProps) {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`${iconBg} rounded-full p-3`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <div className="text-gray-400 text-sm font-medium">{label}</div>
            <div className="text-2xl font-semibold text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}