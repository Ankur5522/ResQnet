import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/splashScreen';
import TabNavigator from './components/tabNavigator';
import AppNavigator from './components/screenNavigator';
import { AuthProvider, useAuth } from './components/contextStore.js';

export default function Index() {
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
useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to receive push notifications denied');
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        const expoPushToken = tokenData.data;
        console.log('Expo Push Token:', expoPushToken);
      } catch (error) {
        console.error('Error while registering for push notifications:', error);
      }
    };

    registerForPushNotifications();
  }, []);
if(!loading) {
  return null
}
 return user ? <TabNavigator /> : <AppNavigator />;
}
