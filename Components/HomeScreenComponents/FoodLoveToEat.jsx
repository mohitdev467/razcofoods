// components/CircleSlider.js
import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { useBannerData } from "../../helpers/Hooks/useBannerData";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.7;

const FootLoveToEat = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const { data: categoriesData, loading } = useBannerData("categoriesCard");

  if (loading) {
    return <View style={styles.loaderContainer}></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View>
          <Text style={styles.mainHeading}>
            {commonEntities.whatFoodYouLoveToOrder}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeading}>
            {commonEntities.hereYourOrderSubtitle}
          </Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        horizontal
        data={categoriesData?.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() =>
              navigation.navigate(screenNames.ProductsScreen, {
                userCategory: item.name,
              })
            }
          >
            <Image
              source={
                item?.image
                  ? { uri: `${IMAGE_BASE_URL}${item?.image}` }
                  : ImagePicker.PlaceholderImage
              }
              contentFit="cover"
              style={styles.image}
            />
            <Text
              style={{
                color: Colors.blackColor,
                fontFamily: "SemiBold",
                position: "absolute",
                bottom: 0,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(5),
  },
  container: {
    height: Responsive.heightPx(40),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Responsive.heightPx(3),
  },
  imageWrapper: {
    width: Responsive.widthPx(40),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Responsive.widthPx(28),
    height: Responsive.heightPx(14),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.silverColor,
    resizeMode: "contain",
    backgroundColor: Colors.silverColor,
  },
  leftArrow: {
    position: "absolute",
    left: Responsive.widthPx(4),
    zIndex: 10,
    borderRadius: 100,
    bottom: Responsive.heightPx(15),
  },
  rightArrow: {
    position: "absolute",
    right: Responsive.widthPx(4),
    zIndex: 10,
    borderRadius: 100,
    bottom: Responsive.heightPx(15),
  },
  icon: {
    fontSize: Responsive.font(12),
    color: Colors.primaryButtonColor,
    backgroundColor: Colors.whiteColor,
    borderRadius: 100,
  },

  headingContainer: {
    marginTop: Responsive.heightPx(5),
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
    color: Colors.blackColor,
  },
});

export default FootLoveToEat;
