"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import { FaRegEye } from "react-icons/fa";
import MyIconDialog from "@/components/MyIconDialog";
import MyPagination from "@/components/myPagination";
import { getJobManagement } from "@/app/api/job/api";
import { useSearchParams } from "next/navigation";
import TokenService from "@/utils/Token.service";
import { useRouter } from "next/navigation";

export default function ManageJob() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = params.get("page");
  const businessId = TokenService.getBusinessId();
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    const queryParams = {
      Page: page,
      BusinessId: businessId,
    };
    const fetchData = async () => {
      try {
        let response = await getJobManagement(queryParams);
        setDataList(response.data);
        console.log(response.data);
        setTotalPages(Math.ceil(response.data.length / 8));
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [page]);
  function convertToDayMonthYear(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  return (
    <DefaultLayout>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[700px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px]">
          <div className="mx-5">
            <h2>Job Management</h2>
            <p className="text-base font-normal">
              {" "}
              View and edit your jobs here{" "}
            </p>
            <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
              <div className="bg-blue-100 px-2 py-6 text-center font-medium rounded-md">
                <div className="grid grid-cols-7 gap-4 text-blue-500">
                  <div className="col-span-2">Name Job</div>
                  <div className="col-span-1">Applications</div>
                  <div className="col-span-1">Accepted application</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Created Date</div>
                  <div className="col-span-1">Action</div>
                </div>
              </div>
              {dataList.map((job, index) => (
                <div key={index} className="px-2 py-6 text-center ">
                  <div className="grid grid-cols-7 gap-4 font-normal">
                    <div className="col-span-2 font-medium">{job.title}</div>
                    <div className="col-span-1">4</div>
                    <div className="col-span-1">1</div>
                    <div className="col-span-1 font-medium">
                      <span
                        className={`text ${
                          job.status === "Closed"
                            ? "text-red-600"
                            : job.status === "Open"
                            ? "text-emerald-600"
                            : job.status === "Urgent"
                            ? "text-violet-700"
                            : ""
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-gray-600">
                      {convertToDayMonthYear(job.createdDate)}
                    </div>
                    <div className="col-span-1 flex items-center pl-10">
                      <button
                        className="hover:text-blue-600 p-2 rounded-full bg-blue-100 mr-4"
                        onClick={() => router.push(`manageJobs/edit/${job.id}`)}
                      >
                        <FaRegEye />
                      </button>
                      <MyIconDialog />
                    </div>
                  </div>
                  <hr className="mt-6" />
                </div>
              ))}
              <div className="pagination mt-5 mb-1 mx-auto">
                <MyPagination totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
