import { WeatherData } from "../types/weather";

export async function fetchWeather(locationQuery: string): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
     const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(locationQuery)}&days=3`,
      { next: { revalidate: 600 } }
    );
    if (!response.ok) {
      console.error("Failed to fetch weather:", response.statusText);
      return null;
    }

    const data = await response.json();

    return {
      temperatureC: data.current.temp_c,
      localtime: data.location.localtime,
      feelsLikeC: data.current.feelslike_c,
      windChill: data.current.windchill_c,
      visibility: data.current.vis_km,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      uvIndex: data.current.uv,
      conditionText: data.current.condition.text,
      iconUrl: `https:${data.current.condition.icon}`,
      city: data.location.name,
      country: data.location.country,
      pressure: data.current.pressure_in,
      dewPointC: data.current.dewpoint_c,
      heatIndex: data.current.heatindex_c,
      forecast: data.forecast.forecastday
    };

  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}