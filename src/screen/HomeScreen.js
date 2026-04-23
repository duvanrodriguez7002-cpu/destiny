import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DistanceCard from '../components/DistanceCard';
import MovementIndicator from '../components/MovementIndicator';
import CustomButton from '../components/CustomButton';

import { getCurrentLocation } from '../services/locationService';
import { startAccelerometer } from '../services/sensorService';
import { vibrate } from '../services/hapticsService';

import { getDistance } from '../utils/distanceCalculator';
import { DESTINO } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // Inicializa el acelerómetro para detectar movimiento
  useEffect(() => {
    const subscription = startAccelerometer(setIsMoving);

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // Obtiene la ubicación cada cierto tiempo y calcula la distancia
  useEffect(() => {
    let interval;

    const startTracking = async () => {
      interval = setInterval(async () => {
        const coords = await getCurrentLocation();

        if (!coords) return;

        const dist = getDistance(
          coords.latitude,
          coords.longitude,
          DESTINO.latitude,
          DESTINO.longitude
        );

        setDistance(dist);

        // Vibra solo si el usuario está en movimiento
        if (isMoving) {
          vibrate();
        }

      }, 5000);
    };

    startTracking();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMoving]);

  return (
    <View style={styles.container}>

      {/* Muestra la distancia al destino */}
      <DistanceCard distance={distance} />

      {/* Indica si el usuario se está moviendo */}
      <MovementIndicator isMoving={isMoving} />

      {/* Botón para cambiar destino */}
      <CustomButton
        title="Cambiar destino"
        onPress={() => navigation.navigate('Destination')}
      />

      {/* Botón para ver estado detallado */}
      <CustomButton
        title="Ver estado"
        onPress={() =>
          navigation.navigate('Status', {
            distance,
            isMoving
          })
        }
      />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212'
  }
});