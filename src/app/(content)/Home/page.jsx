import Link from "next/link";
import React from "react";
import Banner from "@/components/content/banner";
import JobBanner from "@/components/content/jobBanner";
import SubBanner from "@/components/content/subbanner";
import PageBanner from "@/components/content/pageBanner";
import Guide from "@/components/content/guide";
import LetterBox from "@/components/content/letterBox";
export default function Home() {
  return (
    <>
      <Banner />
      <JobBanner />
      <SubBanner />
      <Guide />
      <PageBanner />
      <LetterBox />
    </>
  );
}
