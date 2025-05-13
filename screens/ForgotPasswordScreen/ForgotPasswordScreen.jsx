import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import EmailIcon from "react-native-vector-icons/FontAwesome";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import { forgotPasswordSchema } from "../../helpers/Validations/ValidationSchema";
import { handleForgetPassword } from "../../services/UserServices/UserServices";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Loader from "../../Components/CommonComponents/Loader";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import DividerWithText from "../../Components/DividerTextComponent/DividerWithText";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [formState, setFormState] = useState({
    email: "",
    loading: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const updateFormState = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (["email"].includes(name)) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleForget = async () => {
    const payload = {
      email: formState.email,
    };

    try {
      await forgotPasswordSchema.validate(formState, {
        abortEarly: false,
      });
      updateFormState("loading", true);
      const result = await handleForgetPassword(payload);
      if (result?.status === 200) {
        successHandler(result?.message);
        navigation.navigate(screenNames.OtpScreen, {
          email: formState?.email,
          isForgotPassword: true,
        });
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
      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.LoginScreen)}
        style={styles.backWrapper}
      >
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
          name="email"
          label="Email"
          value={formState.email}
          onTextChange={updateFormState}
          placeholder="Enter email"
          error={!formState.email}
          helperText={formErrors.email}
          leftIcon={
            <EmailIcon
              name="envelope-o"
              size={Responsive.font(5)}
              color={Colors.blueColorText}
            />
          }
          onLeftIconPress={() => console.log("Icon pressed!")}
          containerStyle={styles.inputContainerStyle}
          labelStyle={{ color: Colors.blackColor }}
          inputStyle={{ borderColor: Colors.blackColor }}
        />

        {formState.loading ? (
          <Loader visible={formState.loading} />
        ) : (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={commonEntities.ResetPassword}
              onPress={handleForget}
            />
          </View>
        )}

        <DividerWithText style={styles.dividerTextStyle} title={"OR"} />

        <View style={styles.alreadyAccountwrapper}>
          <Text style={styles.accountText}>Back to</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.LoginScreen)}
          >
            <Text
              style={[
                styles.accountText,
                {
                  color: Colors.primaryButtonColor,
                  textDecorationLine: "underline",
                },
              ]}
            >
              {commonEntities.loginText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  backWrapper: {
    marginVertical: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(3),
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(2),
  },
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingTop: Responsive.heightPx(5),
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

  alreadyAccountwrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1.5),
    justifyContent: "center",
    marginTop: Responsive.heightPx(1),
  },
  accountText: {
    color: Colors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.2),
  },
});
