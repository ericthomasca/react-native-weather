import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      <Text style={styles.text}>Coming soon...</Text>
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
});
