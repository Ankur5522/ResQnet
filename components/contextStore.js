import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
    baseURL: "http://10.0.2.2:5000",
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('profile');
            if(user) {
                setUser(JSON.parse(user));
            }
        }
        fetchUser();
    }, []);

    const signUp = async (formData) => {
        try {
            const response = await API.post("/user/signup/user", formData);
            const data = response.data;
            setUser(data);
            return data;
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    const signupOrganisation = async (formData) => {
        try {
            const response = await API.post(
                "/user/signup/organisation",
                formData
            );
            const data = response.data;
            setUser(data);
            return data;
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    const continueSignup = async (formData) => {
        try {
            const response = await API.post("/user/continue", formData);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const logIn = async (formData) => {
        try {
            const response = await API.post("/user/login", formData);
            const data = response?.data;
            setUser(data?.existingUser || null);
            return data;
        } catch (error) {
            console.error("Signin error:", error);
        }
    };

    const signOut = async () => {
        try {
            console.log("hi")
            await AsyncStorage.removeItem('profile');
            setUser(null);
        } catch (error) {
            console.error("Signout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, signupOrganisation, signUp, continueSignup, logIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};