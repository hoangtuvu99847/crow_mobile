import { Text, TouchableOpacity, View } from "react-native";
import { TEXT } from "../../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export const renderHeaderCenterScreen = (title) => {
  return (
    <View>
      <Text style={{color: TEXT.WHITE, fontSize: 16}}>{title}</Text>
    </View>
  );
};
