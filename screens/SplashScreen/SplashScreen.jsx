import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { Colors } from "../../helpers/theme/colors";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ImagePicker.splashScreenImage}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackColor,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
