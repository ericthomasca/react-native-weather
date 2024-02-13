import axios from "axios";
import { getSettingsInfo } from "@/lib/settings";
import { SettingsData, WeatherData } from "@/types";

export const fetchWeather = async (latitude: number, longitude: number) => {
  try {
    const settingsData: SettingsData = await getSettingsInfo();
    const apiKey = settingsData
      ? settingsData.apiKey
      : "05818676a056fbb2f31e071feb9c9ea0";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const response = await axios.get<WeatherData>(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
