import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { aboutusContent } from "../../constants/StaticContent/AboutusContent";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutusScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"About us"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.aboutBanner} style={styles.image} />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.headingStyle}>{aboutusContent.heading}</Text>
          <Text style={styles.content}>{aboutusContent.text1}</Text>
        </View>
        <View
          style={[
            styles.imageWrapper,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: Responsive.widthPx(6),
              marginTop: Responsive.heightPx(0),
            },
          ]}
        >
          <Image
            source={ImagePicker.banner1}
            style={[
              styles.image,
              {
                height: Responsive.heightPx(20),
                width: Responsive.widthPx(40),
              },
            ]}
          />
          <Image
            source={ImagePicker.banner2}
            style={[
              styles.image,
              {
                height: Responsive.heightPx(20),
                width: Responsive.widthPx(40),
              },
            ]}
          />
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{aboutusContent.text2}</Text>
        </View>

        <View
          style={[
            styles.imageWrapper,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: Responsive.widthPx(6),
              marginTop: Responsive.heightPx(0),
            },
          ]}
        >
          <Image
            source={ImagePicker.banner3}
            style={[
              styles.image,
              {
                height: Responsive.heightPx(10),
                width: Responsive.widthPx(25),
              },
            ]}
          />
          <Image
            source={ImagePicker.banner4}
            style={[
              styles.image,
              {
                height: Responsive.heightPx(10),
                width: Responsive.widthPx(25),
              },
            ]}
          />
          <Image
            source={ImagePicker.banner5}
            style={[
              styles.image,
              {
                height: Responsive.heightPx(10),
                width: Responsive.widthPx(25),
              },
            ]}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{aboutusContent.text3}</Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={ImagePicker.banner6}
            style={[
              styles.image,
              { width: Responsive.widthPx(90), resizeMode: "contain" },
            ]}
          />
        </View>
        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: Responsive.heightPx(30),
    width: Responsive.widthPx(100),
    resizeMode: "cover",
  },
  text: {
    position: "absolute",
    top: Responsive.heightPx(10),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(6),
  },

  headingStyle: {
    fontSize: Responsive.font(5),
    color: Colors.blackColor,
    fontFamily: "SemiBold",
  },
  contentWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingVertical: Responsive.heightPx(3),
  },
  content: {
    fontSize: Responsive.font(4),
    flexDirection: "column",
    paddingVertical: Responsive.heightPx(1),
    textAlign: "justify",
  },
});
