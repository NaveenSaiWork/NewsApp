import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
function IconAndText({ name, color, onPress, ...props }) {
  return (
    <TouchableOpacity style={styles.IconContainer}>
      <FontAwesome5 name={name} size={24} color={color} />
      <View style={{ padding: 10 }}>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  IconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: defaultStyles.colors.light,
    margin: 20,
    borderRadius: 10,
    width: "50%",
  },
});
export default IconAndText;
