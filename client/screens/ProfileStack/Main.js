import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Stats from "../../components/Stats";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppContext } from "../../context/appContext";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import axios from "axios";
import CardList from "../../components/ProfileStack/CardList";

const avatars = [
  "🙎‍♂️",
  "🙎‍♀️",
  "🧑",
  "🐸",
  "🐶",
  "🦄",
  "👽",
  "🤖",
  "👾",
  "🐱",
  "🦉",
  "🦁",
];

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

export default function Main() {
  const [value, setValue] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [isLocalLoading, setIsLocalLoading] = React.useState(false);

  const sheet = React.useRef();
  const { user, handleUpdateUser } = useAppContext();

  const index = avatars.findIndex((item) => item === user.avatar);

  React.useEffect(() => {
    setValue(index);
  }, []);

  const getItems = async () => {
    setIsLocalLoading(true);
    try {
      const { data, status } = await axios.get(
        `http://localhost:3000/api/v1/items/user/${user.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (status === 200) {
        setItems(data);
      }
      setIsLocalLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light_background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatar}>{user.user.avatar}</Text>
            <View style={styles.changeAvatarBtnWrapper}>
              <TouchableOpacity
                style={styles.changeAvatarBtn}
                onPress={() => {
                  sheet.current.open();
                  console.log(user);
                }}
              >
                <AntDesign
                  name="plus"
                  size={12}
                  color={COLORS.light_background}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTextName}>
              {user.user.firstName} {user.user.lastName}
            </Text>
            <Text style={styles.headerTextTag}>{user.user.email}</Text>
          </View>
        </View>
        <Stats
          createdAt={user.user.createdAt}
          rating={user.user.user_rating / user.user.user_rating_count}
          items={user.user.amountOfItemsListed}
          isProfile={true}
        />
        <CardList items={items} loading={isLocalLoading} refresh={getItems} />
      </View>
      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={440}
        openDuration={250}
        ref={sheet}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderTitle}>Vælg ny Avatar</Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={[styles.profile]}>
            <Text style={styles.profileText}>
              {avatars[value] ? avatars[value] : "🙎‍♂️"}
            </Text>
          </View>
          <View style={styles.group}>
            {avatars.map((item, index) => {
              const isActive = value === index;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setValue(index);
                    }}
                  >
                    <View
                      style={[
                        styles.circle,
                        isActive && { borderColor: COLORS.light_secondary },
                      ]}
                    >
                      <View
                        style={[
                          styles.circleInside,
                          isActive && {
                            backgroundColor: COLORS.light_secondary,
                          },
                        ]}
                      >
                        <Text style={styles.circleAvatar}>{item}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              handleUpdateUser({ ...user, avatar: avatars[value] });
              sheet.current.close();
            }}
          >
            <Text style={styles.btnText}>Gem</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  avatarWrapper: {
    backgroundColor: COLORS.light_primary,
    borderRadius: 50,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 85,
    width: 85,
  },
  avatar: {
    fontSize: 50,
    color: "black",
  },
  changeAvatarBtnWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.light_secondary,
    borderRadius: 50,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 25,
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.light_primary,
  },
  sheetBody: {
    padding: 24,
  },
  profile: {
    alignSelf: "center",
    backgroundColor: COLORS.light_primary,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  profileText: {
    fontSize: 56,
    fontWeight: "600",
    color: "white",
  },
  group: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: "white",
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: "transparent",
    marginRight: 8,
    marginBottom: 12,
    borderColor: COLORS.light_primary,
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: "absolute",
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light_primary,
  },
  circleAvatar: {
    fontWeight: "600",
    color: "white",
    fontSize: 24,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.light_secondary,
    backgroundColor: COLORS.light_secondary,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerTextWrapper: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextName: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.light_primary,
  },
  headerTextTag: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.5,
  },
});
