import { useState } from "react";
import { StyleSheet, Text, Button, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={getLocation}
        style={styles.button}
        activeOpacity={0.7} // Add feedback when pressed
      >
        <Text style={styles.buttonText}>Get Location</Text>
      </TouchableOpacity>
      {location && (
        <View style={styles.coordView}>
          <Text style={styles.coords}>
            Latitude: {location.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coords}>
            Longitude: {location.longitude.toFixed(6)}
          </Text>
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
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 7,
    marginBottom: 30, 
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
  },
  coordView: {
    alignItems: "center",
  },
  coords: {
    color: "#FFFFFF",
    fontSize: 25,
    marginVertical: 5,
  },
});
