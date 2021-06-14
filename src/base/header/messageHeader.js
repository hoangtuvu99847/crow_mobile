import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ICON, TEXT } from "../../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";

export const renderHeaderCenter = ({navigation} ,roomName, userCount) => {
  const showListUser = () => {
    console.log(navigation);
    navigation.navigate("ListUserRoom", { roomName: roomName })
  };
  return (
    <View style={{ marginTop: -10 }}>
      <Text style={{ color: TEXT.WHITE, fontSize: 16 }}>{roomName}</Text>
      <TouchableOpacity style={{ backgroundColor: "white", marginTop: 6, borderRadius: 3, paddingHorizontal: 4 }}
                        onPress={showListUser}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="people" color={TEXT.PRIMARY} size={12} style={{ marginHorizontal: 3, marginTop: 2 }} />
          <Text style={{ color: TEXT.PRIMARY, fontSize: 12 }}>{userCount} users</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};
