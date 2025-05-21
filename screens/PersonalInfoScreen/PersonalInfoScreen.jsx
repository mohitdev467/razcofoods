// PersonalInfoScreen.js
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActionSheetIOS,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { StatusBar } from "expo-status-bar";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { updateProfileContent } from "../../Utilities/CommonUtils/CommonUtils";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import { UpdateUserProfile } from "../../services/UserServices/UserServices";
import * as ImagePickerUtils from "../../Components/CommonComponents/ImageUploader";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import SelectDropdown from "../../Components/CommonComponents/SelectDropdown";
import PhoneNumberInput from "../../Components/CommonComponents/PhoneNumberInput";
import Loader from "../../Components/CommonComponents/Loader";
import { profileValidationsSchema } from "../../helpers/Validations/ValidationSchema";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";

const PersonalInfoScreen = () => {
  const goBack = useGoBack();
  const { loginData } = useAuthStorage();
  const { user, loading } = useUserDetailsById(loginData?._id);



  const [formState, setFormState] = useState({
    name: "",
    email: "",
    gender: null,
    phone: null,
    countryCode: "US",
    visible: false,
    profileImage: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ]);

  useEffect(() => {
    if (user?.data) {
      setFormState((prev) => ({
        ...prev,
        name: user.data.name || prev.name,
        email: user.data.email || prev.email,
        phone: user?.data?.loginPhone || prev.phone,
        gender: user.data.gender || prev.gender,
        profileImage: user.data.profileImage || prev.profileImage,
      }));
    }
  }, [user?.data]);

  const updateFormState = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeText = (field, value) => {
    updateFormState(field, value);
  };

  const handlePhoneChange = (val) => {
    updateFormState("phone", val);
  };

  const handleGenderSelect = (value) => {
    updateFormState("gender", value);
  };

  const handleSubmit = async () => {
    try {
      await profileValidationsSchema.validate(formState, { abortEarly: false });
  
      const formData = new FormData();
  
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("phone", formState.phone);
      formData.append("gender", formState.gender);
  
      if (formState.profileImage?.uri || typeof formState.profileImage === 'string') {
        const imageUri = formState.profileImage?.uri || formState.profileImage;
        formData.append("profileImage", {
          uri: imageUri,
          type: "image/jpeg",
          name: `profile_${Date.now()}.jpg`,
        });
      }

      console.log("form dataaa", formData)
  
      const data = await UpdateUserProfile(loginData._id, formData);
      if (data?.status === 200) {
        successHandler(data?.message, "top");
        onRefresh();
      }
    } catch (validationErrors) {
      const errors = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      }
      setFormErrors(errors);
    }
  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleImageUpload = async () => {
    let imageData = null;
  
    const chooseImage = async () => {
      imageData = await ImagePickerUtils.pickImageFromGallery();
      if (imageData) {
        updateFormState("profileImage", imageData);
      }
    };
  
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Choose from Library"],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            await chooseImage();
          }
        }
      );
    } else {
      Alert.alert("Select Option", "", [
        {
          text: "Choose from Library",
          onPress: async () => await chooseImage(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };
  


  if (loading) return (
    <View style={{ marginTop: Responsive.heightPx(10) }}>
      <Loader visible={loading} />
    </View>
  );



  return (
    <View style={styles.container}>
      
        <ImageBackground source={ImagePicker.updateProfileBgBackImage} style={styles.bgBackBanner}>
          <ImageBackground
            source={ImagePicker.updateProfileBgFrontImage}
            style={styles.frontBanner}
            tintColor={Colors.primaryButtonColor}
          >
            <View style={styles.headerContainerForBack}>
              <TouchableOpacity onPress={goBack}>
                <Icon name="arrow-left" style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.title}>{commonContent.updateProfileHeading}</Text>
            </View>

            <View style={styles.imageWrapper}>
              <Image
                source={
                  formState?.profileImage?.uri
                    ? { uri: formState.profileImage.uri }
                    : user?.data?.profileImage
                    ? { uri: `${IMAGE_BASE_URL}${user.data.profileImage}` }
                    : ImagePicker.PlaceholderImage
                }
                style={styles.profileImage}
              />
              <TouchableOpacity onPress={handleImageUpload} style={styles.cameraWrapper}>
                <Icon name="camera" style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.userNameWrapper}>
              <Text style={styles.userNameStyle}>{`Name: ${user?.data?.name}`}</Text>
            <Text style={styles.emailUserText}>{`Gender: ${user?.data?.gender}`}</Text>
            <Text style={styles.emailUserText}>{`Email: ${user?.data?.email}`}</Text>
            </View>
          </ImageBackground>
        </ImageBackground>


        <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            defaultValue={user?.data?.loginPhone || formState.phone}
            defaultCode={formState.countryCode}
            onChangePhone={handlePhoneChange}
            error={!!formErrors.phone}
            errorMessage={formErrors.phone}
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
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  bgBackBanner: {
    height: Responsive.heightPx(45),
    marginTop: Platform.OS === "ios" ? Responsive.heightPx(0) : Responsive.heightPx(7),
  },
  frontBanner: {
    height: Responsive.heightPx(40),

  },
  headerContainerForBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(2),
    gap: Responsive.widthPx(5),
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.5),
    color: Colors.whiteColor,
  },
  icon: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(5),
  },
  profileImage: {
    height: Responsive.heightPx(12),
    width: Responsive.widthPx(24),
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    resizeMode: "contain"
  },
  cameraWrapper: {
    position: "absolute",
    bottom: 0,
    left: Responsive.widthPx(13),
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
    padding: 8,
  },
  cameraIcon: {
    fontSize: Responsive.font(7),
    color: Colors.primaryButtonColor,
  },
  userNameWrapper: {
    flexDirection: "column",
    alignItems:"flex-start",
    marginHorizontal: Responsive.widthPx(6),
    marginTop: Responsive.heightPx(7),
    gap:Responsive.heightPx(1.5),
  },
  userNameStyle: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
  },
  emailUserText: {
    fontSize: Responsive.font(4),
    fontFamily: "SemiBold",
    marginVertical: Responsive.heightPx(0.5),
  },
  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(0),
    marginBottom:Responsive.heightPx(5)
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
    fontSize: Responsive.font(3),
    marginTop: Responsive.heightPx(1),
  },
  mainContainer: {
    backgroundColor: Colors.skyBlueColor,
    height: Responsive.heightPx(7),
    borderRadius: 10,
  },
  buttonStyle: {
    marginBottom: Responsive.heightPx(10),
    marginTop: Responsive.heightPx(4),
  },

  imageWrapper: {
    position: 'relative',
    top: Responsive.heightPx(4),
    left: Responsive.widthPx(10)
  },
  buttonStyle: {
    marginBottom: Responsive.heightPx(4),
    marginVertical: Responsive.heightPx(4),
  },

  inputStyle: {
    fontFamily: "SemiBold",

  }

});

