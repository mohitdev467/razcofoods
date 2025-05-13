import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../helpers/theme/colors";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { commonContent } from "../../constants/CommonContent/CommonContent";
import { handleSearchProduct } from "../../services/HomeServices/HomeServices";
import { debounce } from "lodash";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";

const SearchInput = ({
  value,
  onChangeText,
  placeholder = commonContent.searchFieldPlaceholder,
}) => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = debounce(async (text) => {
    if (!text) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setShowResults(true);
    try {
      const result = await handleSearchProduct(text);
      setSearchResults(result?.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setLoading(false);
  }, 500);

  useEffect(() => {
    debouncedSearch(value);
  }, [value]);

  return (
    <View>
      <View style={styles.container}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="gray"
        />
        {value?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onChangeText("");
              setSearchResults([]);
              setShowResults(false);
            }}
            style={styles.clearButton}
          >
            <Icon name="close" style={styles.iconClear} />
          </TouchableOpacity>
        )}
      </View>

      {showResults && (
        <View style={styles.resultWrapper}>
          {loading ? (
            <ActivityIndicator color={Colors.primaryButtonColor} size="small" />
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() =>
                    navigation.navigate(screenNames.ProductsDetailsScreen, {
                      productData: item,
                    })
                  }
                >
                  <Image
                    source={
                      typeof item._source?.productImage[0] === "string"
                        ? { uri: item._source?.productImage[0] }
                        : ImagePicker.PlaceholderImage
                    }
                    style={styles.imageProduct}
                  />
                  <Text style={styles.resultText}>
                    {item._source.productName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noResultText}>No results found</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(0),
    marginHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(3),
    height: Responsive.heightPx(6),
  },
  icon: {
    fontSize: Responsive.font(4),
    marginRight: Responsive.widthPx(2),
    color: Colors.blackColor,
  },
  input: {
    flex: 1,
    fontSize: Responsive.font(3.5),
    color: Colors.blackColor,
    fontFamily: "Regular",
  },
  clearButton: {
    marginLeft: Responsive.widthPx(2),
    padding: 4,
  },
  iconClear: {
    fontSize: Responsive.font(4),
  },
  resultWrapper: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    marginHorizontal: Responsive.widthPx(5),
    padding: 10,
    elevation: 3,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxHeight: Responsive.heightPx(40),
    marginBottom: Responsive.heightPx(1.5),
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  resultText: {
    fontSize: Responsive.font(3.3),
    color: Colors.blackColor,
  },
  noResultText: {
    textAlign: "center",
    color: "gray",
    paddingVertical: 10,
  },

  imageProduct: {
    height: Responsive.widthPx(8),
    width: Responsive.widthPx(16),
    resizeMode: "contain",
  },
});
