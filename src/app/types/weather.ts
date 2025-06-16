import { Forecast } from "./forecast";

export interface WeatherData {
  temperatureC: number;
  localtime: string;
  feelsLikeC: number;
  windChill: number;
  visibility: number;
  humidity: number;
  windKph: number;
  uvIndex: number;
  conditionText: string;
  iconUrl: string;
  city: string;
  country: string;
  pressure: number;
  dewPointC: number;
  heatIndex: number;
  forecast: Forecast[];
}
