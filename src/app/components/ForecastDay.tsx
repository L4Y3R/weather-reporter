import { LucideIcon } from "lucide-react"

interface ForecastDayProps {
  icon: LucideIcon
  iconGradient: string
  day: string
  condition: string
  temp: string
  rainChance: string
}

export default function ForecastDay({ icon: Icon, iconGradient, day, condition, temp, rainChance }: ForecastDayProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`${iconGradient} rounded-full p-3`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-white font-medium">{day}</div>
          <div className="text-gray-400 text-sm">{condition}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white text-xl font-semibold">{temp}</div>
        <div className="text-gray-400 text-sm">Rain {rainChance}</div>
      </div>
    </div>
  )
}
