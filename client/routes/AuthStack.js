import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import AuthScreen from "../app/screens/AuthScreen";
import LoginScreen from "../app/screens/LoginScreen";
import RegisterScreen from "../app/screens/RegisterScreen";
import ForgotPasswordScreen from "../app/screens/ForgotPasswordScreen";

const BeforeAuthStack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <BeforeAuthStack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BeforeAuthStack.Screen name="AuthScreen" component={AuthScreen} />
      <BeforeAuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <BeforeAuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <BeforeAuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </BeforeAuthStack.Navigator>
  );
};

export default AuthStack;
