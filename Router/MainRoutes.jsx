import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigations from "./BottomTabNavigations/BottomTabNavigations.jsx";
import Responsive from "../helpers/ResponsiveDimensions/Responsive.js";
import { Colors } from "../helpers/theme/colors.js";
import screenNames from "../helpers/ScreenNames/screenNames.js";
import useAuthStorage from "../helpers/Hooks/useAuthStorage.jsx";
import SplashScreen from "../screens/SplashScreen/SplashScreen.jsx";
import HomeScreen from "../screens/HomeScreen/HomeScreen.jsx";
import ProductsScreen from "../screens/ProductsScreen/ProductsScreen.jsx";
import MyBucketScreen from "../screens/MyBucketScreen/MyBucketScreen.jsx";
import MoreScreen from "../screens/MoreScreen/MoreScreen.jsx";
import LoginScreen from "../screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen.jsx";
import ProductDetailScreen from "../screens/ProductDetailScreen/ProductDetailScreen.jsx";
import WebViewScreen from "../screens/WebViewScreen/WebviewScreen.jsx";
import OtpVerificationScreen from "../screens/OtpScreen/OtpScreen.jsx";
import FavoriteListScreen from "../screens/FavouriteScreen/FavoriteListScreen.jsx";
import OrderListScreen from "../screens/OrdersListScreen/OrdersListScreen.jsx";
import PersonalInfoScreen from "../screens/PersonalInfoScreen/PersonalInfoScreen.jsx";
import CheckoutScreen from "../screens/CheckoutScreen/CheckoutScreen.jsx";
import ChangePasswordScreen from "../screens/ChangePasswordScreen/ChangePasswordScreen.jsx";
import OrderSuccessScreen from "../screens/OrderSuccssScreen/OrderSuccessScreen.jsx";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "../screens/ResetPasswordScreen/ResetPasswordScreen.jsx";
import PrivacyScreen from "../screens/PrivacyScreen/PrivacyScreen.jsx";
import TermsAndCondition from "../screens/TermsAndConditions/TermsAndCondition.jsx";
import AboutusScreen from "../screens/AboutusScreen/AboutusScreen.jsx";
import ReturnPolicyScreen from "../screens/ReturnPolicyScreen/ReturnPolicyScreen.jsx";
import HelpSupportScreen from "../screens/HelpSupportScreen/HelpSupportScreen.jsx";
import ContactusScreen from "../screens/ContactusScreen/ContactusScreen.jsx";
import BlogsScreen from "../screens/BlogsScreen/BlogsScreen.jsx";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { loginData } = useAuthStorage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (loginData?.token) {
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loginData]);

  const renderBottomTab = () => {
    return (
      <Tab.Navigator
        tabBar={(props) => (
          <BottomTabNavigations props={props} loginData={loginData} />
        )}
        screenOptions={{
          lazy: true,
          headerShown: false,
        }}
        initialRouteName={screenNames.HomeScreen}
      >
        <Tab.Screen name={screenNames.HomeScreen} component={HomeScreen} />
        <Tab.Screen
          name={screenNames.ProductsScreen}
          component={ProductsScreen}
        />
        <Tab.Screen
          name={screenNames.MyBucketScreen}
          component={MyBucketScreen}
        />
        <Tab.Screen name={screenNames.MoreScreen} component={MoreScreen} />

        {/* <Tab.Screen
          name={screenNames.WebViewScreen}
          component={WebViewScreen}
          options={{
            tabBarStyle: { display: "none" },
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.HomeScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={screenNames.LoginScreen} component={LoginScreen} />

        <Stack.Screen
          name={screenNames.HomeScreen}
          component={renderBottomTab}
        />
        <Stack.Screen
          name={screenNames.RegisterScreen}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={screenNames.WebViewScreen}
          component={WebViewScreen}
        />
        <Stack.Screen
          name={screenNames.OtpScreen}
          component={OtpVerificationScreen}
        />
        <Stack.Screen
          name={screenNames.favouriteScreen}
          component={FavoriteListScreen}
        />
        <Stack.Screen
          name={screenNames.ordersListScreen}
          component={OrderListScreen}
        />
        <Stack.Screen
          name={screenNames.PersonalInfoScreen}
          component={PersonalInfoScreen}
        />
        <Stack.Screen
          name={screenNames.checkoutScreen}
          component={CheckoutScreen}
        />
        <Stack.Screen
          name={screenNames.ChangePasswordScreen}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={screenNames.OrderSuccessScreen}
          component={OrderSuccessScreen}
        />
        <Stack.Screen
          name={screenNames.ForgotPasswordScreen}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={screenNames.ResetPasswordScreen}
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name={screenNames.PrivacyScreen}
          component={PrivacyScreen}
        />
        <Stack.Screen
          name={screenNames.TermsAndConditionsScreen}
          component={TermsAndCondition}
        />
        <Stack.Screen
          name={screenNames.AboutusScreen}
          component={AboutusScreen}
        />
        <Stack.Screen
          name={screenNames.ReturnPolicyScreen}
          component={ReturnPolicyScreen}
        />
        <Stack.Screen
          name={screenNames.HelpSupportScreen}
          component={HelpSupportScreen}
        />
        <Stack.Screen
          name={screenNames.ContactusScreen}
          component={ContactusScreen}
        />
        <Stack.Screen
          name={screenNames.ProductsDetailsScreen}
          component={ProductDetailScreen}
        />
        <Stack.Screen name={screenNames.BlogsScreen} component={BlogsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawercontainer: {
    backgroundColor: Colors.whiteColor,
    width: Responsive.widthPx(75),
  },
});
