import {
  Platform,
   ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../helpers/theme/colors";
import {
  commonContent,
  moreScreenForLogoutUser,
  moreScreenOptonsList,
} from "../../constants/CommonContent/CommonContent";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { CommonActions, useNavigation } from "@react-navigation/native";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import ModalComponent from "../../Components/CommonComponents/ModalComponent";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import Loader from "../../Components/CommonComponents/Loader.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserDetailsById from "../../helpers/Hooks/useUserDetailsById.jsx";

const MoreScreen = () => {
  const navigation = useNavigation();
  const { clearLoginData, loginData } = useAuthStorage();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserDetailsById(loginData?._id);
  const redeemPoints = user?.data?.points?.available || 0


  const moreScreenOptions = loginData?.verified
    ? moreScreenOptonsList
    : moreScreenForLogoutUser;

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screenNames.LoginScreen }],
        })
      );
      successHandler(commonContent.userLogoutSuccess);
    } catch (error) {
      errorHandler(commonContent.userLogoutError);
    } finally {
      setIsLoading(false);
      setLogoutModalVisible(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{commonEntities.moreTextHeading}</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.flatListContent}
      >
        
        {moreScreenOptions &&
          moreScreenOptions?.map((item, index) => (
            <TouchableOpacity
              style={styles.moreListWrapper}
              key={index}
              onPress={() => {
                if (item?.isWebLink && item?.link) {
                  navigation.navigate(screenNames.WebViewScreen, {
                    url: item.link,
                  });
                } else {
                  navigation.navigate(item.link);
                }
              }}
            >
              <View style={styles.leftSideWrp}>
                {item.isFeather ? (
                  <FeatherIcon
                    name={item.iconName}
                    style={[styles.icon, { color: Colors.primaryButtonColor }]}
                  />
                ) : (
                  <Icon
                    name={item.iconName}
                    style={[styles.icon, { color: Colors.primaryButtonColor }]}
                  />
                )}
                <Text style={styles.mainTitle}>{item.title}</Text>
              </View>
              {item?.isMore && (
                <Icon
                  name="chevron-right"
                  style={[
                    styles.icon,
                    {
                      fontSize: Responsive.font(3.5),
                      marginRight: Responsive.widthPx(2),
                    },
                  ]}
                />
              )}
              {
                item.isReedemPoints && 
                <View style={styles.redeemPointsWrapper}>
                  <Text style={styles.redeemPointText}>{redeemPoints}</Text>
                </View>
              }
            </TouchableOpacity>
          ))}

        {loginData?.verified && (
          <ButtonComponent
            title={commonEntities.logoutText}
            onPress={() => setLogoutModalVisible(true)}
            style={styles.logoutButtonStyle}
            icon={"log-out"}
            textStyle={styles.logoutTextStyle}
          />
        )}
      </ScrollView>
      <ModalComponent
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        title={commonEntities.logoutText}
      >
        <Text style={styles.modalText}>
          {commonEntities.areYouSureWantToLogout}
        </Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setLogoutModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>No</Text>
          </TouchableOpacity>

          {isLoading ? (
            <Loader visible={isLoading} />
          ) : (
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleLogout}
            >
              <Text style={styles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ModalComponent>
    </SafeAreaView>
  );
};

export default MoreScreen;

const newLocal = "center";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerContainer: {
    paddingHorizontal: Responsive.widthPx(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:Platform.OS ==="ios" && Responsive.heightPx(-5),
  
    paddingVertical: Responsive.heightPx(2),
  },

  title: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(5),
  },

  moreListWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Responsive.widthPx(6),
    alignItems: "center",
    paddingVertical: Responsive.heightPx(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGreyColor,
  },

  leftSideWrp: {
    flexDirection: "row",
    gap: Responsive.widthPx(4),
    alignItems: "baseline",
  },
  icon: {
    fontSize: Responsive.font(4.5),
    color: Colors.primaryButtonColor,
  },

  mainTitle: {
    fontFamily: "Regular",
    fontSize: Responsive.font(4),
    color: Colors.blackColor,
  },

  logoutButtonStyle: {
    marginHorizontal: Responsive.widthPx(5),
    marginVertical: Responsive.heightPx(4),
  },

  logoutTextStyle: {
    fontSize: Responsive.font(4),
  },

  modalText: {
    textAlign: "center",
    fontSize: Responsive.font(3.8),
    fontFamily: "SemiBold",
    marginVertical: Responsive.heightPx(2),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Responsive.heightPx(2),
    height: Responsive.heightPx(6),
  },
  modalButton: {
    paddingVertical: Responsive.heightPx(1.5),
    paddingHorizontal: Responsive.widthPx(10),
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  confirmButton: {
    backgroundColor: Colors.primaryButtonColor,
  },
  cancelButtonText: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(3.5),
    fontFamily: "SemiBold",
  },
  confirmButtonText: {
    color: Colors.whiteColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3.5),
  },

  redeemPointsWrapper:{
    backgroundColor:Colors.primaryButtonColor,
    justifyContent:"center",
    borderRadius:10,
    minWidth:Responsive.widthPx(9)
  },
  redeemPointText:{
   color:Colors.whiteColor,
   fontSize:Responsive.font(3),
   margin:10,
  }
});
