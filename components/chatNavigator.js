import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";
import Community from "../screens/Community";

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
        </Stack.Navigator>
    );
};

export default ChatNavigator
