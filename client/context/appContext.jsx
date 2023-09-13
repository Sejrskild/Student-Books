import axios from "axios";
import React, { useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import reducer from "./reducer";

import {
  SET_TOKEN,
  SET_USER,
  SET_LOADING,
  REMOVE_LOADING,
  SET_HAS_REGISTERED,
  SET_API_RESPONSE,
  SET_ONBOARDING,
} from "./actions";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  viewedOnboarding: false,
  hasRegistered: false,
  APIResponse: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async (formData) => {
    try {
      setLoading();
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData
      );
      if (response.status === 200) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);

        // Set token and user
        dispatch({
          type: SET_TOKEN,
          payload: response.data.token,
        });
        dispatch({
          type: SET_USER,
          payload: response.data.user,
        });

        setAPIResponse(response.data);
      }
    } catch (error) {
      console.error(error);
      setAPIResponse(error.response.data);
      console.log(state.APIResponse);
      removeLoading();
    } finally {
      removeLoading();
    }
  };

  const handleRegister = async (formData) => {
    try {
      setLoading();
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        formData
      );
      if (response.status === 201) {
        setHasRegistered(true);
        // Succes Alert
        console.log(state.APIResponse);
      }
    } catch (error) {
      console.error(error);
      removeLoading();
    } finally {
      removeLoading();
    }
  };

  const handleSendPasswordCode = async (email) => {
    try {
      setLoading();
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/forgot-password-code",
        {
          email,
        }
      );
      removeLoading();
      return response.status;
    } catch (error) {
      setAPIResponse(error.response.data);
      removeLoading();
      return error.response.status;
    } finally {
      removeLoading();
    }
  };

  // Checks if the user provided the correct code for resetting password
  const handlePasswordVerification = async (email, code) => {
    try {
      setLoading();
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/forgot-password-code-verification",
        {
          email,
          code,
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setAPIResponse(error.response.data);
      removeLoading();
    } finally {
      removeLoading();
    }
  };

  // Changes the password
  const handlePasswordChange = async (email, code, password) => {
    try {
      setLoading();
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/reset-password",
        {
          email,
          code,
          password,
        }
      );
      removeLoading();
      setAPIResponse(response.data);
    } catch (error) {
      setAPIResponse(error.response.data);
      removeLoading();
    }
  };

  const handleOnboarding = async () => {
    try {
      dispatch({
        type: SET_ONBOARDING,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeLoading = () => {
    dispatch({
      type: REMOVE_LOADING,
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const setAPIResponse = (value) => {
    dispatch({
      type: SET_API_RESPONSE,
      payload: value,
    });
  };

  const setHasRegistered = (value) => {
    dispatch({
      type: SET_HAS_REGISTERED,
      payload: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        removeLoading,
        handleRegister,
        handleOnboarding,
        handleSendPasswordCode,
        handlePasswordVerification,
        handlePasswordChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, initialState, useAppContext };
