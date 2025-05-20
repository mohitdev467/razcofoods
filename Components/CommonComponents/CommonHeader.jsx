import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames.js";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker.jsx";
import { Colors } from "../../helpers/theme/colors";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities.jsx";
import LogoutModal from "../LogoutModal/LogoutModal.jsx";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage.jsx";
import ModalComponent from "./ModalComponent.jsx";

const CommonHeader = () => {
  const navigation = useNavigation();
  const [isLoginSignupModal, setIsLoginSignupModal] = useState(false);
  const { loginData } = useAuthStorage();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.HomeScreen)}
        >
          <View style={styles.logoWrapper}>
            <Image source={ImagePicker.logoImage} style={styles.logoImage} />
          </View>
        </TouchableOpacity>
        {loginData?.verified ? (
          <TouchableOpacity
            style={styles.logoutWrapper}
            onPress={() => setIsLoginSignupModal(true)}
          >
            <Image
              source={
                typeof loginData?.profileImage === "string"
                  ? { uri: loginData.profileImage }
                  : ImagePicker.PlaceholderImage
              }
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginSignupWrapper}
            onPress={() => navigation.navigate(screenNames.LoginScreen)}
          >
            <Text style={styles.loginText}>
              {`${commonEntities.login} / ${commonEntities.signup}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <ModalComponent
          isVisible={isLoginSignupModal}
          onClose={() => setIsLoginSignupModal(false)}
          title={commonEntities.logoutText}
        >
          <LogoutModal setIsLoginSignupModal={setIsLoginSignupModal} />
        </ModalComponent>
      </View>
    </>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(0.2),
    paddingHorizontal: Responsive.widthPx(3),
    marginTop:Platform.OS ==="ios" && Responsive.heightPx(-5)
  },
  logoWrapper: {
    height: Responsive.heightPx(7),
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1),
  },

  logoImage: {
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(25),
  },

  notificationIcon: {
    fontSize: Responsive.font(6.5),
    color: Colors.blackColor,
  },

  loginSignupWrapper: {
    backgroundColor: Colors.primaryButtonColor,
    paddingHorizontal: Responsive.widthPx(3),
    paddingVertical: Responsive.heightPx(1.3),
    borderRadius: 15,
    marginTop: Responsive.heightPx(0.5),
    elevation: 5,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
  },
  loginText: {
    color: Colors.whiteColor,
    fontFamily: "Bold",
    fontSize: Responsive.font(3),
  },
  logoutIcon: {
    fontSize: Responsive.font(5),
    paddingHorizontal: Responsive.widthPx(3.5),
    paddingVertical: Responsive.heightPx(1.4),
    color: Colors.whiteColor,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    resizeMode: "contain",
    height:Responsive.heightPx(6),
    width:Responsive.widthPx(14)
  },

  logoutWrapper: {
    elevation: 5,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(12),
  },
});
