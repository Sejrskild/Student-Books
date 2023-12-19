import { createStackNavigator } from "@react-navigation/stack";

import Main from "../screens/HomeStack/Main";

import ScreenHeaderButton from "../components/ScreenHeaderButton";

import Avatar from "../components/Avatar";
import Item from "../screens/HomeStack/Item";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import Profile from "../screens/HomeStack/Profile";
import Search from "../screens/HomeStack/Search";

const Stack = createStackNavigator();

const HomeStack = ({ route }) => {
  const [items, setItems] = useState([]);
  const { user } = useAppContext();

  const getItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/items", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("trying to get items");
      setItems(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getItems();
  }, [route.params?.refreshItems, user]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home_Main"
        options={({ navigation }) => ({
          headerRight: () => <Avatar navigation={navigation} />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
      >
        {(props) => <Main {...props} items={items} onRefresh={getItems} />}
      </Stack.Screen>
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
          headerRight: () => <Avatar navigation={navigation} />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
        name="Home_Item"
        component={Item}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
          headerRight: () => <Avatar navigation={navigation} />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
        name="Home_Item_Profile"
        component={Profile}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <ScreenHeaderButton
              iconName="chevron-left"
              navigation={navigation}
            />
          ),
          headerRight: () => <Avatar navigation={navigation} />,
          headerTitle: "",
          headerShadowVisible: false,
        })}
        name="Home_Search"
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
