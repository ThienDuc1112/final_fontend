"use client";
import React, { useState } from "react";
import Sidebar from "@/components/business/Sidebar";
import Header from "@/Layout/header";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="relative flex flex-col default-color">
        <Header />
        <div className="flex overflow-visible mt-[116px] mb-[100px]">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div>
            <div className="ml-[230px] max-w-screen-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
