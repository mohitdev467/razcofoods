import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { helpSupportContent } from "../../constants/StaticContent/HelpSupportContent";
import Icon from "react-native-vector-icons/Feather";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpSupportScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Help & Support"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.contactBanner} style={styles.image} />
          <Text style={styles.text}>Need Support? We're Here to Help!</Text>
          <Text style={styles.text2}>
            Our team is dedicated to providing you with the best support. We’re
            passionate about creating well-designed products that enhance your
            workflow and make your experience seamless.
          </Text>
        </View>

        <View style={styles.contentWrapper}>
          <Text
            style={[
              styles.content,
              { fontSize: Responsive.font(5), color: Colors.blackColor },
            ]}
          >
            {helpSupportContent.text1}
          </Text>
          <Text style={styles.content}>{helpSupportContent.text2}</Text>
        </View>

        <View style={styles.locationWrapper}>
          <Icon
            name="map-pin"
            size={Responsive.font(7)}
            color={Colors.blackColor}
          />
          <Text style={[styles.location, { color: Colors.blackColor }]}>
            Office Location
          </Text>
          <Text style={styles.location}>California, United States</Text>
        </View>
        <View
          style={[
            styles.locationWrapper,
            { marginTop: Responsive.heightPx(4) },
          ]}
        >
          <Icon
            name="phone"
            size={Responsive.font(7)}
            color={Colors.blackColor}
          />
          <Text style={[styles.location, { color: Colors.blackColor }]}>
            Call us anytime
          </Text>
          <Text style={styles.location}>+1 559-562-5900</Text>
        </View>
        <View
          style={[
            styles.locationWrapper,
            {
              marginTop: Responsive.heightPx(4),
              marginBottom: Responsive.heightPx(4),
            },
          ]}
        >
          <Icon
            name="mail"
            size={Responsive.font(7)}
            color={Colors.blackColor}
          />
          <Text style={[styles.location, { color: Colors.blackColor }]}>
            Send Mail
          </Text>
          <Text style={styles.location}>coustmercare@razcofoods.net</Text>
        </View>

        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  imageWrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },

  image: {
    height: Responsive.heightPx(20),
    width: Responsive.widthPx(110),
    resizeMode: "stretch",
  },
  text: {
    position: "absolute",
    top: Responsive.heightPx(1),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
    width: Responsive.widthPx(40),
    marginLeft: Responsive.widthPx(3),
  },
  text2: {
    position: "absolute",
    top: Responsive.heightPx(9),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3),
    width: Responsive.widthPx(65),
    marginLeft: Responsive.widthPx(3),
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
    color: "grey",
  },

  location: {
    fontSize: Responsive.font(3.5),
    color: "grey",
    fontFamily: "SemiBold",
    marginTop: Responsive.heightPx(0.5),
  },
  locationWrapper: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
