import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";

const HomeScreen = () => {
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
  const locations = [
    {
      id: 1,
      latitude: 41.0069,
      longitude: 28.7806,
      title: "Konum 1",
      description: "Bu birinci konumdur.",
    },
    {
      id: 2,
      latitude: 41.0124,
      longitude: 28.7783,
      title: "Konum 2",
      description: "Bu ikinci konumdur.",
    },
    {
      id: 3,
      latitude: 41.0118,
      longitude: 28.7699,
      title: "Konum 3",
      description: "Bu üçüncü konumdur.",
    },
  ];

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});
  const flatListRef = useRef(null);

  const handleCardPress = (index, id) => {
    setSelectedCardIndex(index);
    setSelectedMarkerId(id);
    scrollToIndex(index);
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  const renderLocationCard = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.locationCard,
        selectedCardIndex === index && styles.selectedLocationCard,
      ]}
      onPress={() => handleCardPress(index, item.id)}
    >
      <Text style={styles.locationCardTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedCardIndex(viewableItems[0].index);
      setSelectedMarkerId(viewableItems[0].item.id);
    }
  }).current;

  useEffect(() => {
    if (selectedMarkerId !== null) {
      Object.values(markers.current).forEach((marker) => {
        marker.setNativeProps({ pinColor: "red" });
      });

      const selectedMarker = markers.current[selectedMarkerId];
      if (selectedMarker) {
        selectedMarker.setNativeProps({ pinColor: "green" });
      }
    } else {
      Object.values(markers.current).forEach((marker) => {
        marker.setNativeProps({ pinColor: "red" });
      });
    }
  }, [selectedMarkerId]);

  const CustomMarker = ({ id, selected }) => (

    <Ionicons name="md-pin" size={32} color={selected ? "green" : "red"} />
  );

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
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Current Location"
            />
          {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            ref={(marker) => {
              markers.current[location.id] = marker;
            }}
            onPress={() => {
              setSelectedMarkerId(location.id);
              scrollToIndex(
                locations.findIndex((loc) => loc.id === location.id)
              );
            }}
          >
            <CustomMarker
              id={location.id}
              selected={selectedMarkerId === location.id}
            />
          </Marker>
        ))}
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

      <View style={styles.locationCardContainer}>
        <FlatList
          ref={flatListRef}
          data={locations}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            ...styles.locationCardList,
            marginLeft:
              (Dimensions.get("window").width -
                Dimensions.get("window").width * 0.8) / 2,
              
          }}
          renderItem={renderLocationCard}
          keyExtractor={(item) => item.id.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // Görünürlük yüzdesi thresholdu
          }}
        />
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
    alignSelf:"center",
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
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
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
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
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
        color: "#283d6a",
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
