import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import screenNames from "../../helpers/ScreenNames/screenNames";

export const commonContent = {
  // Validation Messages

  unexpectedError: "An unexpected error occurred",
  pleaseFillAllFields: "Please fill all fields",
  invalidCredentials: "Invalid credentials",
  phoneNumberRequired: "Phone number is required",
  validDigitPhoneNumber: "Enter a valid 10-digit phone number",
  passwordRequired: "Password is required",
  validPassword: "Password must be between 6 to 10 characters long",
  userLogoutSuccess: "User Logout Successfully",
  userLogoutError: "User Logout Failed",
  errorFetchingData: "Error in fetching data:",
  updateProfileHeading: "Update Profile",
};

export const genderDataOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Others", value: "OTHERS" },
];

export const homeSliderData = [
  {
    id: 1,
    image: ImagePicker.banner1,
  },
  {
    id: 2,
    image: ImagePicker.banner2,
  },
  {
    id: 3,
    image: ImagePicker.banner3,
  },
  {
    id: 4,
    image: ImagePicker.banner4,
  },
];

export const moreScreenForLogoutUser = [
  {
    id: 1,
    title: "Blogs",
    isFeather: true,
    isMore: true,
    iconName: "external-link",
    link: screenNames.BlogsScreen,
  },
  {
    id: 3,
    title: "Privacy Policy",
    isFeather: true,
    isMore: true,
    iconName: "file-minus",
    link: screenNames.PrivacyScreen,
  },

  // {
  //   id: 4,
  //   title: "Contact Us",
  //   isMore: true,
  //   iconName: "phone",
  //   link: screenNames.ContactusScreen,
  // },
  {
    id: 4,
    title: "About Us",
    isMore: true,
    isFeather: true,
    iconName: "info",
    link: screenNames.AboutusScreen,
  },
  {
    id: 5,
    title: "Terms & Conditions",
    isFeather: true,
    isMore: true,
    iconName: "clipboard",
    link: screenNames.TermsAndConditionsScreen,
  },

  {
    id: 6,
    title: "Return Policy",
    isFeather: true,
    isMore: true,
    iconName: "file-text",
    link: screenNames.ReturnPolicyScreen,
  },
  {
    id: 7,
    title: "Help & Support",
    isFeather: true,
    isMore: true,
    iconName: "headphones",
    link: screenNames.HelpSupportScreen,
  },
  // {
  //   id: 9,
  //   title: "Faq's",
  //   isMore: true,
  //   isFeather: true,
  //   iconName: "file-plus",
  //   isWebLink: true,
  //   link: "https://razcofoods.net/en/faq",
  // },
];

export const moreScreenOptonsList = [
  {
    id: 1,
    title: "Personal Information",
    isFeather: true,
    isMore: true,
    iconName: "user",
    isReedemPoints:false,
    link: screenNames.PersonalInfoScreen,
  },
  {
    id: 2,
    title: "Redeem Points",
    isFeather: true,
    isMore: false,
    isReedemPoints:true,
    iconName: "dollar-sign",
    link: screenNames.BlogsScreen,
  },
  {
    id: 3,
    title: "Blogs",
    isFeather: true,
    isMore: true,
    isReedemPoints:false,
    iconName: "external-link",
    link: screenNames.BlogsScreen,
  },
  {
    id: 4,
    title: "Privacy Policy",
    isFeather: true,
    isMore: true ,
    isReedemPoints:false,
    iconName: "file-minus",
    link: screenNames.PrivacyScreen,
  },
  {
    id: 5,
    title: "Wishlist",
    isFeather: true,
    isMore: true,
    isReedemPoints:false,
    iconName: "heart",
    link: screenNames.favouriteScreen,
  },

  {
    id: 6,
    title: "Contact Us",
    isMore: true,
    isReedemPoints:false,
    iconName: "phone",
    link: screenNames.ContactusScreen,
  },
  {
    id: 7,
    title: "About Us",
    isMore: true,
    isFeather: true,
    isReedemPoints:false,
    iconName: "info",
    link: screenNames.AboutusScreen,
  },
  {
    id: 8,
    title: "Terms & Conditions",
    isFeather: true,
    isMore: true,
    iconName: "clipboard",
    isReedemPoints:false,
    link: screenNames.TermsAndConditionsScreen,
  },
  {
    id: 9,
    title: "Order List",
    isFeather: true,
    isMore: true,
    iconName: "menu",
    isWebLink: false,
    isReedemPoints:false,
    link: screenNames.ordersListScreen,
  },
  {
    id: 10,
    title: "Return Policy",
    isFeather: true,
    isMore: true,
    iconName: "file-text",
    isReedemPoints:false,
    link: screenNames.ReturnPolicyScreen,
  },
  {
    id: 11,
    title: "Help & Support",
    isFeather: true,
    isMore: true,
    iconName: "headphones",
    isReedemPoints:false,
    link: screenNames.HelpSupportScreen,
  },
  // {
  //   id: 11,
  //   title: "Faq's",
  //   isMore: true,
  //   isFeather: true,
  //   iconName: "file-plus",
  //   isWebLink: true,
  //   link: "https://razcofoods.net/en/faq",
  // },
  {
    id: 12,
    title: "Change Password",
    isMore: true,
    isFeather: true,
    iconName: "lock",
    isReedemPoints:false,
    link: screenNames.ChangePasswordScreen,
  },
];
