import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomeButton = ({ title, onPress, color = '#4caf50'}) => {
    return (
        <TouchableOpacity 
        style ={ [styles.button, {backgroundColor: color}]}
        >
            <Text style = {styles.Text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomeButton;

const styles = StyleSheet.create({
    button:{
        padding:15,
        borderRadius:12,
        alignItems:'center',
        marginVertical:5,
    },
    Text:{
        color:'#fff',
        fontSize:13,
        fontWeight:'bold',
    }
})