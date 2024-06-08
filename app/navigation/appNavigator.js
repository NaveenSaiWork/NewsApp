import React from "react";
import { Text, View } from "react-native";
import Screen from "../components/Screen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import NewsDetailedScreen from "../screens/NewsDetailedScreen";
import UserScreen from "../screens/UserScreen";
const Stack = createStackNavigator();
function appNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="News"
        component={NewsDetailedScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Fill Your Profile"
        component={UserScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default appNavigator;
