import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ErrorMessage, Form, FormField } from "../components/forms";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .label("Phone Number"),
});
function UserScreen(props) {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    // setImageUri(null);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <Screen style={{ margin: 10 }}>
      {!imageUri && (
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}
          style={styles.ImageContainer}
        >
          <View style={styles.cameraIcon}>
            <View
              style={{
                height: 30,
                width: 40,
                borderRadius: 15,
                backgroundColor: colors.secondary,
                position: "absolute",
              }}
            ></View>
            <View style={{ position: "absolute", paddingRight: 5 }}>
              <Entypo name="camera" size={30} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {imageUri && (
        <TouchableOpacity
          onPress={() => pickImage()}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: imageUri }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </TouchableOpacity>
      )}
      <Form
        initialValues={{
          userName: "",
          email: "",
          fullName: "",
          phoneNumber: "",
        }}
        // onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="userName"
          placeholder="User Name"
          showStar={false}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="Full Name"
          placeholder="Full Name"
          showStar={false}
          textContentType="name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          keyboardType="phone-pad"
          name="phoneNumber"
          placeholder="Phone Number"
        />
      </Form>
    </Screen>
  );
}
const styles = StyleSheet.create({
  ImageContainer: {
    alignSelf: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#e1e4e8",
  },
  cameraIcon: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
    marginBottom: 2,
    padding: 5,
  },
});
export default UserScreen;
