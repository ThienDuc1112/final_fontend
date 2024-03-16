"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { PiFileMagnifyingGlassBold } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { AiOutlineNotification } from "react-icons/ai";
import { useGetApplicationDetailQuery } from "@/Context/features/application/applicationApiSlice";
import { useGetInterviewListQuery } from "@/Context/features/interview/interviewApiSlice";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import HelpFunctions from "@/utils/functions";

export default function Detail({ params }) {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const { data, isLoading, error } = useGetApplicationDetailQuery({
    id: params.id,
  });
  console.log(data);
  const {
    data: interviewData,
    isLoading: isLoading2,
    error: error2,
  } = useGetInterviewListQuery({ appId: params.id });

  useEffect(() => {
    if (interviewData !== undefined && interviewData.length !== 0) {
      setSchedule(interviewData[0].interviewTime);
    }
  }, [interviewData]);

  const url = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";
  let avatarPath = "/images/mya.jpg";
  let logoPath = "/images/mylogo.png";
  if (data) {
    avatarPath = url + data.avatarUrl;
    logoPath = url + data.logoUrl;
  }

  return (
    <section className="section-box mt-[10px] relative">
      {loading || isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[300px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[1100px] mx-auto my-[200px]">
          <div className="mx-5">
            <h2>Managing your Job Application</h2>
            <p className="text-base font-normal">
              {" "}
              Streamline Your Job Application Workflow{" "}
            </p>
            <div className="mt-10 py-5 px-5 bg-white border rounded-lg shadow-md xl:min-w-[1100px]">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2">
                    <div className="flex gap-7 justify-start pl-1">
                      <div>
                        <Image
                          src={avatarPath}
                          width={100}
                          height={100}
                          alt="avatar"
                          className="rounded-full "
                        />
                      </div>
                      <div className="flex flex-col gap-1 pl-[20px]">
                        <h3 className="text-black text-lg font-medium mb-1">
                          Candidate: {data && data.fullName}
                        </h3>
                        <span className="text-gray-500 text-sm font-normal">
                          Current Position: {data && data.title}
                        </span>
                        <span className="text-gray-500 text-sm font-normal">
                          Email: {data && data.email}
                        </span>
                        <span className="text-gray-500 text-sm font-normal">
                          Applied Time:{" "}
                          {data &&
                            HelpFunctions.convertToDayMonthYear(
                              data.createdDate
                            )}
                        </span>
                        <span className="text-gray-500 text-sm font-normal">
                          Email: {data && data.email}
                        </span>
                        <Link
                          href={`/resumeDetail/${data.resumeId}`}
                          target="_blank"
                          className="px-2 rounded-xl font-small mt-[20px] bg-gray-100 max-w-[140px]"
                        >
                          <div className="flex items-center flex-center gap-2">
                            <span className="text-gray-800 underline text-sm">
                              View Resume
                            </span>
                            <FaArrowUpRightFromSquare color="#4b5563" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="mt-[40px] flex gap-7 justify-start pl-1">
                      <div>
                        <Image
                          src={logoPath}
                          width={120}
                          height={100}
                          alt="avatar"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-black text-lg font-medium mb-1">
                          Company: {data && data.businessName}
                        </h3>
                        <p className="text-gray-500 text-sm font-normal">
                          Job:
                          <Link
                            className="underline pl-1"
                            href={data ? `/jobs/${data.jobId}` : ""}
                          >
                            {data && data.jobTitle}
                          </Link>
                        </p>
                        <span className="text-gray-500 text-sm font-normal">
                          Number of Recruitment:{" "}
                          {data && data.numberRecruitment}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex flex-col items-center">
                      <h3 className="text-black text-lg font-medium mb-2">
                        Interview Schedule
                      </h3>
                      <div className="px-4 rounded-xl font-small mt-[10px] bg-gray-100 max-w-[240px]">
                        {schedule === null ? (
                          <span className="text-gray-700 text-base">
                            No Schedule
                          </span>
                        ) : (
                          <div className="text-blue-600 text-sm">
                            {HelpFunctions.formatTimeAndDate(schedule)} (UTC+0)
                          </div>
                        )}
                      </div>
                      <div className="px-4 rounded-xl font-small mt-[20px] bg-gray-100 max-w-[170px]">
                        {data.url === null ? (
                          <span className="text-gray-700 text-base">
                            No Meeting Room
                          </span>
                        ) : (
                          <Link
                            href={data.url}
                            target="_blank"
                            className="underline px-2 py-1 text-blue-600 text-sm"
                          >
                            Meeting Room
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-[50px]">
                      <h3 className="text-black text-lg font-medium mb-2">
                        Job Application Status
                      </h3>
                      <p
                        className={`p-2 mt-4 rounded-lg font-medium ${
                          data.status === "Accepted"
                            ? "bg-emerald-100 text-emerald-600"
                            : data.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {data.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* interview process */}
              <div className="div mt-[70px] mb-[20px]">
                <hr />
                <p className="mt-5 text-lg font-medium ml-5">
                  Process of Interview
                </p>
                <div class="relative before:absolute before:inset-0 before:ml-[47px] before:w-0.5 before:bg-gray-200 before:z-0 before:border-dashed before:border before:border-gray-300">
                  <div className="ml-5 flex flex-col justify-center mt-5">
                    <div className="mb-[35px] z-20 flex items-center gap-6">
                      <div
                        className={`rounded-full p-4 ${
                          data.status !== "Pending"
                            ? "bg-blue-100"
                            : "bg-emerald-100"
                        }`}
                      >
                        <BsFillClipboard2CheckFill
                          size={24}
                          color={`${
                            data.status !== "Pending" ? "#2563eb" : "#22c55e"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5
                          className={`text-lg ${
                            data.status !== "Pending"
                              ? "text-blue-500"
                              : "text-emerald-500"
                          }`}
                        >
                          Candidate Applying (Pending)
                        </h5>
                        <p className="text-sm italic text-gray-500">
                          Resumes are waiting to be screened
                        </p>
                      </div>
                    </div>
                    {/* ////// */}
                    <div className="mb-[35px] z-20 flex items-center gap-6">
                      <div
                        className={`rounded-full p-4 ${
                          data.status !== "Shortlisted"
                            ? "bg-blue-100"
                            : "bg-emerald-100"
                        }`}
                      >
                        <PiFileMagnifyingGlassBold
                          size={24}
                          color={`${
                            data.status !== "Shortlisted"
                              ? "#2563eb"
                              : "#22c55e"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5
                          className={`text-lg ${
                            data.status !== "Shortlisted"
                              ? "text-blue-500"
                              : "text-emerald-500"
                          }`}
                        >
                          Business Screening (Shortlisted)
                        </h5>
                        <p className="text-sm italic text-gray-500">
                          Business screens and evaluates resumes to select
                          candidates for the next step
                        </p>
                      </div>
                    </div>
                    {/* ////// */}
                    <div className="mb-[35px] z-20 flex items-center gap-6">
                      <div
                        className={`rounded-full p-4 ${
                          data.status !== "Interviewing"
                            ? "bg-blue-100"
                            : "bg-emerald-100"
                        }`}
                      >
                        <FaRegCalendarCheck
                          size={24}
                          color={`${
                            data.status !== "Interviewing"
                              ? "#2563eb"
                              : "#22c55e"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5
                          className={`text-lg ${
                            data.status === "Interviewing"
                              ? "text-emerald-500"
                              : "text-blue-500"
                          }`}
                        >
                          Interview Process (Interviewing)
                        </h5>
                        <p className="text-sm italic text-gray-500">
                          Business sets up schedules and room meeting
                        </p>
                      </div>
                    </div>
                    {/* ////// */}
                    <div className=" z-20 flex items-center gap-6">
                      <div
                        className={`rounded-full p-4 ${
                          data.status === "Accepted"
                            ? "bg-emerald-100"
                            : data.status === "Rejected"
                            ? "bg-rose-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <AiOutlineNotification
                          size={24}
                          color={`${
                            data.status === "Accepted"
                              ? "#22c55e"
                              : data.status === "Rejected"
                              ? "#f43f5e"
                              : "#3b82f6"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5
                          className={`text-lg ${
                            data.status === "Accepted"
                              ? "text-emerald-500"
                              : data.status === "Rejected"
                              ? "text-rose-100"
                              : "bg-blue-100"
                          }`}
                        >
                          Interview Result (Accepted/Rejected)
                        </h5>
                        <p className="text-sm italic text-gray-500">
                          Business notifies the result to candidates
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
