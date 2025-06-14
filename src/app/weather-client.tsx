"use client";

import { useEffect, useState } from "react";
import { WeatherData } from "./lib/fetchWeather";

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
  <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full max-w-sm">
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
      </div>
    </main>
  );
}