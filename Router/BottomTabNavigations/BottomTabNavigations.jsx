import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,

} from "react-native";
import _ from "lodash";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";
import { bottomTabUtils } from "../../Utilities/BottomTabUtils/BottomTabUtils";
import { useCart } from "../../helpers/Hooks/useCart";


const BottomTabNavigations = ({ props, loginData }) => {

  const onPressDrawer = (key) => {
    props?.navigation?.jumpTo(key);
  };
  const { getTotalItems } = useCart();
  const total = getTotalItems();
  return (
    <View
      style={{
        backgroundColor: Colors.whiteColor,
      }}

    >
      <View style={styles.container}>
        {bottomTabUtils &&
          bottomTabUtils.map((item, index) => {
            const isFocused = props.state.index === index;

            return (
              <TouchableOpacity
                style={styles.container1}
                onPress={() => onPressDrawer(item.key)}
                key={`tab-${index}`}
              >
                <View style={styles.imageView}>
                  {item.name === "My Bucket" && (
                    <View style={styles.cartItemWrapper}>
                      <Text style={styles.textStyle}>{total || 0}</Text>
                    </View>
                  )}
                  {isFocused && <View style={styles.topBorder}></View>}
                  <Icon
                    name={item.icon}
                    style={styles.personImage}
                    color={
                      isFocused ? Colors.primaryButtonColor : Colors.blackColor
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.chatText,
                    { color: isFocused ? item.color : Colors.blackColor },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>

    </View>
  );
};

export default BottomTabNavigations;

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.05,
  },

  container: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    backgroundColor: Colors.whiteColor,
    elevation: 5,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingTop: 0,
    height:Platform.OS === "android" ? Responsive.heightPx(12) : Responsive.heightPx(8),
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
  },
  chatText: {
    fontSize: Responsive.font(3),
    fontFamily: "SemiBold",
  },
  imageView: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  personImage: {
    fontSize: Responsive.font(5.5),
    paddingTop: Responsive.heightPx(1),
  },

  topBorder: {
    position: "absolute",
    height: Responsive.heightPx(1),
    backgroundColor: Colors.primaryButtonColor,
    width: Responsive.widthPx(10),
    borderRadius: 10,
    top: -4,
    zIndex: 99,
  },
  cartItemWrapper: {
    height: Responsive.heightPx(2.5),
    width: Responsive.widthPx(5),
    position: "absolute",
    backgroundColor: Colors.primaryButtonColor,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    borderRadius: 100,
    top: 5,
    zIndex: 9999,
  },
  textStyle: {
    fontSize: Responsive.font(3),
    color: Colors.whiteColor,
    textAlign: "center",
  },
});
