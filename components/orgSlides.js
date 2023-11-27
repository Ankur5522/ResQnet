import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { orgImg } from "../dataFile/orgImage";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrgSlide = () => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.avatar}>
                    <MaterialCommunityIcons name={orgImg['hospital'].Icon} size={28} color="rgba(243, 97, 114, 0.76)" />
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>Naam hai</Text>
                <Text style={styles.address}>Address hai</Text>
                <View style={styles.phoneEmail}>
                    <FontAwesome name="phone" size={18} color="rgba(95, 151, 151, 1)" />
                    <Text style={styles.phoneEmailText}>Email</Text>
                </View>
                <View style={styles.phoneEmail}>
                    <MaterialIcons name="email" size={18} color="rgba(95, 151, 151, 1)" />
                    <Text style={styles.phoneEmailText}>Phone number</Text>
                </View>
            </View>
        </View>
    )
}

export default OrgSlide;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "94%",
        height: 140,
        backgroundColor: 'rgba(230,230,230,1)',
        borderRadius: 15,
        flexDirection: "row",
        padding: 12,
        elevation: 4
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    detailsContainer: {
        paddingLeft: 12
    },
    name: {
        fontSize: 25,
        fontWeight: "600",
        color: "rgba(68, 68, 68, 1)"
    },
    address: {
        fontSize: 15,
        color: "grey",
        marginBottom: 5,
        marginTop: 0
    },
    phoneEmail: {
        flexDirection: "row",
        height: 24,
        alignItems: "center",
    },
    phoneEmailText: {
        marginLeft: 5,
        color: "rgba(95, 151, 151, 1)",
        fontWeight: "500"
    }
})