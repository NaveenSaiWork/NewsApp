import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./context";
import authStorage from "./storage";
import useStore from "../state/state";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { userStore, setUserStore } = useStore();

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);

    setUser(user);
    setUserStore(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    setUserStore({});
    authStorage.removeToken();
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared successfully.");
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  };

  return { user, logIn, logOut, clearAllData };
};
