import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import { useAllCategories } from "../../helpers/Hooks/useAllCategories";
import { useSubCategoriesByCategoryId } from "../../helpers/Hooks/useSubCategoriesById";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { ActivityIndicator, Checkbox, RadioButton } from "react-native-paper";
import { Colors } from "../../helpers/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const FilterScreen = ({ setShowFilter, setSelected, selected, products }) => {
  const [expanded, setExpanded] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { categories, loading: loadingCategories } = useAllCategories();
  const [selectedLocal, setSelectedLocal] = useState([]);

  const { subcategories, loading, error } =
    useSubCategoriesByCategoryId(selectedCategoryId);

  const toggleCategory = (id, category) => {
    if (expanded === id) {
      setExpanded(null);
      setSelectedCategoryId(null);
    } else {
      setExpanded(id);
      setSelectedCategoryId(id);
    }
  };
  const toggleSub = (sub) => {
    setSelectedLocal((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const applyFilters = () => {
    setSelected(selectedLocal); // store globally
    setShowFilter(false);
  };
  const goBack = () => {
    setShowFilter(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginTop: 20 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={rh(3)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <View style={{ width: rh(3) }} />
        </View>

        {selectedLocal?.length > 0 && (
          <View style={styles.activeFilter}>
            <View
              style={{
                flexDirection: "row",
                gap: Responsive.widthPx(4),
                marginVertical: Responsive.heightPx(2),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelected([]), setSelectedLocal([]);
                }}
                style={[
                  styles.actionButtons,
                  { backgroundColor: Colors.errorColor },
                ]}
              >
                <Text style={styles.clearAll}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={applyFilters}
                style={styles.actionButtons}
              >
                <Text style={styles.applyFilters}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.selectedContainer}>
          {selectedLocal?.map((item) => (
            <View key={item} style={styles.tag}>
              <Text style={styles.itemStyle}>{item}</Text>
              <TouchableOpacity onPress={() => toggleSub(item)}>
                <Text
                  style={{
                    marginLeft: 10,
                    color: Colors.whiteColor,
                    fontSize: Responsive.font(4),
                    position: "relative",
                    top: -1,
                  }}
                >
                  ×
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>Categories</Text>

        {loadingCategories ? (
          <ActivityIndicator
            size="small"
            color={Colors.primaryButtonColor}
            style={{ marginTop: 20 }}
          />
        ) : (
          categories?.data?.map(
            (category) => (
              (
                <View key={category._id} style={styles.categoryBox}>
                  <TouchableOpacity
                    onPress={() => toggleCategory(category._id, category)}
                    style={styles.categoryHeader}
                  >
                    <Image
                      source={
                        typeof category?.image === "string"
                          ? { uri: `${IMAGE_BASE_URL}${category?.image}` }
                          : category?.image || ImagePicker.PlaceholderImage
                      }
                      style={styles.emoji}
                    />
                    <Text style={styles.categoryTitle}>{category.name}</Text>
                    {(subcategories?.length || 0) > 0 ? (
                      expanded === category._id ? (
                        <Icon name="chevron-up" size={rh(3)} color="#000" />
                      ) : (
                        <Icon name="chevron-down" size={rh(3)} color="#000" />
                      )
                    ) : null}
                  </TouchableOpacity>

                  {expanded === category._id && (
                    <View style={styles.subList}>
                      {loading ? (
                        <Text
                          style={{
                            textAlign: "center",
                            marginBottom: Responsive.heightPx(2),
                          }}
                        >
                          Loading...
                        </Text>
                      ) : error ? (
                        <Text style={{ color: "red" }}>{error}</Text>
                      ) : subcategories && subcategories.length > 0 ? (
                        subcategories?.map(
                          (item, idx) => (
                            (
                              <TouchableOpacity
                                key={idx}
                                onPress={() => toggleSub(item.slug)}
                                style={styles.subItem}
                              >
                                <Text style={styles.subCategoryNameStyle}>
                                  {item.subcategoryName}
                                </Text>
                                <Checkbox
                                  status={
                                    selectedLocal.includes(item.slug)
                                      ? "checked"
                                      : "unchecked"
                                  }
                                  onPress={() => toggleSub(item.slug)}
                                  color={Colors.primaryButtonColor}
                                />
                              </TouchableOpacity>
                            )
                          )
                        )
                      ) : (
                        <TouchableOpacity
                          onPress={() => toggleSub(category.slug)}
                          style={styles.subItem}
                        >
                          <Text style={styles.subCategoryNameStyle}>
                            {category.name}
                          </Text>
                          <Checkbox
                            status={
                              selectedLocal.includes(category.slug)
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => toggleSub(category.slug)}
                            color={Colors.primaryButtonColor}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              )
            )
          )
        )}

        {/* <Text style={styles.resultCount}>{2,683 Items Found}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive.widthPx(4),
    backgroundColor: Colors.whiteColor,
  },

  subCategoryNameStyle: {
    width: "90%",
    fontSize: Responsive.font(3.5),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: rh(0),
  },

  title: {
    fontSize: rh(2.5),
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontWeight: "bold",
    fontSize: rh(2),
    marginTop: rh(2),
  },

  clearAll: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(3.5),
    width: Responsive.widthPx(18),

  },
  applyFilters: {
    color: Colors.whiteColor,
    fontSize: Responsive.font(3.5),
    width: Responsive.widthPx(23),
  },

  activeFilter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: rh(1),
  },

  actionButtons: {
    backgroundColor: Colors.primaryButtonColor,
    paddingHorizontal: Responsive.widthPx(4),
    paddingVertical: Responsive.heightPx(1),
    borderRadius: 50,
  },

  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: rh(1.5),
  },

  tag: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderColor: Colors.primaryButtonColor,
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.5),
    margin: 5,
    borderRadius: 20,
    backgroundColor: Colors.primaryButtonColor,
  },

  categoryBox: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    marginTop: rh(1),
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: rw(4),
    alignItems: "center",
  },

  emoji: {
    height: Responsive.heightPx(4),
    width: Responsive.widthPx(8),
    fontSize: rh(2.5),
    resizeMode: "contain",
  },

  categoryTitle: {
    flex: 1,
    marginLeft: rw(2),
    fontSize: rh(2),
  },

  subList: { paddingLeft: rw(4) },

  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: rh(1),
    paddingRight: rw(4),
  },

  checkbox: {
    width: rw(5),
    height: rw(5),
    borderRadius: rw(2.5),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  resultCount: {
    textAlign: "center",
    marginVertical: rh(4),
    fontWeight: "bold",
    fontSize: rh(2),
  },

  itemStyle: {
    minWidth: Responsive.widthPx(8),
    fontFamily: "SemiBold",
    color: Colors.whiteColor,
  },
});

export default FilterScreen;
