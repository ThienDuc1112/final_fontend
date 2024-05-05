"use client";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/business/Gallergy/dialog";
import { FaAnglesRight } from "react-icons/fa6";
import { getBusinessDetailById } from "@/app/api/business/api";
import Image from "next/image";

export default function BusinessDialog({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [data, setData] = useState(null);
  const path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getBusinessDetailById(id);
        setData(response.data);
        setImages(response.data.mediaDTOs);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Dialog variant="blue">
      <DialogTrigger asChild>
        <button className="bg-slate-600 text-white px-2 py-2 hover:bg-slate-500">
          <FaAnglesRight size={18} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Business Detail</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1200px]">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center w-full">
                    <div className="bg-white rounded-sm text-slate-700 text-start text-base">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                          <table className="w-full border table-auto mt-3">
                            <tbody>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Business Name:
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.fullName}{" "}
                                  {data?.shortName !== null &&
                                    `(${data?.shortName})`}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Business Industries
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.areaDTOs
                                    .map((area) => area.careerName)
                                    .join(", ")}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Business Size
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.businessSize}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Tax Code
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.taxCode}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Phone Number
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.phoneNumber}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Email
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.email}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Business Website
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.websiteUrl}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Facebook
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.faceBookUrl}
                                </td>
                              </tr>
                              <tr className="text-left">
                                <td className="min-w-[220px] px-4 py-4 border border-gray-600 bg-gray-200 font-medium">
                                  Address
                                </td>
                                <td className="min-w-[600px] px-4 py-4 border border-gray-600">
                                  {data?.address}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-span-4">
                          <div className="flex flex-col items-center justify-center">
                            <h3 className="mb-3">Business Lisence</h3>
                            {data?.licenseFont && (
                              <a
                                href={path + "/" + data?.licenseFont}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={
                                    data?.licenseBack !== null
                                      ? `${path}/${data?.licenseFont}`
                                      : "/images/logo.png"
                                  }
                                  width={300}
                                  height={200}
                                  alt="logo"
                                  style={{ borderRadius: "16px" }}
                                  className="shadow-lg"
                                />
                              </a>
                            )}
                            {data?.licenseBack && (
                              <a
                                href={path + "/" + data?.licenseBack}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={
                                    data?.licenseBack !== null
                                      ? `${path}/${data?.licenseBack}`
                                      : "/images/logo.png"
                                  }
                                  width={300}
                                  height={200}
                                  alt="logo"
                                  style={{ borderRadius: "16px" }}
                                  className="shadow-lg"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col mt-5 justify-center items-center mx-[100px] max-w-[1000px]">
                        {data?.description && (
                          <>
                            <h3>Description</h3>
                            <div className="mt-5 border-2 border-gray-200 p-2 rounded-lg">
                              <p>{data?.description}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
