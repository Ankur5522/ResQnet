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
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setStatus(status);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          if (reverseGeocode && reverseGeocode[0]) {
            setLocationName(reverseGeocode[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [status]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={28} color="black" />
          <View>
            <Text style={{ marginLeft: 2, fontSize: 14 }}>
              {locationName ? locationName.city : "City"}
            </Text>
            <Text style={{ marginLeft: 2, fontSize: 10, color: "grey" }}>
              {locationName ? locationName.region : "Region"}
            </Text>
          </View>
        </View>
        <MaterialIcons name="notifications-on" size={28} color="black" />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.alertContainer}>
            <TouchableHighlight
              style={styles.iconContainer}
              underlayColor="red"
              onPress={() => {
                // Handle button press here
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 10
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
    width: 160,
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
    paddingHorizontal: 8,
  },
});
