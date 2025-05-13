import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../helpers/theme/colors";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const RazcoFoodDescription = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={ImagePicker.logoImage} style={styles.image} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.textStyle}>
          {commonEntities.razcoAboutDescription}
        </Text>
      </View>
    </View>
  );
};

export default RazcoFoodDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    marginVertical: Responsive.heightPx(4),
  },

  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: Responsive.heightPx(10),
    width: Responsive.widthPx(40),
  },
  contentWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(5),
  },
  textStyle: {
    textAlign: "center",
    letterSpacing: Responsive.heightPx(0.2),
    paddingVertical: Responsive.heightPx(1),
    color: Colors.greyColor,
  },
});
