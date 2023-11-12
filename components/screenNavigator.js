import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Onboarding from "./onboarding";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const AppNavigator = ({ handleOnboardingComplete }) => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ handleOnboardingComplete: handleOnboardingComplete }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        initialParams={{ handleOnboardingComplete: handleOnboardingComplete }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
