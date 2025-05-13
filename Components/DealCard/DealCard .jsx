import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { Colors } from "../../helpers/theme/colors";

const DealCard = ({ bannerData }) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bannerData?.colorCode
            ? bannerData?.colorCode
            : "#000",
        },
      ]}
    >
      <Text style={styles.title}>
        {bannerData?.title ? bannerData?.title : bannerData?.bannerTitle}
      </Text>
      {bannerData?.subTitle ? (
        <Text style={styles.subtitle}>{bannerData?.subTitle}</Text>
      ) : (
        <Text style={styles.subtitle}>
          {bannerData?.description
            ? bannerData?.description
            : bannerData?.subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fdf6dc",
    paddingVertical: rh(5),
    paddingHorizontal: rw(5),
    borderRadius: rw(2),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: rw(2),
    marginVertical: rh(1),
  },
  title: {
    fontSize: rf(2.8),
    fontWeight: "bold",
    color: Colors.whiteColor,
    marginBottom: rh(1),
    textAlign: "center",
  },
  subtitle: {
    fontSize: rf(2),
    color: Colors.whiteColor,
    textAlign: "center",
  },
});

export default DealCard;
