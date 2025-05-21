import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";

import { useBannerData } from "../../helpers/Hooks/useBannerData";
import generateUniqueId, {
  cleanImagePath,
} from "../../Utilities/CommonUtils/CommonUtils";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import screenNames from "../../helpers/ScreenNames/screenNames";

const { width } = Dimensions.get("window");

const fallbackData = [
  {
    id: 1,
    bannerTitle: "Weekly Deal 1",
    description: "Great offers on your favorite items!",
    subtitle: "Limited Time",
    color: "#FFD700",
    image: ImagePicker.weeklyDealBanner1,
    redirectTo: "ShopScreen",
  },
  {
    id: 2,
    bannerTitle: "Weekly Deal 2",
    description: "Don't miss out!",
    subtitle: "Special Offer",
    color: "#ADD8E6",
    image: ImagePicker.weeklyDealBanner2,
    redirectTo: "ShopScreen",
  },
];

const WeeklyDealComponent = () => {
  const { data: weeklyCardData, loading } = useBannerData("weeklyDeal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();
  const sliderData = weeklyCardData?.data?.length
    ? weeklyCardData?.data
    : fallbackData;

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % sliderData.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, sliderData.length]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: item.colorCode || Colors.primaryButtonColor },
      ]}
    >
      <Image
        source={
          typeof item?.dealImage === "string"
            ? { uri: `${IMAGE_BASE_URL}${cleanImagePath(item.dealImage)}` }
            : item.image || ImagePicker.PlaceholderImage
        }
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.subTitle}>{item.subtitle}</Text>
      <Text style={styles.title}>{item.bannerTitle}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
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
          color={Colors.primaryButtonColor}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={sliderData}
        renderItem={renderItem}
        keyExtractor={(item, index) => generateUniqueId()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
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
    marginHorizontal: Responsive.widthPx(4),
    marginTop: Responsive.heightPx(2),
  },
  card: {
    width: Responsive.widthPx(90),
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginRight: Responsive.widthPx(4),
    
  },
  image: {
    width: Responsive.widthPx(89),
    height: Responsive.heightPx(40),
    position: "absolute",
    bottom: Responsive.heightPx(0.3),
    borderRadius: 15,
  },
  subTitle: {
    fontSize: Responsive.font(4),
    color: Colors.whiteColor,
    marginTop: Responsive.heightPx(1),
    marginBottom: Responsive.widthPx(2),
    width: Responsive.widthPx(40),
    textAlign: "center",
  },
  title: {
    fontSize: Responsive.font(8),
    fontFamily: "Bold",
    textAlign: "center",
    color: Colors.whiteColor,
    marginTop: Responsive.heightPx(2),
  },
  description: {
    fontSize: Responsive.font(4.5),
    textAlign: "center",
    marginTop: Responsive.heightPx(2),
    color: Colors.whiteColor,
  },
  button: {
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    borderRadius: Responsive.widthPx(20),
    marginTop: Responsive.heightPx(2.5),
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(1),
    alignItems: "center",
    marginBottom: Responsive.heightPx(5),
  },
  buttonText: {
    color: Colors.primaryButtonColor,
    fontFamily: "Bold",
    marginRight: Responsive.widthPx(1),
    fontSize: Responsive.font(3.5),
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Responsive.heightPx(2),
    gap: 20,
    top: Responsive.heightPx(15),
    position: "absolute",
  },
  navButton: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
    padding: Responsive.widthPx(2),
    left: Responsive.widthPx(-4),
    borderWidth: 1,
  },
});

export default WeeklyDealComponent;
