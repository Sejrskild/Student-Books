// appContext.js

/*

  This file contains the AppProvider component, which is a custom component that wraps the entire app, and makes the app context available to all components.

  It also contains the useAppContext hook, which is a custom hook that can be used to access the app context from any component.

  The app context is used to store global state, such as the user, and the firstLaunch status.

*/

import axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Actions
import {
  USER_LOGIN,
  FIRST_LAUNCH,
  INITIALIZE_APP_LOADING,
  REFRESH_USER,
} from "./actions";
import { Alert } from "react-native";

// Initial state
const initialState = {
  some: [],
  user: null,
  firstLaunch: null,
  INITIALIZE_APP_LOADING: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: INITIALIZE_APP_LOADING, payload: true });

    // Fetch user from AsyncStorage when AppProvider mounts
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const firstLaunch = await AsyncStorage.getItem("firstLaunch");
      if (user) {
        dispatch({ type: USER_LOGIN, payload: JSON.parse(user) });
      }
      if (
        firstLaunch === null ||
        firstLaunch === "true" ||
        firstLaunch === true
      ) {
        await AsyncStorage.setItem("firstLaunch", "true");
        dispatch({ type: FIRST_LAUNCH, payload: true });
      }
      dispatch({ type: INITIALIZE_APP_LOADING, payload: false });
    };
    fetchUser();
  }, []);

  const changeOnboardingStatus = async () => {
    await AsyncStorage.setItem("firstLaunch", "false");
    dispatch({ type: FIRST_LAUNCH, payload: false });
  };

  const handleLogin = async (email, password) => {
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email,
          password,
        }
      );
      if (status === 200) {
        dispatch({ type: USER_LOGIN, payload: data });
        await AsyncStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      // console error status
      switch (error.response.status) {
        case 401:
          Alert.alert(
            "Hov ❌",
            "Forkert brugernavn eller adgangskode. Prøv igen.",
            [{ text: "OK" }],
            { cancelable: false }
          );
          break;
        case 400:
          Alert.alert(
            "Hov ❌",
            "For at kunne tilgå Student Books skal du først bekræfte din email. Tjek din email for at bekræfte. 💌",
            [{ text: "OK" }],
            { cancelable: false }
          );
          break;
        case 404:
          Alert.alert(
            "Hov ❌",
            "Brugeren blev ikke fundet. Prøv igen.",
            [{ text: "OK" }],
            { cancelable: false }
          );
          break;
      }
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const { data, success } = await axios.patch(
        `http://localhost:3000/api/v1/users/${user.user._id}`,
        user
      );
      dispatch({ type: "REFRESH_USER", payload: data });
      await AsyncStorage.setItem("user", JSON.stringify(data));

      return success;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        changeOnboardingStatus,
        handleUpdateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
