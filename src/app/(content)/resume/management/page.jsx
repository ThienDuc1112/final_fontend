"use client";
import { FaRegEye } from "react-icons/fa";
import MyIconDialog from "@/components/MyIconDialog";
import { useRouter } from "next/navigation";
import { useGetResumeInfoQuery } from "@/Context/features/resume/resumeApiSlice";
import { Button } from "@/components/ui/button";
import TokenService from "@/utils/Token.service";
import { useEffect, useState } from "react";

export default function Management() {
  const { userId, role } = TokenService.getUserProfile();
 
  const {
    data: resumeData,
    isError: isError2,
    isLoading: isLoading2,
    error: error2,
  } = useGetResumeInfoQuery(userId);
  const router = useRouter();
  

  function convertToDayMonthYear(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  return (
    <section className="section-box mt-[10px] relative">
      {isLoading2 ? (
        <div className="max-w-[1800px] ml-[500px] my-[200px]">
          is loading.....
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto my-[200px]">
          <div className="div flex items-center justify-center">
            <h2 className="mb-5">All your resumes</h2>
          </div>
          <div className="div flex items-center justify-end px-[490px] mb-5">
            <Button
              variant="blue"
              onClick={() => router.push(`/resume/create`)}
            >
              Create new resume
            </Button>
          </div>
          {resumeData && resumeData.length === 0 ? (
            <div className="flex justify-center items-center">
              <h2>You do not have any resume, please create new one!!!</h2>
            </div>
          ) : (
            <div className="div flex items-center justify-center">
              <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100 text-left ">
                        <th className="min-w-[100px] px-4 py-4 font-medium text-black text-xl">
                          ID
                        </th>
                        <th className="min-w-[280px] px-4 py-4 font-medium text-black pl-11 text-xl">
                          Resume Name
                        </th>
                        <th className="min-w-[180px] px-4 py-4 font-medium text-black text-xl">
                          Created Date
                        </th>
                        <th className="px-4 py-4 font-medium text-black text-xl">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumeData &&
                        resumeData.map((item, key) => (
                          <tr key={key}>
                            <td className="border-b border-[#eee]px-4 py-5 ">
                              <p className="text-black text-lg flex pl-4 justify-start">
                                {key + 1}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                              <h5 className="font-medium text-black text-lg">
                                {item.fullName}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5">
                              <p className={`text-lg flex justify-center `}>
                                {convertToDayMonthYear(item.createdDate)}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] px-4 py-5">
                              <div className="flex items-center space-x-3.5">
                                <button
                                  className="hover:text-blue-600 p-2 rounded-full bg-blue-100"
                                  onClick={() =>
                                    router.push(`/resumeDetail/${item.id}`)
                                  }
                                >
                                  <FaRegEye />
                                </button>
                                <MyIconDialog />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
