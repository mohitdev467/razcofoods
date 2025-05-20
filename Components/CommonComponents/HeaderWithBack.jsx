import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import useGoBack from "../../helpers/Hooks/useGoBack";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const HeaderWithBack = ({ title }) => {
  const goBack = useGoBack();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <Icon name="arrow-left" style={styles.icon} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View></View>
    </View>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({
  header: {
    height: Responsive.heightPx(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Responsive.widthPx(4),
   marginTop:Platform.OS ==="ios" && Responsive.heightPx(-5)
    
  },
  headerTitle: {
    fontSize: Responsive.font(5),
    fontFamily: "Bold",
    marginRight: Responsive.widthPx(3),
  },
  icon: {
    fontSize: Responsive.font(7),
  },
});
