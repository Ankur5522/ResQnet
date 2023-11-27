import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/core';

const Options = ({route}) =>{
    const res = route.params?.res;
    const [userType, setUserType] = useState('')
    const navigation = useNavigation()

    const handlePress = (value) =>{
        setUserType(value)
        if(res) {
            newRes = {...res,type: value}
            navigation.navigate(`${value}`,{newRes})
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.few}>
                        Just a few more minutes!
                </Text>
                <Text style={styles.option}>
                    Choose an option
                </Text>
                <TouchableOpacity style={[styles.button, userType == 'help' ? styles.pressedButton : null]}
                    onPress={()=> {handlePress('help')}}
                >
                    <Text style={[styles.buttontext,userType == 'help' ? styles.pressedText : null]}>
                        I need Help
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.button, userType === 'volunteer' ? styles.pressedButton : null]}
                    onPress={()=> {handlePress('volunteer')}}
                >
                    <Text style={[styles.buttontext,userType === 'volunteer' ? styles.pressedText : null]}>
                        I want to Volunteer
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.button, userType === 'organisation' ? styles.pressedButton : null]}
                    onPress={()=> {handlePress('organisation')}}
                >
                    <Text style={[styles.buttontext,userType === 'organisation' ? styles.pressedText : null]}>
                        We are an Organization
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
    )
}

export default Options;

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
        width: '100%'
        },
    few:{
        textAlign:'center',
        fontSize:24,
        letterSpacing:1.2,
        color:'#EA5973',
        fontWeight:'600'
    },
    option:{
        
        textAlign:'center',
        fontSize:24,
        letterSpacing:1.2,
        color:'#70696A',
        fontWeight:'600',
        marginTop:10,
        marginBottom:30
    },
    button:{
        display:'flex',
        justifyContent: 'center',
        alignitems: 'center',
        width:'80%',
        height:'7.5%',
        borderWidth:1.5,
        borderColor:'#EA5973',
        borderRadius:30,
        marginLeft:40,
        marginBottom:12
    },
    buttontext:{
        textAlign:'center',
        fontSize:19,
        letterSpacing:1.2,
        color:'#737878',
        fontWeight:'600',
    },
    pressedButton:{
        backgroundColor:'#EA5973'
    },
    pressedText:{
        color:'white'
    }
})