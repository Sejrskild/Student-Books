import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCapturePress = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      navigation.navigate("Sell_Main", { photo: photo.base64 });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.light_background}
      />
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={CameraType.back}
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
          <Entypo
            name="chevron-left"
            size={24}
            color={COLORS.light_background}
          />
          <Text style={styles.backBtnText}>Tilbage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={handleCapturePress}
        >
          <View style={styles.captureBtnInner}>
            <Entypo name="camera" size={24} color={COLORS.light_primary} />
          </View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: 60,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.light_background,
    marginLeft: 8,
  },
  captureBtn: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.light_primary,
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.light_background,
    justifyContent: "center",
    alignItems: "center",
  },
});
