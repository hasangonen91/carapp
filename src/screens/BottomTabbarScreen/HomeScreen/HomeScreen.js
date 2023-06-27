import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ route }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.log("Error getting current location", error);
    }
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    // Arama işlemini burada gerçekleştirin veya işleme fonksiyonunu çağırın
    console.log("Aranan kelime:", text);
  };

  const mapRef = useRef(null);


  const { vehicleIcon } = route.params || {};


  return (
    <View style={styles.container}>
      {currentLocation && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={uberMapStyle}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.020,
              longitudeDelta: 0.011,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Current Location"
            >
              {vehicleIcon == "electric-car" ? (
                <Ionicons name="car-sport-sharp" size={34} color="#000000" />
              ) : (
                <MaterialCommunityIcons
                  name="scooter"
                  size={34}
                  color="#000000"
                />
              )}
            </Marker>

          </MapView>
        </>
      )}
      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={25} color={"#1C2129"} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#979797"
          />
        </View>
        <View style={styles.menuContainer}>
          <Feather name="menu" size={30} color="#1C2129" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    zIndex: 999,
    width: width * 0.98,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: height * 0.06,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: width * 0.75,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#eeeeee",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: 8,
  },
  searchBar: {
    marginLeft: 5,
    height: height * 0.07,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  menuContainer: {
    width: width * 0.15,
    height: height * 0.075,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  map: {
    flex: 1,
  },
  locationCardContainer: {
    position: "absolute",
    bottom: 100,
    width: width,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  locationCardList: {
    paddingHorizontal: width * 0.2,
    paddingVertical: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  locationCard: {
    width: width * 0.8,
    height: height * 0.15,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  selectedLocationCard: {
    backgroundColor: "lightgreen",
  },
  locationCardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

const uberMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#C5C5C5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff", // burada değişiklik yapıldı
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#C5C5C5",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#eee",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#C5C5C5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#C5C5C5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#000",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        saturation: -45,
      },
      {
        lightness: 10,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "red",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        saturation: -70,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];

export default HomeScreen;
