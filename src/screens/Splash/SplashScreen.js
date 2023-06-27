import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({}) => {
  const navigation = useNavigation(navigation);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        animated={true}
        backgroundColor="#C5C5C5"
        translucent={true}
      />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/splash.png")}
      >
        <View style={styles.logoContainer}>
          {/* <Image
          style={styles.logo}
          source={require("../../../assets/images/tesla.png")}
        /> */}
        </View>
        <View style={{ height: height * 0.05 }} />
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>Velcome to the BeCharge</Text>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("SelectVehicle");
               // navigation.navigate("BottomTabbarNavigation");
                console.log("Register");
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginScreen");
                console.log("Login");
              }}
            >
              <Text style={styles.accountButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width:width,
    height:'100%',
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.98,
    height: height * 0.3,
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 30,
    position: "relative",
    marginTop: height * 0.1,
  },
  gradientLogo: {
    width: width * 0.6,
    height: height * 0.3,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.95,
    height: height * 0.6,
    resizeMode: "contain",
    alignSelf: "center",
    shadowColor: "#000",
  },

  logotextContainer: {
    width: width * 0.6,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainerText: {
    fontSize: 80,
    color: "#F5F5F5",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    fontStyle: "italic",
  },

  textContainer: {
    width: width * 0.95,
    height: height * 0.15,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "900",
    color: "#21D4FD",
  },

  paragraphContainer: {
    width: width * 0.95,
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  paragraph: {
    fontSize: 25,
    fontWeight: "900",
    color: "#1c2129",
  },

  bodyContainer: {
    width: width * 0.95,
    height: height * 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    alignSelf: "center",
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 30,
    backgroundColor: "#1c2129",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.05,
  },
  accountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B3B3B",
  },
  accountButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c2129",
  },
});
