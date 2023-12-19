import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Main from "../screens/LoginStack/Main";
import SignUp from "../screens/LoginStack/SignUp";
import ForgotPasswordScreen from "../screens/LoginStack/ForgotPasswordScreen";

// Header Component
import ScreenHeaderButton from "../components/ScreenHeaderButton";
import Terms from "../screens/LoginStack/Terms";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginStack_Main"
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginStack_Main"
        component={Main}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
        })}
        name="LoginStack_ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
        })}
        name="LoginStack_SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
        })}
        name="LoginStack_Terms"
        component={Terms}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
