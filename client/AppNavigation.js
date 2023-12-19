import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider, useAppContext } from "./context/appContext";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginStack from "./navigation/LoginStack";
import MainNavigation from "./navigation/MainNavigation";
import OnboardingScreen from "./screens/OnboardingScreen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function AppNavigation() {
  const { user, firstLaunch, isLoading } = useAppContext();

  useEffect(() => {
    if (isLoading) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (firstLaunch === true || firstLaunch === "true") {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigation /> : <LoginStack />}
    </NavigationContainer>
  );
}
