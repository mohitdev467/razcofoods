import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { returnPolicyContent } from "../../constants/StaticContent/ReturnPolicyContent";
import { SafeAreaView } from "react-native-safe-area-context";

const ReturnPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Return Policy"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.privacyPolicyBg} style={styles.image} />
          <Text style={styles.text}>Return Policy</Text>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>
            At{" "}
            <Text style={{ fontFamily: "Bold", color: "grey" }}>
              Raczo Foods
            </Text>
            , we value our customers and strive to provide the best quality
            products. If you are not satisfied with your purchase, we offer a
            hassle-free return and refund policy.
          </Text>

          <Text
            style={[
              styles.content,
              { fontFamily: "Bold", fontSize: Responsive.font(4.5) },
            ]}
          >
            {returnPolicyContent.text2}
          </Text>
          {returnPolicyContent.bullets1 &&
            returnPolicyContent.bullets1.map((bullet, i) => (
              <Text key={i} style={styles.content}>
                • {bullet}
              </Text>
            ))}

          <Text
            style={[
              styles.content,
              { fontFamily: "Bold", fontSize: Responsive.font(4.5) },
            ]}
          >
            {returnPolicyContent.text3}
          </Text>
          <Text style={styles.content}>{returnPolicyContent.text4}</Text>
          {returnPolicyContent.bullets2 &&
            returnPolicyContent.bullets2.map((bullet, i) => (
              <Text key={i} style={styles.content}>
                • {bullet}
              </Text>
            ))}
          <Text
            style={[
              styles.content,
              { fontFamily: "Bold", fontSize: Responsive.font(4.5) },
            ]}
          >
            {returnPolicyContent.text5}
          </Text>
          {returnPolicyContent.bullets3 &&
            returnPolicyContent.bullets3.map((bullet, i) => (
              <Text key={i} style={styles.content}>
                • {bullet}
              </Text>
            ))}

          <Text
            style={[
              styles.content,
              { fontFamily: "Bold", fontSize: Responsive.font(4.5) },
            ]}
          >
            {returnPolicyContent.text6}
          </Text>
          <Text style={styles.content}>
            We only replace items if they are defective or damaged. If you need
            to exchange an item, contact us at{" "}
            <Text style={{ fontFamily: "Bold" }}>support@raczofoods.com.</Text>
          </Text>
          <Text
            style={[
              styles.content,
              { fontFamily: "Bold", fontSize: Responsive.font(4.5) },
            ]}
          >
            {returnPolicyContent.text7}
          </Text>
          <Text style={styles.content}>
            If you have any questions about our return policy, feel free to
            reach out to us at{" "}
            <Text style={{ fontFamily: "Bold" }}>support@raczofoods.com.</Text>{" "}
            or call our customer service at{" "}
            <Text style={{ fontFamily: "Bold" }}>+1 559-562-5900.</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReturnPolicyScreen;

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
