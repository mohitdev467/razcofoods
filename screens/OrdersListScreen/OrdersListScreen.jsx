import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { useAllOrders } from "../../helpers/Hooks/useAllOrders";
import Loader from "../../Components/CommonComponents/Loader";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import moment from "moment";
import { Colors } from "../../helpers/theme/colors";
import generateUniqueId, {
  getStatusStyles,
} from "../../Utilities/CommonUtils/CommonUtils";
import { ActivityIndicator } from "react-native-paper";
import screenNames from "../../helpers/ScreenNames/screenNames";
import { useNavigation } from "@react-navigation/native";
import { downloadInvoice } from "../../Components/DownloadInvoice/DownloadInvoice";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigation = useNavigation();
  const { loginData } = useAuthStorage();
  const { data: ordersData, loading, fetchOrders } = useAllOrders();

  useEffect(() => {
    fetchOrders(loginData?._id);
  }, [loginData]);

  useEffect(() => {
    if (ordersData?.data?.length > 0) {
      const lowercasedSearch = searchTerm?.toLowerCase();
      const filtered = ordersData?.data?.filter((order) => {
        const orderIdMatch = order?.orderId
          ?.toLowerCase()
          ?.includes(lowercasedSearch);

        return orderIdMatch;
      });
      setFilteredOrders(filtered);
    }
  }, [searchTerm, ordersData]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchOrders(loginData?._id);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (
      !loading &&
      ordersData?.data?.currentPage < ordersData?.data?.totalPages
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => {
    const { backgroundColor, textColor, icon } = getStatusStyles(item?.status);
    const productsNames = item?.products?.length
  ? item.products
      .map((product) => product?.product?.productName)
      .filter((name) => name) 
      .join(", ") || "No products"
  : "No products";



    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(screenNames.OrderSuccessScreen, {
            orderedData: item,
            isFromOrderHistory: true,
            productsNames: productsNames,
          })
        }
      >
        <View
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.orderNumber}>{item.orderId}</Text>
            <Text style={styles.totalAmount}>
              {"$" + ((item?.price || 0) - (item?.redeemedUSD || 0)).toFixed(2)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="store" size={rw(5)} color="#3b0764" />
            <Text style={styles.label}>
              Pickup Location:{" "}
              <Text style={styles.value}>{item?.shopLocation}</Text>
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={rw(5)} color="#3b0764" />
            <Text style={styles.label}>
              Delivery Date:{" "}
              <Text style={styles.value}>
                {moment(item?.deliveryDate).format("DD/MM/YYYY")}
              </Text>
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="access-time" size={rw(5)} color="#3b0764" />
            <Text style={styles.label}>
              Delivery Time:{" "}
              <Text style={styles.value}>{item?.deliveryTime}</Text>
            </Text>
          </View>
          <View style={styles.detailRow}>
            <FeatherIcon name="package" size={rw(5)} color="#3b0764" />
            <Text style={styles.label}>
              Product Name:{" "}
              <Text style={styles.value}>{productsNames}</Text>
            </Text>
          </View>
          {
            item?.redeemedUSD &&
            <View style={styles.detailRow}>
              <FeatherIcon name="dollar-sign" size={rw(5)} color="#3b0764" />
              <Text style={styles.label}>
                Redeem Points:{" "}
                <Text style={styles.value}>${item?.redeemedUSD?.toFixed(2)}</Text>
              </Text>
            </View>
          }

          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor }]}>
              <Icon name={icon} size={rw(4)} color={textColor} />
              <Text
                style={[
                  styles.statusText,
                  {
                    color: textColor,
                    textTransform: "capitalize",
                    width: Responsive.widthPx(20),
                  },
                ]}
              >
                {item?.status}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => downloadInvoice(item)}
            style={styles.downloadBtn}
            activeOpacity={0.7}
          >
           <View style={styles.downloadGradient}>

              <Icon name="download" size={rw(5)} color="#fff" />
              <Text style={styles.downloadText}>Download Invoice</Text>
           </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <Loader visible={loading} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <HeaderWithBack title="My Orders" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by Order ID"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
      </View>

      {filteredOrders?.length > 0  ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item, index) => generateUniqueId()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#6b21a8"]}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            loading && page > 1 ? (
              <View style={{ padding: 16 }}>
                <ActivityIndicator size="small" color="#6b21a8" />
              </View>
            ) : null
          }
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
          No orders found
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(5),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: rw(5),
    paddingBottom: rh(10),
    backgroundColor:Colors.whiteColor
  },
  card: {
    marginBottom: rh(2.5),
    borderRadius: rw(4),
    overflow: "hidden",
    elevation: 5,
    shadowColor: Colors.whiteColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryButtonColor,
    backgroundColor:Colors.whiteColor
  },
  cardGradient: {
    padding: rw(4.5),
    backgroundColor:Colors.whiteColor
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: rh(1.5),
  },
  orderNumber: {
    fontSize: rf(2.3),
    fontWeight: "700",
    color: "#1f2937",
  },
  totalAmount: {
    fontSize: rf(2.1),
    fontWeight: "600",
    color: "#1abc9c",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: rh(1),
  },
  label: {
    fontSize: rf(1.9),
    color: Colors.blackColor,
    marginLeft: rw(2),
    fontFamily: "SemiBold",
  },
  value: {
    fontFamily: "Regular",
    color: Colors.blackColor,
    marginLeft: Responsive.widthPx(2),
  },
  statusContainer: {
    alignItems: "flex-start",
    marginVertical: rh(1),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rh(0.5),
    paddingHorizontal: rw(3),
    borderRadius: rw(10),
  },
  statusText: {
    fontSize: rf(1.8),
    fontWeight: "600",
    marginLeft: rw(1.5),
  },
  downloadBtn: {
    borderRadius: rw(3),
    overflow: "hidden",
    marginTop: rh(1.5),
    backgroundColor:Colors.primaryButtonColor,
  },
  downloadGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rh(1.5),
    paddingHorizontal: rw(4),
  },
  downloadText: {
    fontSize: rf(2),
    fontWeight: "600",
    color: "#fff",
    marginLeft: rw(2),
  },
  searchContainer: {
    marginHorizontal: rw(5),
    marginBottom: rh(1.5),
    marginTop: rh(1.5),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: rw(3),
    paddingHorizontal: rw(4),
    paddingVertical: rh(1.2),
    fontSize: rf(2),
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});

export default OrderListScreen;
