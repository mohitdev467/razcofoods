export const API_ENDPOINTS = {
  registerUser: "user",
  verifyOtp: "user/verify-email",
  verifyOtpForgotPassword: "user/verify-otp",
  loginUser: "user/login",
  heroBannersAll: "hero_section/get-all",
  superDiscountBanner: "super_discount/get-all",
  weeklyDealBanners: "weekly_deal/get-all",
  bestDealBanner: "best_deal/get-all",
  bannerCardSmall: "banner_card/get-all",
  changePasswordEndPoint: "user/change-password",
  getAllCategories: "category/active",
  createOrder: "order",
  getSubCategoryById: (id) => `subcategory/get/by-category/${id}`,
  getPromoCode: (id) => `coupon/code/${id}`,

  getAllProductsByPagination: (page, pageSize) =>
    `/product/get-all/pagination/${page}/${pageSize}`,
  userUpdateProfile: (id) => `user/update-profile/${id}`,
  userDetailsById: (id) => `user/${id}`,

  getProductbyCategory: (category, limit, page) =>
    `product/search_by_category/pagination/${category}/${limit}/${page}`,
  getAllOrderWithPagination: (userId) => `order/user/${userId}`,

  trainerDetailsById: (trainerId) => `user/trainer/byId/${trainerId}`,
  searchingProduct: (query) => `/product/elastic/search/${query}`,
  getProductById: (id) => `product/get/${id}`,
  checkEmail: (email) => `user/check-duplicate-email/${email}`,
  checkPhoneNumber: (email) => `user/check-duplicate-phone/${email}`,
  userContact: (id) => `user/contact/${id}`,
  forgetPassword: `user/forget-password`,
  resetPassword: `user/reset-password`,
  conatctUsApi: `contact-us`,
  getAllBlogs: `blog/get-all`,
};
