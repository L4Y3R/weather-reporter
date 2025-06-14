"use client";

import { useEffect, useState } from "react";
import { WeatherData } from "./lib/fetchWeather";
import { Eye, Droplets, Wind, Sun } from "lucide-react"
import CurrentWeather from "./components/CurrentWeather";
import WeatherMetric from "./components/WeatherMetric";
import AdditionalDetail from "./components/AdditonalDetails";
import Forecast from "./components/Forecast";
import HeaderSearch from "./components/search"

export function WeatherClient() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) throw new Error("Failed to fetch weather");

        const data: WeatherData = await res.json();
        console.log("weather in component:", data);
        setWeather(data);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        🔄 Loading weather...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        ❌ Failed to load weather data.
      </div>
    );
  }

  return (
  <main className="min-h-screen bg-black">
      {/* <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full max-w-sm">
        <div> {weather.city}, {weather.country} </div>
          <div className="space-y-2 text-lg">
            <div>🌡️ Temperature: {weather.temperatureC}°C</div>
            <div> Feels Like: {weather.feelsLikeC} </div>
            <div> Wind Chill: {weather.windChill} </div>
            <div> Visibility: {weather.visibility} </div>
            <div>💧 Humidity: {weather.humidity}%</div>
            <div>💨 Wind Speed: {weather.windKph} kph</div>
            <div>🌞 UV Index: {weather.uvIndex}</div>
            <div>
              🌦️ {weather.conditionText}
              <img
                src={weather.iconUrl}
                alt="Weather Icon"
                className="inline ml-2 h-6 w-6 align-middle"
              />
            </div>
        </div>
      </div> */}
      <div className="w-full max-w-none mx-auto px-52 py-8">
        <div className="py-8">
            <HeaderSearch/>
        </div>

        <CurrentWeather weather={weather}/>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <WeatherMetric icon={Eye} iconColor="text-blue-400" iconBg="bg-blue-500/20" label="VISIBILITY" value={`${weather.visibility} KM`} />
          <WeatherMetric icon={Droplets} iconColor="text-cyan-400" iconBg="bg-cyan-500/20" label="HUMIDITY" value={`${weather.humidity} %`}  />
          <WeatherMetric icon={Wind} iconColor="text-gray-400" iconBg="bg-gray-500/20" label="WIND" value={`${weather.windKph} KM/h`}  />
          <WeatherMetric icon={Sun} iconColor="text-orange-400" iconBg="bg-orange-500/20" label="UV INDEX" value={weather.uvIndex} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AdditionalDetail label="FEELS LIKE" value={`${weather.feelsLikeC} °C`} />
          <AdditionalDetail label="WIND CHILL" value={`${weather.windChill} °C`} />
          <AdditionalDetail label="PRESSURE" value={weather.heatIndex} subValue="in Hg" />
          <AdditionalDetail label="DEW POINT" value={weather.dewPointC} />
        </div>
        <Forecast />
      </div>
    </main>
  );
}