import React, { useState } from "react";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/authNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/appNavigator";
import HomeScreen from "./app/screens/HomeScreen";
function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user ? <AuthNavigator /> : <AppNavigator />}
        {/* <HomeScreen /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
