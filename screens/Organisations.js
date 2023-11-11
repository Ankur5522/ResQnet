import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const Organisations = () => {
    return (
        <View style={styles.container}>
            <Text>Organisations</Text>
        </View>
    )
}

export default Organisations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})