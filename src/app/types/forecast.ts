export interface Forecast{
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    totalprecip_mm: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}