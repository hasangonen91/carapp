import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const MapScreen = () => {
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
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 41.0069,
          longitude: 28.7806,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => {
          setSelectedMarkerId(null);
        }}
      >
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
                Dimensions.get("window").width * 0.8) /
              2,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationCardContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  locationCardList: {
    paddingHorizontal: windowWidth * 0.1,
    paddingVertical: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  locationCard: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.15,
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedLocationCard: {
    backgroundColor: "lightgreen",
  },
  locationCardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default MapScreen;
