import React from "react";
import { View, Text, StyleSheet, StatusBar } from 'react-native';


const DistanceCard = ({distance}) => {
    return (
        <view Style={styles.Card}>
            <Text style={styles.title}>Distancia</Text>
            <Text style={styles.Distance}>
                {distance ? `${distance.toFixed(2)} km` : '---'}
            </Text>
        </view>
    );
};

export default DistanceCard;

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#1e1e1e',

    },

    title:{

    },
    distance:{

    },

})