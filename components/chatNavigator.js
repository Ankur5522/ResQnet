import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";
import Community from "../screens/Community";
import UserScreen from "../screens/UserScreen";

const Stack = createStackNavigator();

const ChatNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Chat"
                component={Community}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
            />
             <Stack.Screen
                name="UserScreen"
                component={UserScreen}
            />
        </Stack.Navigator>
    );
};

export default ChatNavigator
