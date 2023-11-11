import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import Slides from "./slides";
import Onboardingitems from "./onboardingitems";
import Paginator from "./paginator";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const ViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = () => {
    const nextIndex = 2;
    if (nextIndex <= Slides.length) {
      slidesRef.current.scrollToIndex({ index: nextIndex });
    } else {
      console.log("No Next slides Found");
    }
  };
  const renderButtonsForSlide = (slideId) => {
    if (slideId === "3") {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupButton}>Signup</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => (
            <View>
              <Onboardingitems item={item} currentIndex={currentIndex} />
              {renderButtonsForSlide(item.id)}
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          onscroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={ViewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.paginatorContainer}>
        <Paginator data={Slides} current={currentIndex} />
      </View>

      {currentIndex < Slides.length - 1 && (
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  paginatorContainer: {
    position: "absolute",
    bottom: 30,
    // width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 24,
  },
  skipButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Background color with opacity
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontSize: 18,
  },
  skipButtonText: {
    color: "white",
    fontSize: 16,
  },

  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 20,
    zIndex: 1,
    left: 0,
    right: 0,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontSize: 18,
    marginHorizontal: 20,
  },
  signupButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontSize: 18,
    marginHorizontal: 20,
  },
});
