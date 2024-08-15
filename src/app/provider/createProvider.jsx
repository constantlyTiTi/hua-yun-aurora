"use client";
import { Provider } from "react-redux";
import React from "react";
import { store, persistor } from "@/app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "../Loading";

const LocaleProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default LocaleProvider;
