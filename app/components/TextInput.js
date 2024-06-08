import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import Feather from "@expo/vector-icons/Feather";
function AppTextInput({
  name,
  icon,
  width = "100%",
  onCrossPress,
  backgroundColor,
  secureTextEntry,
  ...otherProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={[styles.container, backgroundColor, { width }]}>
      {/* {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )} */}

      <TextInput
        placeholderTextColor={colors.primary}
        style={[
          (defaultStyles.text, { borderWidth: 1, padding: 5, borderRadius: 8 }),
        ]}
        secureTextEntry={!showPassword}
        {...otherProps}
        width={width}
      />
      {name === "password" && (
        <TouchableOpacity style={styles.icon} onPress={handlePassword}>
          {!showPassword ? (
            <Feather name="eye-off" size={24} color="black" />
          ) : (
            <Feather name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.textInputBackground,
    backgroundColor: colors.white,
    // borderRadius: 8,
    flexDirection: "row",
    padding: 3,
    marginVertical: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  cross: {
    marginRight: 10,
  },
});

export default AppTextInput;
