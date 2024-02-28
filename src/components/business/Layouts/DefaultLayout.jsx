"use client";
import React, { useState } from "react";
import Sidebar from "@/components/business/Sidebar";
import Header from "@/Layout/header";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="relative flex flex-1 flex-col">
        <Header />
        <div className="flex h-screen overflow-hidden mt-[116px]">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div>
            <div className="ml-[230px] max-w-screen-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
