import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const theme = useTheme();

  const storeLocation = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("location", jsonValue);
    } catch (e) {
      console.log("Problem storing location: ", e);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      storeLocation(location);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={getLocation}
        style={[
          styles.button,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Get GPS Location</Text>
      </TouchableOpacity>
      {location && (
        <View style={styles.coordView}>
          <Text style={styles.coords}>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coords}>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 7,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
  coordView: {
    alignItems: "center",
  },
  coords: {
    fontSize: 25,
    marginVertical: 5,
  },
});
