// components/AutoSlider.js
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import Icon from "react-native-vector-icons/Feather";
import screenNames from "../../helpers/ScreenNames/screenNames";

const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    image: ImagePicker.curatedCollection1,
    title: "Most popular item for fast food",
    subTitle: "Tasty and spicy food with differnet flavors.",
  },
  {
    id: 2,
    image: ImagePicker.curatedCollection2,
    title: "Authentic japanese food in real taste",
    subTitle: "Your body's way of telling you that it's make.",
  },
];

const CuratedCollections = () => {
  const navigation = useNavigation();

  const handlePress = (redirectTo) => {
    navigation.navigate(redirectTo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View>
          <Text style={styles.mainHeading}>
            {commonEntities.curatedCollectionsTitle}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeading}>
            {commonEntities.curatedCollectionSubTitle}
          </Text>
        </View>
      </View>
      <View>
        <Carousel
          loop
          autoPlay
          data={data}
          scrollAnimationDuration={3000}
          width={width * 0.9}
          height={200}
          style={{ alignSelf: "center" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.curatedWrapper}
              onPress={() =>
                navigation.navigate(screenNames.ProductsScreen, {
                  isFromBanner: true,
                  bannerData: item,
                })
              }
            >
              <Image source={item.image} style={styles.card} />
              <View style={styles.overlay}>
                <View style={styles.contentWrapper}>
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontFamily: "Regular",
                        position: "relative",
                        zIndex: 999,
                      },
                    ]}
                  >
                    {item.subTitle}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(2),
    marginBottom: Responsive.heightPx(4),
  },
  curatedWrapper: {
    height: "auto",
    alignItems: "center",
  },
  card: {
    marginHorizontal: Responsive.widthPx(2),
    height: Responsive.heightPx(25),
    width: Responsive.widthPx(80),
    marginTop: Responsive.heightPx(2),
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // or any translucent background
  },

  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Responsive.widthPx(4),
  },
  mainHeading: {
    color: Colors.blackColor,
    fontSize: Responsive.font(5),
    textAlign: "center",
    fontFamily: "Bold",
  },
  subHeading: {
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
    color: Colors.greyColor,
  },
  contentWrapper: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Responsive.widthPx(4),
    paddingTop: Responsive.heightPx(1),
    paddingBottom: Responsive.heightPx(4),
    gap: Responsive.heightPx(0.5),
  },
  textStyle: {
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
    color: Colors.blackColor,
  },
});

export default CuratedCollections;
