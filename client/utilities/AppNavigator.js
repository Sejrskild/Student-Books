import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import checkOnboarding from "./checkOnboarding";
import checkLoggedin from "./checkLoggedin";

// Screens
import OnboardingScreen from "../app/screens/OnboardingScreen";
import AuthScreen from "../app/screens/AuthScreen";
import LoginScreen from "../app/screens/LoginScreen";
import RegisterScreen from "../app/screens/RegisterScreen";
import HomeScreen from "../app/screens/HomeScreen";
import ProfileScreen from "../app/screens/ProfileScreen";
import ForgotPasswordScreen from "../app/screens/ForgotPasswordScreen";

// Loading Compoennt
import Loading from "../components/Loading";

// Context API
import { useAppContext } from "../context/appContext";

// Colors
import colors from "../assets/colors";

// Buttom Tabs
import generateTabOptions from "./tabOptions";
import TradingScreen from "../app/screens/TradingScreen";

const BeforeLoginStack = createNativeStackNavigator();
const AfterLoginTabs = createBottomTabNavigator();

function BeforeLoginStackNavigator() {
  return (
    <BeforeLoginStack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BeforeLoginStack.Screen name="AuthScreen" component={AuthScreen} />
      <BeforeLoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <BeforeLoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <BeforeLoginStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </BeforeLoginStack.Navigator>
  );
}

function AfterLoginTabNavigator() {
  return (
    <AfterLoginTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginTop: 10,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.PRUSSIAN_BLUE,
        tabBarInactiveTintColor: colors.STEEL_BLUE,
        tabBarShowLabel: true,
      }}
    >
      <AfterLoginTabs.Screen
        name="Home"
        component={HomeScreen}
        options={generateTabOptions("Forside", "home", "Entypo")}
      />
      <AfterLoginTabs.Screen
        name="Trading"
        component={TradingScreen}
        options={generateTabOptions("Market", "store", "FontAwesome5")}
      />
      <AfterLoginTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={generateTabOptions("Profil", "user-circle", "FontAwesome")}
      />
    </AfterLoginTabs.Navigator>
  );
}

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
      {isLoggedIn ? <AfterLoginTabNavigator /> : <BeforeLoginStackNavigator />}
    </NavigationContainer>
  );
}
