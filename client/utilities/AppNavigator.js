import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import checkOnboarding from "./checkOnboarding";
import checkLoggedin from "./checkLoggedin";

// Screens
import OnboardingScreen from "../app/screens/OnboardingScreen";
import HomeScreen from "../app/screens/HomeScreen";
import ProfileScreen from "../app/screens/ProfileScreen";

// Loading Compoennt
import Loading from "../components/Loading";

// Context API
import { useAppContext } from "../context/appContext";

// Colors
import colors from "../assets/colors";

// Buttom Tabs
import generateTabOptions from "./tabOptions";
import TradingScreen from "../app/screens/TradingScreen";
import AuthStack from "../routes/AuthStack";
import AfterLoginTabNavigator from "../routes/MainStack";

const AfterLoginTabs = createBottomTabNavigator();

export default function AppNavigator() {
  const { ...state } = useAppContext();

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkOnboardingStatus = async () => {
    const hasSeenOnboarding = await checkOnboarding();
    setHasSeenOnboarding(hasSeenOnboarding);
  };

  const checkLoggedInStatus = async () => {
    const isLoggedIn = await checkLoggedin();
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    checkOnboardingStatus();
    checkLoggedInStatus();
  }, [state]);

  // Handle the case where we haven't determined the onboarding status yet
  if (hasSeenOnboarding === false) {
    return <Loading />;
  }

  // If the user hasn't seen onboarding
  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AfterLoginTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
