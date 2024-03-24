"use client";
import { useState, useEffect } from "react";
import { GetBusinessList } from "@/app/api/business/api";
import { useSearchParams } from "next/navigation";
import MyPagination from "@/components/myPagination";
import Image from "next/image";
import HelpFunctions from "@/utils/functions";
import { useReviewBusinessMutation } from "@/Context/features/business/businessApiSlice";
import BusinessDialog from "@/components/admin/Dialog/businessDialog";
import DropdownInput from "@/components/content/dropdownInput";

export default function Review() {
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com";
  const [reviewBusiness] = useReviewBusinessMutation();

  const statusData = [
    { id: 0, name: "" },
    { id: 1, name: "processing" },
    { id: 2, name: "Accepted" },
    { id: 3, name: "Rejected" },
  ];

  useEffect(() => {
    const params = {
      page: currentPage,
      status: status,
    };
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await GetBusinessList({ params });
        setBusinesses(response.data.getBusinessAdminDTOs);
        setTotalPages(Math.ceil(response.data.totalNumber / 10));
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [status]);

  const handleToggle = async (index, id) => {
    const updatedBusinesses = [...businesses];
    if (updatedBusinesses[index].isApproved !== "Accepted") {
      updatedBusinesses[index] = {
        ...updatedBusinesses[index],
        isApproved: "Accepted",
      };
      const business = { id: id, isApproved: "Accepted" };
      await reviewBusiness(business);
    } else {
      updatedBusinesses[index] = {
        ...updatedBusinesses[index],
        isApproved: "Rejected",
      };
      const business = { id: id, isApproved: "Rejected" };
      await reviewBusiness(business);
    }
    setBusinesses(updatedBusinesses);
  };

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[300px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px] ml-[180px]">
          <h2>Reviewing Businesses</h2>
          <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1370px]">
            <div className="flex justify-end">
              <div className="min-w-[300px] ">
                <DropdownInput
                  MyLabel="Select Status"
                  DataList={statusData}
                  onDataSelect={(name, id) => setStatus(name)}
                  required={false}
                  selectedOption={status}
                />
              </div>
            </div>
            <div className="bg-slate-100 px-2 py-3 font-medium rounded-md">
              <div className="grid grid-cols-12 gap-4 text-slate-700 text-start text-lg">
                <div className="col-span-1 pl-4">Logo</div>
                <div className="col-span-3 pl-4">Business Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Registered Date</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">IsActive</div>
                <div className="col-span-1">Detail</div>
              </div>
            </div>
            {businesses.length > 0 &&
              businesses.map((item, index) => (
                <div className="px-2 py-3 text-base" key={index}>
                  <div className="grid grid-cols-12 gap-4 text-black text-start">
                    <div className="col-span-1">
                      <Image
                        src={
                          item?.logoUrl !== null
                            ? `${path}/${item?.logoUrl}`
                            : "/images/logo.png"
                        }
                        width={85}
                        height={85}
                        alt="logo"
                        style={{ borderRadius: "16px" }}
                        className="shadow-lg"
                      />
                    </div>
                    <div className="col-span-3 flex items-center pl-4">
                      {item?.fullName}
                    </div>
                    <div className="col-span-3 flex items-center">
                      {item?.email}
                    </div>
                    <div className="col-span-2 flex items-center pl-5">
                      {HelpFunctions.convertToDayMonthYear(item?.createdDate)}
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span
                        className={`font-semibold ${
                          item?.isApproved == "processing"
                            ? "text-blue-600"
                            : item?.isApproved == "Accepted"
                            ? "text-emerald-600"
                            : "text-red-600"
                        } `}
                      >
                        {item?.isApproved.charAt(0).toUpperCase() +
                          item?.isApproved.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <label className={`toggle`}>
                        <input
                          type="checkbox"
                          checked={
                            item?.isApproved === "Accepted" ? true : false
                          }
                          onChange={() => handleToggle(index, item.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <BusinessDialog id={item.id} />
                    </div>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
            {totalPages !== undefined && totalPages > 1 && (
              <div className="pagination mt-5 mb-1 mx-auto">
                <MyPagination totalPages={totalPages} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
