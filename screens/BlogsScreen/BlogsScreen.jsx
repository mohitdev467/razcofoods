import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import { getAllBlogs } from "../../services/BlogsServices/BlogsServices";
import Loader from "../../Components/CommonComponents/Loader";
import { IMAGE_BASE_URL } from "../../services/Api/axiosInstance";
import { cleanImagePath } from "../../Utilities/CommonUtils/CommonUtils";
import { SafeAreaView } from "react-native-safe-area-context";

const BlogsScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response?.data) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack title={"Blogs"} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.imageWrapper}>
          <Image source={ImagePicker.blogsPageBanner} style={styles.image} />
        </View>

        {loading ? (
          <Loader visible={loading} />
        ) : (
          blogs.map((blog, index) => {
            const isExpanded = expandedIndex === index;
            const previewText = blog?.description.slice(0, 100);
            return (
              <View key={index} style={styles.contentWrapper}>
                <Image
                  source={
                    typeof blog?.companyImage === "string"
                      ? {
                          uri: `${IMAGE_BASE_URL}${blog.companyImage}`,
                        }
                      : blog.companyImage || ImagePicker.PlaceholderImage
                  }
                  style={styles.imageBlog}
                  resizeMode="cover"
                />
                <Text style={styles.headingStyle}>{blog.title}</Text>

                <Text style={styles.content}>
                  {isExpanded ? blog.description : `${previewText}... `}
                  {blog.description.length > 120 && (
                    <Text
                      style={styles.readMoreLess}
                      onPress={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                    >
                      {isExpanded ? " Read less" : " Read more"}
                    </Text>
                  )}
                </Text>
              </View>
            );
          })
        )}

        <EarnPointsCard />

        <RazcoFoodDescription />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  imageWrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },

  image: {
    height: Responsive.heightPx(20),
    width: Responsive.widthPx(110),
    resizeMode: "stretch",
  },
  imageBlog: {
    height: Responsive.heightPx(20),
    resizeMode: "contain",
    marginBottom: Responsive.heightPx(1),
    marginTop: Responsive.heightPx(2),
  },
  text: {
    position: "absolute",
    top: Responsive.heightPx(1),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(4),
    width: Responsive.widthPx(40),
    marginLeft: Responsive.widthPx(3),
  },
  text2: {
    position: "absolute",
    top: Responsive.heightPx(9),
    fontFamily: "SemiBold",
    fontSize: Responsive.font(3),
    width: Responsive.widthPx(65),
    marginLeft: Responsive.widthPx(3),
  },

  headingStyle: {
    fontSize: Responsive.font(5),
    color: Colors.blackColor,
    fontFamily: "SemiBold",
  },
  readMoreLess: {
    color: Colors.primaryButtonColor,
    fontFamily: "Bold",
  },
  contentWrapper: {
    paddingHorizontal: Responsive.widthPx(6),
    paddingVertical: Responsive.heightPx(0),
    marginTop: Responsive.heightPx(3),
    width: Responsive.widthPx(92),
    elevation: 3,
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  content: {
    fontSize: Responsive.font(3.7),
    fontFamily: "Regular",
    flexDirection: "column",
    paddingVertical: Responsive.heightPx(1),
    color: Colors.blackColor,
  },

  location: {
    fontSize: Responsive.font(3.5),
    color: "grey",
    fontFamily: "SemiBold",
    marginTop: Responsive.heightPx(0.5),
  },
  locationWrapper: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  loginInputWrapper: {
    paddingHorizontal: Responsive.widthPx(5),
    marginTop: Responsive.heightPx(2),
  },

  containerStyle: {
    marginBottom: Responsive.heightPx(1),
    borderRadius: 20,
  },

  labelStyle: {
    color: Colors.secondaryBlackColor,
    fontSize: Responsive.font(3.5),
    marginBottom: Responsive.heightPx(1),
  },
  inputStyle: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Colors.skyBlueColor,
    height: Responsive.heightPx(7),
    borderRadius: 10,
  },
  buttonStyle: {
    marginBottom: Responsive.heightPx(4),
    marginVertical: Responsive.heightPx(4),
  },
  dropdownStyle: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    paddingVertical: Responsive.heightPx(2),
    borderRadius: 10,
  },
  selectContainerStyle: {
    marginVertical: Responsive.heightPx(2),
    backgroundColor: Colors.whiteColor,
  },
  errorText: {
    color: "red",
    marginTop: Responsive.heightPx(1),
    fontSize: Responsive.font(3),
  },
});
