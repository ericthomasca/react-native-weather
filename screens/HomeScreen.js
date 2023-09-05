import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const theme = useTheme();

  const provinceAbbreviations = {
    Alberta: "AB",
    "British Columbia": "BC",
    Manitoba: "MB",
    "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL",
    "Nova Scotia": "NS",
    Ontario: "ON",
    "Prince Edward Island": "PE",
    Quebec: "QC",
    Saskatchewan: "SK",
    "Northwest Territories": "NT",
    Nunavut: "NU",
    Yukon: "YT",
  };

  const getProvinceAbbreviation = (fullName) => {
    if (provinceAbbreviations.hasOwnProperty(fullName)) {
      return provinceAbbreviations[fullName];
    } else {
      return null;
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const jsonLocation = await AsyncStorage.getItem("location");
        const location = jsonLocation ? JSON.parse(jsonLocation) : null;

        if (location) {
          const { latitude, longitude } = location.coords;
          const apikey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
          const reverseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apikey}`;

          const [weatherResponse, reverseGeocodeResponse] = await Promise.all([
            axios.get(weatherUrl),
            axios.get(reverseGeocodeUrl),
          ]);

          const { main, wind, weather, sys } = weatherResponse.data;
          const cityName = reverseGeocodeResponse.data[0].name;
          const fullProvince = reverseGeocodeResponse.data[0].state;
          const provinceCode = getProvinceAbbreviation(fullProvince);

          const descriptionCapitalized = weather[0].description
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          setWeatherData({
            city: cityName,
            province: provinceCode,
            temperature: main.temp,
            humidity: `${main.humidity}%`,
            windSpeed: `${(wind.speed * 3.6).toFixed()} km/h`,
            description: descriptionCapitalized,
            sunrise: new Date(sys.sunrise * 1000)
              .toLocaleTimeString("en-US"),
            sunset: new Date(sys.sunset * 1000)
              .toLocaleTimeString("en-US"),
            iconUrl: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
          });
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    getWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.header, {color: theme.colors.primary}]}>
          {weatherData && `${weatherData.city}, ${weatherData.province}`}
        </Text>
        {weatherData && (
          <View style={styles.weatherContainer}>
            <Image
              style={styles.weatherIcon}
              source={{ uri: weatherData.iconUrl }}
            />
            <Text style={[styles.weatherText, {color: theme.colors.primary}]}>
              {weatherData.temperature.toFixed(1)}°C {weatherData.description}
            </Text>
            <Text style={[styles.weatherText, {color: theme.colors.primary}]}>
              Humidity: {weatherData.humidity}
            </Text>
            <Text style={[styles.weatherText, {color: theme.colors.primary}]}>
              Wind Speed: {weatherData.windSpeed}
            </Text>
            <Text style={[styles.weatherText, {color: theme.colors.primary, marginTop: 26}]}>
              Sunrise: {weatherData.sunrise}
            </Text>
            <Text style={[styles.weatherText, {color: theme.colors.primary}]}>
              Sunset: {weatherData.sunset}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  header: {
    fontSize: 35,
    marginTop: 10,
  },
  weatherContainer: {
    alignItems: "flex-start",
  },
  weatherText: {
    fontSize: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    margin: 2,
  },
});
