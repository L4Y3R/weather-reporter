import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ForecastDay from "./ForecastDay"
import { Forecast as ForecastType } from "../types/forecast";

type Props = {
  forecast: ForecastType[];
};

export default function Forecast({ forecast }: Props) {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-3xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-400 text-sm font-medium tracking-wide uppercase">3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {forecast.map((day) => {
          const weekday = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
          });

          return (
            <ForecastDay
              key={day.date}
              icon={day.day.condition.icon}
              iconGradient="bg-gradient-to-br from-blue-400 to-blue-600"
              day={weekday}
              condition={day.day.condition.text}
              temp={`${Math.round(day.day.maxtemp_c)}°C / ${Math.round(day.day.mintemp_c)}°C`}
            />
          );
        })}
      </CardContent>
    </Card>
  )
}
