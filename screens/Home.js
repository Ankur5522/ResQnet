import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LocationPanel from "../components/locationPanel";
import * as Notifications from 'expo-notifications';

const Home = () => {
  const handleAlertButtonPress = async () => {
    try {
      // Schedule a notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Emergency Alert',
          body: 'There is an emergency!',
        },
        trigger: null, // send immediately
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LocationPanel />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.alertContainer}>
            <TouchableHighlight
              style={styles.iconContainer}
              underlayColor="red"
              onPress={() => {
                // Handle button press here
                handleAlertButtonPress
              }}
            >
              <MaterialCommunityIcons
                name="alarm-light-outline"
                size={66}
                color="white"
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.emergencyText}>Tap in case of Emergency</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Emergency Drill</Text>
          </View>
        </View>
        <LinearGradient
          colors={["rgba(152, 193, 223, 0.25)", "rgba(0, 0, 0, 0)"]} // Define the gradient colors
          style={styles.shadowView}
        />
        <View style={styles.optionsContainer}>
          <View style={styles.options}>
            <Fontisto name="first-aid-alt" size={40} color="#F36172C2" />
            <Text style={{ fontSize: 15, marginTop: 5 }}>First Aid</Text>
          </View>
          <View style={styles.options}>
            <FontAwesome5
              name="hand-holding-medical"
              size={40}
              color="#F36172C2"
            />
            <Text style={{ fontSize: 15, marginTop: 5 }}>Care Team</Text>
          </View>
          <View style={styles.options}>
            <MaterialIcons name="camera-enhance" size={50} color="#F36172C2" />
            <Text style={{ fontSize: 15, marginTop: 5 }}>Hazard</Text>
          </View>
          <View style={styles.options}>
            <MaterialIcons name="local-police" size={50} color="#F36172C2" />
            <Text style={{ fontSize: 15, marginTop: 5 }}>Police 101</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    height: 340,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  alertContainer: {
    backgroundColor: "rgba(242, 100, 117, 0.15)",
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "#F36172C2",
    height: 164,
    width: 164,
    borderRadius: 82,
    justifyContent: "center",
    alignItems: "center",
    pointer: "cursor",
  },
  emergencyText: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonContainer: {
    width: 169,
    backgroundColor: "rgba(152, 193, 223, 0.25)",
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  shadowView: {
    height: 10,
    width: "100%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  options: {
    height: 130,
    width: 150,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 14,
    backgroundColor: "rgba(242, 100, 117, 0.05)",
    borderWidth: 1,
    borderColor: "#F36172C2",
    // ...Platform.select({
    //   android: {
    //     elevation: 4,
    //   },
    //   ios: {
    //     shadowColor: "black",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 4,
    //   },
    // }),
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
    // paddingHorizontal: 4,
  },
});
