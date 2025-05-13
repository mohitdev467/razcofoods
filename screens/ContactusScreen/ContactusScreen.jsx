import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { helpSupportContent } from "../../constants/StaticContent/HelpSupportContent";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import PhoneNumberInput from "../../Components/CommonComponents/PhoneNumberInput";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { contactUsFormValidationSchema } from "../../helpers/Validations/ValidationSchema";
import {
  handleUpdateSend,
  UpdateUserProfile,
} from "../../services/UserServices/UserServices";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactusScreen = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    mobile: "",
    visible: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const updateFormState = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleChangeText = (field, value) => {
    updateFormState(field, value);
  };

  const handlePhoneChange = (val) => {
    updateFormState("mobile", val);
  };

  const handleSubmit = async () => {
    try {
      await contactUsFormValidationSchema.validate(formState, {
        abortEarly: false,
      });

      console.log("countryccccc", formState.mobile);
      const payload = {
        name: formState?.name,
        email: formState?.email,
        message: formState?.message,
        countryCode: "+91",
        phone: formState?.mobile,
      };

      const data = await handleUpdateSend(payload);
      console.log("dataaaaaaa", data);
      if (data?.status === 201) {
        successHandler(data?.message);
      }
    } catch (validationErrors) {
      if (validationErrors.inner) {
        const errors = {};
        validationErrors.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Contact us"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.contactBanner} style={styles.image} />
          <Text style={styles.text}>Need Support? We're Here to Help!</Text>
          <Text style={styles.text2}>
            Our team is dedicated to providing you with the best support. We’re
            passionate about creating well-designed products that enhance your
            workflow and make your experience seamless.
          </Text>
        </View>

        <View style={styles.contentWrapper}>
          <Text
            style={[
              styles.content,
              { fontSize: Responsive.font(5), color: Colors.blackColor },
            ]}
          >
            {helpSupportContent.text1}
          </Text>
          <Text style={styles.content}>{helpSupportContent.text2}</Text>
        </View>

        <View style={styles.loginInputWrapper}>
          <CustomInputField
            name="name"
            label="Full Name"
            value={formState.name}
            onTextChange={handleChangeText}
            placeholder="Enter Full Name"
            error={!!formErrors.name}
            helperText={formErrors.name}
            containerStyle={styles.containerStyle}
            mainContainerStyle={styles.mainContainer}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
          />

          <CustomInputField
            name="email"
            label="Email"
            value={formState.email}
            onTextChange={handleChangeText}
            placeholder="Enter Email"
            error={!!formErrors.email}
            helperText={formErrors.email}
            containerStyle={styles.containerStyle}
            mainContainerStyle={styles.mainContainer}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
          />

          <PhoneNumberInput
            label="Phone Number"
            defaultValue={formState.mobile}
            defaultCode={formState.countryCode}
            onChangePhone={handlePhoneChange}
            error={!!formErrors.mobile}
            errorMessage={formErrors.mobile}
          />

          <CustomInputField
            name="message"
            label="Message"
            value={formState.message}
            onTextChange={handleChangeText}
            placeholder="Briefly describe..."
            error={!!formErrors.message}
            helperText={formErrors.message}
            containerStyle={styles.containerStyle}
            mainContainerStyle={styles.mainContainer}
            labelStyle={[styles.labelStyle, { alignSelf: "flex-start" }]}
            inputStyle={styles.inputStyle}
          />

          <ButtonComponent
            title={"Send Message"}
            onPress={handleSubmit}
            style={styles.buttonStyle}
          />
        </View>

        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  imageWrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },

  image: {
    height: Responsive.heightPx(20),
    width: Responsive.widthPx(110),
    resizeMode: "stretch",
  },
  text: {
    position: "absolute",
    top: Responsive.heightPx(1),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
    width: Responsive.widthPx(40),
    marginLeft: Responsive.widthPx(3),
  },
  text2: {
    position: "absolute",
    top: Responsive.heightPx(9),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3),
    width: Responsive.widthPx(65),
    marginLeft: Responsive.widthPx(3),
  },

  headingStyle: {
    fontSize: Responsive.font(5),
    color: Colors.blackColor,
    fontFamily: "SemiBold",
  },
  contentWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    paddingVertical: Responsive.heightPx(3),
  },
  content: {
    fontSize: Responsive.font(4),
    flexDirection: "column",
    paddingVertical: Responsive.heightPx(1),
    textAlign: "justify",
    color: "grey",
  },

  location: {
    fontSize: Responsive.font(3.5),
    color: "grey",
    fontFamily: "SemiBold",
    marginTop: Responsive.heightPx(0.5),
  },
  locationWrapper: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(2),
  },

  containerStyle: {
    marginBottom: Responsive.heightPx(1),
    borderRadius: 20,
  },

  labelStyle: {
    color: Colors.secondaryBlackColor,
    fontSize: Responsive.font(3.5),
    marginBottom: Responsive.heightPx(1),
  },
  inputStyle: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Colors.skyBlueColor,
    height: Responsive.heightPx(7),
    borderRadius: 10,
  },
  buttonStyle: {
    marginBottom: Responsive.heightPx(4),
    marginVertical: Responsive.heightPx(4),
  },
  dropdownStyle: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    paddingVertical: Responsive.heightPx(2),
    borderRadius: 10,
  },
  selectContainerStyle: {
    marginVertical: Responsive.heightPx(2),
    backgroundColor: Colors.whiteColor,
  },
  errorText: {
    color: "red",
    marginTop: Responsive.heightPx(1),
    fontSize: Responsive.font(3),
  },
});
