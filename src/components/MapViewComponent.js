import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { getCurrentLocation } from '../services/locationService';
import { DESTINO } from '../utils/constants';

const MapViewComponent = ({ refreshKey }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    loadMap();
  }, [refreshKey]);

  const loadMap = async () => {
    const coords = await getCurrentLocation();

    const lat = coords ? coords.latitude : 4.7110;
    const lon = coords ? coords.longitude : -74.0721;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin:0; }
          #map { height:100vh; width:100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${lat}, ${lon}], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          L.marker([${lat}, ${lon}]).addTo(map)
            .bindPopup('Tu ubicación')
            .openPopup();

          L.marker([${DESTINO.latitude}, ${DESTINO.longitude}]).addTo(map)
            .bindPopup('Destino');

          var latlngs = [
            [${lat}, ${lon}],
            [${DESTINO.latitude}, ${DESTINO.longitude}]
          ];

          L.polyline(latlngs, {color: 'blue'}).addTo(map);
        </script>
      </body>
      </html>
    `;

    setHtml(htmlContent);
  };

  if (!html) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      key={refreshKey}
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
    />
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});