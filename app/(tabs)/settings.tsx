import { useState } from "react";
import { View, Text, TextInput, Button, Alert, ToastAndroid } from "react-native";
import * as FileSystem from "expo-file-system";

export default function SettingsScreen() {
  const defaultApiKey = "05818676a056fbb2f31e071feb9c9ea0";
  const defaultCityName = "Corner Brook, NL";

  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [cityName, setCityName] = useState(defaultCityName);

  const handleSave = async () => {
    try {
      const data = {
        apiKey,
        cityName,
      };

      const jsonData = JSON.stringify(data);
      const uri = FileSystem.documentDirectory + "settings.json";
      await FileSystem.writeAsStringAsync(uri, jsonData);
      ToastAndroid.show("Settings Saved", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert("Error", "Failed to save settings. Please try again.");
    }
  };

  return (
    <View className='flex-1 items-center justify-center px-4'>
      <Text className='text-lg mb-2 dark:text-slate-200'>Enter API Key:</Text>
      <TextInput
        className='w-full h-10 border border-gray-400 rounded-md mb-4 px-4 dark:text-slate-200'
        placeholder='API Key'
        onChangeText={(text) => setApiKey(text)}
        value={apiKey}
      />
      <Text className='text-lg mb-2 dark:text-slate-200'>Enter City Name:</Text>
      <TextInput
        className='w-full h-10 border border-gray-400 rounded-md mb-4 px-4 dark:text-slate-200'
        placeholder='City Name'
        onChangeText={(text) => setCityName(text)}
        value={cityName}
      />
      <Button title='Save' onPress={handleSave} />
    </View>
  );
}
