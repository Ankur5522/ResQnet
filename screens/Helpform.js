import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import logo from '../assets/logo.png';
import user from "../assets/user.png";
import age from '../assets/age.png';
import secure from '../assets/secure.png';

const Helpform = () =>{
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        adhar: ''
      });
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
                            <Image source={user} style={styles.inputIcon} /></View>
                                <TextInput
                                style={styles.input}
                                placeholder="Gender"
                                placeholderTextColor="#585858"
                                onChangeText={(text) => setFormData({ ...formData, gender: text })}
                            />
                        <View style={styles.inputWrapper}></View>
                        </View>
                        
                    </View>
                    <View style={styles.wrapup}>
                        <View style={styles.inputContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={age} style={styles.inputIcon} /></View>
                            <TextInput
                                style={styles.input}
                                placeholder="Age"
                                placeholderTextColor="#585858"
                                onChangeText={(text) => setFormData({ ...formData, age: text })}
                            />
                        </View>
                        <View style={styles.inputWrapper}></View>
                    </View>
                    <View style={styles.wrapup}>
                    <View style={styles.inputContainer}>
                    <View style={styles.imageContainer}>
                    <Image source={secure} style={styles.inputIcon} /></View>
                    <TextInput
                        style={styles.input}
                        placeholder="Adhar Number"
                        placeholderTextColor="#585858"
                        secureTextEntry={true}
                        onChangeText={(text) => setFormData({ ...formData, adhar: text })}
                    />
                    </View>
                    <View style={styles.inputWrapper}></View>
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText} >Save</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}
export default Helpform;

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
        height:'10%',
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
      flexDirection:'column'
      },
      inputContainer: {
        display:'flex',
        flexDirection: 'row',
        marginBottom: 2,
        padding:2,
        marginLeft:'5%',
        borderBottomColor:'#919696',
        borderBottomWidth:1.4,
        height:50,
        marginRight:'5%'
      },
      input: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#fff'
      },input:{
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        paddingTop:5,
      },
        inputIcon: {
          width: 31,
          height: 39,
          marginRight: 10,
          objectFit:'contain'
        },
      imageContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      },
    loginButton: {
        backgroundColor: '#EA5973',
        borderRadius: 23,
        paddingVertical: 12,
        paddingHorizontal:20,
        marginTop:'15%',
        marginLeft:'10%',
        marginRight:'10%'
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight:'600',
        letterSpacing:0.7
      }
})
