import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Community from "../screens/Community";
import Weather from "../screens/Weather";
import Home from "../screens/Home";
import Organisations from "../screens/Organisations";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 55,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          borderWidth: 2,
          borderTopColor: "black",
          borderBottomColor: "white",
        },
        headerShown: false,
        tabBarLabel: "",
      }}
    >
      <Tab.Screen
        name={"Community"}
        component={Community}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                top: 15,
              }}
            >
              <MaterialIcons
                name="people"
                size={25}
                color={focused ? "red" : "gray"}
              ></MaterialIcons>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Weather"}
        component={Weather}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                top: 15,
              }}
            >
              <MaterialIcons
                name="cloud"
                size={25}
                color={focused ? "red" : "gray"}
              ></MaterialIcons>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 90,
                height: 90,
                backgroundColor: "white",
                borderWidth: 3,
                borderColor: "#f0eae8",
                borderRadius: 45,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS == "android" ? 10 : 5,
              }}
            >
              <Text
                style={{
                  color: focused ? "#F36172C2" : "grey",
                  fontSize: 45,
                  fontWeight: 900,
                }}
              >
                Q
              </Text>
            </View>
          ),
          tabBarLabel: "",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Help List"}
        component={Organisations}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                top: 15,
              }}
            >
              <MaterialIcons
                name="business"
                size={25}
                color={focused ? "red" : "gray"}
              ></MaterialIcons>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                top: 15,
              }}
            >
              <MaterialIcons
                name="person"
                size={25}
                color={focused ? "red" : "gray"}
              ></MaterialIcons>
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
