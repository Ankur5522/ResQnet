import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  ImageBackground
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { weatherType } from "../dataFile/weatherData";
import LocationPanel from "../components/locationPanel";
import axios from "axios";

const Weather = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [rainfall, setRainfall] = useState()

  const weatherBg = require('../assets/weatherBg.png')

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
  useEffect(() => {
    const predict = async () => {
      try {
        const response = await axios.post(
          'http://10.0.2.2:7000/predict',
          { 
            features: {
              "Temperature":20.120245,
              "Relative Humidity":64.45718,
              "Wind Speed": 10.365251,
              "Wind Direction": 249.6768
            }
          }
        );
        const prediction = response.data.prediction;

      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    };
    
    predict();
  },[weatherData])

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
      <LocationPanel />
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <ImageBackground source={weatherBg} resizeMode="cover">
          <View style={styles.weatherContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.tempStyles}>
                {`${temp.toFixed(1)}°`}
                <Text style={{ fontSize: 40 }}>c</Text>
              </Text>
              <Text style={{ color: "white", fontSize: 24,  textAlign: "center" }}>
                {weather[0].description}
              </Text>
            </View>
            <Feather
              name={weatherType[weather[0].main]?.icon}
              size={100}
              color="white"
            />
          </View>
          </ImageBackground>
          <View style={styles.secondContainer}>
            <Text>{rainfall}</Text>
          </View>
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
  weatherContainer: {
    height: 200,
    width: "92%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  tempStyles: {
    color: "black",
    fontSize: 47,
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
