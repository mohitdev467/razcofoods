import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useGoBack from "../../helpers/Hooks/useGoBack";
import Icon from "react-native-vector-icons/Feather";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  registerSchema,
  resetPasswordSchema,
} from "../../helpers/Validations/ValidationSchema";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { handleResetPassword } from "../../services/UserServices/UserServices";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import Loader from "../../Components/CommonComponents/Loader";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { resetToken } = route?.params;
  const [formState, setFormState] = useState({
    newPassword: "",
    confirmPassword: "",
    isShowNewPassword: true,
    isShowConfirmPassword: true,
    loading: false,
    token: resetToken,
  });
  const [formErrors, setFormErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const goBack = useGoBack();

  const updateFormState = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (["newPassword", "confirmPassword"].includes(name)) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordReset = async () => {
    const payload = {
      newPassword: formState.newPassword,
      confirmPassword: formState.confirmPassword,
      token: formState.token,
    };
    try {
      await resetPasswordSchema.validate(formState, { abortEarly: false });
      updateFormState("loading", true);
      const result = await handleResetPassword(payload);
      if (result?.data?.status === 400) {
        successHandler(result.data.message);
        navigation.navigate(screenNames.LoginScreen);
      } else {
        errorHandler(result?.message || "Login failed");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        console.log("errors", errors);
        setFormErrors(errors);
      } else {
        console.log(err);
      }
    } finally {
      updateFormState("loading", false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backWrapper}>
        <Icon
          name="arrow-left"
          size={Responsive.font(7)}
          color={Colors.blackColor}
        />
      </TouchableOpacity>

      <View style={styles.imageWrapper}>
        <Image source={ImagePicker.logoImage} style={styles.image} />
      </View>

      <View style={styles.loginInputWrapper}>
        <CustomInputField
          name="newPassword"
          label="New Password"
          value={formState.newPassword}
          onTextChange={updateFormState}
          placeholder="Enter new password"
          error={!!formErrors.newPassword}
          helperText={formErrors.newPassword}
          leftIcon={
            <Icon
              name="lock"
              size={Responsive.font(5)}
              color={Colors.blueColorText}
            />
          }
          rightIcon={
            <Icon
              name={formState.isShowNewPassword ? "eye-off" : "eye"}
              size={Responsive.font(5)}
              color={Colors.blackColor}
            />
          }
          onRightIconPress={() =>
            updateFormState("isShowNewPassword", !formState.isShowNewPassword)
          }
          containerStyle={{ marginBottom: Responsive.heightPx(1.8) }}
          secureTextEntry={formState.isShowNewPassword}
          labelStyle={{ color: Colors.blackColor }}
          inputStyle={{ borderColor: Colors.blackColor }}
        />

        <View>
          <CustomInputField
            name="confirmPassword"
            label="Confirm Password"
            value={formState.confirmPassword}
            onTextChange={updateFormState}
            placeholder="Enter confirm password"
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            leftIcon={
              <Icon
                name="lock"
                size={Responsive.font(5)}
                color={Colors.blueColorText}
              />
            }
            rightIcon={
              <Icon
                name={formState.isShowConfirmPassword ? "eye-off" : "eye"}
                size={Responsive.font(5)}
                color={Colors.blackColor}
              />
            }
            onRightIconPress={() =>
              updateFormState(
                "isShowConfirmPassword",
                !formState.isShowConfirmPassword
              )
            }
            containerStyle={{ marginBottom: Responsive.heightPx(1.8) }}
            secureTextEntry={formState.isShowConfirmPassword}
            labelStyle={{ color: Colors.blackColor }}
            inputStyle={{ borderColor: Colors.blackColor }}
          />
        </View>

        {formState.loading ? (
          <Loader visible={formState.loading} />
        ) : (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={commonEntities.ResetPassword}
              onPress={handlePasswordReset}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  backWrapper: {
    marginVertical: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(3),
  },
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },
  buttonContainer: {
    marginVertical: Responsive.heightPx(3),
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: Responsive.heightPx(15),
    width: Responsive.widthPx(60),
  },
});
