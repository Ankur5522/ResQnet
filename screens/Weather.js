import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { weatherType } from "../dataFile/weatherData";

const Weather = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
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

          const res = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=ac69d68af11f67b985ed4d0c3a658be9&units=metric`
          );
          const data = await res.json();
          setWeatherData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [status]);
  if (loading) {
    return <Text>Data being Fetch</Text>;
  }
  weatherParameters = weatherData?.list[0];
  const {
    main: { temp, feels_like, temp_max, temp_min },
    weather,
  } = weatherParameters;
  return (
    <View style={styles.container}>
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
        <View style={{ alignItems: "center" }}>
          <View style={styles.weatherContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.tempStyles}>
                {`${temp.toFixed(1)}°`}
                <Text style={{ fontSize: 40 }}>c</Text>
              </Text>
              <Text style={{ color: "white", fontSize: 35 }}>
                {weather[0].description}
              </Text>
            </View>
            <Feather
              name={weatherType[weather[0].main]?.icon}
              size={100}
              color="white"
            />
          </View>
          <View style={styles.secondContainer}></View>
          <View style={{width:"92%"}}>
            <Text style={{ fontSize: 22, fontWeight: 900, marginTop: 6, marginLeft: 20 }}>
              Early Warnings
            </Text>
            <View>
                
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 23,
    padding: 16,
  },
  weatherContainer: {
    height: 200,
    width: "92%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(83, 137, 242, 0.86)",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 50,
    marginBottom: 20,
  },
  tempStyles: {
    color: "black",
    fontSize: 35,
    fontWeight: "500",
    color: "white",
  },
  feels: {
    color: "black",
    fontSize: 30,
  },
  secondContainer: {
    height: 180,
    width: "92%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(83, 137, 242, 0.86)",
    borderRadius: 30,
  },
});
