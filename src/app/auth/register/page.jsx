"use client";
import "@/styles/global.css";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import JobSeekerCT from "@/components/content/jobSeeker";
import EmployerCT from "@/components/content/employeer";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { push } = useRouter();
  const [check, setCheck] = useState("candidate");
  const handleSelect = () => {
    if (check === "employer") {
      setCheck("candidate");
    } else {
      setCheck("employer");
    }
  };

  const styles = {
    selectedFrame:
      "bg-white p-6 rounded-lg flex-grow text-center mb-12 cursor-pointer transition-colors duration-200 border border-blue-500",
    selectedCheck:
      "rounded-full border-2 border-gray-200 w-8 h-8 flex items-center justify-center bg-blue-500 border-blue-500",
    frame:
      "bg-white p-6 rounded-lg flex-grow text-center mb-12 cursor-pointer transition-colors duration-200 border",
    check:
      "rounded-full border-2 border-gray-200 w-8 h-8 flex items-center justify-center",
  };

  return (
    <div className="flex flex-row">
      <div className="basis-4/12 min-h-screen bg-blue-700 md:w-auth-small hidden md:flex flex-col">
        <a href="/" className="block px-16 pt-12 cursor-pointer mb-16">
          <div className="flex justify-center items-center gap-x-3">
            <Image
              src="/images/logonobg.png"
              width={60}
              height={80}
              alt="logo"
            />
            <p className="text-white text-xl font-bold hover:text-sky-600">
              Job Platform
            </p>
          </div>
        </a>
        {check === "candidate" ? <JobSeekerCT /> : <EmployerCT />}
      </div>
      <section className="basis-8/12 bg-gray-50 flex-grow flex flex-col min-h-screen px-6 md:px-0">
        <div className="flex justify-center items-center md:justify-end md:px-14 md:py-10 gap-2 text-gray-600">
          <span>Already have an account?</span>
          <a href="/auth/login">
            <span className="text-blue-500">Sign in</span>
          </a>
        </div>
        <div className="mx-auto flex-grow grid grid-cols-2 max-w-lg md:mt-20 w-full gap-5 mt-10 md:mt-0">
          <div>
            <div
              onClick={handleSelect}
              className={
                check === "candidate" ? styles.selectedFrame : styles.frame
              }
            >
              <div className="text-2xl mb-6">
                <div className="flex justify-end mb-4">
                  <div
                    className={
                      check === "candidate"
                        ? styles.selectedCheck
                        : styles.check
                    }
                  >
                    <AiOutlineCheck className="text-white" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/jobseeker.svg"
                    width={76}
                    height={76}
                    alt="seeker"
                  />
                </div>
                <div className="font-medium mb-2 text-lg md:text-2xl">
                  Job Seeker
                </div>
                <div className="text-sm text-gray-500">Looking for a job?</div>
              </div>
            </div>
            {check === "candidate" && (
              <Button
                variant="blue"
                size="lg"
                className="w-full"
                onClick={() => push("/auth/register/candidate")}
              >
                Next
              </Button>
            )}
          </div>

          <div>
            <div
              onClick={handleSelect}
              className={
                check === "employer" ? styles.selectedFrame : styles.frame
              }
            >
              <div className="text-2xl mb-6">
                <div className="flex justify-end mb-4">
                  <div
                    className={
                      check === "employer" ? styles.selectedCheck : styles.check
                    }
                  >
                    <AiOutlineCheck className="text-white" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/employer.svg"
                    width={76}
                    height={76}
                    alt="seeker"
                  />
                </div>
                <div className="font-medium mb-2 text-lg md:text-2xl">
                  Employer
                </div>
                <div className="text-sm text-gray-500">
                  Hiring a new employee?
                </div>
              </div>
            </div>
            {check === "employer" && (
              <Button
                variant="blue"
                size="lg"
                className="w-full"
                onClick={() => push("/auth/register/employer")}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
