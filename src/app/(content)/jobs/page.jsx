"use client";
import { useState } from "react";
import MainBanner from "@/components/content/mainBanner";
import ListJob from "@/components/content/listJob";

export default function Job() {
  return (
    <div className="pt-10">
      <MainBanner />
      <ListJob />
    </div>
  );
}
