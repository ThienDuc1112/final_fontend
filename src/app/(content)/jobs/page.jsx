"use client";
import { useEffect } from "react";
import MainBanner from "@/components/content/mainBanner";
import JobArea from "@/components/content/jobArea";
import { useSearchParams } from "next/navigation";

export default function Job() {
  return (
    <div className="pt-10">
      <MainBanner />
      <JobArea />
    </div>
  );
}
