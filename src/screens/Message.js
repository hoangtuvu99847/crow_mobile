import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { Avatar, Divider, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import socket from "../../socket";
import { BUTTON_ICON, COLORS, ICON } from "../../utils/colors";
import { useSelector } from "react-redux";

export default function Message({ route, navigation }) {
  const { roomName } = route.params;
  const [messageText, setMessageText] = useState("");
  const [message, setMessage] = useState(listData);
  const currentUser = useSelector(state => state.user);
  const listData = [
    { id: 1, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit amet" },
    { id: 2, date: "9:50 am", type: "out", message: "Lorem ipsum dolor sit amet" },
    { id: 3, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit a met" },
    { id: 4, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit a met" },
    { id: 5, date: "9:50 am", type: "out", message: "Lorem ipsum dolor sit a met" },
    { id: 6, date: "9:50 am", type: "out", message: "Lorem ipsum dolor sit a met" },
    { id: 7, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit a met" },
    { id: 8, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit a met" },
    { id: 9, date: "9:50 am", type: "in", message: "Lorem ipsum dolor sit a met" },
  ];
  const joinRoom = () => {
    console.log("JOIN ROOM");
    socket.emit("join", { room: roomName }, (response) => {
      console.log("==> RESULT: ", response.status);
    });
  };
  const leaveRoom = () => {
    console.log("LEAVE ROOM");
    socket.emit("leave", { room: roomName });
  };
  const send = () => {
    console.log("current: ", currentUser);
    const data = {
      room: roomName,
      text: messageText,
    };
    socket.emit("chat", data);
    setMessageText("");

  };
  useEffect(() => {
    joinRoom();
    return () => {
      leaveRoom();
    };
  }, []);
  const renderDate = (date, isMine) => {
    return (
      <Text style={[styles.time, isMine ? { color: "#ffffff" } : { alignSelf: "flex-end", color: "#222" }]}>
        {date}
      </Text>
    );
  };
  const renderName = (name, isMine) => {
    return (
      <View style={{ marginVertical: 0 }}>
        <Text style={{
          textAlign: isMine ? "right" : "left",
          fontSize: 12,
          fontWeight: "bold",
          color: isMine ? "#ffffff" : "#222",
        }}>{name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
                data={message}
                keyExtractor={(item) => {
                  return item.id;
                }}
                renderItem={(message) => {
                  const item = message.item;
                  let inMessage = item.type === "in";
                  let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                  return (
                    <View>
                      <View style={[styles.item, itemStyle]}>
                        {/* {!inMessage && renderDate(item.date, true)} */}
                        <View style={[styles.balloon]}>
                          {renderName("Vu KT", !inMessage)}
                          <Text style={{ color: !inMessage && "#ffffff" }}>{item.message}</Text>
                          {inMessage ? renderDate(item.date, false) : renderDate(item.date, true)}
                        </View>
                        {/* {inMessage && renderDate(item.date, false)} */}
                      </View>
                    </View>
                  );
                }} />
      <Divider></Divider>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                     placeholder="Write a message..."
                     underlineColorAndroid="transparent"
                     onChangeText={(msg) => setMessageText(msg)}
                     value={messageText} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5, flexDirection: "row" }}>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Icon name="camera-outline" size={22} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Icon name="image-outline" size={22} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.btnSendContainer}>
            <TouchableOpacity style={styles.btnSend} onPress={send}>
              <Icon name="send" size={16} color="#fff"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  list: {
    paddingHorizontal: 17,
  },
  btnSendContainer: {
    alignItems: "flex-end",
    flex: 5,
    paddingEnd: 5,
    paddingBottom: 5,
  },

  footer: {
    height: 120,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: BUTTON_ICON.ACTIVE,
    width: 40,
    height: 40,
    // borderRadius: 360,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    borderBottomColor: "#FFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemIn: {
    alignSelf: "flex-start",
    backgroundColor: "#FAFAFA",
  },
  itemOut: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.PRIMARY,
  },
  time: {
    // alignSelf: 'flex-end',
    // margin: 15,
    fontSize: 12,
    marginTop: 10,
    color: "#808080",
  },
  item: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    // borderRadius: 300,
    padding: 5,
  },
});
