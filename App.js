import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import {
  // MD3DarkTheme as DefaultDarkTheme,
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider
} from "react-native-paper";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LocationScreen from "./screens/LocationScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider theme={DefaultDarkTheme}>
          <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen
              name='Home'
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='home' color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name='Location'
              component={LocationScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='crosshairs-gps' color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name='Settings'
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='cog' color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </PaperProvider>
      </NavigationContainer>
      <StatusBar style='light' />
    </SafeAreaProvider>
  );
}
