import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import ProductCard from "../../Components/ProductCardComponent/ProductCard";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../../helpers/Hooks/useCart";
import { useAllProducts } from "../../helpers/Hooks/useAllProducts";
import Loader from "../../Components/CommonComponents/Loader";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import generateUniqueId, {
  onShare,
} from "../../Utilities/CommonUtils/CommonUtils";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { useWishlist } from "../../helpers/Hooks/useWishlist";
import Icon from "react-native-vector-icons/FontAwesome";
import useProductById from "../../helpers/Hooks/useProductById";
import { Colors } from "../../helpers/theme/colors";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = useState(0);
  const [isReadMore, setIsReadMore] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const { productData } = route?.params;
  const { product } = useProductById(productData?._id);
  const numericPrice = parseFloat(product?.data?.price);
  const { loginData } = useAuthStorage();
  const { data, loading, error } = useAllProducts(
    product?.data?.subCategory,
    20,
    1
  );
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  useEffect(() => {
    if (data?.data?.length) {
      setProducts(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (product?.data) {
      const itemInCart = cartItems?.find(
        (item) => item?.id === product?.data?._id
      );
      if (itemInCart) {
        setQuantity(itemInCart?.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [cartItems, product?.data]);

  const handleWishlistToggle = () => {
    toggleWishlistItem(product?.data);
  };

  const handleAdd = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    await addToCart({
      id: product?.data?._id,
      imageUrl: product?.data?.productImage[0],
      price: numericPrice,
      description: product?.data?.productName,
      quantity: 1,
    });
  };

  const handleRemove = async () => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      setQuantity(0);
      await removeFromCart(id);
    } else {
      setQuantity(newQty);
      await addToCart({
        id: product?.data?._id,
        imageUrl: product?.data?.productImage[0],
        price: numericPrice,
        description: product?.data?.productName,
        quantity: -1, // reducing quantity
      });
    }
  };
  // Toggle read more/less
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader visible={loading} />
      </View>
    );
  }

  // if (!products?.length) return <Text>No products found</Text>;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithBack title="Product Detail" />

      <ScrollView style={styles.container}>
        {/* Image Swiper */}
        <Swiper
          style={styles.swiper}
          showsButtons={true}
          loop={true}
          autoplay={true}
          dotColor="#000"
          activeDotColor="#fff"
        >
          {product?.data &&
            product?.data?.productImage?.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))}
        </Swiper>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product?.data?.productName}</Text>
          <Text style={styles.price}>${product?.data?.price}</Text>

          {/* Quantity Selector */}
          {quantity > 0 && (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleRemove()}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => handleAdd()}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add to Cart Button */}

          {quantity < 1 && (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAdd()}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}

          {/* Wishlist and Share Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                {
                  opacity: !loginData?.verified ? 0.2 : 1,
                },
              ]}
              onPress={() => handleWishlistToggle()}
              disabled={!loginData?.verified}
            >
              <Icon
                name={isInWishlist(product?.data?._id) ? "heart" : "heart-o"} // filled or outlined heart
                size={20}
                color={isInWishlist(product?.data?._id) ? "red" : "black"}
              />
              <Text
                style={[
                  styles.secondaryButtonText,
                  {
                    color: isInWishlist(product?.data?._id)
                      ? "red"
                      : Colors.blackColor,
                    marginLeft: 6,
                  },
                ]}
              >
                Wishlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={onShare}>
              <Text style={styles.secondaryButtonText}>⇄ Share</Text>
            </TouchableOpacity>
          </View>

          {/* Product Description */}
          {product?.data?.description && (
            <>
              <Text style={styles.productDetailsText}>Product Details :</Text>

              <Text style={styles.description}>
                {isReadMore
                  ? product?.data?.description
                  : `${product?.data?.description?.substring(0, 100)}...`}
                <Text onPress={toggleReadMore} style={styles.readMore}>
                  {isReadMore ? " Read Less" : " Read More"}{" "}
                </Text>
              </Text>
            </>
          )}

          {/* Related Products (Placeholder) */}
          <Text style={styles.relatedProductsText}>Related Products :</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: responsiveWidth(2),
            }}
          >
            {products?.length > 0 ? (
              products?.map((item, index) => (
                <View
                  key={generateUniqueId()}
                  style={{
                    marginRight: responsiveWidth(3),
                    width: responsiveWidth(44),
                  }}
                >
                  <ProductCard
                    id={item?._id}
                    imageUrl={
                      Array.isArray(item?.productImage)
                        ? item?.productImage[0]
                        : item?.productImage
                    }
                    price={`$${item?.price}`}
                    description={item?.productName}
                    productData={item}
                    cardHeight={responsiveHeight(30)}
                  />
                </View>
              ))
            ) : (
              <Text>No products found</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    height: responsiveHeight(40),
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    resizeMode: "contain",
  },
  detailsContainer: {
    padding: responsiveWidth(5),
  },
  productName: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  price: {
    fontSize: responsiveFontSize(2),
    color: "#000",
    marginBottom: responsiveHeight(2),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    padding: responsiveWidth(3),
    borderRadius: 5,
  },
  quantityText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  quantity: {
    fontSize: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(5),
  },
  addToCartButton: {
    backgroundColor: Colors.primaryButtonColor,
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  addToCartText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(2),
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: responsiveWidth(1),
  },

  secondaryButtonText: {
    fontSize: responsiveFontSize(1.8),
    width: Responsive.widthPx(20),
    color: Colors.blackColor,
  },
  productDetailsText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontSize: responsiveFontSize(1.8),
    color: "#666",
    marginBottom: responsiveHeight(2),
  },
  readMore: {
    color: "#28a745",
    fontWeight: "bold",
  },
  relatedProductsText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
});

export default ProductDetailScreen;
