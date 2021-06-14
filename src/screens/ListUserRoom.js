import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Avatar, Input, ListItem, Badge, Header, LinearProgress } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { BUTTON_ICON, COLORS } from "../../utils/colors";
import { renderButtonMenu, renderButtonSearch } from "../base/header";
import { renderHeaderCenterScreen } from "../base/header/roomHeader";
import Ionicons from "react-native-vector-icons/Ionicons";
import socket from "../../socket";


const list = [
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },

];


export default function ListUserRoom({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const subscribeSocketEvent = () => {
    socket.on("users", (data) => {
      console.log("USERS: ", data);
    });
  };
  const getAllUserByRoom = () => {
    const { roomName } = route.params;
    socket.emit("users", roomName);
  };
  const clearScreen = () => {
    socket.off("users");
  };
  useEffect(() => {
    getAllUserByRoom();
    subscribeSocketEvent()
    return () => {
      clearScreen();
    };
  }, []);
  const renderLoading = () => {
    return (
      <View>
        <LinearProgress color="primary" style={{ maxHeight: "70%" }} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={COLORS.PRIMARY}
        statusBarProps={{ barStyle: "light-content" }}
        placement="left"
        leftComponent={renderButtonMenu({ navigation })}
        centerComponent={renderHeaderCenterScreen("Users Online")}
        rightComponent={renderButtonSearch({ navigation })}
      />
      {/*{isLoading ? renderLoading() : rooms.map((l, i) => (*/}
      {/*  <ListItem*/}
      {/*    key={i}*/}
      {/*    bottomDivider*/}
      {/*    onPress={() => {*/}
      {/*    }}>*/}
      {/*    <ListItem.Content>*/}
      {/*      <ListItem.Title>{l.name}</ListItem.Title>*/}
      {/*    </ListItem.Content>*/}
      {/*    <View style={{ flexDirection: "row" }}>*/}
      {/*      <Text style={{ fontSize: 12, color: "gray" }}> {l.number_user}/20 </Text>*/}
      {/*      <Ionicons*/}
      {/*        name="person"*/}
      {/*        size={13}*/}
      {/*        color="gray"*/}
      {/*        style={{ marginTop: 1 }}*/}
      {/*      />*/}
      {/*    </View>*/}
      {/*  </ListItem>*/}
      {/*))}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 0,
    maxHeight: "60%",
    maxWidth: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  inputs: {
    borderBottomColor: "gray",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // paddingVertical: 16,
  },
});
