import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, color = '#4caf50' }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    }
})