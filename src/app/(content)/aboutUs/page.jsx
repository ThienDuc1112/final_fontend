"use client";
import { useEffect, useState } from "react";

export default function Content() {
  return (
    <div className="bg-gray-100 section-box mt-[200px] mb-[400px]">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <div className="flex flex-col items-center pl-[60px]">
        <p className="text-gray-800 ml-5 text-xl">
          Welcome to our recruitment platform! We are dedicated to connecting talented job seekers with
          top companies and providing a seamless hiring experience. Our mission is to simplify the job
          search process and help both candidates and employers find their perfect match.
        </p>
        <p className="text-gray-800 mt-4 ml-5 text-xl">
          Whether you are a skilled professional seeking new opportunities or an employer looking for
          exceptional talent, our platform offers a range of features to streamline the recruitment process.
          From job listings and resume submissions to candidate screening and interviews, we have got you covered!
        </p>
        <p className="text-gray-800 mt-4 ml-5 text-xl">
          Our team is passionate about fostering meaningful connections and empowering individuals to achieve
          their career goals. We strive to provide a user-friendly experience and ensure transparency and fairness
          throughout the hiring process. Join us and let shape the future of recruitment together!
        </p>
        </div>
      </div>
    </div>
  );
}
