import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as yup from "yup";
import { ChangePasswordSchema } from "../../helpers/Validations/ValidationSchema";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import Loader from "../../Components/CommonComponents/Loader";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { updateUserPassword } from "../../services/UserServices/UserServices";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import errorHandler from "../../helpers/Notifications/ErrorHanlder";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = () => {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showOld: true,
    showNew: true,
    showConfirm: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const { loginData } = useAuthStorage();
  const goBack = useGoBack();

  const updateFormState = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAndSubmit = async () => {
    try {
      updateFormState("loading", true);
      await ChangePasswordSchema.validate(formState, { abortEarly: false });
      const payload = {
        email: loginData?.email,
        currentPassword: formState.currentPassword,
        newPassword: formState.newPassword,
        confirmPassword: formState.confirmPassword,
      };
      const result = await updateUserPassword(payload);
      if (result.status === 200) {
        successHandler(result.message);
        updateFormState("loading", false);
        goBack();
      } else {
        errorHandler(result.message);
      }
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
      }
    } finally {
      updateFormState("loading", false);
    }
  };

  return (
        <SafeAreaView>
    
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderWithBack title={"Change Password"} />

      <View style={{ paddingVertical: Responsive.heightPx(3) }}>
        <CustomInputField
          name="currentPassword"
          label="Current Password"
          value={formState.currentPassword}
          onTextChange={updateFormState}
          placeholder="Enter current password"
          error={!!formErrors.currentPassword}
          helperText={formErrors.currentPassword}
          leftIcon={
            <Icon
              name="lock"
              size={Responsive.font(5)}
              color={Colors.primaryButtonColor}
            />
          }
          rightIcon={
            <Icon
              name={formState.showOld ? "eye-off" : "eye"}
              size={Responsive.font(5)}
              color={Colors.primaryButtonColor}
            />
          }
          onRightIconPress={() =>
            updateFormState("showOld", !formState.showOld)
          }
          secureTextEntry={formState.showOld}
        />

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
              color={Colors.primaryButtonColor}
            />
          }
          rightIcon={
            <Icon
              name={formState.showNew ? "eye-off" : "eye"}
              size={Responsive.font(5)}
              color={Colors.primaryButtonColor}
            />
          }
          onRightIconPress={() =>
            updateFormState("showNew", !formState.showNew)
          }
          secureTextEntry={formState.showNew}
        />

        <CustomInputField
          name="confirmPassword"
          label="Confirm Password"
          value={formState.confirmPassword}
          onTextChange={updateFormState}
          placeholder="Confirm new password"
          error={!!formErrors.confirmPassword}
          helperText={formErrors.confirmPassword}
          leftIcon={
            <Icon
              name="lock"
              size={Responsive.font(5)}
              color={Colors.primaryButtonColor}
            />
          }
          rightIcon={
            <Icon
              name={formState.showConfirm ? "eye-off" : "eye"}
              size={Responsive.font(5)}
              color={Colors.primaryButtonColor}
            />
          }
          onRightIconPress={() =>
            updateFormState("showConfirm", !formState.showConfirm)
          }
          secureTextEntry={formState.showConfirm}
        />

        {formState.loading ? (
          <Loader visible={formState.loading} />
        ) : (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={commonEntities.updatePassword}
              onPress={validateAndSubmit}
            />
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingHorizontal: Responsive.widthPx(4),
  },
  title: {
    fontSize: Responsive.font(5),
    fontWeight: "bold",
    marginBottom: Responsive.heightPx(2),
    textAlign: "center",
    color: Colors.blackColor,
  },
  button: {
    backgroundColor: Colors.primaryButtonColor,
    paddingVertical: Responsive.heightPx(2),
    borderRadius: Responsive.widthPx(2),
    marginTop: Responsive.heightPx(2),
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: Responsive.font(4),
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: Responsive.heightPx(4),
  },
});
