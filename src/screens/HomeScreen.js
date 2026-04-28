import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import DistanceCard from '../components/DistanceCard';
import MovementIndicator from '../components/MovementIndicator';
import CustomButton from '../components/CustomButton';
import MapViewComponent from '../components/MapViewComponent';

import { getCurrentLocation } from '../services/locationService';
import { startAccelerometer } from '../services/sensorService';
import { vibrate } from '../services/hapticsService';

import { getDistance } from '../utils/distanceCalculator';
import { DESTINO } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [refreshMap, setRefreshMap] = useState(0);

  // Detecta movimiento
  useEffect(() => {
    const subscription = startAccelerometer(setIsMoving);
    return () => subscription && subscription.remove();
  }, []);

  // 🔥 SOLO actualiza cuando te estás moviendo
  useEffect(() => {
    const updateLocation = async () => {
      if (!isMoving) return;

      const coords = await getCurrentLocation();
      if (!coords) return;

      const dist = getDistance(
        coords.latitude,
        coords.longitude,
        DESTINO.latitude,
        DESTINO.longitude
      );

      setDistance(dist);
      setRefreshMap(prev => prev + 1); // 👈 actualiza mapa SOLO en movimiento

      vibrate();
    };

    updateLocation();

  }, [isMoving]);

  // 🔄 Actualiza al volver de otra pantalla (ej: cambiar destino)
  useFocusEffect(
    React.useCallback(() => {
      setRefreshMap(prev => prev + 1);
    }, [])
  );

  return (
    <View style={styles.container}>

      <View style={styles.map}>
        <MapViewComponent refreshKey={refreshMap} />
      </View>

      <View style={styles.info}>
        <DistanceCard distance={distance} />
        <MovementIndicator isMoving={isMoving} />

        <CustomButton
          title="Cambiar destino"
          onPress={() => navigation.navigate('Destination')}
        />

        <CustomButton
          title="Ver estado"
          onPress={() =>
            navigation.navigate('Status', { distance, isMoving })
          }
        />
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  map: {
    flex: 2
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  }
});