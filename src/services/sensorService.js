import { Accelerometer } from 'expo-sensors';

export const startAccelerometer = (callback, threshold = 1.2) => {
    const subscription = Accelerometer.addListener(data => {
        const { x, y, z } = data;

        // Magnitud del movimiento (más preciso)
        const movement = Math.sqrt(x * x + y * y + z * z);

        callback(movement > threshold);
    });

    // Opcional: ajustar velocidad de actualización
    Accelerometer.setUpdateInterval(300);

    return subscription;
};

export const stopAccelerometer = (subscription) => {
    if (subscription) {
        subscription.remove();
    }
};