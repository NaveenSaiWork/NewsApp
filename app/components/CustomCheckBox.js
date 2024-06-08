import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomCheckBox = ({ checked, onPress, text }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <MaterialIcons
        name={checked ? "check-box" : "check-box-outline-blank"}
        size={24}
        color={checked ? "#007bff" : "#707070"}
      />
      <Text style={styles.checkboxText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomCheckBox;
