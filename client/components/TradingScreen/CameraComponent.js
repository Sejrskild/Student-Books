import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import colors from "../../assets/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const CameraComponent = ({ onTakePicture, onBack }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoadingImage(true);
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 1,
      });
      onTakePicture(photo.base64);
    }
    setLoadingImage(false);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
        onMountError={(error) => {
          alert("Camera Error", error);
        }}
      >
        <View style={styles.topControlsContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <FontAwesome5 name="chevron-left" size={32} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomControlsContainer}>
          <TouchableOpacity
            onPress={takePicture}
            style={styles.shutterButtonOuter}
            disabled={loadingImage}
          >
            <View style={styles.shutterButtonInner}>
              <FontAwesome5 name="camera" size={32} color={colors.WHITE} />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topControlsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",

    alignItems: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  bottomControlsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  shutterButtonOuter: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.PRUSSIAN_BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
});
