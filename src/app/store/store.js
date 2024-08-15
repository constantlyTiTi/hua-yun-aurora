import { configureStore } from "@reduxjs/toolkit";
import localeSlice from "@/app/slice/localeSlice";

export default configureStore({
  reducer: {
    locale: localeSlice,
  },
});
