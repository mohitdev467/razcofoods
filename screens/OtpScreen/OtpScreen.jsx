import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  
} from "react-native";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import screenNames from "../../helpers/ScreenNames/screenNames";
import {
  handleVerifyOtp,
  handleVerifyOtpForgotPassword,
} from "../../services/AuthServices/AuthServices";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const goBack = useGoBack();
  const route = useRoute();
  const { email, isForgotPassword } = route?.params;
  const { storeLoginData } = useAuthStorage();

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text !== "" && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    const payload = {
      email: email,
      otp: fullOtp,
    };
    try {
      const result = isForgotPassword
        ? await handleVerifyOtpForgotPassword(payload)
        : await handleVerifyOtp(payload);
      if (result?.status === 201 || result?.data?.status === 200) {
        await storeLoginData(result?.data);
        successHandler(result?.message || result?.data?.message);
        if (!isForgotPassword) {
          navigation.navigate(screenNames.HomeScreen);
        } else {
          navigation.navigate(screenNames.ResetPasswordScreen, {
            resetToken: result?.data?.data?.token,
          });
        }
      } else {
        errorHandler(result?.message);
      }
    } catch (err) {
      console.error("Error in Otp api", err);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity onPress={goBack} style={styles.backWrapper}>
        <Icon
          name="arrow-left"
          size={Responsive.font(7)}
          color={Colors.blackColor}
        />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: null })}
      >
        <Image
          source={ImagePicker.logoImage}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.successText}>
          Account created successfully. Please check your email to verify your
          account
        </Text>

        <Text style={styles.otpLabel}>Enter OTP :</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              value={digit}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backWrapper: {
    marginVertical: Responsive.heightPx(1),
    marginHorizontal: Responsive.widthPx(3),
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: rw(5),
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  logo: {
    width: rw(55),
    height: rh(15),
    marginBottom: rh(4),
  },
  successText: {
    fontSize: rf(2),
    textAlign: "center",
    color: "#333",
    marginBottom: rh(3),
    paddingHorizontal: rw(5),
  },
  otpLabel: {
    fontSize: rf(2),
    marginBottom: rh(1),
    alignSelf: "center",
    marginBottom: rh(3),
    width: Responsive.widthPx(60),
    color: Colors.blackColor,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: rw(70),
    marginBottom: rh(4),
  },
  otpInput: {
    width: rw(13),
    height: rh(6),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: rf(2.5),
  },
  verifyButton: {
    backgroundColor: "#00B894",
    paddingVertical: rh(1.8),
    paddingHorizontal: rw(35),
    borderRadius: 8,
  },
  verifyText: {
    color: "#fff",
    fontSize: rf(2.2),
    fontWeight: "bold",
  },
});
