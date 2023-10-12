import { StyleSheet, View, TouchableOpacity, Image, Share } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import React from "react";

const ImageComponent = ({ image }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Del denne fantastiske bog med dine medstuderende!",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.photos}>
      <View style={styles.photosTop}>
        <TouchableOpacity onPress={onShare} style={styles.photosTopItem}>
          <FeatherIcon color="#000" name="share" size={16} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: `data:image/png;base64,${image}` }}
        style={styles.photosImg}
      />
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  photos: {
    marginTop: 12,
    position: "relative",
    height: 240,
    overflow: "hidden",
    borderRadius: 12,
  },
  photosTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  photosTopItem: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: 240,
  },
});
