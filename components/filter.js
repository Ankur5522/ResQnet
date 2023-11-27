import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Filter = ({props}) => {
    const filter = props.filter
    const setFilter = props.setFilter
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tagText}> Type: </Text>
                <View style={styles.tagsContainer}>
                    <TouchableOpacity
                        style={styles.tags}
                        onPress={() => {
                            setFilter({ ...filter, type: "volunteer", organisation: '' });
                        }}
                    >
                        <Text>Volunteer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tags}
                        onPress={() => {
                            setFilter({ ...filter, type: "organisation" });
                        }}
                    >
                        <Text>Organisation</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {filter.type == "organisation" ? (
                <View>
                    <Text style={styles.tagText}>Organisation: </Text>
                    <View style={styles.tagsContainer}>
                        <TouchableOpacity
                            style={styles.tags}
                            onPress={() => {
                                setFilter({
                                    ...filter,
                                    organisation: "Hospital",
                                });
                            }}
                        >
                            <Text>Hospital</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tags}
                            onPress={() => {
                                setFilter({
                                    ...filter,
                                    organisation: "Police",
                                });
                            }}
                        >
                            <Text>Police Station</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tags}
                            onPress={() => {
                                setFilter({ ...filter, organisation: "NGO" });
                            }}
                        >
                            <Text>NGO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default Filter;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingLeft: 25,
        marginBottom: 8
    },
    tagsContainer: {
        width: "90%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 5,
    },
    tagText: {
        marginVertical: 5,
    },
    tags: {
        alignItems: "center",
        justifyContent: "center",
        padding: 7,
        backgroundColor: "grey",
        width: 80,
        borderRadius: 15,
        height: 35,
    },
});
