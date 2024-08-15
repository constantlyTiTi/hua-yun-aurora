import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LOCALE } from "@/app/const/locale";

export const localeSlice = createSlice({
  name: "locale",
  initialState: {
    value: DEFAULT_LOCALE,
  },
  reducers: {
    setLocale: (state, action) => {
      console.log("setLocale", action, "state", state);
      state.value = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
