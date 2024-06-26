"use client";
import { useState, useEffect } from "react";
import Table from "@/components/business/Table";
import SmallNotification from "@/components/business/SmallNotification";
import { FaBriefcase } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";
import ApplicationList from "@/components/business/ApplicationList";
import { getBusinessID } from "@/app/api/business/api";
import TokenService from "@/utils/Token.service";
import { useGetJobDashboardQuery } from "@/Context/features/job/jobApiSlice";
import { useGetMessageQuery } from "@/Context/features/message/messageApiSlice";
import { useGetDashboardApplicationsQuery } from "@/Context/features/application/applicationApiSlice";

export default function Dashboard() {
  const { userId, role } = TokenService.getUserProfile();
  const [businessId, setBusinessId] = useState(null);
  const {
    data: jobData,
    isError,
    isLoading: isJobLoading,
  } = useGetJobDashboardQuery({ businessId: businessId });

  const {
    data: notificationData,
    isError: isError2,
    isLoading: isNotiLoading,
  } = useGetMessageQuery({ userId: userId, page: 1 });

  const {
    data: applicationData,
    error: isError3,
    isLoading: isAppLoading,
    refetch
  } = useGetDashboardApplicationsQuery({ businessId: businessId });

  const handleRefetch = (data) => {
    if (data) {
      refetch();
    }
  };

  useEffect(() =>{
    refetch();
  },[businessId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBusinessID(userId);
        TokenService.setBusinessId(response.data.id, response.data.isApproved);
        setBusinessId(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(applicationData)
  return (
    <div className="relative max-w-[1600px] mt-10 mx-10">
      {isJobLoading || isNotiLoading || isAppLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[300px] ml-[600px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-5">
            <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
              <div className="flex justify-between gap-5">
                <div
                  className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-blue-200/50 rounded-sm`}
                >
                  <FaBriefcase size={24} color="#2563eb" />
                </div>

                <div className="flex items-stretch justify-between pl-[60px]">
                  <div>
                    <h4
                      className={`text-title-md self-between font-bold text-blue-600 text-3xl pb-3 pl-4`}
                    >
                      {jobData?.totalJob !== undefined ? jobData?.totalJob : 0}
                    </h4>
                    <span className="text-md font-medium">Total Job</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
              <div className="flex justify-between gap-5">
                <div
                  className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-red-200/50 rounded-sm`}
                >
                  <AiOutlineSolution size={24} color="#d12424" />
                </div>

                <div className="flex items-stretch justify-between pl-[60px]">
                  <div>
                    <h4
                      className={`text-title-md self-between font-bold text-red-600 text-3xl pb-3 pl-4`}
                    >
                      {applicationData?.applicationCount !== undefined ? applicationData?.applicationCount : 0}
                    </h4>
                    <span className="text-md font-medium">Applications</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
              <div className="flex justify-between gap-5">
                <div
                  className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-violet-200/70 rounded-sm`}
                >
                  <BsFillPersonVcardFill size={24} color="#7c3ead" />
                </div>

                <div className="flex items-stretch justify-between pl-[60px]">
                  <div>
                    <h4
                      className={`text-title-md self-between font-bold text-violet-600 text-3xl pb-3 pl-4`}
                    >
                      {applicationData?.interviewCount !== undefined ? applicationData?.interviewCount : 0}
                    </h4>
                    <span className="text-md font-medium">Interviews</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
              <div className="flex justify-between gap-5">
                <div
                  className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-emerald-200/50 rounded-sm`}
                >
                  <IoNotifications size={24} color="#059669" />
                </div>

                <div className="flex items-stretch justify-between pl-[60px]">
                  <div>
                    <h4
                      className={`text-title-md self-between font-bold text-emerald-600 text-3xl pb-3 pl-4`}
                    >
                      {notificationData?.totalMessage != null ? notificationData?.totalMessage: 0}
                    </h4>
                    <span className="text-md font-medium">Notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="mt-4 flex gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <Table title="Recent jobs" data={jobData?.jobs} />
            <SmallNotification data={notificationData?.messages} />
          </div>
          <div className="mt-[30px] mb-5">
            <ApplicationList
              data={applicationData?.jobs}
              setTrigger={handleRefetch}
            />
          </div>
        </>
      )}
    </div>
  );
}
