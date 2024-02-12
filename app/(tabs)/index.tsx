import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: [{ description: string; icon: string }];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

interface SettingsData {
  apiKey: string;
  cityName: string;
}

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    try {
      const settingsData: SettingsData = await getSettingsInfo();
      const apiKey = settingsData ? settingsData.apiKey : '05818676a056fbb2f31e071feb9c9ea0';
      const cityName = settingsData ? encodeURIComponent(settingsData.cityName) : 'Corner%20Brook';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      const response = await axios.get<WeatherData>(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getSettingsInfo = async () => {
    try {
      const uri = FileSystem.documentDirectory + "settings.json";
      const fileContent = await FileSystem.readAsStringAsync(uri);
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error getting settings info:", error);
      return null; // Return null if settings file doesn't exist or couldn't be read
    }
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View className='flex-1 items-center justify-center'>
      {weatherData ? (
        <View className='items-center justify-center'>
          <Text className='text-xl font-bold mb-2 dark:text-slate-200'>
            {weatherData.name}, {weatherData.sys.country}
          </Text>
          <Text className='text-lg mb-2 dark:text-slate-200'>
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
            className='w-24 h-24 mb-2'
          />
          <Text className='text-3xl dark:text-slate-200'>
            {Math.round(weatherData.main.temp - 273.15)}°C
          </Text>
          <Text className='text-lg mb-2 dark:text-slate-200'>
            Feels like {Math.round(weatherData.main.feels_like - 273.15)}°C
          </Text>
          <Text className='text-lg mb-2 dark:text-slate-200'>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text className='text-lg dark:text-slate-200'>
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>
        </View>
      ) : (
        <Text className='text-slate-200'>Fetching weather data...</Text>
      )}
    </View>
  );
}
