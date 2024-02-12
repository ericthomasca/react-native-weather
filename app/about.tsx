import { StatusBar } from "expo-status-bar";
import { View, Text, Linking } from "react-native";

export default function AboutScreen() {
  const handleEmailPress = () => {
    Linking.openURL("mailto:eric@ericthomas.ca");
  };

  const handleGitHubPress = () => {
    Linking.openURL("https://github.com/ericthomasca");
  };

  const handleRepoPress = () => {
    Linking.openURL("https://github.com/ericthomasca/react-native-weather");
  };

  return (
    <View className='flex-1 items-center justify-center px-4'>
      <Text className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
        About the Weather App
      </Text>
      <Text className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
        Created by Eric Thomas
      </Text>
      <Text className='text-base text-gray-700 dark:text-gray-300 mb-2'>
        This weather app was created by{" "}
        <Text
          className='text-blue-500 dark:text-blue-400 underline'
          onPress={handleGitHubPress}
        >
          Eric Thomas
        </Text>
        , a passionate developer.
      </Text>
      <Text className='text-base text-gray-700 dark:text-gray-300 mb-2'>
        You can find the source code on{" "}
        <Text
          className='text-blue-500 dark:text-blue-400 underline'
          onPress={handleRepoPress}
        >
          GitHub
        </Text>
        .
      </Text>
      <Text className='text-base text-gray-700 dark:text-gray-300 mb-4'>
        For any inquiries or issues, feel free to reach out to Eric via email at{" "}
        <Text
          className='text-blue-500 dark:text-blue-400 italic underline'
          onPress={handleEmailPress}
        >
          eric@ericthomas.ca
        </Text>
        .
      </Text>
      <StatusBar style='auto' />
    </View>
  );
}
