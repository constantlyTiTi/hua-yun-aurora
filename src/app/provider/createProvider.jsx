"use client";
import { Provider } from "react-redux";
import React from "react";
import store from "../store/store";

const LocaleProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default LocaleProvider;
