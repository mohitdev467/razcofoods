import { Share } from "react-native";
import uuid from "react-native-uuid";

export const cleanImagePath = (url) => {
  if (!url) return "";
  return url.replace("/uploads", "");
};

const generateUniqueId = () => {
  return uuid.v4();
};

export default generateUniqueId;

export const getImageUrl = (item) => {
  if (item?._source?.productImage) {
    return item._source.productImage;
  }

  if (Array.isArray(item?.productImage)) {
    return item.productImage[0];
  }

  return item?.productImage || null;
};

export const updateProfileContent = {
  profileImage: require("../../assets/Images/delivery-man.png"),
  userName: "Emily Johnson",
  trainerLevel: "Pro Trainer",
  emailUser: "@emilyj",
  fullName: "Emily Johnson",
  phoneNo: "7828058757",
  specification: "Kettlebell Swings",
  address: "Vijay Nagar, Indore",
};

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const getStatusStyles = (status) => {
  switch (status) {
    case "delivered":
      return {
        backgroundColor: "#e6f4ea",
        textColor: "#2e7d32",
        icon: "check-circle",
      };
    case "pending":
      return {
        backgroundColor: "#fff3e0",
        textColor: "#f57c00",
        icon: "autorenew",
      };
    case "cancelled":
      return {
        backgroundColor: "#ffebee",
        textColor: "#d32f2f",
        icon: "cancel",
      };
    default:
      return {
        backgroundColor: "#f5f5f5",
        textColor: "#616161",
        icon: "help",
      };
  }
};

export const extractCountryCode = (fullNumber = "") => {
  const match = fullNumber.match(/^(\+\d{1,4})(.*)/);

  if (match) {
    const countryCode = match[1];
    const numberWithoutCountryCode = match[2].replace(/\s/g, "");
    return {
      countryCode,
      number: numberWithoutCountryCode,
    };
  }

  return {
    countryCode: "",
    number: fullNumber,
  };
};

export const onShare = async () => {
  try {
    const result = await Share.share({
      message: "Check out razco foods app!",
      url: "", // optional
      title: "Razco-foods",
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("Shared with activity type:", result.activityType);
      } else {
        console.log("Application shared successfully");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed");
    }
  } catch (error) {
    alert(error.message);
  }
};


