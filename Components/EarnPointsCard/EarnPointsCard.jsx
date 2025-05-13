import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";

const EarnPointsCard = () => {
  const navigation = useNavigation();
  const { loginData } = useAuthStorage();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Earn Points Every Time You Shop Online!</Text>

      <Text style={styles.description}>
        Get rewarded for your grocery shopping. Earn points on every purchase
        and redeem them for exciting discounts!
      </Text>

      {!loginData?.verified ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screenNames.RegisterScreen)}
        >
          <Text style={styles.buttonText}>Register Now</Text>
          <Icon
            name="arrow-right"
            size={Responsive.font(7)}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    paddingVertical: rh(4),
    paddingHorizontal: rw(8),
    borderRadius: rw(2),
    alignItems: "center",
    justifyContent: "center",
    margin: rw(2),
  },
  title: {
    fontSize: rf(2.6),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: rh(2),
    color: "#000",
  },
  description: {
    fontSize: rf(2),
    textAlign: "center",
    marginBottom: rh(3),
    color: "#555",
  },
  button: {
    backgroundColor: "#00c292",
    paddingVertical: rh(1.5),
    paddingHorizontal: rw(6),
    borderRadius: rw(10),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: rf(2),
    fontWeight: "bold",
    marginRight: rw(1),
  },
  arrow: {
    color: "#fff",
    fontSize: rf(2.2),
    fontWeight: "bold",
    marginBottom: rh(0.5),
  },
});

export default EarnPointsCard;
