import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { Colors } from "../../helpers/theme/colors";
import { StatusBar } from "expo-status-bar";

const SplashScreen = () => {
  return (
    <SafeAreaView style={Styles.splashScreenContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.blackColor}
        barStyle="light-content"
      />
      <ImageBackground
        source={ImagePicker.splashScreenImage}
        style={Styles.splashImage}
        resizeMode="cover"
      ></ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.blackColor,
  },

  splashImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
