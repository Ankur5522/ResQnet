import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [profile, setProfile] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const jsonProfile = await AsyncStorage.getItem('profile');
        if (jsonProfile) {
          const profile = JSON.parse(jsonProfile);
          const existingProfile = profile.existingUser;
          if (existingProfile && existingProfile?.name) {
            const updatedProfile = { ...existingProfile, name: existingProfile.name.charAt(0).toUpperCase() + existingProfile.name.slice(1) };
            setProfile(updatedProfile);
          }
        }
      } catch (error) {
        console.error('Error fetching or processing profile:', error);
      }
    };
  
    getProfile();
  }, []);
  
  const handleSignOut = async (title) => {
    if(title === "Sign Out") {
      await AsyncStorage.removeItem('profile')
      // navigation.navigate('Login')
    }
  }

  const OptionItem = ({ title, icon }) => {
    return (
      <TouchableOpacity style={styles.optionItem} onPress={handleSignOut(title)}>
        {icon}
        <Text style={styles.optionText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImg}></View>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 12 }}>
            {profile?.name}
          </Text>
          <LinearGradient
            colors={["#2AF286BD", "#24F283D9", "#29E7A3F5", "#29E7A3"]}
            style={styles.roleContainer}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
               {profile?.type == "help" ? "User" : "Volunteer"}
            </Text>
          </LinearGradient>
          <View style={{ width: 260, display: "flex", alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, marginTop: 12, fontWeight: "semibold" }}
            >
              {profile?.description}
            </Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <OptionItem
            title="Chat"
            icon={<Ionicons name="chatbox-outline" size={24} color="black" />}
          />
          <OptionItem
            title="Help"
            icon={<FontAwesome name="question-circle" size={24} color="black" />}
          />
          <OptionItem
            title="Settings"
            icon={<MaterialIcons name="settings" size={24} color="black" />}
          />
          <OptionItem
            title="Sign Out"
            icon={<Octicons name="sign-out" size={24} color="black" />}
          />
        </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  background: {
    width: "100%",
    backgroundColor: "rgba(42, 242, 134, 0.74)",
    height: 200,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  profileContainer: {
    width: 360,
    height: 320,
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "white",
    top: "45%",
    left: "50%",
    marginLeft: -180,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "black",
  },
  roleContainer: {
    width: 240,
    padding: 15,
    alignItems: "center",
    borderRadius: 30,
    marginTop: 6,
  },
  optionsContainer: {
    height: 200,
    padding: 16,
    position: "absolute",
    backgroundColor: "white",
    marginTop: "110%",
    width: "90%",
    borderRadius: 20,
    elevation: 5,
    left: "5%",
  },
  
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderColor: "grey",
    marginVertical: 14,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 20,
  },
});
