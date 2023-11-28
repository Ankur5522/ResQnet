import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity } from "react-native";
import LocationPanel from "../components/locationPanel";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Filter from "../components/filter";
import OrgSlide from "../components/orgSlides";

const Organisations = () => {
    const [search, setSearch] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [filter, setFilter] = useState({
        type: "",
        organisation: "",
    });
    
    return (
        <View style={styles.container}>
            <LocationPanel />
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="grey" />
                <TextInput
                    style={styles.input}
                    placeholder="Search by name"
                    onChangeText={(text) => {setSearch(text)}}
                />
            </View>
            <TouchableOpacity style={styles.filterContainer} onPress={() => {setShowFilter(!showFilter)}}>
                <FontAwesome5 name="filter" size={16} color="grey"/>
                <Text style={styles.filtertext}>Filter</Text>
            </TouchableOpacity>
            {showFilter && <Filter props={{filter, setFilter}}/>}
            <OrgSlide />
        </View>
    )
}

export default Organisations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    filtertext:{
        color:"#9DA3A3",
        letterSpacing:0.7,
        fontWeight:"500",
        marginLeft:7
    },
    searchContainer: {
        width: "92%",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "rgba(253, 253, 253, 1)",
        height: 50,
        flexDirection: "row",
        borderRadius: 9,
        elevation: 4,
        paddingLeft: 10
    },
    input: {
        width: "100%",
        fontSize: 16,
        paddingLeft: 15,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        marginVertical: 8
    }
})