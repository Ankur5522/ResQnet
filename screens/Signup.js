import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import validator from 'validator';
import logo from '../assets/logo.png';
import email from '../assets/email.png';
import password from '../assets/password.png';
import user from '../assets/user.png';
import phone from '../assets/phone.png';
import googleLogo from '../assets/google.png';
import { signUp } from '../api';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '', // Initialize confirmPassword error state
        phoneNumber: '',
      });
      const navigation = useNavigation();
    
      const validateEmail = () => {
        if (formData.email!=''&&!validator.isEmail(formData.email)) {
          setErrors({ ...errors, email: 'Invalid email address' });
        } else {
          setErrors({ ...errors, email: '' });
        }
      };
    
      const validatePassword = () => {
        if (formData.password.length!=0 && formData.password.length < 6) {
          setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
        } else {
          setErrors({ ...errors, password: '' });
        }
      };
    
      const validateConfirmPassword = () => {
        if (formData.confirmPassword.length!=0 && formData.password !== formData.confirmPassword) {
          setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        } else {
          setErrors({ ...errors, confirmPassword: '' });
        }
      };
    
      const validatephoneNumber = () => {
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
          setErrors({ ...errors, phoneNumber: 'Phone number must be of 10-digit' });
        } else {
          setErrors({ ...errors, phoneNumber: '' });
        }
      };
    
      const handleSignUp = () => {
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validatephoneNumber();
    
        if (!Object.values(errors).some((error) => error)) {
          
          signUp(formData).then(navigation.navigate('Login'));
        }
      };

  return (
    <View style={styles.container}>

  <View style={styles.container1}>
  <View style={styles.s1}>
        <Image style={styles.logo} source={logo} />
   </View>


   <View style={styles.s2}>
   <Text style={styles.head1}>Create a new account</Text>
        <View style={styles.formgroup}>

        <View style={styles.wrapup}>
        <View style={styles.inputContainer}>
              <Image source={user} style={styles.inputIcon1} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#585858"
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
              </View>
              <View style={styles.inputWrapper}></View>
            </View>

            <View style={styles.wrapup}>
        <View style={styles.inputContainer}>
              <Image source={phone} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#585858"
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          onBlur={validatephoneNumber}
              />
              </View>
              <View style={styles.inputWrapper}></View>
            </View>

            <View style={styles.wrapup}>
        <View style={styles.inputContainer}>
              <Image source={email} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#585858"
                onChangeText={(text) => setFormData({ ...formData, email: text })}
          onBlur={validateEmail}
              />
              </View>
              <View style={styles.inputWrapper}></View>
            </View>

            <View style={styles.wrapup}>
            <View style={styles.inputContainer}>
              <Image source={password} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#585858"
                secureTextEntry={true}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
          onBlur={validatePassword}
              />
              </View>
              <View style={styles.inputWrapper}></View>
              </View>
          
              <View style={styles.wrapup}>
            <View style={styles.inputContainer}>
              <Image source={password} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#585858"
                secureTextEntry={true}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          onBlur={validateConfirmPassword}
              />
              </View>
              <View style={styles.inputWrapper}></View>
              </View>

          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          <Text style={styles.errorText}>{errors.password}</Text>
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          <Text style={styles.errorText}>{errors.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText} onPress={handleSignUp}>SignUp</Text>
          </TouchableOpacity>
          <Text style={styles.link2}>Or</Text>
          <View style={styles.logoogle}>
          <TouchableOpacity style={[styles.loginButton1,{ marginTop: 4 }]} >
          
            <Text style={styles.loginButtonText1}>Sign with<Text>&nbsp;
            <Image source={googleLogo} style={styles.googleLogo} /></Text></Text>
            
          </TouchableOpacity>
          </View>
          <Text style={styles.link2}>Already have an account?&nbsp;
          <Text style={{color:'#EA5973'}} onPress={() => {navigation.navigate('Login')}}>Login</Text></Text>
   </View>

</View>
</View>

  )
}

export default Signup;

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
        height:'10%',
        },
        errorText:{
            color:'#EA5973',
            alignItems:'center',
            justifyContent:'center',
        },
        small1: {
          color: '#fff',
          fontSize: 20, // Adjust the font size as needed
          fontWeight: 'bold', // Apply bold styling
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
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'red',
          borderWidth: 1, // Set the border width to 1px
          borderRadius: 21, // Adjust as needed
          padding: 1, // Adjust the padding to control the border distance
        },
        s2:{
          display:'flex',
          backgroundColor:'#fff',
          width:'100%',
          height:'80%',
          borderTopLeftRadius:30,
          borderTopRightRadius:30,
          padding:20,
        },
        wrapup:{
          flexDirection:'column',
          marginBottom:20,
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
        },
        loginButton: {
          backgroundColor: '#EA5973',
          borderRadius: 21,
          paddingVertical: 12,
          paddingHorizontal:20,
          marginTop:'15%',
        },
        loginButton1: {
          backgroundColor: '#fff',
          borderRadius: 21,
          paddingVertical: 4,
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
         // paddingBottom:20,
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
        inputIcon1: {
            width: 33,
            height: 34,
            marginRight: 10,
          },
        inputIcon: {
          width: 29,
          height: 39,
          marginRight: 10,
        },
        link2:{
          color:'grey',
          fontSize:15,
          textAlign:'center',
        },
        googleLogo: {
          width: 24,
          height: 24,
          marginRight: 10,
        },
        
    })