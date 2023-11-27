import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import {
    Ionicons,
    MaterialIcons,
  } from "@expo/vector-icons";

const LocationPanel = () => {
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
                    <Text
                        style={{ marginLeft: 2, fontSize: 10, color: "grey" }}
                    >
                        {locationName ? locationName.region : "Region"}
                    </Text>
                </View>
            </View>
            <MaterialIcons name="notifications-on" size={28} color="black" />
        </View>
    );
};

export default LocationPanel

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        paddingTop: 10,
      },
})