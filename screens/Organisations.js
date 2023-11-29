import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TextInput,
    TouchableOpacity,
    FlatList
} from "react-native";
import LocationPanel from "../components/locationPanel";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Filter from "../components/filter";
import OrgSlide from "../components/orgSlides";
import { fetchOrganisations } from "../api";

const Organisations = () => {
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [organisations, setOrganisations] = useState([]);
    const [filter, setFilter] = useState({
        type: "",
        organisation: "",
    });

    useEffect(() => {
        const fetchOrgDetails = async () => {
            const response = await fetchOrganisations();
            console.log(response);
            setOrganisations(response);
        };
        fetchOrgDetails();
    }, []);

    return (
        <View style={styles.container}>
            <LocationPanel />
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="grey" />
                <TextInput
                    style={styles.input}
                    placeholder="Search by name"
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.filterContainer}
                onPress={() => {
                    setShowFilter(!showFilter);
                }}
            >
                <FontAwesome5 name="filter" size={16} color="grey" />
                <Text style={styles.filtertext}>Filter</Text>
            </TouchableOpacity>
            {showFilter && <Filter props={{ filter, setFilter }} />}
            <FlatList
                data={organisations} // Assuming 'org' is your array of organisations
                renderItem={({ item }) => (
                    <View><OrgSlide item={item} /></View>
                  )}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    );
};

export default Organisations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    filtertext: {
        color: "#9DA3A3",
        letterSpacing: 0.7,
        fontWeight: "500",
        marginLeft: 7,
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
        paddingLeft: 10,
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
        marginVertical: 8,
    },
});
