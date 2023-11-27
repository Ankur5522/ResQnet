import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import googleLogo from '../assets/google.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import { logIn } from '../api';

const Login = ({route }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const handleOnboardingComplete = route.params?.handleOnboardingComplete;
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Check if handleOnboardingComplete is a function before calling it
    if (typeof handleOnboardingComplete === 'function') {
      handleOnboardingComplete();
    }
  }, [handleOnboardingComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image style={styles.logo} source={logo} />
        </View>

        <View style={styles.s2}>
          <Text style={styles.head1}>Welcome Back</Text>
          {/* <Text style={styles.head2}>Sign in to continue</Text> */}
          <View style={styles.formgroup}>
            <View style={styles.wrapup}>
              <View style={styles.inputContainer}>
                <Image source={emailIcon} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email"
                  placeholderTextColor="#585858"
                  onChangeText={(text) => handleChange('email', text)}
                />
              </View>
              <View style={styles.inputWrapper}></View>
            </View>

            <View style={styles.wrapup}>
              <View style={styles.inputContainer}>
                <Image source={passwordIcon} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Password"
                  placeholderTextColor="#585858"
                  secureTextEntry={true}
                  onChangeText={(text) => handleChange('password', text)}
                />
              </View>
              <View style={styles.inputWrapper}></View>
            </View>
          </View>
          <View style={styles.fp}>
            <Text style={styles.link}>Forgot Password</Text>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => logIn(formData)}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.link2}>Or</Text>
          <TouchableOpacity style={[styles.loginButton1, styles.logoogle, { marginTop: 4 }]} onPress={() => googleSignIn()}>
            <Text style={styles.loginButtonText1}>Login with<Text>&nbsp;
              <Image source={googleLogo} style={styles.googleLogo} /></Text></Text>
          </TouchableOpacity>
          <Text style={styles.link2}>Dont have an account?&nbsp;
            <Text style={{ color: '#EA5973' }} onPress={() => (navigation.navigate('Signup'))}>SignUp</Text></Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles=StyleSheet.create({
  container:{
  width: '100%',
  height: '100%',
  backgroundColor:'#fff'
  },
  container1: {
  display: 'flex',
  justifyContent: 'center',
   alignitems: 'center',
  height: '100%',
  width: '100%',
  },
  s1:{
  display: 'flex',
  justifyContent: 'center', 
  alignitems: 'center',
  height:'30%',
  },
  
  small1: {
    color: '#fff',
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },
  h1:{
    fontsize:30,
    color:'#fff',
  },
  logo:{
    height:windowHeight*0.1,
    width:windowWidth*1,
    resizeMode:'contain',
  
  },
  logoogle:
  {
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1, 
    borderRadius: 21,
    padding: 8
  },
  s2:{
    display:'flex',
    backgroundColor:'#fff',
    width:'100%',
    height:'60%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:20,
  },
  wrapup:{
    flexDirection:'column',
    marginBottom: 20,
  },
  formgroup:
  {
  display:'flex',
  flexDirection:'column'
  },
  label:
  {
    fontSize:17,
    color:'#000',
    marginLeft:10,
    marginBottom:5,
  },
  inputContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 2,
    padding:2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
    fontSize: 14
  },
  loginButton: {
    backgroundColor: '#EA5973',
    borderRadius: 21,
    paddingVertical: 12,
    paddingHorizontal:20,
    marginTop:'15%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  loginButtonText1: {
    color: '#737878',
    fontSize: 18,
    textAlign: 'center',
  },
  loginHeading: {
    fontSize: 24, 
    justifyContent:'center',
    alignItems:'center',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  input:{
    backgroundColor:'#fff',
    borderRadius:20,
    padding:8,
    paddingTop:5,
  },
  inputWrapper: {
    flexDirection:'column',
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
  },
  head1:{
    fontSize:30,
    color:'#EA5973',
    fontWeight:'600',
    fontStyle:'normal',
    marginBottom:20,
  },
  head2:{
    fontSize:20,
    color:'black',
    textAlign:'center',
  },
  link:{
    color:'red',
    fontSize:15,
    
  },
  fp:{
    display:'flex',
    alignItems:'flex-end',
    marginHorizontal:10,
    marginVertical:5,
  },
  inputIcon: {
    width: 24,
    height: 29,
    marginRight: 10,
  },
  link2:{
    color:'grey',
    fontSize:15,
    textAlign:'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  
  })
