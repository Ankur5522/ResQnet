import React, {useState, useEffect} from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/splashScreen';
import TabNavigator from './components/tabNavigator';
import AppNavigator from './components/screenNavigator';
import { AuthProvider, useAuth } from './components/contextStore.js'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
 const [isAppReady, setAppReady] = useState(false);

 useEffect(() => {
   setTimeout(() => {
     setAppReady(true);
   }, 3000);
 }, []);

 if (!isAppReady) {
   return <SplashScreen />;
 }

 return (
   <AuthProvider>
     <NavigationContainer>
       <AppContent />
     </NavigationContainer>
   </AuthProvider>
 );
}

function AppContent() {
 const { user } = useAuth();
 const [loading, setLoading] = useState(false)
 useEffect(() => {
  setTimeout(() => {
    setLoading(true)
  }, 100);
}, []);
if(!loading) {
  return null
}
 return user ? <TabNavigator /> : <AppNavigator />;
}
