import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./components/splashScreen";
import TabNavigator from "./components/tabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator from "./components/screenNavigator";

export default function App() {
    const [isAppReady, setAppReady] = useState(false);
    const [hasSeenSlides, setHasSeenSlides] = useState(false);

    useEffect(() => {
        async function checkSignup() {
          const profile = await AsyncStorage.getItem("profile");
          if(profile) {
            setHasSeenSlides(true)
          }
        }
        checkSignup()
        setTimeout(() => {
            setAppReady(true);
        }, 3000);
    }, []);

    if (!isAppReady) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {!hasSeenSlides ? (
                <TabNavigator />
            ) : (
                <AppNavigator />
            )}
        </NavigationContainer>
    );
}
