import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Sun } from "lucide-react"
import { WeatherData } from "../types/weather";

type Props = {
  weather: WeatherData;
};

export default function CurrentWeather({ weather }: Props) {
    return (
    <Card className="
        bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-3xl overflow-hidden mb-8
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50
        cursor-pointer">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-xl font-medium text-white">{weather.city} , {weather.country}</span>
          </div>
          <span className="text-gray-400"> 
            {new Date(weather.localtime.replace(" ", "T")).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-8xl font-thin text-white mb-2 tracking-tighter"> {weather.temperatureC}°C </div>
            <div className="text-2xl text-gray-300 mb-2 font-medium"> {weather.conditionText} </div>
            <div className="text-gray-400">Feels like {weather.feelsLikeC} °C</div>
          </div>
          <div className="flex justify-end mb-6">
            <img
              src={weather.iconUrl.startsWith("//") ? `https:${weather.iconUrl}` : weather.iconUrl}
              alt="Weather Icon"
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
      </CardContent>
    </Card>
    );
}