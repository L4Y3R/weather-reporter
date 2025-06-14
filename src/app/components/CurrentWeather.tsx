import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Sun } from "lucide-react"

export default function CurrentWeather() {
    return (
    <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-3xl overflow-hidden mb-8">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-xl font-medium text-white">New York</span>
          </div>
          <span className="text-gray-400">2:30 PM</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-8xl font-thin text-white mb-2 tracking-tighter">72°</div>
            <div className="text-2xl text-gray-300 mb-2 font-medium">Partly Cloudy</div>
            <div className="text-gray-400">Feels like 75°</div>
          </div>
          <div className="text-right">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 mb-4">
              <Sun className="w-16 h-16 text-white" />
            </div>
            <div className="text-gray-400 space-y-1">
              <div>H: 78° L: 65°</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    );
}