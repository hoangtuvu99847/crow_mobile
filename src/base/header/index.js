import { Text, TouchableOpacity, View } from "react-native";
import { TEXT } from "../../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import StorageApp from "../../../utils/storage"
import { useDispatch } from "react-redux";
import { actionLogout } from "../../redux/action";

export const renderButtonBack = ({ navigation }) => {
  const back = () => {
    navigation.goBack()
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={back}>
        <Icon name="arrow-back-outline" color={TEXT.WHITE} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export const renderButtonMenu = ({ navigation }) => {
  const dispatch = useDispatch()
  const logout = () => {
    StorageApp.removeValue('user')
      .then(() => dispatch(actionLogout()))
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={logout}>
        <Icon name="menu" color={TEXT.WHITE} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export const renderButtonSearch = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ marginTop: 5 }}>
        <Icon name="search" color={TEXT.WHITE} size={22} />
      </TouchableOpacity>
    </View>
  );
};
