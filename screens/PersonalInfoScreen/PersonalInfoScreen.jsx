import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import useGoBack from "../../helpers/Hooks/useGoBack";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { StatusBar } from "expo-status-bar";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { updateProfileContent } from "../../Utilities/CommonUtils/CommonUtils";
import UpdateProfileFormComponent from "../../Components/UpdateProfileComponents/UpdateProfileFormComponent";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById";
import { ActivityIndicator } from "react-native-paper";
import Loader from "../../Components/CommonComponents/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfoScreen = () => {
  const goBack = useGoBack();
  const { loginData } = useAuthStorage();

  const { user, loading, error } = useUserDetailsById(loginData?._id);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader visible={loading} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={Colors.primaryButtonColor}
        translucent={true}
      />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={ImagePicker.updateProfileBgBackImage}
          style={styles.bgBackBanner}
        >
          <ImageBackground
            source={ImagePicker.updateProfileBgFrontImage}
            style={styles.frontBanner}
            tintColor={Colors.primaryButtonColor}
          >
            <View style={styles.headerContainerForBack}>
              <TouchableOpacity onPress={goBack}>
                <Icon
                  name={"arrow-left"}
                  style={[styles.icon, { fontSize: Responsive.font(4.5) }]}
                />
              </TouchableOpacity>
              <Text style={styles.title}>
                {commonContent.updateProfileHeading}
              </Text>
            </View>

            <View>
              <Image
                source={
                  Array.isArray(loginData?.profileImage)
                    ? { uri: loginData?.profileImage[0] }
                    : typeof loginData?.profileImage === "string"
                    ? { uri: loginData?.profileImage }
                    : ImagePicker.PlaceholderImage
                }
                style={styles.profileImage}
              />

              <View style={styles.userNameWrapper}>
                <Text style={styles.userNameStyle}>{user?.data?.name}</Text>
              </View>
              <Text
                style={[styles.emailUserText, { textTransform: "capitalize" }]}
              >{`Gender: ${user?.data?.gender}`}</Text>
              <Text
                style={styles.emailUserText}
              >{`Address: ${user?.data?.addresses[0]?.address}`}</Text>

              <Text
                style={styles.emailUserText}
              >{`Email: ${user?.data?.email}`}</Text>
            </View>
          </ImageBackground>
        </ImageBackground>

        <UpdateProfileFormComponent userData={user?.data} />
      </SafeAreaView>
    </>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(5),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },

  bgBackBanner: {
    height: Responsive.heightPx(45),
    marginTop: Responsive.heightPx(2),

    position: "relative",
  },

  frontBanner: {
    height: Responsive.heightPx(40),
    position: "relative",
  },
  headerContainerForBack: {
    paddingHorizontal: Responsive.widthPx(4),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
    marginTop: Responsive.heightPx(2),
    gap: Responsive.widthPx(8),
  },

  title: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.5),
    color: Colors.whiteColor,
  },
  icon: {
    fontSize: Responsive.font(5),
    color: Colors.whiteColor,
  },

  profileImage: {
    height: Responsive.heightPx(12),
    width: Responsive.widthPx(24),
    marginVertical: Responsive.heightPx(2.5),
    marginHorizontal: Responsive.widthPx(6),
    borderRadius: 100,
    resizeMode: "cover",
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
  },

  trainerLevelWrp: {
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(1.4),
    backgroundColor: Colors.primaryButtonColor,
    paddingHorizontal: Responsive.widthPx(3),
    borderRadius: 20,
    paddingVertical: Responsive.heightPx(0.3),
  },

  trainerLevelText: {
    color: Colors.whiteColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3),
  },
  icon: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(3),
  },

  userNameWrapper: {
    flexDirection: "row",
    marginHorizontal: Responsive.widthPx(6),
    gap: Responsive.widthPx(4.5),
  },

  userNameStyle: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.2),
  },

  emailUserText: {
    marginHorizontal: Responsive.widthPx(6),
    color: Colors.greyColor,
    marginTop: Responsive.heightPx(1),
    fontFamily: "SemiBold",
  },
  detailsInlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelStyle: {
    flexDirection: "row",
    width: Responsive.widthPx(13),
  },
});
