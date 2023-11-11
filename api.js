import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
	baseURL: 'http://10.0.2.2:5000',
})
export const signUp = async (formData) => {
    try {
      const response = await API.post('/user/register', formData);
      console.log('Signup successful:', response.data);

      AsyncStorage.setItem('hasSeenSlides', 'true');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  export const signin = async (formData) => {
    try {
      console.log(formData)
      const response = await API.post('/user/login', formData);
      console.log('Signin successful:', response.data);
    } catch (error) {
      console.error('Signin error:', error);
    }
  };