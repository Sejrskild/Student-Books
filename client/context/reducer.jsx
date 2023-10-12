import {
  SET_USER,
  SET_TOKEN,
  SET_LOADING,
  REMOVE_LOADING,
  SET_HAS_REGISTERED,
  SET_API_RESPONSE,
  SET_ONBOARDING,
  CREATE_ITEM_BEGIN,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
} from "./actions";

const reducer = (state, action) => {
  // Sætter token i context API
  if (action.type === SET_TOKEN) {
    return { ...state, token: action.payload };
  }
  // Sætter user i context API
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  // Sætter loading i context API til true
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }

  // Sætter loading i context API til false
  if (action.type === REMOVE_LOADING) {
    return { ...state, isLoading: false };
  }

  // Sætter SET_HAS_REGISTERED i context API til true
  if (action.type === SET_HAS_REGISTERED) {
    return { ...state, hasRegistered: true };
  }

  // Sætter APIResponse i context API
  if (action.type === SET_API_RESPONSE) {
    return { ...state, APIResponse: action.payload };
  }

  if (action.type === SET_ONBOARDING) {
    return { ...state, viewedOnboarding: true };
  }

  if (action.type === CREATE_ITEM_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_ITEM_SUCCESS) {
    return { ...state, isLoading: false };
  }

  if (action.type === CREATE_ITEM_ERROR) {
    return { ...state, isLoading: false };
  }

  throw new Error(`Ingen tilsvarende action : ${action.type}`);
};

export default reducer;
