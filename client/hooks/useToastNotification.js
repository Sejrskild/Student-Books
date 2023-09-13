import { useEffect } from "react";
import Toast from "react-native-toast-message";

const useToastNotification = (APIResponse) => {
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      position: "top",
      text1,
      text2,
      visibilityTime: 8000,
      autoHide: true,
    });
  };

  useEffect(() => {
    if (APIResponse) {
      showToast(APIResponse.type, APIResponse.title, APIResponse.message);
    }
  }, [APIResponse]);
};

export default useToastNotification;
