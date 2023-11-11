import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React from "react";

const Onboardingitems = ({ item, currentIndex }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item.image} resizeMode="cover" />
      <View style={styles.container1}>
        <Image style={styles.txt} source={item.title} />
      </View>
    </View>
  );
};

export default Onboardingitems;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container1: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
  },
  txt: {
    width: windowWidth * 0.89,
    height: windowWidth * 0.99 * (0.69 / 0.9),
  },
  paginatorContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
