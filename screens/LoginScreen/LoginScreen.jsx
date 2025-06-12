import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../helpers/theme/colors";
import useGoBack from "../../helpers/Hooks/useGoBack";
import Icon from "react-native-vector-icons/Feather";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import { useNavigation } from "@react-navigation/native";
import EmailIcon from "react-native-vector-icons/FontAwesome";
import DividerWithText from "../../Components/DividerTextComponent/DividerWithText";
import Loader from "../../Components/CommonComponents/Loader";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { loginSchema } from "../../helpers/Validations/ValidationSchema";
import { handleLoginUser } from "../../services/AuthServices/AuthServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useBackHandler from "../../helpers/Hooks/useBackHandler";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  useBackHandler();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isShowPassword: true,
    isRememberMeChecked: false,
    loading: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const { storeLoginData, loginData } = useAuthStorage();
  const navigation = useNavigation();

  const updateFormState = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (["email", "password"].includes(name)) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async () => {
    const payload = {
      email: formState.email,
      password: formState.password,
    };

    try {
      await loginSchema.validate(formState, { abortEarly: false });
      updateFormState("loading", true);
      const result = await handleLoginUser(payload);
      if (result?.data?.status === 200) {
        await storeLoginData(result?.data?.data);
        successHandler(result?.data?.message);
        navigation.navigate(screenNames.HomeScreen);
      } else {
        errorHandler(result?.data?.message || "Login failed");
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
        onPress={() => navigation.navigate(screenNames.HomeScreen)}
        style={styles.backWrapper}
      >
        <Icon
          name="arrow-left"
          size={Responsive.font(7)}
          color={Colors.blackColor}
        />
        <Text style={styles.backToHome}>Back to home</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust if you have header/navigation
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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

            <View>
              <CustomInputField
                name="password"
                label="Password"
                value={formState.password}
                onTextChange={updateFormState}
                placeholder="Enter Password"
                error={!formState.password}
                helperText={formErrors.password}
                leftIcon={
                  <Icon
                    name="lock"
                    size={Responsive.font(5)}
                    color={Colors.blueColorText}
                  />
                }
                rightIcon={
                  <Icon
                    name={formState.isShowPassword ? "eye-off" : "eye"}
                    size={Responsive.font(5)}
                    color={Colors.blackColor}
                  />
                }
                onRightIconPress={() =>
                  updateFormState("isShowPassword", !formState.isShowPassword)
                }
                containerStyle={{ marginBottom: Responsive.heightPx(1.8) }}
                secureTextEntry={formState.isShowPassword}
                labelStyle={{ color: Colors.blackColor }}
                inputStyle={{ borderColor: Colors.blackColor }}
              />
            </View>

            <TouchableOpacity
              style={styles.forgetPasswordWrapper}
              onPress={() =>
                navigation.navigate(screenNames.ForgotPasswordScreen)
              }
            >
              <Text style={styles.forgetPasswordText}>Forgot Password ?</Text>
            </TouchableOpacity>

            {formState.loading ? (
              <Loader visible={formState.loading} />
            ) : (
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  title={commonEntities.loginText}
                  onPress={handleLogin}
                />
              </View>
            )}
            <DividerWithText style={styles.dividerTextStyle} title={"OR"} />

            <View style={styles.alreadyAccountwrapper}>
              <Text style={styles.accountText}>
                {commonEntities.alreadyHaveAccountText}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(screenNames.RegisterScreen)}
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
                  {commonEntities.signUpText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    marginTop: Platform.OS === "ios" && Responsive.heightPx(-5)
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: Responsive.heightPx(15),
    width: Responsive.widthPx(60),
  },
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingTop: Responsive.heightPx(5),
    marginBottom: Responsive.heightPx(3),
  },

  buttonContainer: {
    marginVertical: Responsive.heightPx(4),
  },
  alreadyAccountwrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1.5),
    justifyContent: "center",
    marginTop: Responsive.heightPx(2),
  },
  accountText: {
    color: Colors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
  backToHome: {
    fontSize: Responsive.font(3.8),
    color: Colors.blackColor,
    fontFamily: "SemiBold",
  },

  forgetPasswordWrapper: {
    marginVertical: Responsive.heightPx(0),
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  forgetPasswordText: {
    color: Colors.primaryButtonColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
  dividerTextStyle: {
    width: Responsive.widthPx(90),
  },
});
