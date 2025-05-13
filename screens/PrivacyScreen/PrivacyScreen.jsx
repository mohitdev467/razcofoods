import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { Image } from "react-native";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { privacyContent } from "../../constants/StaticContent/PrivacyPolicyContent";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Privacy Policy"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.privacyPolicyBg} style={styles.image} />
          <Text style={styles.text}>Privacy Policy</Text>
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{privacyContent.secondHeading}</Text>
          <Text style={styles.content}>{privacyContent.date}</Text>
          <Text style={styles.content}>{privacyContent.text1}</Text>
          <Text style={styles.content}>{privacyContent.text2}</Text>
          <Text style={styles.content}>{privacyContent.text3}</Text>
          <Text style={styles.content}>{privacyContent.text4}</Text>
          <Text style={styles.content}>{privacyContent.text5}</Text>
          <Text style={styles.content}>{privacyContent.text6}</Text>
          <Text style={styles.content}>{privacyContent.text7}</Text>
          <Text style={styles.content}>{privacyContent.text8}</Text>
          <Text style={styles.content}>{privacyContent.text9}</Text>
          <Text style={styles.content}>{privacyContent.text10}</Text>
          <Text style={styles.content}>{privacyContent.text11}</Text>
          <Text style={styles.content}>{privacyContent.text12}</Text>
          <Text style={styles.content}>{privacyContent.text13}</Text>
          <Text style={styles.content}>{privacyContent.text14}</Text>
          <Text style={styles.content}>{privacyContent.text15}</Text>
          <Text style={styles.content}>{privacyContent.text16}</Text>
          <Text style={styles.content}>{privacyContent.text17}</Text>
          <Text style={styles.content}>{privacyContent.text18}</Text>
          <Text style={styles.content}>{privacyContent.text19}</Text>
          <Text style={styles.content}>{privacyContent.text20}</Text>
          <Text style={styles.content}>{privacyContent.text21}</Text>
          <Text style={styles.content}>{privacyContent.text22}</Text>
          <Text style={styles.content}>{privacyContent.text23}</Text>
          <Text style={styles.content}>{privacyContent.text24}</Text>
          <Text style={styles.content}>{privacyContent.text25}</Text>
          <Text style={styles.content}>{privacyContent.text26}</Text>
          <Text style={styles.content}>{privacyContent.text27}</Text>
          <Text style={styles.content}>{privacyContent.text28}</Text>
          <Text style={styles.content}>{privacyContent.text29}</Text>
          <Text style={styles.content}>{privacyContent.text30}</Text>
          <Text style={styles.content}>{privacyContent.text31}</Text>
          <Text style={styles.content}>{privacyContent.text32}</Text>
          <Text style={styles.content}>{privacyContent.text33}</Text>
          <Text style={styles.content}>{privacyContent.text34}</Text>
          <Text style={styles.content}>{privacyContent.text34}</Text>
          <Text style={styles.content}>{privacyContent.text35}</Text>
          <Text style={styles.content}>{privacyContent.text36}</Text>
          <Text style={styles.content}>{privacyContent.text37}</Text>
          <Text style={styles.content}>{privacyContent.text38}</Text>
          <Text style={styles.content}>{privacyContent.text39}</Text>
          <Text style={styles.content}>{privacyContent.text40}</Text>
          <Text style={styles.content}>{privacyContent.text41}</Text>
          <Text style={styles.content}>{privacyContent.text42}</Text>
          <Text style={styles.content}>{privacyContent.text43}</Text>
          <Text style={styles.content}>{privacyContent.text44}</Text>
          <Text style={styles.content}>{privacyContent.text45}</Text>
          <Text style={styles.content}>{privacyContent.text46}</Text>
          <Text style={styles.content}>{privacyContent.text47}</Text>
          <Text style={styles.content}>{privacyContent.text48}</Text>
          <Text style={styles.content}>{privacyContent.text49}</Text>
          <Text style={styles.content}>{privacyContent.text50}</Text>
          <Text style={styles.content}>{privacyContent.text51}</Text>
          <Text style={styles.content}>{privacyContent.text52}</Text>
          <Text style={styles.content}>{privacyContent.text53}</Text>
          <Text style={styles.content}>{privacyContent.text54}</Text>
          <Text style={styles.content}>{privacyContent.text55}</Text>
          <Text style={styles.content}>{privacyContent.text56}</Text>
          <Text style={styles.content}>{privacyContent.text57}</Text>
          <Text style={styles.content}>{privacyContent.text58}</Text>
          <Text style={styles.content}>{privacyContent.text59}</Text>
          <Text style={styles.content}>{privacyContent.text60}</Text>
          <Text style={styles.content}>{privacyContent.text61}</Text>
          <Text style={styles.content}>{privacyContent.text62}</Text>
          <Text style={styles.content}>{privacyContent.text63}</Text>
          <Text style={styles.content}>{privacyContent.text64}</Text>
          <Text style={styles.content}>{privacyContent.text65}</Text>
          <Text style={styles.content}>{privacyContent.text66}</Text>
          <Text style={styles.content}>{privacyContent.text67}</Text>
          <Text style={styles.content}>{privacyContent.text68}</Text>
          <Text style={styles.content}>{privacyContent.text69}</Text>
          <Text style={styles.content}>{privacyContent.text70}</Text>
          <Text style={styles.content}>{privacyContent.text71}</Text>
          <Text style={styles.content}>{privacyContent.text72}</Text>
          <Text style={styles.content}>{privacyContent.text73}</Text>
          <Text style={styles.content}>{privacyContent.text74}</Text>
          <Text style={styles.content}>{privacyContent.text75}</Text>
          <Text style={styles.content}>{privacyContent.text76}</Text>
          <Text style={styles.content}>{privacyContent.text77}</Text>
          <Text style={styles.content}>{privacyContent.text78}</Text>
          <Text style={styles.content}>{privacyContent.text79}</Text>
          <Text style={styles.content}>{privacyContent.text80}</Text>
          <Text style={styles.content}>{privacyContent.text81}</Text>
          <Text style={styles.content}>{privacyContent.text82}</Text>
          <Text style={styles.content}>{privacyContent.text83}</Text>
          <Text style={styles.content}>{privacyContent.text84}</Text>
          <Text style={styles.content}>{privacyContent.text85}</Text>
          <Text style={styles.content}>{privacyContent.text86}</Text>
          <Text style={styles.content}>{privacyContent.text87}</Text>
          <Text style={styles.content}>{privacyContent.text88}</Text>
          <Text style={styles.content}>{privacyContent.text89}</Text>
          <Text style={styles.content}>{privacyContent.text90}</Text>
          <Text style={styles.content}>{privacyContent.text91}</Text>
          <Text style={styles.content}>{privacyContent.text92}</Text>
          <Text style={styles.content}>{privacyContent.text93}</Text>
          <Text style={styles.content}>{privacyContent.text94}</Text>
          <Text style={styles.content}>{privacyContent.text95}</Text>
          <Text style={styles.content}>{privacyContent.text96}</Text>
          <Text style={styles.content}>{privacyContent.text97}</Text>
          <Text style={styles.content}>{privacyContent.text98}</Text>
          <Text style={styles.content}>{privacyContent.text99}</Text>
          <Text style={styles.content}>{privacyContent.text100}</Text>
          <Text style={styles.content}>{privacyContent.text101}</Text>
          <Text style={styles.content}>{privacyContent.text102}</Text>
          <Text style={styles.content}>{privacyContent.text103}</Text>
          <Text style={styles.content}>{privacyContent.text104}</Text>
          <Text style={styles.content}>{privacyContent.text105}</Text>
          <Text style={styles.content}>{privacyContent.text106}</Text>
          <Text style={styles.content}>{privacyContent.text107}</Text>
          <Text style={styles.content}>{privacyContent.text108}</Text>
          <Text style={styles.content}>{privacyContent.text109}</Text>
          <Text style={styles.content}>{privacyContent.text110}</Text>
          <Text style={styles.content}>{privacyContent.text111}</Text>
          <Text style={styles.content}>{privacyContent.text112}</Text>
          <Text style={styles.content}>{privacyContent.text113}</Text>
          <Text style={styles.content}>{privacyContent.text114}</Text>
          <Text style={styles.content}>{privacyContent.text115}</Text>
          <Text style={styles.content}>{privacyContent.text116}</Text>
          <Text style={styles.content}>{privacyContent.text117}</Text>
          <Text style={styles.content}>{privacyContent.text118}</Text>
          <Text style={styles.content}>{privacyContent.text119}</Text>
          <Text style={styles.content}>{privacyContent.text120}</Text>
          <Text style={styles.content}>{privacyContent.text121}</Text>
          <Text style={styles.content}>{privacyContent.text122}</Text>
          <Text style={styles.content}>{privacyContent.text123}</Text>
          <Text style={styles.content}>{privacyContent.text124}</Text>
          <Text style={styles.content}>{privacyContent.text125}</Text>
          <Text style={styles.content}>{privacyContent.text126}</Text>
          <Text style={styles.content}>{privacyContent.text127}</Text>
          <Text style={styles.content}>{privacyContent.text128}</Text>
          <Text style={styles.content}>{privacyContent.text129}</Text>
          <Text style={styles.content}>{privacyContent.text130}</Text>
          <Text style={styles.content}>{privacyContent.text131}</Text>
          <Text style={styles.content}>{privacyContent.text132}</Text>
          <Text style={styles.content}>{privacyContent.text133}</Text>
          <Text style={styles.content}>{privacyContent.text134}</Text>
          <Text style={styles.content}>{privacyContent.text135}</Text>
          <Text style={styles.content}>{privacyContent.text136}</Text>
          <Text style={styles.content}>{privacyContent.text137}</Text>
          <Text style={styles.content}>{privacyContent.text138}</Text>
          <Text style={styles.content}>{privacyContent.text138}</Text>
          <Text style={styles.content}>{privacyContent.text140}</Text>
          <Text style={styles.content}>{privacyContent.text141}</Text>
          <Text style={styles.content}>{privacyContent.text142}</Text>
          <Text style={styles.content}>{privacyContent.text143}</Text>
          <Text style={styles.content}>{privacyContent.text144}</Text>
          <Text style={styles.content}>{privacyContent.text145}</Text>
          <Text style={styles.content}>{privacyContent.text146}</Text>
          <Text style={styles.content}>{privacyContent.text147}</Text>
          <Text style={styles.content}>{privacyContent.text148}</Text>
          <Text style={styles.content}>{privacyContent.text149}</Text>
          <Text style={styles.content}>{privacyContent.text150}</Text>
          <Text style={styles.content}>{privacyContent.text151}</Text>
        </View>
        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

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
