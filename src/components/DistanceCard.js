import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const DistanceCard = ({ distance }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Distancia</Text>
            <Text style={styles.distance}>
                {distance ? `${distance.toFixed(2)} km` : '---'}
            </Text>
        </View>
    );
};

export default DistanceCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center'
    },

    title: {
        color: '#aaa',
        fontSize: 16
    },

    distance: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
});