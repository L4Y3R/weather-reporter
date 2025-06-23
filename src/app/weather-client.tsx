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

  const weatherGradients: Record<string, string> = {
    Clear: "bg-gradient-to-tr from-yellow-400 via-sky-800 to-sky-700",          
    Sunny: "bg-gradient-to-tr from-yellow-800 via-orange-700 to-amber-600",    
    Cloudy: "bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-600",       
    Rain: "bg-gradient-to-tr from-blue-950 via-gray-800 to-gray-700",
    Drizzle: "bg-gradient-to-tr from-blue-950 via-gray-800 to-gray-700",        
    Thunderstorm: "bg-gradient-to-tr from-gray-900 via-slate-800 to-slate-700", 
    Snow: "bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-500",         
    Mist: "bg-gradient-to-tr from-slate-600 via-slate-500 to-slate-400",       
    Fog: "bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-500",       
  };

  const fetchWeatherData = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather");

      const data: WeatherData = await res.json();
      setWeather(data);
      setError(false);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    fetchWeatherData(`/api/weather?city=${city}`);
  }, [city]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
      alert("Location detection timed out. Please try again or enter your city manually.");
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`/api/weather?lat=${latitude}&lon=${longitude}`);
      },
      (positionError) => {
        clearTimeout(timeoutId);
        let errorMessage = "Unable to retrieve your location: ";
        
        switch (positionError.code) {
          case positionError.PERMISSION_DENIED:
            errorMessage += "Location access was denied. Please enable location permissions and try again.";
            break;
          case positionError.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable. Please check your internet connection.";
            break;
          case positionError.TIMEOUT:
            errorMessage += "Location request timed out. Please try again.";
            break;
          default:
            errorMessage += positionError.message;
            break;
        }
        
        alert(errorMessage);
        console.error("Geolocation error:", positionError);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 300000
      }
    );
  };

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

  const condition = weather.conditionText || "Clear";

  const backgroundClass =
    Object.entries(weatherGradients).find(([key]) =>
      condition.toLowerCase().includes(key.toLowerCase())
    )?.[1] || "bg-gradient-to-tr from-blue-900 via-cyan-700 to-blue-500";

  return (
  <main className={`min-h-screen transition-colors duration-1000 ${backgroundClass}`}>
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-52 py-8">
        <div className="py-8">
            <HeaderSearch 
            onSearch={(value) => setCity(value)}
            onDetectLocation={handleDetectLocation}
            />
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