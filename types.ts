export interface WeatherData {
  name: string;
  sys: { country: string };
  weather: [{ description: string; icon: string }];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

export interface SettingsData {
  apiKey: string;
  cityName: string;
}
