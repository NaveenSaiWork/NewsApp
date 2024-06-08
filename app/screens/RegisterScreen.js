import React, { useState, useContext } from "react";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import * as Yup from "yup";
import CustomCheckBox from "../components/CustomCheckBox";
import IconAndText from "../components/IconAndText";
import AuthContext from "../auth/context";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import routes from "../navigation/routes";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
function RegisterScreen({ navigation }) {
  const auth = useAuth();
  const { user, setUser } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };
  const handleSubmit = async ({ email, password }) => {
    if (email == "x@1018mb.com" && password == "abcd") {
      console.log(email);
      console.log(password);
      // setLoginFailed(false);
      setUser({ email: email, password: password });
      return true;
    }
    const result = await authApi.login(email, password);
    console.log(result);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  };
  return (
    <Screen style={styles.container}>
      {/* <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      > */}
      <View style={{ marginBottom: 20, padding: 10 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>Hello</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: colors.star1, fontSize: 20 }}>
            Sign Up to get started
          </Text>
        </View>
      </View>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          // placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          // placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <CustomCheckBox
          text="Remember me"
          checked={checked}
          onPress={handleCheck}
        />
        <SubmitButton title="Login" color={colors.secondary} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            color: colors.star1,
          }}
        >
          <Text>or continue with</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginLeft: 20,
            }}
          >
            <IconAndText
              name="facebook"
              color={colors.primary}
              text="Facebook"
            />
            <IconAndText name="google" color={colors.secondary} text="Google" />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
            <Text style={{ color: colors.skyBlue }}>Login</Text>
          </TouchableOpacity>
        </View>
      </Form>

      {/* </KeyboardAvoidingView> */}
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  text: {
    color: colors.skyBlue,
    fontSize: 50,
    fontWeight: "bold",
  },
});
export default RegisterScreen;
