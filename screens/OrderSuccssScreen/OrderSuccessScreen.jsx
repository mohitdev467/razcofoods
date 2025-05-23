import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../Components/CommonComponents/CommonHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { wrap } from "lodash";
import moment from "moment";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import screenNames from "../../helpers/ScreenNames/screenNames";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { AntDesign } from "@expo/vector-icons";
import useBackHandler from "../../helpers/Hooks/useBackHandler";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderSuccessScreen = () => {
  useBackHandler(true);
  const route = useRoute();
  const { orderedData, isFromOrderHistory, productsNames, cartData, redeemDiscount, userPoints } =
    route.params || {};
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {isFromOrderHistory ? (
        <HeaderWithBack title={"Order History"} />
      ) : (
        <CommonHeader />
      )}

      {!isFromOrderHistory && (
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.HomeScreen)}
          style={{
            flexDirection: "row",

            marginVertical: Responsive.heightPx(2),
            gap: Responsive.widthPx(3),
            alignItems: "center",
            marginHorizontal: Responsive.widthPx(4),
          }}
        >
          <AntDesign name="arrowleft" style={styles.iconBack} color="black" />
          <Text style={styles.headerTitle}>Back to home</Text>
        </TouchableOpacity>
      )}

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <View style={styles.iconWrapper}>
            <Icon name="check" style={styles.icon} />
          </View>
          <Text style={styles.orderHeadingTitle}>
            {commonEntities.thankYouOrderEntitit}
          </Text>
        </View>

        <View style={styles.innerContainerSecond}>
          {[
            {
              title: "ORDER NUMBER",
              value: orderedData?.orderId,
            },
            {
              title: "PRODUCT NAMES",
              value: (productsNames?.length
                ? productsNames
                : cartData?.map((item) => item.description || item?.productName)
              )?.map((name, index) => (
                <Text key={index} style={styles.mainHeading}>
                  • {name}
                </Text>
              )) || (
                  <Text style={styles.mainHeading}>
                    {commonEntities.notAvailable}
                  </Text>
                ),
            },
            {
              title: "PICKUP DATE & LOCATION",
              value: (
                <>
                  <Text style={styles.mainHeading}>
                    {moment(orderedData?.deliveryDate).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={[
                      styles.mainHeading,
                      { fontSize: Responsive.font(4) },
                    ]}
                  >
                    {orderedData?.deliveryTime}
                  </Text>
                  <Text
                    style={[
                      styles.mainHeading,
                      { fontSize: Responsive.font(3.5) },
                    ]}
                  >
                    {orderedData?.shopLocation}
                  </Text>
                </>
              ),
            },
            {
              title: "TOTAL",
              value: `$${orderedData?.price?.toFixed(2)}`,
            },
            {
              title: "PAYMENT METHOD",
              value: orderedData?.paymentMethod,
            },
          ].map((item, index) => (
            <View key={index} style={styles.cardBox}>
              <Text style={styles.headingTitle}>{item.title}</Text>
              {typeof item.value === "string" ||
                typeof item.value === "number" ? (
                <Text style={styles.mainHeading}>{item.value}</Text>
              ) : (
                item.value
              )}
            </View>
          ))}
        </View>

        <View style={styles.secondContainer}>
          <Text style={styles.orderDetailsHeading}>Order Details:</Text>

          <View style={styles.productTotalWrapper}>
            <View style={styles.productWrapper}>
              <Text style={styles.headingStyle}>Product Name</Text>
              <Text
                style={[
                  styles.headingStyle,
                  {
                    position: "relative",
                    left: Responsive.widthPx(0),
                    textTransform: "capitalize",
                  },
                ]}
              >
                {(productsNames?.length
                  ? productsNames
                  : cartData?.map(
                    (item) => item.description || item?.productName
                  )
                )?.join(", ") || commonEntities.notAvailable}
              </Text>
            </View>
            <View
              style={[
                styles.productWrapper,
                { backgroundColor: Colors.whiteColor },
              ]}
            >
              <Text
                style={[
                  styles.headingStyle,
                  { paddingRight: Responsive.widthPx(3) },
                ]}
              >
                Pickup Location
              </Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                {orderedData?.shopLocation}
              </Text>
            </View>

            <View style={styles.productWrapper}>
              <Text style={styles.headingStyle}>Subtotal</Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                ${orderedData?.subTotal?.toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.productWrapper,
                { backgroundColor: Colors.whiteColor },
              ]}
            >
              <Text style={styles.headingStyle}>Shipping</Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                ${orderedData?.deliveryFee?.toFixed(2)}
              </Text>
            </View>

            <View style={styles.productWrapper}>
              <Text style={styles.headingStyle}>Discount</Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                ${orderedData?.discount?.toFixed(2)}
              </Text>
            </View>
            {
              redeemDiscount &&
              <View style={styles.productWrapper}>
                <Text style={styles.headingStyle}>Redeem Points</Text>
                <Text
                  style={[
                    styles.headingStyle,
                    { position: "relative", left: Responsive.widthPx(0) },
                  ]}
                >
                  ${redeemDiscount?.toFixed(2)} USD
                </Text>
              </View>
            }

            <View
              style={[
                styles.productWrapper,
                { backgroundColor: Colors.whiteColor },
              ]}
            >
              <Text style={styles.headingStyle}>Total</Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                ${(
                  orderedData?.subTotal -
                  (redeemDiscount || 0)
                ).toFixed(2)}
              </Text>
            </View>

            <View style={styles.productWrapper}>
              <Text style={styles.headingStyle}>Payment Method</Text>
              <Text
                style={[
                  styles.headingStyle,
                  { position: "relative", left: Responsive.widthPx(0) },
                ]}
              >
                {orderedData?.paymentMethod}
              </Text>
            </View>

            {!isFromOrderHistory ? (
              <ButtonComponent
                title="Order History"
                style={styles.buttonStyle}
                onPress={() =>
                  navigation.navigate(screenNames.ordersListScreen, {
                    cartData: cartData,
                    productsNames: productsNames,
                  })
                }
              />
            ) : (
              ""
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },

  cardBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // for Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  headingTitle: {
    fontSize: Responsive.font(4),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  mainHeading: {
    fontSize: Responsive.font(3.8),
    color: "#555",
  },

  innerContainer: {
    paddingHorizontal: Responsive.widthPx(4),
    marginVertical: Responsive.heightPx(4),
    borderWidth: 1,
    borderColor: Colors.lightGreyColor,
    marginHorizontal: Responsive.widthPx(5),
    backgroundColor: Colors.silverColor,
    flexDirection: "row",
    alignItems: "center",
    gap: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(3),
    borderRadius: 10,
  },

  innerContainerSecond: {
    marginVertical: Responsive.heightPx(3),
    marginHorizontal: Responsive.widthPx(5),
    backgroundColor: Colors.silverColor,
    borderRadius: 10,
    height: Responsive.heightPx(65),
  },

  iconWrapper: {
    backgroundColor: "#c6ebe6",
    height: Responsive.heightPx(6),
    width: Responsive.widthPx(12),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  icon: {
    backgroundColor: Colors.primaryButtonColor,
    padding: 5,
    borderRadius: 100,
    color: Colors.whiteColor,
  },

  iconBack: {
    fontSize: Responsive.font(7),
  },
  headerTitle: {
    fontSize: Responsive.font(4),
    width: "100%",
  },

  wrapperContainer: {
    paddingHorizontal: Responsive.widthPx(5),
    borderColor: Colors.lightGreyColor,
    marginLeft: Responsive.widthPx(2.5),
    paddingTop: Responsive.heightPx(3),
    paddingBottom: Responsive.heightPx(4),
    height: Responsive.heightPx(14),
    borderRadius: 10,
  },
  orderHeadingTitle: {
    fontFamily: "Regualar",
    fontSize: Responsive.font(4.5),
  },

  headingTitle: {
    fontFamily: "Regular",
    fontSize: Responsive.font(4),
  },

  mainHeading: {
    fontFamily: "SemiBold",
    fontSize: Responsive.font(5),
  },

  secondContainer: {
    paddingHorizontal: Responsive.widthPx(4),
    marginVertical: Responsive.heightPx(3),
    marginTop: Responsive.heightPx(13),
  },

  orderDetailsHeading: {
    fontFamily: "Bold",
    fontSize: Responsive.font(5),
  },

  productTotalWrapper: {
    marginVertical: Responsive.heightPx(2),
    paddingVertical: Responsive.heightPx(3),
    width: "100%",
  },

  productWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.silverColor,
    paddingHorizontal: Responsive.widthPx(10),
    paddingVertical: Responsive.heightPx(3),
    alignSelf: "flex-start",
  },

  headingStyle: {
    color: Colors.blackColor,
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4.5),
    textAlign: "left",
    width: Responsive.widthPx(40),
  },
  buttonStyle: {
    marginVertical: Responsive.heightPx(6),
  },
});
