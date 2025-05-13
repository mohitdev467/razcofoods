import { showMessage } from "react-native-flash-message";
import { Colors } from "../theme/colors";
import Responsive from "../ResponsiveDimensions/Responsive";

const successHandler = (response, position = "top") => {
  const successMessage = response?.data?.message || response;

  showMessage({
    message: "Success",
    description: successMessage,
    type: "success",
    icon: "auto",
    position: position,
    duration: 3000,

    style: {
      backgroundColor: Colors.greenColor,
      borderRadius: 10,
      padding: 15,
      marginTop:Responsive.heightPx(3)
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
};

export default successHandler;
