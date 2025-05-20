import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Icon from "react-native-vector-icons/Feather";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { useNavigation } from "@react-navigation/native";

const SuperDiscountWrapper = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={ImagePicker.discountImage}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.overlay} />

          <View style={styles.sliderContent}>
            <View style={styles.headContent}>
              <Text style={styles.sliderText}>
                <Text style={styles.bold}>
                  {commonEntities.superDiscountTitle}
                </Text>
              </Text>
            </View>
            <Text style={styles.seventyPercentOffStyle}>
              {" "}
              {commonEntities.seventyPercentOff}
            </Text>
            <View style={styles.descriptionContent}>
              <Text style={styles.sliderDescription}>
                {commonEntities.discountDescrition}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate(screenNames.ProductsScreen, {
                  isFromBanner: false,
                })
              }
            >
              <Text style={styles.buttonText}>Shop Now</Text>
              <Icon
                name="arrow-right"
                size={Responsive.font(7)}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuperDiscountWrapper;

const styles = StyleSheet.create({
  container: {
    marginVertical: Responsive.heightPx(5),
  },
  sliderContainer: {
    alignItems: "center",
    position: "relative",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: Responsive.widthPx(90),
    alignSelf: "center",
    borderRadius: 20,
    position: "relative",

    overflow: "hidden",
  },
  image: {
    width: "100%",
    height:  Platform.OS ==="ios" ? Responsive.heightPx(35) : Responsive.heightPx(35),
    borderRadius: 10,
    resizeMode: "cover",
    padding:Platform.OS ==="ios" ? Responsive.heightPx(0) : Responsive.widthPx(20),
    backgroundColor: Colors.blackColor,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
  sliderContainer: {
    marginTop: Responsive.heightPx(2),
  },

  sliderContent: {
    position: "absolute",
    zIndex: 99,
    top: Responsive.heightPx(3),
    left: Responsive.widthPx(3),
    flexDirection: "column",
    gap: Responsive.heightPx(1.8),
  },
  sliderText: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(4.4),
    fontFamily: "Regular",
  },
  seventyPercentOffStyle: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(8),
    fontFamily: "Bold",
  },
  headContent: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  bold: {
    fontFamily: "Bold",
  },
  sliderDescription: {
    fontSize: Responsive.font(3.5),
    color: Colors.whiteColor,
    fontFamily: "Regular",
    width: Responsive.widthPx(80),
  },
  buttonContainer: {
    backgroundColor: Colors.primaryButtonColor,

    borderRadius: 50,
    flexDirection: "row",
    marginTop: 10,
    gap: Responsive.widthPx(2),
    alignItems: "center",
    height: Responsive.heightPx(5.5),
    justifyContent: "center",
    paddingHorizontal: Responsive.widthPx(4),
    width: Responsive.widthPx(40),
  },
  buttonText: {
    color: Colors.whiteColor,
    fontFamily: "Bold",
    textAlign: "center",
  },
});
