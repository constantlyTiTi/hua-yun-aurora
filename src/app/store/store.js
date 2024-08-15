import { configureStore } from "@reduxjs/toolkit";
import localeSlice from "@/app/slice/localeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, localeSlice);

export const store = configureStore({
  reducer: {
    locale: persistedReducer,
  },
});

export const persistor = persistStore(store);
