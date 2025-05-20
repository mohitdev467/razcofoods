import { showMessage } from "react-native-flash-message";
import { Colors } from "../theme/colors";
import Responsive from "../ResponsiveDimensions/Responsive";
import { Platform } from "react-native";

const errorHandler = (error) => {
  const errorMessage = error?.response?.data?.message || error;

  showMessage({
    message: "Error",
    description: errorMessage,
    type: "danger",
    icon: "auto",
    duration: 3000,

    style: {
      backgroundColor: Colors.errorColor,
      borderRadius: 10,
      padding: 15,
      marginTop:Platform.OS === "ios" ? Responsive.heightPx(0) : Responsive.heightPx(3)
      
    },
    titleStyle: {
      fontSize: Responsive.font(4),
      fontFamily: "Bold",
      color: Colors.whiteColor,
    },
    textStyle: {
      fontSize: Responsive.font(3.5),
      fontFamily: "Regular",
      color: Colors.whiteColor,
    },
  });

  return Promise.reject(error);
};

export default errorHandler;
