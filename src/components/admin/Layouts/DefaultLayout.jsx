"use client";
import "@/styles/global.css";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header/adminHeader";

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className="relative flex h-screen default-color">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <Header />
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
