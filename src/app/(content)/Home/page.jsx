import Link from "next/link";
import React from "react";
import Banner from "@/components/content/banner";
import JobBanner from "@/components/content/jobBanner";
export default function Home() {
  return (
    <>
      <Banner />
      <JobBanner />
    </>
  );
}
