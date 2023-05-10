import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabbarNavigation from "../BottomTabbarNavigation/BottomTabbarNavigation";
import SplashScreen from "../../screens/Splash/SplashScreen";
import LoginScreen from "../../screens/LoginAndRegister/LoginScreen/LoginScreen";
import RegisterScreen from "../../screens/LoginAndRegister/RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen
        name="BottomTabbarNavigation"
        component={BottomTabbarNavigation}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
