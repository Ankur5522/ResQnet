import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import logo from '../assets/logo.png';
import user from "../assets/user.png";
import age from '../assets/age.png';
import secure from '../assets/secure.png';
import {Picker} from '@react-native-picker/picker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const Helpform =() =>{
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        aadhar: '',
        description:''
      });
      const [selected,setSelected]=useState([]);
      const data=[
        {key:'1',value:'Evacuation'},
        {key:'2',value:'Fire'},
        {key:'3',value:'First Aid'},
        {key:'4',value:'Supply Provision'},
        {key:'5',value:'Media'},
        {key:'6',value:'Report Covering'},

    ]
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
                            <Picker
                                placeholder='Gender'
                                style={styles.inputpick}
                                selectedValue={formData.gender}
                                onValueChange={(itemValue, itemIndex) => setFormData({...formData,gender:itemValue})}
                            >
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="I prefer not to say" value="other" />
                            </Picker>
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
                        placeholder="aadhar Number"
                        secureTextEntry={true}
                        onChangeText={(text) => setFormData({ ...formData, aadhar: text })}
                    />
                    </View>
                    <View style={styles.inputWrapper}></View>
                    </View>
                    <MultipleSelectList
                    placeholder='Categories'
                    placeeholderTextColor='#A4A4A4'
                        style={styles.multi}
                        setSelected={(value)=>setSelected(value)}
                        data={data}
                        label="Categories where you can Help"
                        save="value"
                        notFoundText='no such category exists'
                        labelStyles={{color:'#EA5973'}}
                        badgeStyles={{color:'white',backgroundColor:'#EA5973',fontSize:16}}

                    />
                    <TextInput
                        multiline
                        numberOfLines={7} // Adjust the number of lines as needed
                        placeholder="About You"
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                        style={styles.textInput}
                    />
                    <TouchableOpacity style={styles.loginButton}//onPress={handleSignup}
                    >
                        <Text style={styles.loginButtonText} >Sign Up</Text>
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
      },input:{
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        paddingTop:5,
        color:'#A4A4A4',
        fontSize:16,
        width:'90%',
        marginLeft:10
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
      textInput:{
        borderColor:"#919696",
        borderWidth:1,
        borderRadius:21,
        padding:10
      },
      inputContainer: {
        display:'flex',
        flexDirection: 'row',
        marginBottom: 2,
        padding:2,
        borderBottomColor:'#919696',
        borderBottomWidth:1.4,
        height:50,
        color:'#A4A4A4'
      },
      inputpick: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width:'90%',
        color:'#A4A4A4',
     },
})
