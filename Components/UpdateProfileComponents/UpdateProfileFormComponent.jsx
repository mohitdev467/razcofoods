import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { profileValidationsSchema } from "../../helpers/Validations/ValidationSchema";
import CustomInputField from "../CommonComponents/CustomInputField";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import SelectDropdown from "../CommonComponents/SelectDropdown";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import PhoneNumberInput from "../CommonComponents/PhoneNumberInput";
import {
  getUserById,
  UpdateUserProfile,
} from "../../services/UserServices/UserServices";

const UpdateProfileFormComponent = ({ userData }) => {
  const { loginData } = useAuthStorage();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    gender: null,
    image: null,
    mobile: null,
    countryCode: "US",
    visible: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ]);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleChangeText = (field, value) => {
    updateFormState(field, value);
  };

  const handlePhoneChange = (val) => {
    updateFormState("mobile", val);
  };

  const userDaata = async () => {
    setFormState((prevState) => ({
      ...prevState,
      name: userData?.name || "",
      email: userData?.email || "",
      mobile: userData?.loginPhone || "",
      gender: userData?.gender,
      image: userData?.avatar || null,
    }));
  };

  const handleSubmit = async () => {
    try {
      await profileValidationsSchema.validate(formState, { abortEarly: false });

      const payload = {
        _id: loginData?._id,
        ...formState,
      };

      const data = await UpdateUserProfile(loginData._id, payload);
      if (data?.status === 200) {
        successHandler(data?.message, "bottom");
        onRefresh();
        updateFormState("image", null);
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

  const handleGenderSelect = (value) => {
    updateFormState("gender", value);
  };

  useEffect(() => {
    if (loginData) {
      userDaata();
    }
  }, [loginData]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
          defaultValue={userData?.loginPhone || formState?.mobile}
          defaultCode={formState.countryCode}
          onChangePhone={handlePhoneChange}
          error={!!formErrors.mobile}
          errorMessage={formErrors.mobile}
        />
        <SelectDropdown
          options={items}
          value={formState?.gender}
          label="Gender"
          setItems={setItems}
          placeholder={"Select gender"}
          onChangeValue={handleGenderSelect}
          dropdownStyle={styles.dropdownStyle}
          dropdownContainerStyle={styles.dropdownStyleContainer}
          selectContainerStyle={styles.selectContainerStyle}
        />
        {formErrors.gender && (
          <Text style={styles.errorText}>{formErrors.gender}</Text>
        )}

        <ButtonComponent
          title={commonContent.updateProfileHeading}
          onPress={handleSubmit}
          style={styles.buttonStyle}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateProfileFormComponent;

const styles = StyleSheet.create({
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
    fontFamily: "SemiBold",
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
