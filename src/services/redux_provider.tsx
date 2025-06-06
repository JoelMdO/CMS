// components/ReduxProvider.tsx
"use client";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./../store/store";

const store = makeStore();

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
