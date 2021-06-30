import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Library from "./screens/Library";
import CustomAuth from "./screens/auth/CustomAuth";
import Scanner from "./screens/Scanner";
import QRScreen from "./screens/QRScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CreateCard from "./screens/CreateCard";

function App() {

 // const TabNavigator = createBottomTabNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;


  if (!user) {
    return (
      <CustomAuth />
    );
  }
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Create" component={CreateCard}/>
        <Stack.Screen name="Scanner" component={Scanner}/>
        <Stack.Screen name="QRScreen" component={QRScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
