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
                    <MaterialCommunityIcons name={orgImg['hospital'].Icon} size={35} color="rgba(83,137,242, 0.76)" />
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>Naam hai</Text>
                <Text style={styles.address}>Address hai</Text>
                <View style={styles.phoneEmail}>
                    <MaterialIcons name="email" size={18} color= "#656565" />
                    <Text style={styles.phoneEmailText}>Email</Text>
                </View>
                <View style={styles.phoneEmail}>
                    <FontAwesome name="phone" size={18} color= "#656565" />                    
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
        backgroundColor: '#fff',
        borderRadius: 6,
        flexDirection: "row",
        padding: 12,
        elevation: 6
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
        fontSize: 23,
        fontWeight: "600",
        color: "#444444",
        letterSpacing:0.6
    },
    address: {
        fontSize: 15,
        color: "#8D8D8D",
        marginBottom: 5,
        marginTop: 0,
        letterSpacing:0.6
    },
    phoneEmail: {
        flexDirection: "row",
        height: 24,
        alignItems: "center",
    },
    phoneEmailText: {
        marginLeft: 5,
        color: "#656565",
        fontWeight: "500",
        letterSpacing:0.6
    }
})