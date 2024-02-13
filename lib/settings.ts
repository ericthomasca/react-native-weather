import * as FileSystem from "expo-file-system";

export const getSettingsInfo = async () => {
  try {
    const uri = FileSystem.documentDirectory + "settings.json";
    const fileContent = await FileSystem.readAsStringAsync(uri);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error getting settings info:", error);
    return null;
  }
};
