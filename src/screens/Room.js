import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Header, LinearProgress, ListItem, Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../utils/colors";
import RoomService from "../services/room.service";
import { renderButtonMenu, renderButtonSearch } from "../base/header";
import { renderHeaderCenterScreen } from "../base/header/roomHeader";
import socket from "../../socket";

export default function Room({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleCountUserEachRoom = (responseServerReceived, socketDataReceived) => {
    console.log('================== CHANGED =====================');
    // let result = [];
    // rooms.map(item => {
    //   Object.keys(socketDataReceived).includes(item.name) ?
    //     item["numberUser"] = socketDataReceived[item.name].length
    //     : item["numberUser"] = 0;
    //   console.log("===> USER IN ROOM: ", item);
    //   result.push(item);
    // });
    // setRooms(result);
  };

  const subscribeSocketEvent = () => {
    socket.on("users_rooms", (data) => {
      // handleCountUserEachRoom(rooms, data);
      console.log('DTA: ', data);
      setRooms(data)
    });
  };
  const clearScreen = () => {
    // socket.off("users_rooms");
  };

  useEffect(() => {
    getListRoom()
      .then((data) => socket.emit("users_rooms", data))
    subscribeSocketEvent();
    return () => {
      clearScreen();
    };

  }, []);

  const getListRoom = () => {
    setIsLoading(true);
    return RoomService.list()
      .then(response => {
        return response.data;
      })
      .catch(error => console.log("ERROR: getListRoom :: -> ", error))
      .finally(() => setIsLoading(false));
  };
  const joinRoom = item => {
    return navigation.navigate("Message", { roomName: item.name, listRoom: rooms  });
  };
  const renderLoading = () => {
    return (
      <View>
        <LinearProgress color="primary" style={{ maxHeight: "70%" }} />
      </View>
    );
  };
  return (
    <View>
      <Header
        backgroundColor={COLORS.PRIMARY}
        statusBarProps={{ barStyle: "light-content" }}
        placement="left"
        leftComponent={renderButtonMenu({ navigation })}
        centerComponent={renderHeaderCenterScreen("Rooms")}
        rightComponent={renderButtonSearch({ navigation })}
      />
      {isLoading ? renderLoading() : rooms.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() => joinRoom(l)}>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
          </ListItem.Content>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12, color: "gray" }}> {l.number_user}/20 </Text>
            <Ionicons
              name="person"
              size={13}
              color="gray"
              style={{ marginTop: 1 }}
            />
          </View>
        </ListItem>
      ))}
    </View>
  );

}
