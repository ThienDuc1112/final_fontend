"use client";
import { useState } from "react";
import MainBanner from "@/components/content/mainBanner";
import JobArea from "@/components/content/jobArea";

export default function Job() {
  return (
    <div className="pt-10">
      <MainBanner />
      <JobArea />
    </div>
  );
}
