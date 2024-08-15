import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LOCALE } from "@/app/const/locale";

export const localeSlice = createSlice({
  name: "locale",
  initialState: {
    value: DEFAULT_LOCALE,
  },
  reducers: {
    setLocale: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
