import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

const DividerWithText = ({ style, title }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Responsive.heightPx(2.9),
    marginTop: Responsive.heightPx(3.5),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.primaryButtonColor,
  },
  text: {
    marginHorizontal: Responsive.widthPx(5.5),
    fontSize: Responsive.font(4),
    color: Colors.primaryButtonColor,
    width: Responsive.widthPx(6),
  },
});

export default DividerWithText;
