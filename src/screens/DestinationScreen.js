import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import { DESTINO } from '../utils/constants';

const DestinationScreen = ({ navigation }) => {

  const [latitude, setLatitude] = useState(DESTINO.latitude.toString());
  const [longitude, setLongitude] = useState(DESTINO.longitude.toString());

  const handleSave = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Validación básica
    if (isNaN(lat) || isNaN(lng)) {
      return Alert.alert('Error', 'Ingresa coordenadas válidas');
    }

    // Actualiza el destino global
    DESTINO.latitude = lat;
    DESTINO.longitude = lng;

    Alert.alert('Éxito', 'Destino actualizado');

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Configurar destino</Text>

      <Text style={styles.label}>Latitud</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Longitud</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar destino</Text>
      </TouchableOpacity>

    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    color: '#aaa',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});