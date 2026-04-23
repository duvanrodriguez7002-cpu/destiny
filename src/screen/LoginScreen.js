import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = ({ navigation }) => {

  const handleLogin = async () => {
    try {
      // Verifica si hay hardware biométrico
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        return Alert.alert('Error', 'El dispositivo no tiene biometría');
      }

      // Verifica si hay huellas o face ID registrados
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return Alert.alert('Error', 'No hay biometría configurada');
      }

      // Lanza autenticación
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación requerida',
        fallbackLabel: 'Usar PIN',
      });

      if (result.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Acceso denegado', 'No se pudo autenticar');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema en la autenticación');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Acceso Seguro</Text>

      <Text style={styles.subtitle}>
        Usa tu huella para ingresar
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});