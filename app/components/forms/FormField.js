import React from "react";
import { useFormikContext } from "formik";
import { Text, View } from "react-native";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";

function AppFormField({ name, width, showStar = true, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginLeft: 3, color: colors.star1 }}>
          {Capitalize(name)}
        </Text>
        {showStar && <Text style={{ color: "red" }}>*</Text>}
      </View>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        name={name}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
