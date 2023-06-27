import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Background from "../../../assets/images/background.png";
import React, { useCallback, useState } from "react";
import Car from "../../../assets/images/tesla.png";
import Scooter from "../../../assets/images/Electric.png";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SelectVehicle = ({ navigation }) => {
  
  const handleSelectVehicle = (vehicleIcon) => {
    navigation.navigate('BottomTabbarNavigation', { vehicleIcon });
  };

 

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={Background}>
        <View style={styles.bannerContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logoContainer}
          />
        </View>

        <View style={styles.insider}>
          <View style={styles.insiderTop}>
            <Text style={styles.topSubtitle}>Select your vehicle</Text>
          </View>

          <View style={styles.insiderBottom}>
            {/* CAR */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.carContainer]}
              onPress={() => {
                handleSelectVehicle("electric-car");
                console.log("electric-car");
              }}
            >
              <View style={styles.vehicleContainer}>
                <Image source={Car} style={styles.vehicleImage} />
                <View style={[styles.stationTag, { borderColor: "#1c2129" }]}>
                  <Text style={styles.vehicleHeader}>Car stations</Text>
                </View>
              </View>
              <View
                style={[styles.vehicleBottomTag, { borderColor: "#1c2129" }]}
              >
                <Text style={styles.vehicleBottomText}>Car</Text>
              </View>
            </TouchableOpacity>

            {/* SCOOTER */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.scooterContainer]}
              onPress={() => {
                handleSelectVehicle("electric-scooter");
                console.log("electric-scooter");
              }}
            >
              <View style={styles.vehicleContainer}>
                <Image source={Scooter} style={styles.vehicleImage} />
                <View style={[styles.stationTag, { borderColor: "#1c2129" }]}>
                  <Text style={styles.vehicleHeader}>Scooter stations</Text>
                </View>
              </View>
              <View
                style={[styles.vehicleBottomTag, { borderColor: "#1c2129" }]}
              >
                <Text style={styles.vehicleBottomText}>Scooter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SelectVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF0F3",
    alignItems: "center",
    width: width,
    justifyContent: "center",
    position: "relative",
  },
  insider: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: height * 0.6,
    //backgroundColor: "transparent",
    backgroundColor: "#EFF0F3",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 5,
  },
  insiderTop: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: height * 0.05,
    width: width * 0.45,
    height: height * 0.05,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#1c2129",
  },
  topHeader: {
    fontSize: 24,
    color: "#F5F5F5",
  },
  topSubtitle: {
    fontSize: 16,
    color: "#F5F5F5",
    textAlign: "center",
    fontWeight: "bold",
  },
  insiderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.03,
    height: height * 0.45,
    padding: 16,
  },
  carContainer: {
    width: width * 0.44,
    backgroundColor: "#F5F5F5",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 16,
    position: "relative",
    height: height * 0.4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#1C2129",
  },
  scooterContainer: {
    width: width * 0.44,
    backgroundColor: "#F5F5F5",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 16,
    position: "relative",
    height: height * 0.4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: "#1C2129",
  },
  vehicleContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
  },
  vehicleImage: {
    width: width * 0.4,
    height: height * 0.27,
    resizeMode: "contain",
  },
  vehicleHeader: {
    fontSize: 16,
    color: "#f5f5f5",
    fontWeight: "bold",
  },
  stationTag: {
    width: width * 0.44,
    height: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1C2129",
  },
  vehicleBottomTag: {
    position: "absolute",
    width: width * 0.44,
    height: height * 0.07,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C2129",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  vehicleBottomText: {
    color: "#F5F5F5",
    fontSize: 18,
    fontWeight: "bold",
  },
  bannerContainer: {
    top: height * 0.14,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    elevation: 5,
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    padding: 10,
    height: height * 0.2,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
  },
});
