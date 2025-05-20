import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import ProductCard from "../../Components/ProductCardComponent/ProductCard";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import WelcomeSection from "../../Components/WelcomeSection/WelcomeSectionCard";
import FilterScreen from "../FilterScreen/FilterScreen";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import DealCard from "../../Components/DealCard/DealCard ";
import { ActivityIndicator } from "react-native-paper";
import { useAllProducts } from "../../helpers/Hooks/useAllProducts";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Loader from "../../Components/CommonComponents/Loader";
import generateUniqueId from "../../Utilities/CommonUtils/CommonUtils";
import PaginationControls from "../../Components/Paginations/PaginationControls";
import CommonHeader from "../../Components/CommonComponents/CommonHeader";
import SearchInput from "../../Components/CommonComponents/SearchInputField";
import { commonEntities } from "../../Utilities/CommonEntities/CommonEntities";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const route = useRoute();
  const { isFromBanner, bannerData, userCategory } = route.params || {};
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const selectedCategory = userCategory
    ? userCategory
    : selected?.length > 0
    ? selected.join(",")
    : undefined;
  // const scrollRef = useRef(null);

  const { data, loading } = useAllProducts(selectedCategory, 20, page);

  const toggleSub = (sub) => {
    setSelected((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  useEffect(() => {
    if (data?.data?.length) {
      setProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (userCategory && selected?.length === 0) {
      setSelected([userCategory]);
    }
  }, [userCategory]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSelected([]);

    setTimeout(() => setRefreshing(false), 2000);
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      return () => {};
    }, [])
  );

  if (loading && page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <Loader visible={loading} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonHeader />

      {!showFilter && (
        <SearchInput
          value={search}
          placeholder={commonEntities?.search}
          onChangeText={(text) => setSearch(text)}
        />
      )}
      {!showFilter ? (
        <ScrollView
          // ref={scrollRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <>
            {isFromBanner ? (
              <DealCard bannerData={bannerData} />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowFilter(true)}
                >
                  <Ionicons name="filter" size={rh(2)} color="black" />
                  <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>

                <View style={styles.selectedContainer}>
                  {selected?.map((item) => (
                    <View key={item} style={styles.tag}>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          width: Responsive.widthPx(13),
                        }}
                      >
                        {item}
                      </Text>
                      <TouchableOpacity onPress={() => toggleSub(item)}>
                        <Text
                          style={{ marginLeft: 10, color: Colors.whiteColor }}
                        >
                          ×
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FlatList
                data={products}
                keyExtractor={(item, index) => generateUniqueId()}
                numColumns={2}
                contentContainerStyle={styles.container}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  paddingHorizontal: rw(2),
                }}
                ListEmptyComponent={() =>
                  !loading && (
                    <View style={{ padding: 20 }}>
                      <Text>No products found</Text>
                    </View>
                  )
                }
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
            </View>

            {products?.length > 0 ? (
              <PaginationControls
                currentPage={page}
                onPageChange={(newPage) => {
                  if (
                    newPage > 0 &&
                    newPage <= data?.additionalData?.totalPages
                  )
                    setPage(newPage);
                  // scrollRef.current?.scrollTo({ y: 0, animated: true });
                }}
                isNextDisabled={data?.data?.length < 20}
                totalPages={data?.additionalData?.totalPages}
              />
            ) : (
              ""
            )}

            <EarnPointsCard />
            <RazcoFoodDescription />
          </>
        </ScrollView>
      ) : (
        <FilterScreen
          setShowFilter={setShowFilter}
          setSelected={setSelected}
          selected={selected}
          products={products}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { backgroundColor: "#fff" },

  button: {
    flexDirection: "row",
    paddingVertical: rh(1),
    paddingHorizontal: rw(3.5),
    borderWidth:Platform.OS ==="ios" ? 0.3 : 0.1,
    borderRadius: rw(3),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 10,
    width: Responsive.widthPx(30),
  },
  buttonText: {
    color: "black",
    marginLeft: rw(1.5),
    fontSize: rh(1.8),
    width: Responsive.widthPx(13),
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginVertical: Responsive.heightPx(2),
    marginRight: Responsive.widthPx(3),
    width: Responsive.widthPx(70),
  },
  tag: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.whiteColor,
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.5),
    margin: rw(1),
    borderRadius: 20,
    backgroundColor: Colors.primaryButtonColor,
  },
});
