import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { useWishlist } from "../../helpers/Hooks/useWishlist";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import { Colors } from "../../helpers/theme/colors";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoriteListScreen = () => {
  const navigation = useNavigation();
  const { toggleWishlistItem, isInWishlist, wishlistItems } = useWishlist();

  const handleWishlist = (item) => {
    successHandler("Product remove from wishlist successfully");
    toggleWishlistItem(item);
  };

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate(screenNames.ProductsDetailsScreen, {
            productData: item,
          })
        }
      >
        <Image
          source={{
            uri: item?.productImage?.length
              ? item?.productImage[0]
              : item?.productImage,
          }}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.productName}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.favContainer}
          onPress={() => handleWishlist(item)}
        >
          <Icon
            name={isInWishlist(item?._id) ? "heart" : "heart-o"}
            size={20}
            color={isInWishlist(item?._id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <HeaderWithBack title="Wishlist Products" />

        {wishlistItems?.length > 0 ? (
          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item?._id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <Text
            style={{
              color: Colors.lightGreyColor,
              marginVertical: Responsive.heightPx(10),
              fontFamily: "SemiBold",
              textAlign: "center",
            }}
          >
            No products found
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoriteListScreen;

const styles = StyleSheet.create({
  wrapper: {
    padding: rw(4),
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: rw(2),
    elevation: 2,
  },
  header: {
    height: Responsive.heightPx(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: Responsive.font(5),
    fontFamily: "Bold",
    marginRight: Responsive.widthPx(3),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rh(2),
  },
  image: {
    width: rw(18),
    height: rw(18),
    resizeMode: "contain",
    marginRight: rw(4),
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: rf(1.7),
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: rf(1.8),
    fontWeight: "bold",
    marginTop: rh(0.5),
  },
  favContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favText: {
    color: "red",
    fontWeight: "600",
    marginLeft: rw(1),
    fontSize: rf(1.8),
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: rh(1),
  },
});
