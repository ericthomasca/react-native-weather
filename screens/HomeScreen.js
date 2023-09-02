import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("location");
      const parsedLocation = jsonValue != null ? JSON.parse(jsonValue) : null;
      setLocation(parsedLocation);
    } catch (e) {
      console.log("Problem getting data from storage: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      <TouchableOpacity
        onPress={getLocation}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Get Stored Location</Text>
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
    backgroundColor: "#232323",
    alignItems: "center",
  },
  header: {
    color: "#FFFFFF",
    fontSize: 40,
    marginTop: 25,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 100,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 7,
    marginBottom: 30,
    marginTop: 30
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
