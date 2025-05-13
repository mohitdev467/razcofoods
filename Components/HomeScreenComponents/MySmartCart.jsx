import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import { Colors } from "../../helpers/theme/colors";
import ProductCard from "../ProductCardComponent/ProductCard";
import { useProducts } from "../../helpers/Hooks/useProducts";
import generateUniqueId from "../../Utilities/CommonUtils/CommonUtils";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";

export default function MySmartCart() {
  const { data, loading, error } = useProducts(1, 5);

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} />;
  if (error) return <Text>Error: {error}</Text>;
  if (!data || !data?.data?.length) return <Text>No products found</Text>;

  return (
    <>
      <View style={styles.headingContainer}>
        <View>
          <Text style={styles.mainHeading}>
            {commonEntities.mySmartCartTitle}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeading}>
            {commonEntities.bestSellerGrocerySubTitle}
          </Text>
        </View>
      </View>
      <FlatList
        data={data?.data}
        keyExtractor={(item, index) => generateUniqueId()}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <ProductCard
            id={item?._id}
            imageUrl={
              Array.isArray(item.productImage)
                ? item.productImage[0]
                : item.productImage
            }
            price={`$${item?.price}`}
            description={item.productName}
            productData={item}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  headingContainer: {
    marginTop: Responsive.heightPx(5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Responsive.widthPx(4),
  },
  mainHeading: {
    color: Colors.blackColor,
    fontSize: Responsive.font(5),
    textAlign: "center",
    fontFamily: "Bold",
  },
  subHeading: {
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: Responsive.font(3.5),
    color: Colors.blackColor,
  },
});
