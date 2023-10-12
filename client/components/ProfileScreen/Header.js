import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useAppContext } from "../../context/appContext";

const HeaderInformation = ({ user }) => {
  const { isLoading } = useAppContext();

  const { image, firstName, lastName } = user;

  return (
    <View style={styles.profile}>
      <View style={styles.profileTop}>
        <View style={styles.avatar}>
          {isLoading ? (
            <Placeholder style={styles.avatarImg} Animation={Fade}>
              <PlaceholderMedia style={styles.avatarImg} />
            </Placeholder>
          ) : (
            <Image
              alt=""
              source={{
                uri: user.image,
              }}
              style={styles.avatarImg}
            />
          )}
        </View>
        <View style={styles.profileBody}>
          {isLoading ? (
            <Placeholder
              style={([styles.profileTitle], { marginTop: 10 })}
              Animation={Fade}
            >
              <PlaceholderLine width={80} />
              <PlaceholderLine width={50} />
            </Placeholder>
          ) : (
            <Text
              style={styles.profileTitle}
            >{`${user.firstName}\n${user.lastName}`}</Text>
          )}
          <Text style={styles.profileSubtitle}>Forhåbentlig studerende 🥲</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
});
