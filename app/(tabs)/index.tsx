import { useEffect, useState } from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";
import * as Location from "expo-location";
import { WeatherData } from "@/types";
import { fetchWeather } from "@/lib/weatherApi";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const cardHeight = windowHeight / 5;

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    fetchWeather(latitude, longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View className='flex-1 items-center justify-start bg-black pt-10'>
      {weatherData ? (
        <View className='w-full bg-white rounded-lg p-6 mb-4'>
          <Text className='text-xl font-bold mb-2 text-slate-200 dark:text-slate-800'>
            {weatherData.name}, {weatherData.sys.country}
          </Text>
          <Text className='text-lg mb-2 text-slate-200 dark:text-slate-800'>
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
            }}
            className='w-24 h-24 mb-2'
          />
          <Text className='text-3xl text-slate-200 dark:text-slate-800'>
            {Math.round(weatherData.main.temp - 273.15)}°C
          </Text>
          <Text className='text-lg mb-2 text-slate-200 dark:text-slate-800'>
            Feels like {Math.round(weatherData.main.feels_like - 273.15)}°C
          </Text>
          <Text className='text-lg mb-2 text-slate-200 dark:text-slate-800'>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text className='text-lg text-slate-200 dark:text-slate-800'>
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>
        </View>
      ) : (
        <Text className='text-slate-200 dark:text-slate-800'>
          Fetching weather data...
        </Text>
      )}
    </View>
  );
}
