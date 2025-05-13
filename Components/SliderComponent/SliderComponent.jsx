import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors, pickColors } from "../../helpers/theme/colors";
import { useBannerData } from "../../helpers/Hooks/useBannerData";
import { ActivityIndicator } from "react-native-paper";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { cleanImagePath } from "../../Utilities/CommonUtils/CommonUtils";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";

const SliderComponent = () => {
  const { data, loading } = useBannerData("hero");
  const navigation = useNavigation();

  if (loading) {
    return <View style={styles.loadeContainer}></View>;
  }

  return (
    <View style={styles.sliderContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        paginationStyle={styles.pagination}
      >
        {data &&
          data?.data?.map((item, index) => (
            <View key={index} style={styles.slide}>
              <ImageBackground
                source={
                  typeof item?.image === "string"
                    ? { uri: `${IMAGE_BASE_URL}${cleanImagePath(item?.image)}` }
                    : ImagePicker.PlaceholderImage
                }
                style={styles.image}
                borderRadius={15}
              >
                <View>
                  <View style={styles.mainHeadingWrapper}>
                    <Text style={styles.mainHeading}>
                      {commonEntities.welcomeRazcoFood}
                    </Text>
                  </View>
                  <View style={styles.bannerTitleWrp}>
                    <Text style={styles.bannerTitleHeading}>
                      {item?.bannerTitle}
                    </Text>
                  </View>
                  <View style={styles.dealWrapper}>
                    <Text style={styles.subTitleHeading}>{item?.subtitle}</Text>
                  </View>
                  <View style={styles.descriptionWrapper}>
                    <Text style={styles.descriptionHeading}>
                      {item?.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      navigation.navigate(screenNames.ProductsScreen, {
                        isFromBanner: true,
                        bannerData: item,
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
              </ImageBackground>
            </View>
          ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  loadeContainer: {
    height: Responsive.heightPx(5),
    marginTop: Responsive.heightPx(3),
  },
  sliderContainer: {
    height: Responsive.heightPx(40),
    width: Responsive.widthPx(92),
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: Responsive.heightPx(4),
    backgroundColor: Colors.lightGreyColor,
  },

  slide: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  pagination: {
    position: "absolute",
    bottom: Responsive.heightPx(-3),
  },
  dotStyle: {
    backgroundColor: Colors.lightGreyColor,
    width: Responsive.widthPx(2.4),
    height: Responsive.heightPx(1.2),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: Colors.primaryButtonColor,
    width: Responsive.widthPx(2.4),
    height: Responsive.heightPx(1.2),
    borderRadius: 6,
  },

  mainHeadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Responsive.heightPx(1),
  },

  mainHeading: {
    textAlign: "center",
    color: Colors.primaryButtonColor,
    width: Responsive.widthPx(60),
    fontFamily: "SemiBold",
  },
  bannerTitleWrp: {
    width: Responsive.widthPx(70),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  bannerTitleHeading: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: Responsive.font(5),
    color: Colors.blackColor,
  },

  dealWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  subTitleHeading: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: Responsive.font(5),
    color: Colors.orangeColor,
  },

  descriptionHeading: {
    color: Colors.greyColor,
    fontSize: Responsive.font(4),
    textAlign: "center",
  },
  descriptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: Responsive.widthPx(75),
    marginVertical: Responsive.heightPx(2),
    alignSelf: "center",
  },

  buttonContainer: {
    backgroundColor: Colors.primaryButtonColor,
    borderRadius: 50,
    flexDirection: "row",
    marginTop: Responsive.heightPx(1),
    gap: Responsive.widthPx(2),
    alignItems: "center",
    height: Responsive.heightPx(5.5),
    justifyContent: "center",
    paddingHorizontal: Responsive.widthPx(4),
    width: Responsive.widthPx(40),
    alignSelf: "center",
  },
  buttonText: {
    color: Colors.whiteColor,
    fontFamily: "Bold",
    textAlign: "center",
  },
});

export default SliderComponent;
