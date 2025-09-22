"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
