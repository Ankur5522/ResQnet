import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./components/splashScreen";
import TabNavigator from "./components/tabNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from "./components/screenNavigator";

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [hasSeenSlides, setHasSeenSlides] = useState(false);

  useEffect(() => {
    // Check if the user has seen the slides
    async function checkIntroSlides() {
      const hasSeen = await AsyncStorage.getItem('hasSeenSlides');
      setHasSeenSlides(hasSeen === 'true');
    }

    checkIntroSlides();

    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }, []);

  const handleOnboardingComplete = () => {
    // Mark the slides as seen
    AsyncStorage.setItem('hasSeenSlides', 'true');
    setHasSeenSlides(true);
  };

  if (!isAppReady) {
    return <SplashScreen />;
  }
  
  return (
    <NavigationContainer>
      {!hasSeenSlides ? (
        <TabNavigator />
      ) : (
        <AppNavigator handleOnboardingComplete={handleOnboardingComplete} />
      )}
    </NavigationContainer>
  );
}

