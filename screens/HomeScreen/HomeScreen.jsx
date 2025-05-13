import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../../Components/CommonComponents/CommonHeader";
import { Colors } from "../../helpers/theme/colors";
import SearchInput from "../../Components/CommonComponents/SearchInputField";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import SliderComponent from "../../Components/SliderComponent/SliderComponent";
import { homeSliderData } from "../../constants/CommonContent/CommonContent";
import WeeklyDealComponent from "../../Components/HomeScreenComponents/WeeklyDeal";
import FootLoveToEat from "../../Components/HomeScreenComponents/FoodLoveToEat";
import BestSellerGrocery from "../../Components/HomeScreenComponents/BestSellerGrocery";
import SuperDiscountWrapper from "../../Components/HomeScreenComponents/SuperDiscountWrapper";
import MySmartCart from "../../Components/HomeScreenComponents/MySmartCart";
import BestDealsSalesMonth from "../../Components/HomeScreenComponents/BestDealsSalesMonth";
import CuratedCollections from "../../Components/HomeScreenComponents/CuratedCollections";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import FreshDealComponent from "../../Components/HomeScreenComponents/FreshDealComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useBackHandler from "../../helpers/Hooks/useBackHandler";
import Loader from "../../Components/CommonComponents/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  useBackHandler(true);
  const [state, setState] = useState({
    dashBoardData: [],
    loading: false,
    refreshing: false,
    showLoader: true,
    search: "",
  });

  const updateState = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRefresh = useCallback(() => {
    updateState("refreshing", true);
    setTimeout(() => updateState("refreshing", false), 2000);
  }, [state.refreshing]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      return () => {};
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateState("showLoader", false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (state.showLoader) {
    return (
      <View style={styles.loaderWrapper}>
        <Loader visible={state?.showLoader} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
      >
        <SliderComponent />
        <WeeklyDealComponent />

        <FreshDealComponent />

        <FootLoveToEat />

        <BestSellerGrocery />

        <SuperDiscountWrapper />
        <MySmartCart />

        <BestDealsSalesMonth />

        <CuratedCollections />

        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor, // full-screen white bg
  },
});
