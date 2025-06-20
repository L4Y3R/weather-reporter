"use client";

import { useEffect, useState } from "react";
import { WeatherData } from "./types/weather";
import { Eye, Droplets, Wind, Sun } from "lucide-react"
import CurrentWeather from "./components/CurrentWeather";
import WeatherMetric from "./components/WeatherMetric";
import AdditionalDetail from "./components/AdditonalDetails";
import Forecast from "./components/Forecast";
import HeaderSearch from "./components/HeaderSearch";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

export function WeatherClient() {
  const [city, setCity] = useState("Colombo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?city=${city}`);
        if (!res.ok) throw new Error("Failed to fetch weather");

        const data: WeatherData = await res.json();
        console.log(" Data: ", data.forecast);
        setWeather(data);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  if (error || !weather) {
    return (
      <ErrorScreen/>
    );
  }

  return (
  <main className="min-h-screen bg-black">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-52 py-8">
        <div className="py-8">
            <HeaderSearch onSearch={(value) => setCity(value)}/>
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
        <Forecast forecast={weather.forecast}/>
      </div>
  </main>
  );
}