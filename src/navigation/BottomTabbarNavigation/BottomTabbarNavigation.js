import { StyleSheet, Text, View, Dimensions, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  Foundation,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../screens/BottomTabbarScreen/HomeScreen/HomeScreen";
import ProfileScreen from "../../screens/BottomTabbarScreen/ProfileScreen/ProfileScreen";
import StationScreen from "../../screens/BottomTabbarScreen/StationScreen/StationScreen";

const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const insets = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1C2129",
          position: "absolute",
          bottom: height * 0.02,
          marginHorizontal: width * 0.05,
          height: height * 0.09,
          borderRadius: 25,
          paddingHorizontal: width * 0.02,
        },
        tabBarLabelStyle: {
          display: "none", // show Label
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="StationScreen"
        component={StationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="electric-car" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    //  backgroundColor: "red",
  },
});
