import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import logo from '../assets/logo.png';
import phone from '../assets/phone.png';
import organization from '../assets/organization.png';
import locate from '../assets/locate.png'
import {Picker} from '@react-native-picker/picker';
import {signupOrganisation} from "../api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

const Organizationform = ({route}) =>{
    const res = route.params?.newRes
    const [formData, setFormData] = useState({
        orgName: '',
        type: '',
        address:'',
        city:'',
        state:'',
        description:''
      });
      const navigation = useNavigation()
     const handleSignup = async () => {
        const newformData = {...res, ...formData}
        const response = await signupOrganisation(newformData)
        await AsyncStorage('orgProfile',response)
        navigation.navigate('Login')
     }
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={styles.s1}>
                    <Image style={styles.logo} source={logo}>
                    </Image>
                </View>
                <Text style={styles.infotext}>
                    Fill the information below so that we may help you get started on this request
                </Text>
                <View style={styles.formgroup}>
                    <View style={styles.wrapup}>
                            <View style={styles.inputContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={organization} style={styles.inputIcon} /></View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Organization Name"
                                    onChangeText={(text) => setFormData({ ...formData, orgName: text })}
                                />
                            </View>
                            <View style={styles.inputWrapper}></View>

                    </View>
                    <View style={styles.wrapup}>
                        <View style={styles.inputContainer}>
                            <View style={styles.imageContainer}>
                            <Image source={organization} style={styles.inputIcon} /></View>
                            <Picker
                                placeholder='Organization Type'
                                style={styles.inputpick}
                                selectedValue={formData.type}
                                onValueChange={(itemValue, itemIndex) => setFormData({...formData,type:itemValue})}
                            >
                                <Picker.Item label="Select type" value="" />
                                <Picker.Item label="Police" value="police" />
                                <Picker.Item label="Hospital" value="hospital" />
                                <Picker.Item label="First Aid" value="firstaid" />
                                <Picker.Item label="Ngo" value="ngo" />
                                <Picker.Item label="News" value="news" />
                                <Picker.Item label="Fire Fighters" value="fire" />
                            </Picker>
                                
                        <View style={styles.inputWrapper}></View>
                        </View>
                        
                    </View>
                    <View style={styles.wrapup}>
                            <View style={styles.inputContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={locate} style={styles.inputIcon} /></View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Address Line"
                                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                                />
                            </View>
                            <View style={styles.inputWrapper}></View>

                    </View>
                    <View style={styles.wrapup}>
                            <View style={styles.inputContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={locate} style={styles.inputIcon} /></View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="State"
                                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                                />
                            </View>
                            <View style={styles.inputWrapper}></View>

                    </View>
                    <View style={styles.wrapup}>
                            <View style={styles.inputContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={locate} style={styles.inputIcon} /></View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="City"
                                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                                />
                            </View>
                            <View style={styles.inputWrapper}></View>

                    </View>
                    <TextInput
                        multiline
                        numberOfLines={4} // Adjust the number of lines as needed
                        placeholder="About You"
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                        style={styles.textInput}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                        <Text style={styles.loginButtonText} >Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}
export default Organizationform;

const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%'
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
         alignitems: 'center',
        height: '100%',
        width: '100%',
        },
    s1:{
        display:'flex',
        justifyContent:'center',
        alignitems:'center',
        height:'7.5%',
    },
    logo:{
      height:windowHeight*0.08,
      width:windowWidth*1,
      resizeMode:'contain',
    
    },
    infotext:{
        display:'flex',
        color:'#EA5973',
        fontWeight:'600',
        letterSpacing:1,
        padding:20,
        paddingTop:5,
        marginLeft:5,
        fontSize:15
    },
    wrapup:{
        flexDirection:'column',
        marginBottom:20,
      },
      formgroup:
      {
      display:'flex',
      flexDirection:'column',
      marginLeft:'7%',
      marginRight:'7%'
      },
      
      input: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#fff',        
        color:'#A4A4A4'
      },
      input:{
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        paddingTop:5,
        color:'#A4A4A4',
        fontSize:15,
        width:'90%'
      },
        inputIcon: {
          width: 31,
          height: 25,
          marginRight: 10,
          objectFit:'contain'
        },
      imageContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
      inputContainer: {
        display:'flex',
        flexDirection: 'row',
        borderBottomColor:'#919696',
        borderBottomWidth:1.4,
        height:45,
        color:'#A4A4A4'
      },
      textInput:{
        borderColor:"#919696",
        borderWidth:1,
        borderRadius:21,
        padding:10
      },loginButton: {
        backgroundColor: '#EA5973',
        borderRadius: 23,
        paddingVertical: 12,
        paddingHorizontal:20,
        marginTop:'10%',
        marginLeft:'5%',
        marginRight:'5%'
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight:'600',
        letterSpacing:0.7
      },
      inputpick: {
        width:'90%',
        color:'#A4A4A4'
     },
});