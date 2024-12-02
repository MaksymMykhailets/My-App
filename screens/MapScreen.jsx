import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ route, navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Дозвіл на доступ до геолокації відхилено!");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoading(false);
    })();
  }, []);

  const handleSelectLocation = (event) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      navigation.goBack();
      route.params?.onLocationSelect(selectedLocation);
    } else {
      alert("Оберіть локацію перед збереженням.");
    }
  };
  
    

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        onPress={handleSelectLocation}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Обрана локація"
          />
        )}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Скасувати</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
          <Text style={styles.saveButtonText}>Зберегти локацію</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#FF6C00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MapScreen;
