import React from "react";
import { View, Text, StyleSheet} from 'react-native';

const MovementIndicator = ({isMoving}) => {
    return (
        <View style={style.container}>
            <Text style={style.Text}>
                {isMoving ? '✔️ en movimiento':'✖️ quieto'}
            </Text>
        </View>
    );
};

export default MovementIndicator;

const style = StyleSheet.create({
    container:{
        padding:15,
        borderRadius:10,
        backgroundColor:'#2a2a2a',
    },
    Text:{
        color:'#fff',
        fontSize:15,
    }
})