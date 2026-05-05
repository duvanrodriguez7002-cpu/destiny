import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const getCurrentLocation = async () => {
  try {
    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

    if (status !== 'granted') {

      if (!canAskAgain) {
        Alert.alert(
          "Permisos bloqueados",
          "Activa la ubicación desde configuración",
          [
            { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
            { text: "Cancelar", style: "cancel" }
          ]
        );
        return null;
      }

      const request = await Location.requestForegroundPermissionsAsync();

      if (request.status !== 'granted') {
        Alert.alert("Permiso requerido", "Necesitamos tu ubicación");
        return null;
      }
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return location.coords;

  } catch (error) {
    console.log('Error obteniendo ubicación:', error);
    return null;
  }
};