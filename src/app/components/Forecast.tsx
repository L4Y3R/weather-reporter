import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ForecastDay from "./ForecastDay"
import { Sun, Cloud, CloudRain } from "lucide-react"

export default function Forecast() {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-3xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-400 text-sm font-medium tracking-wide uppercase">3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <ForecastDay
          icon={Sun}
          iconGradient="bg-gradient-to-br from-yellow-400 to-orange-500"
          day="Tomorrow"
          condition="Sunny"
          temp="80° / 62°"
          rainChance="0%"
        />
        <ForecastDay
          icon={Cloud}
          iconGradient="bg-gradient-to-br from-gray-400 to-gray-600"
          day="Wednesday"
          condition="Partly Cloudy"
          temp="75° / 59°"
          rainChance="10%"
        />
        <ForecastDay
          icon={CloudRain}
          iconGradient="bg-gradient-to-br from-blue-400 to-blue-600"
          day="Thursday"
          condition="Light Rain"
          temp="68° / 55°"
          rainChance="80%"
        />
      </CardContent>
    </Card>
  )
}
