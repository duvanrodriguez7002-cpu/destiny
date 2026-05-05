import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovementIndicator = ({ isMoving }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isMoving ? 'En movimiento' : 'Sin movimiento'}
      </Text>
    </View>
  );
};

export default MovementIndicator;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});