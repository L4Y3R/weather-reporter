export interface WeatherData {
  temperatureC: number;
  feelsLikeC: number;
  windChill: number;
  visibility: number
  humidity: number;
  windKph: number;
  uvIndex: number;
  conditionText: string;
  iconUrl: string;
  city: string;
  country: string
}

export async function fetchWeather(city: string): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch weather:", response.statusText);
      return null;
    }

    const data = await response.json();

    return {
      temperatureC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      windChill: data.current.windchill_c,
      visibility: data.current.vis_km,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      uvIndex: data.current.uv,
      conditionText: data.current.condition.text,
      iconUrl: `https:${data.current.condition.icon}`,
      city: data.location.name,
      country: data.location.country
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}