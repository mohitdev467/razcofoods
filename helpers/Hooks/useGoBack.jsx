import { useNavigation } from "@react-navigation/native";

const useGoBack = () => {
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.warn("Can't go back, no history available!");
    }
  };

  return goBack;
};

export default useGoBack;
