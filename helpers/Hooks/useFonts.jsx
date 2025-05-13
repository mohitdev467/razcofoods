import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    ExtraBold: require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
