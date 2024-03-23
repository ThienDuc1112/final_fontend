"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import HelpFunctions from "@/utils/functions";
import Gallergy from "@/components/content/gallergy";
import { getBusinessDetailById } from "@/app/api/business/api";
import { getJobByBusiness } from "@/app/api/job/api";
import JobCard from "@/components/content/jobCard";
import LetterBox from "@/components/content/letterBox";

export default function Job({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [data, setData] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response = await getBusinessDetailById(params.id);
        let jobResponse = await getJobByBusiness(params.id);
        setData(response.data);
        setJobs(jobResponse.data);
        setImages(response.data.mediaDTOs);
        console.log(jobResponse.data);
        if (response.data === undefined || response.data === null) {
          router.push("/content");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  let path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";
  let defaultUrl = "/images/logo.png";

  return (
    <section className="section-box mt-[10px] mb-5">
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[400px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <section className="section-box mt-[10px] mb-5">
            <div className="max-w-[1470px] mx-auto sm:px-4">
              <div className="py-5 flex items-center mt-5 justify-center relative">
                <Image
                  src="/images/logo.webp"
                  width={1320}
                  height={350}
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                  }}
                />
                <div className="absolute avatar-company shadow-lg">
                  <Image
                    src={
                      data?.logoUrl !== null ? path + data?.logoUrl : defaultUrl
                    }
                    width={100}
                    height={100}
                    alt="logo"
                    style={{ borderRadius: "16px" }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-2.5 mx-[3%]">
                <div className="lg:w-2/3 md:w-full">
                  <h3 className="text-3xl">{data?.fullName}</h3>
                  <div className="mb-3 flex items-center gap-5">
                    <div className="flex items-center">
                      <IoLocationOutline color="#6b7280" />
                      <span className="text-sm">{data?.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineUserGroup color="#6b7280" />
                      <span className="text-sm">{data?.businessSize}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b pt-3 pb-1 mx-5"></div>
            </div>
          </section>

          {/* business infor */}
          <section className="section-box mt-[50px]">
            <div className="max-w-[1380px] mx-auto">
              <div className="flex flex-wrap">
                <div className="lg:w-8/12 md:w-full sm:w-full w-full">
                  <div className="block">
                    <h4 className="mb-5 font-simibold text-gray-600 text-2xl">
                      Welcome to {data?.fullName}
                    </h4>
                    <p className="text-gray-500 text-base">
                      {data?.description}
                    </p>
                    <h4 className="mt-5 font-simibold text-gray-600 text-2xl">
                      Company Media
                    </h4>
                  </div>
                  <Gallergy passedImages={images} Id={params.id} />
                </div>
                <div className="hidden lg:block lg:w-4/12 pl-6">
                  <div className="sidebar-border">
                    <h3 className="text-center">{data?.fullName}</h3>
                    <div className="sidebar-list-job">
                      <div className="box-map">
                        <div className="flex flex-col">
                          <div className="flex gap-3 mb-3">
                            <IoBriefcaseOutline size={22} color="#4b5563" />
                            <div className="flex flex-col">
                              <span className="text-base text-gray-500">
                                Company field
                              </span>
                              <strong className="text-business">
                                {data?.areaDTOs[0].careerName}
                              </strong>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-3">
                            <HiOutlineUserGroup size={22} color="#4b5563" />
                            <div className="flex flex-col">
                              <span className="text-base text-gray-500">
                                Business size
                              </span>
                              <strong className="text-business">
                                {data?.businessSize}
                              </strong>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-3">
                            <IoLocationOutline size={22} color="#4b5563" />
                            <div className="flex flex-col">
                              <span className="text-base text-gray-500">
                                Address
                              </span>
                              <strong className="text-business">
                                {data?.address}
                              </strong>
                            </div>
                          </div>
                          <div className="flex gap-3 mb-3">
                            <FaRegClock size={22} color="#4b5563" />
                            <div className="flex flex-col">
                              <span className="text-base text-gray-500">
                                Founded Year
                              </span>
                              <strong className="text-business">
                                {HelpFunctions.convertToDayMonthYear(
                                  data?.foundedYear
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="border-b pt-1 pb-1 mx-1"></div>
                        <ul className="mt-3">
                          {data?.websiteUrl && (
                            <li className="flex items-center gap-2 mb-4">
                              <CiGlobe size={22} />
                              <Link
                                className="underline"
                                href={data?.websiteUrl}
                                target="_blank"
                              >
                                Website Link
                              </Link>
                            </li>
                          )}
                          {data?.faceBookUrl && (
                            <li className="flex items-center gap-2 mb-4">
                              <FaFacebook size={22} />
                              <Link
                                className=" underline"
                                href={data?.faceBookUrl}
                                target="_blank"
                              >
                                Facebook Page
                              </Link>
                            </li>
                          )}
                          {data?.linkedInUrl && (
                            <li className="flex items-center gap-2 mb-4">
                              <FaLinkedin size={22} />
                              <Link
                                className="underline"
                                href={data?.linkedInUrl}
                                target="_blank"
                              >
                                Linkedln Page
                              </Link>
                            </li>
                          )}
                          <li className="flex items-center gap-2 mb-2 text-gray-600">
                            Email: {data?.email}
                          </li>
                          <li className="flex items-center gap-2 mb-4 text-gray-600">
                            Phone Number: {data?.phoneNumber}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-5 max-w-[1100px] flex justify-center">
                <div className="w-full">
                  <div className="border-b pt-3 pb-1 mx-5"></div>
                  <h4 className="mt-5 font-simibold text-gray-600 text-2xl">
                    Recent Jobs
                  </h4>
                  <div className="flex flex-wrap mt-5">
                    {jobs.map((job, index) => (
                      <JobCard
                        className="xl:w-1/3"
                        id={job.id}
                        key={index}
                        companyName={job.fullName}
                        location={job.address}
                        title={job.title}
                        type={job.jobType}
                        skills={job.skills}
                        description={job.description}
                        expirationDate={job.expirationDate}
                        minSalary={job.salaryMin}
                        maxSalary={job.salaryMax}
                        businessId={job.businessid}
                        logoUrl={job.logoUrl}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </section>
          <LetterBox />
        </div>
      )}
    </section>
  );
}
