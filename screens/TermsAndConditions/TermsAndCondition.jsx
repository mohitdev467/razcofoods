import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { TermsAndConditionContent } from "../../constants/StaticContent/TermsConditionsContent";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsAndCondition = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Terms & Conditions"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.privacyPolicyBg} style={styles.image} />
          <Text style={styles.text}>Terms & Conditions</Text>
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.content}>
            {TermsAndConditionContent.secondHeading}
          </Text>
          <Text style={styles.content}>{TermsAndConditionContent.text1}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text2}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text3}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text4}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text5}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text6}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text7}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text8}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text9}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text10}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text11}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text12}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text13}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text14}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text15}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text16}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text17}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text18}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text19}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text20}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text21}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text22}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text23}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text24}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text25}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text26}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text27}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text28}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text29}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text30}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text31}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text32}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text33}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text34}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text35}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text36}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text37}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text38}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text39}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text40}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text41}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text42}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text43}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text44}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text45}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text46}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text47}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text48}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text49}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text50}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text51}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text52}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text53}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text54}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text55}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text56}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text57}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text58}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text59}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text60}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text61}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text62}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text63}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text64}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text65}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text66}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text67}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text68}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text69}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text70}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text71}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text72}</Text>
          <Text style={styles.content}>{TermsAndConditionContent.text73}</Text>
        </View>
        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndCondition;

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
    color: "grey",
  },
});
