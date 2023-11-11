import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const Community = () => {
    return (
        <View style={styles.container}>
            <Text>Community</Text>
        </View>
    )
}

export default Community;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})