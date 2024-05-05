"use client";
import TokenService from "@/utils/Token.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HelpFunctions from "@/utils/functions";
import { useGetApplicationsUserQuery } from "@/Context/features/application/applicationApiSlice";

export default function Applications() {
  const { userId, role } = TokenService.getUserProfile();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useGetApplicationsUserQuery({
    id: userId,
  });
  console.log(data);
  const url = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";

  const data2 = [
    {
      id: 1,
      businessName: "Company A",
      jobName: "Job A",
      dateApplied: "2024-03-14",
      jobStatus: "Pending",
    },
    {
      id: 2,
      businessName: "Company B",
      jobName: "Job B",
      dateApplied: "2024-03-15",
      jobStatus: "Accepted",
    },
  ];

  return (
    <section className="section-box mt-[10px] relative">
      {loading || isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[300px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto my-[200px]">
          <div className="div flex items-center justify-center">
            <h2 className="mb-5">Your job applications</h2>
          </div>
          <div className="div flex items-center justify-center">
            <div className="rounded-sm border border-stroke bg-white shadow-default sm:px-7.5">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left ">
                    <th className="min-w-[40px] px-4 py-2 font-medium text-black text-xl">
                      ID
                    </th>
                    <th className="min-w-[250px] px-4 py-2 font-medium text-black pl-11 text-xl">
                      Business Name
                    </th>
                    <th className="min-w-[270px] px-4 py-2 font-medium text-black pl-11 text-xl">
                      Job Name
                    </th>
                    <th className="min-w-[180px] px-4 py-2 font-medium text-black text-xl">
                      Date Applied
                    </th>
                    <th className="min-w-[150px] px-4 py-2 font-medium text-black text-xl">
                      Job Status
                    </th>
                    <th className="px-4 py-2 font-medium text-black text-xl">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-left border-b-2 border-gray-200 ${
                        index % 2 !== 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      <td className="min-w-[40px] px-4 py-5 text-black text-base">
                        {index + 1}
                      </td>
                      <td className="min-w-[280px] px-4 pl-11 text-base">
                        <div className="flex items-center gap-2">
                          <Image
                            src={url + item.logoUrl}
                            width={50}
                            height={50}
                            alt="avatar"
                            className="rounded-full "
                          />
                          {item.businessName}
                        </div>
                      </td>
                      <td className="min-w-[200px] pl-11 text-base">
                        <Link
                          href={`/jobs/${item.jobId}`}
                          target="_blank"
                          className="hover:font-bold"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="min-w-[180px] px-4 text-base text-gray-500">
                        {HelpFunctions.convertToDayMonthYear(item.createdDate)}
                      </td>
                      <td className="min-w-[150px] px-4 text-base">
                        <p
                          className={`text-center rounded-lg font-medium ${
                            item.status === "Accepted"
                              ? "bg-emerald-100 text-emerald-600"
                              : item.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {" "}
                          {item.status}
                        </p>
                      </td>
                      <td className="px-4 text-base text-center">
                        <Link
                          href={`/applications/${item.id}`}
                          target="_blank"
                          className="bg-orange-500 text-white px-2 py-2 rounded hover:bg-blue-500"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
