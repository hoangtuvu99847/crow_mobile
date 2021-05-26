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
  Button, ActivityIndicator,
} from "react-native";
import { Avatar, Divider, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import socket from "../../socket";
import { BUTTON_ICON, COLORS, ICON, TEXT } from "../../utils/colors";
import { useSelector } from "react-redux";
import ChatService from "../services/chat.service";

export default function Message({ route, navigation }) {
  const { roomName } = route.params;
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoadingButtonSend, setLoadingButtonSend] = useState(false);
  const currentUser = useSelector(state => state.user);
  const joinRoom = () => {
    socket.emit("join", { room: roomName, user: currentUser });
    console.log("JOIN ROOM");
  };
  const leaveRoom = () => {
    socket.emit("leave", { room: roomName, user: currentUser });
    console.log("LEAVE ROOM");
  };
  const send = () => {
    console.log("currentUser: ", currentUser);
    setLoadingButtonSend(true);
    const data = {
      room: roomName,
      text: messageText,
      user: currentUser,
    };
    return ChatService.saveMessage(data)
      .then(response => {
        console.log("response: ", response.data);
        setMessageText("");
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingButtonSend(false));
  };

  const getListMessageByRoom = async () => {
    console.log("roomName: ", roomName);
    return ChatService.list_message_by_room(roomName)
      .then(response => response.data)
      .then(messages => handleShowMessage(messages))
      .catch(err => console.log("err: ", err));
  };
  const handleShowMessage = (messages) => {
    const { username } = currentUser;
    const listMessage = messages.map(item => {
      (item.sender === username) ? item.type = "out" : item.type = "in";
      return item;
    });
    setMessages((messages) => [...messages, ...listMessage]);
  };
  const pushMessage = (data) => {
    const { username } = currentUser;
    username === data["sender"] ? data["type"] = "out" : data["type"] = "in";
    setMessages((messages) => [...messages, data]);
  };
  const subscribeSocketEvent = () => {
    socket.on("join", (data) => {
      console.log(" ===> JOIN LISTENER: ", data);
    });
    socket.on("chat", (data) => {
      pushMessage(data);
    });
    socket.on("user_in_room", (data) => {
      console.log("user_in_room: ", data);
    });
  };

  const cleanScreen = () => {
    leaveRoom();
    socket.off("join");
    socket.off("leave");
    socket.off("chat");
  };
  useEffect(() => {
    getListMessageByRoom().then(() => {
    });
    subscribeSocketEvent();
    joinRoom();
    return () => {
      cleanScreen();
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
        {
          currentUser.username !== name && <Text style={{
            textAlign: isMine ? "right" : "left",
            fontSize: 12,
            fontWeight: "bold",
            color: isMine ? "#ffffff" : "#222",
          }}>{name}</Text>
        }
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
                inverted={true}
                contentContainerStyle={{ flexDirection: "column-reverse" }}
                data={messages}
                keyExtractor={(item, index) => {
                  return index;
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
                          {renderName(item.sender, !inMessage)}
                          <Text style={{ color: !inMessage && "#ffffff" }}>{item.msg}</Text>
                          {inMessage ? renderDate(item.time_created, false) : renderDate(item.time_created, true)}
                        </View>
                        {/* {inMessage && renderDate(item.date, false)} */}
                      </View>
                    </View>
                  );
                }} />
      <Divider />
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
              {
                isLoadingButtonSend ? <ActivityIndicator color={TEXT.WHITE} size={"small"} />
                  : <Icon name="send" size={16} color="#fff" />
              }
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
