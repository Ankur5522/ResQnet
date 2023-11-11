import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';

const SplashScreen = () => {
    const travel = {
        from: {
            bottom: -15,
            opacity: 0,
        },
        to: {
            bottom: 0,
            opacity: 1,
        }
    }
  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeIn"
        duration={3000} // Adjust the duration as needed.
        style={styles.text}
        >
        ResQnet
      </Animatable.Text>
      <Animatable.View animation={travel} duration={3000} style={styles.iconsContainer}>
        <FontAwesome5 name="ambulance" size={26} color="white" />
        <Entypo name="thunder-cloud" size={26} color="white" />
        <MaterialIcons name="groups" size={30} color="white" />
        <MaterialIcons name="location-on" size={28} color="white" />
      </Animatable.View>
      <Animatable.Text
        animation="fadeIn"
        duration={3000} // Adjust the duration as needed.
        style={styles.subText}
        >
        Disaster Refief, One Step Away
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 25,
  },
  subText: {
    fontSize: 18,
    marginTop: 16,
    color: 'white',
  },
});

export default SplashScreen;
