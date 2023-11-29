import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    Linking
} from "react-native";
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Fontisto,
    FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LocationPanel from "../components/locationPanel";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function sendPushNotification({ expoPushToken, location }) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Alert",
        body: `Emergency at ${latitude} ${longitude}`,
        data: {
            someData: "goes here",
            locationLink: `https://www.google.com/maps?q=${latitude},${longitude}`
          },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token?.data;
}

const Home = () => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const [location, setLocation] = useState();
    const [link, setLink] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    setLink(
                        response["notification"].request.content.data
                            .locationLink
                    );
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    const handleAlertButtonPress = async (location) => {
        await sendPushNotification({ expoPushToken, location });
    };

    const openGoogleMaps = async () => {
      try {
        if (link) {
          await Linking.openURL(link);
        } else {
          console.warn('Link is not available.');
        }
      } catch (error) {
        console.error('Error opening Google Maps:', error);
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LocationPanel setLocation={setLocation} />
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.alertContainer}>
                        <TouchableHighlight
                            style={styles.iconContainer}
                            underlayColor="red"
                            onPress={() => {
                                handleAlertButtonPress(location);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="alarm-light-outline"
                                size={66}
                                color="white"
                            />
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.emergencyText}>
                        Tap in case of Emergency
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Emergency Drill</Text>
                    </View>
                </View>
                <LinearGradient
                    colors={["rgba(152, 193, 223, 0.25)", "rgba(0, 0, 0, 0)"]} // Define the gradient colors
                    style={styles.shadowView}
                />
                {link && (
                    <TouchableOpacity style={styles.map} onPress={openGoogleMaps}>
                        <Text style={styles.mapText}>Open Location in Map</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.optionsContainer}>
                    <View style={styles.options}>
                        <Fontisto
                            name="first-aid-alt"
                            size={40}
                            color="#F36172C2"
                        />
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            First Aid
                        </Text>
                    </View>
                    <View style={styles.options}>
                        <FontAwesome5
                            name="hand-holding-medical"
                            size={40}
                            color="#F36172C2"
                        />
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Care Team
                        </Text>
                    </View>
                    <View style={styles.options}>
                        <MaterialIcons
                            name="camera-enhance"
                            size={50}
                            color="#F36172C2"
                        />
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Hazard
                        </Text>
                    </View>
                    <View style={styles.options}>
                        <MaterialIcons
                            name="local-police"
                            size={50}
                            color="#F36172C2"
                        />
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Police 101
                        </Text>
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
    map: {
        width: "95%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "rgba(83, 137, 242, 0.86)",
        height: 40,
        borderRadius: 8,
    },
    mapText: {
        fontSize: 17,
        fontWeight: "600",
        color: "rgba(255,250,250,1)"
    }
});
