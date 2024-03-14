"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { useGetApplicationDetailQuery } from "@/Context/features/application/applicationApiSlice";
import { useGetInterviewListQuery } from "@/Context/features/interview/interviewApiSlice";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import HelpFunctions from "@/utils/functions";
import MyCommand from "@/components/business/myCommand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInterviewSchedule,
  selectMeetingUrl,
  selectNotify,
  selectTrigger,
  setInterviewSchedule,
} from "@/Context/features/interview/interviewDetailSlice";

export default function Detail({ params }) {
  const dispatch = useDispatch();
  const schedule = useSelector(selectInterviewSchedule);
  const meetingUrl = useSelector(selectMeetingUrl);
  const notifyMess = useSelector(selectNotify);
  const trigger = useSelector(selectTrigger);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useGetApplicationDetailQuery({
    id: params.id,
  });
  const {
    data: interviewData,
    isLoading: isLoading2,
    error: error2,
  } = useGetInterviewListQuery({ appId: params.id });
  console.log(schedule);
  if (interviewData !== undefined) {
    if (interviewData.length !== 0) {
      dispatch(setInterviewSchedule(interviewData[0].InterviewTime));
    }
  }
  const notify = () => {
    toast.success(notifyMess, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  console.log(meetingUrl);

  useEffect(() => {
    if (notifyMess !== null && notifyMess !== "") {
      notify();
    }
  }, [trigger]);

  const url = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";
  let avatarPath = "/images/mya.jpg";
  let logoPath = "/images/mylogo.png";
  if (data) {
    avatarPath = url + data.avatarUrl;
    logoPath = url + data.logoUrl;
  }

  return (
    <DefaultLayout>
      {loading || isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[700px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px]">
          <div className="mx-5">
            <h2>Processing Job Application</h2>
            <p className="text-base font-normal">
              {" "}
              Streamline Your Job Application Workflow{" "}
            </p>
            <div className="mt-10 py-5 px-5 bg-white border rounded-lg shadow-md xl:min-w-[1300px]">
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
                        <span className="text-gray-500 text-sm font-normal">
                          Number of Applying: {data && data.appliedNumber}
                        </span>
                        <span className="text-gray-500 text-sm font-normal">
                          Number of Accepted: {data && data.acceptedNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col items-center">
                      <h3 className="text-black text-lg font-medium mb-2">
                        Interview Schedule
                      </h3>
                      <div className="px-4 rounded-xl font-small mt-[10px] bg-gray-100 max-w-[150px]">
                        {schedule === null ? (
                          <span className="text-gray-700 text-base">
                            No Schedule
                          </span>
                        ) : (
                          <div>{HelpFunctions.formatTimeAndDate(schedule)}</div>
                        )}
                      </div>
                      <div className="px-4 rounded-xl font-small mt-[20px] bg-gray-100 max-w-[170px]">
                        {meetingUrl === null ? (
                          <span className="text-gray-700 text-base">
                            No Meeting Room
                          </span>
                        ) : (
                          <Link
                            href={meetingUrl}
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
                            : data.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-600"
                            : ""
                        }`}
                      >
                        {data.status}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-end ">
                      <MyCommand />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </DefaultLayout>
  );
}
