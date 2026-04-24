import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { getCurrentLocation } from './locationService'; // Asegúrate de que la ruta sea correcta

export default function App() {
  const [mapHtml, setMapHtml] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    const coords = await getCurrentLocation();
    
    // Si no obtenemos coordenadas (permiso denegado), usamos unas por defecto (Bogotá)
    const lat = coords ? coords.latitude : 4.7110;
    const lon = coords ? coords.longitude : -74.0721;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lon}], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);
          L.marker([${lat}, ${lon}]).addTo(map)
            .bindPopup('<b>Tu posición</b>')
            .openPopup();
          L.control.zoom({ position: 'bottomright' }).addTo(map);
        </script>
      </body>
      </html>
    `;
    setMapHtml(html);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>Buscando señal GPS...</Text>
        </View>
      ) : (
        <WebView 
          originWhitelist={['*']}
          source={{ html: mapHtml }} 
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  }
});