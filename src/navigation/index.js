import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import Room from "../screens/Room";
import Status from "../screens/Status";
import Icon from "react-native-vector-icons/Ionicons";
import Message from "../screens/Message";
import { BUTTON_ICON, COLORS, TEXT } from "../../utils/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements/dist/buttons/Button";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Search from "../screens/Search";
import ListMessage from "../screens/ListMessage";
import socket from "../../socket";
import { ICON_SIZE } from "../../utils/size";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin, actionLogout, actionSetCurrentUser } from "../redux/action";
import StorageApp from '../../utils/storage'

const RoomScreenCustomizeOptions = (route, navigation) => {
  const handleClickMenu = () => {
    navigation.openDrawer();
  };
  const handleClickSearch = () => {
    navigation.navigate("Search");
  };
  const dispatch = useDispatch();

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      dispatch(actionLogout());
    } catch (e) {
      // remove error
    }
    console.log("Done.");
  };
  return {
    headerStyle: {
      backgroundColor: COLORS.PRIMARY,
    },
    headerLeft: () => (
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => handleClickMenu()}>
        <Icon name="menu" size={ICON_SIZE.DEFAULT} style={styles.iconInMenu} />
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View>
        <Text style={styles.title}>{getHeaderTitle(route)}</Text>
      </View>
    ),
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => handleClickSearch()}
          style={{ marginTop: 7 }}>
          <Icon name="search" size={ICON_SIZE.DEFAULT} color={TEXT.WHITE} />
        </TouchableOpacity>
        <Avatar
          rounded
          onPress={removeUser}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
          containerStyle={styles.avatarContainer}
        />
      </View>
    ),
  };
};

const SearchScreenCustomizeOptions = (route, navigation) => {
  return {
    headerTitle: () => <Text style={styles.title}>Search</Text>,
  };
};
const MessageScreenCustomizeOptions = (route, navigation) => {
  const { roomName } = route.params;

  function handleClickSearch() {
    return undefined;
  }

  return {
    headerStyle: {
      backgroundColor: COLORS.PRIMARY,
    },
    headerTintColor: "white",
    headerTitleStyle: { color: "white" },
    headerTitle: () => (
      <View>
        <Text style={styles.title}>{roomName}</Text>
        <View style={{ flexDirection: "row" }}>

        </View>
      </View>
    ),
    headerRight: () => (
      <View style={styles.searchIcon}>
        <Button
          onPress={() => handleClickSearch()}
          icon={<Icon name="search" size={ICON_SIZE.DEFAULT} color={TEXT.WHITE} />}
        />
      </View>
    ),
  };
};

// ====================================================

function getHeaderTitle(route) {
  const routerName = getFocusedRouteNameFromRoute(route) ?? "Crow Message";
  switch (routerName) {
    case "Room":
      return "Room";
    case "Messages":
      return "Messages";
    default:
      return "Messages";
  }
}

const Tab = createBottomTabNavigator();

function ChatMain({ navigation, route }) {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
      console.log("Disconnect socket");
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Room") {
            return (
              <Icon name="people-circle-outline" size={size} color={color} />
            );
          } else if (route.name === "Status") {
            return (
              <Icon name="ios-information-circle" size={size} color={color} />
            );
          } else if (route.name === "Messages") {
            return (
              <Icon name="chatbubbles-outline" size={size} color={color} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: BUTTON_ICON.ACTIVE,
        inactiveTintColor: BUTTON_ICON.INACTIVE,
      }}>
      <Tab.Screen name="Messages" component={ListMessage} />
      <Tab.Screen name="Room" component={Room} options={{}} />
      <Tab.Screen name="Status" component={Status} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function Chat({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={ChatMain}
        options={({ route }) => RoomScreenCustomizeOptions(route, navigation)}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={({ route }) => SearchScreenCustomizeOptions(navigation)}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={({ route }) => MessageScreenCustomizeOptions(route, navigation)}
      />
    </Stack.Navigator>
  );
}

// INIT STACK NAVIGATION MODULE SOCIAL HERE!!!!
function Social() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={""} />
    </Stack.Navigator>
  );
}

const NavDrawer = createDrawerNavigator();

function MainNavigation() {
  return (
    <NavDrawer.Navigator initialRouteName="Chat">
      <NavDrawer.Screen name="Home" component={Social} />
      <NavDrawer.Screen name="Chat" component={Chat} />
    </NavDrawer.Navigator>
  );
}

export default function RootNavigation() {
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const value = await StorageApp.getValue('user')
      value !== null ? dispatch(actionLogin()) : dispatch(actionLogout());
      return value;
    } catch (e) {
      console.log("ERROR: getUser :: -> ", e);
    }
  };
  const handleSaveUser = (user) => {
    if (user !== null) {
      const userObject = user['usr_obj']
      dispatch(actionSetCurrentUser(userObject));
    }
  };
  useEffect(() => {
    console.log('START');
    getUser().then(r => {
      handleSaveUser(r);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: null }}>
        {isLogin ? (
          <Stack.Screen name="App" component={MainNavigation} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleMessageScreen: {
    fontWeight: "600",
    fontSize: 18,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: TEXT.WHITE,
  },
  menuIcon: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  iconInMenu: {
    marginHorizontal: 6,
    color: TEXT.WHITE,
  },
  avatarContainer: {
    marginHorizontal: 16,
  },
  onlineIcon: {
    marginTop: 2,
    marginRight: 4,
  },
  onlinePeople: {
    fontSize: 12,
  },
  searchIcon: {
    flexDirection: "row",
    marginHorizontal: 6,
  },
});
