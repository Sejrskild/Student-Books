import {
  USER_LOGIN,
  FIRST_LAUNCH,
  INITIALIZE_APP_LOADING,
  REFRESH_USER,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === FIRST_LAUNCH) {
    return {
      ...state,
      firstLaunch: action.payload,
    };
  }

  if (action.type === INITIALIZE_APP_LOADING) {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === "REFRESH_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
