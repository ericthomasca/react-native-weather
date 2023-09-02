import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LocationScreen from "./screens/LocationScreen";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appSettings.db");

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          activeColor='#aff9c9'
          inactiveColor='#67e0a3'
          barStyle={{ backgroundColor: "#317b22" }}
        >
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='home' color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name='Location'
            component={LocationScreen}
            options={{
              tabBarLabel: "Location",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='crosshairs-gps'
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='cog' color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='light' />
    </SafeAreaProvider>
  );
}
