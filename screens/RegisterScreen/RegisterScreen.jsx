import {
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
import Loader from "../../Components/CommonComponents/Loader";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import PhoneNumberInput from "../../Components/CommonComponents/PhoneNumberInput";
import { genderDataOptions } from "../../constants/CommonContent/CommonContent";
import SelectDropdown from "../../Components/CommonComponents/SelectDropdown";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { registerSchema } from "../../helpers/Validations/ValidationSchema";
import { handleRegisterUser } from "../../services/AuthServices/AuthServices";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useCheckDuplicate from "../../helpers/Hooks/useCheckDuplicate";
import { useWishlist } from "../../helpers/Hooks/useWishlist";
import { useCart } from "../../helpers/Hooks/useCart";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    gender: null,
    isShowPassword: true,
    isRememberMeChecked: false,
    loading: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
  });
  const goBack = useGoBack();
  const navigation = useNavigation();
  const { checkEmail, checkPhone, emailError, phoneError } =
    useCheckDuplicate();
  const { clearWishlist } = useWishlist();
  const { clearCart } = useCart();

  const updateFormState = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (
      ["email", "password", "name", "password", "mobile", "gender"].includes(
        name
      )
    ) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async () => {
    const payload = {
      name: formState?.name,
      email: formState?.email,
      password: formState?.password,
      phone: formState?.mobile,
      gender: formState?.gender,
    };
    try {
      await registerSchema.validate(formState, { abortEarly: false });
      updateFormState("loading", true);
      const result = await handleRegisterUser(payload);
      if (result?.status === 201 || result?.status === 200) {
        successHandler(result.message);
        clearWishlist();
        clearCart();
        navigation.navigate(screenNames.OtpScreen, { email: formState?.email });
      } else {
        errorHandler(result?.error);
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
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
            <View style={styles.alreadyAccountwrapper}>
              <Text style={styles.accountText}>
                {commonEntities.alreadyRegistered}
              </Text>
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

          <View style={styles.loginInputWrapper}>
            <CustomInputField
              name="name"
              label="Name"
              value={formState.name}
              onTextChange={updateFormState}
              placeholder="Enter name"
              error={!formState.name}
              helperText={formErrors.name}
              leftIcon={
                <Icon
                  name="user"
                  size={Responsive.font(5)}
                  color={Colors.blueColorText}
                />
              }
              onLeftIconPress={() => console.log("Icon pressed!")}
              containerStyle={styles.inputContainerStyle}
              labelStyle={{ color: Colors.blackColor }}
              inputStyle={{ borderColor: Colors.blackColor }}
            />

            <CustomInputField
              name="email"
              label="Email"
              value={formState.email}
              onTextChange={(name, value) => {
                updateFormState(name, value);
                checkEmail(value);
              }}
              placeholder="Enter email"
              error={!!formErrors.email || !!emailError}
              helperText={formErrors.email || emailError}
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
                error={!!formErrors.password}
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

            <PhoneNumberInput
              onChangePhone={(value) => {
                updateFormState("mobile", value);
                checkPhone(value);
              }}
              label={"Phone number"}
              error={!!formErrors.mobile || !!phoneError}
              errorMessage={formErrors.mobile || phoneError}
            />

            <SelectDropdown
              options={genderDataOptions}
              label={"Gender"}
              value={formState.gender}
              placeholder={"Select gender"}
              onChangeValue={(value) => updateFormState("gender", value)}
              dropdownStyle={styles.dropdownStyle}
              error={!!formErrors.gender}
              errorMessage={formErrors.gender}
              dropdownContainerStyle={styles.dropdownStyleContainer}
              selectContainerStyle={styles.selectContainerStyle}

            />

            {formState.loading ? (
              <Loader visible={formState.loading} />
            ) : (
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  title={commonEntities.signUpText}
                  onPress={handleLogin}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  backWrapper: {
    marginVertical: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(3),
    marginTop: Platform.OS === "ios" && Responsive.heightPx(-5)

  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: Responsive.heightPx(8),
    width: Responsive.widthPx(40),
  },
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingTop: Responsive.heightPx(3),
    marginBottom: Responsive.heightPx(3),
  },

  buttonContainer: {
    marginTop: Responsive.heightPx(4),
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
  dropdownStyle: {
    borderWidth: 1,
    borderColor: Colors.blackColor,
    height:Responsive.heightPx(7)
  },
  
});
