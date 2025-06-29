import { Card, CardContent } from "@/components/ui/card"
import { WeatherMetricProps } from "../types/wetherMetricProps"

export default function WeatherMetric({ icon: Icon, iconColor, iconBg, label, value }: WeatherMetricProps) {
  return (
    <Card className="
        bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-2xl
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50
        cursor-pointer">
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




