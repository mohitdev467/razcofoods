import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Loader from "../CommonComponents/Loader";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import { CommonActions, useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";

const LogoutModal = ({ setIsLoginSignupModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { clearLoginData } = useAuthStorage();
  const navigation = useNavigation();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screenNames.LoginScreen }],
        })
      );
      successHandler(commonContent.userLogoutSuccess);
    } catch (error) {
      errorHandler(commonContent.userLogoutError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.modalText}>
        {commonEntities.areYouSureWantToLogout}
      </Text>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setIsLoginSignupModal(false)}
        >
          <Text style={styles.cancelButtonText}>No</Text>
        </TouchableOpacity>

        {isLoading ? (
          <Loader visible={isLoading} />
        ) : (
          <TouchableOpacity
            style={[styles.modalButton, styles.confirmButton]}
            onPress={handleLogout}
          >
            <Text style={styles.confirmButtonText}>Yes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  modalText: {
    textAlign: "center",
    fontSize: Responsive.font(3.8),
    fontFamily: "SemiBold",
    marginVertical: Responsive.heightPx(2),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Responsive.heightPx(2),
    height: Responsive.heightPx(6),
  },
  modalButton: {
    paddingVertical: Responsive.heightPx(1.5),
    paddingHorizontal: Responsive.widthPx(10),
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: Colors.errorColor,
  },
  confirmButton: {
    backgroundColor: Colors.primaryButtonColor,
  },
  cancelButtonText: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
  },
  confirmButtonText: {
    color: Colors.whiteColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
});
