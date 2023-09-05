import { useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native"; 
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MD3DarkTheme as DefaultDarkTheme,
  MD3LightTheme as DefaultLightTheme,
} from "react-native-paper";

export default function SettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = {
    ...DefaultLightTheme,
    colors: {
      ...DefaultLightTheme.colors,
      // primary: "tomato",
      // secondary: "yellow",
    },
  };

  const darkTheme = {
    ...DefaultDarkTheme,
    colors: {
      ...DefaultDarkTheme.colors,
      // primary: "tomato",
      // secondary: "yellow",
    },
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setSelectedTheme(isDarkMode ? "light" : "dark");
  };

  const theme = isDarkMode ? DefaultDarkTheme : DefaultLightTheme;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Theme Mode:</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
          Save Settings
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingLabel: {
    // color: "#FFFFFF",
    fontSize: 20,
  },
  picker: {
    flex: 1,
    color: "#FFFFFF",
    backgroundColor: "transparent",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 7,
    marginBottom: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
};
