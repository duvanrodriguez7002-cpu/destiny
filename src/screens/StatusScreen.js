import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusScreen = ({ route }) => {

  // Recibe datos desde HomeScreen
  const { distance = 0, isMoving = false } = route.params || {};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Estado del usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Movimiento</Text>
        <Text style={styles.value}>
          {isMoving ? 'En movimiento' : 'Detenido'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Distancia restante</Text>
        <Text style={styles.value}>
          {(distance * 1000).toFixed(0)} metros
        </Text>
      </View>

    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 30
  },
  card: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15
  },
  label: {
    color: '#aaa',
    marginBottom: 5
  },
  value: {
    color: '#fff',
    fontSize: 18
  }
});