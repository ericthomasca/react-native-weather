import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native"; // Replace Button with TouchableOpacity
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { SharedPreferences } from "react-native";

const SettingsScreen = () => {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [accentColor, setAccentColor] = useState("#3498db");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const sharedPreferences = await SharedPreferences.getItem("appSettings");
      if (sharedPreferences) {
        const settings = JSON.parse(sharedPreferences);
        setSelectedTheme(settings.theme);
        setAccentColor(settings.accentColor);
        setIsDarkMode(settings.isDarkMode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        theme: selectedTheme,
        accentColor,
        isDarkMode,
      };
      await SharedPreferences.setItem("appSettings", JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Theme Mode:</Text>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => setSelectedTheme(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label='Light' value='light' />
            <Picker.Item label='Dark' value='dark' />
            <Picker.Item label='System' value='system' />
          </Picker>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Accent Color:</Text>
          <Picker
            selectedValue={accentColor}
            onValueChange={(itemValue) => setAccentColor(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label='Blue' value='#3498db' />
            <Picker.Item label='Red' value='#e74c3c' />
            <Picker.Item label='Green' value='#2ecc71' />
            {/* Add more color options */}
          </Picker>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode:</Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={saveSettings}
        style={[styles.button, { backgroundColor: accentColor }]}
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
    backgroundColor: "#232323",
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
    color: "#FFFFFF",
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

export default SettingsScreen;
