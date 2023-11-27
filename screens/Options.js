import { StyleSheet, Text, View, Image ,Dimensions,TextInput,TouchableOpacity,TouchableHighlight} from 'react-native';
import React,{useState} from 'react';

const Options = () =>{
    const [isPressedHelp, setPressedHelp]=useState(false);
    const [isPressedVolunteer, setPressedVolunteer]=useState(false);
    const [isPressedO, setPressedO]=useState(false);
    const handlePressHelp = () =>{
        setPressedHelp(!isPressedHelp);
    };
    const handlePressVolunteer = () =>{
        setPressedVolunteer(!isPressedVolunteer);
    };
    const handlePressO = () =>{
        setPressedO(!isPressedO);
    };
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.few}>
                        Just a few more minutes!
                </Text>
                <Text style={styles.option}>
                    Choose an option
                </Text>
                <TouchableOpacity style={[styles.button, isPressedHelp ? styles.pressedButton : null]}
                    onPress={handlePressHelp}
                >
                    <Text style={[styles.buttontext,isPressedHelp ? styles.pressedText : null]}>
                        I need Help
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.button, isPressedVolunteer ? styles.pressedButton : null]}
                    onPress={handlePressVolunteer}
                >
                    <Text style={[styles.buttontext,isPressedVolunteer ? styles.pressedText : null]}>
                        I want to Volunteer
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.button, isPressedO ? styles.pressedButton : null]}
                    onPress={handlePressO}
                >
                    <Text style={[styles.buttontext,isPressedO ? styles.pressedText : null]}>
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