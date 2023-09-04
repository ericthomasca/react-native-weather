import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("location");
        const parsedLocation = jsonValue != null ? JSON.parse(jsonValue) : null;
        setLocation(parsedLocation);
      } catch (e) {
        console.log("Problem getting data from storage: ", e);
      }
    };

    getLocation();
  }, []);

  const getWeather = async () => {
    try {
      if (location) {
        let url = `https://api.openweathermap.org/data/2.5/weather?
                   lat=${location.coords.latitude}&
                   lon=${location.coords.longitude}&
                   appid=${process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY}`;

        axios.get(url).then((response) => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + "%";
          this.wind = response.data.wind.speed + "m/s";
          this.overcast = response.data.weather[0].description;
          this.icon =
            "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
          this.sunset = new Date(response.data.sys.sunset * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
        });
      }
    } catch (e) {
      console.log("Problem getting openweather api data: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            Temperature: {weatherData.main.temp} °C
          </Text>
          <Text style={styles.weatherText}>
            Min Temperature: {weatherData.main.temp_min} °C
          </Text>
          <Text style={styles.weatherText}>
            Max Temperature: {weatherData.main.temp_max} °C
          </Text>
          <Text style={styles.weatherText}>
            Pressure: {weatherData.main.pressure} hPa
          </Text>
          <Text style={styles.weatherText}>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text style={styles.weatherText}>
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>
          <Text style={styles.weatherText}>
            Overcast: {weatherData.weather[0].description}
          </Text>
          <Text style={styles.weatherText}>
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000)
              .toLocaleTimeString("en-GB")
              .slice(0, 4)}
          </Text>
          <Text style={styles.weatherText}>
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000)
              .toLocaleTimeString("en-GB")
              .slice(0, 4)}
          </Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
  },
  header: {
    color: "#FFFFFF",
    fontSize: 40,
    marginTop: 25,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  weatherText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
