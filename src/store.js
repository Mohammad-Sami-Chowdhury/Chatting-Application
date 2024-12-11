import { configureStore } from "@reduxjs/toolkit";
import userLoginInfo from "./slices/userSlice";

export default configureStore({
  reducer: {
    userDetails: userLoginInfo,
  },
});
