import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Onboarding from "./onboarding";
import Home from "../screens/Home";
import Options from "../screens/Options";
import Helpform from "../screens/Helpform";
import Organizationform from "../screens/Organizationform";

const Stack = createStackNavigator();

const AppNavigator = ({ handleOnboardingComplete }) => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help"
        component={Helpform}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="organisation"
        component={Organizationform}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
