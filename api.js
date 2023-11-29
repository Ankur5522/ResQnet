import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoint } from './env';

const API = axios.create({
	baseURL: `http://${endpoint}:5000`,
})
export const signUp = async (formData) => {
    try {
      const response = await API.post('/user/signup/user', formData);
      const data = response.data
      console.log(data)
      return data;
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

export const signupOrganisation = async (formData) => {
    try {
      const response = await API.post('/user/signup/organisation', formData);
      const data = response.data
      console.log(data)
      return data;
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  export const continueSignup = async (formData) => {
    try {
      const response = await API.post('/user/continue', formData);
      const data = response.data
      return data;
    } catch (error) {
      console.error('error: ', error)
    }
  }

  export const logIn = async (formData) => {
    try {
      const response = await API.post('/user/login', formData);
      data = response?.data
      return data;
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  export const fetchOrganisations = async () => {
    try {
      const response = await API.get('/user/organisations')
      const data = response?.data
      return data;
    } catch (error) {
      console.log('organisations fetch error', error)
    }
  }