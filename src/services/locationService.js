import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
    try {
        // Pedir permisos
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permiso de ubicación denegado');
            return null;
        }

        // Obtener ubicación actual
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        return location.coords;

    } catch (error) {
        console.log('Error obteniendo ubicación:', error);
        return null;
    }
};