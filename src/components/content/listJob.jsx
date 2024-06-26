"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getListJob } from "@/app/api/job/api";
import {
  selectPosition,
  selectExperience,
  selectEducation,
  selectDate,
  selectMinSalary,
  selectMaxSalary,
  selectQuery,
  selectJobType,
  selectCareer,
  selectPageNumber,
} from "@/Context/features/search/searchSlice";
import Image from "next/image";
import JobCard from "@/components/content/jobCard";
import MyPagination from "@/components/myPagination";
import { useSearchParams } from "next/navigation";

const ListJob = () => {
  const [jobData, setJobData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = useSelector(selectQuery);
  const jobType = useSelector(selectJobType);
  const career = useSelector(selectCareer);
  const position = useSelector(selectPosition);
  const experience = useSelector(selectExperience);
  const education = useSelector(selectEducation);
  const date = useSelector(selectDate);
  const minSalary = useSelector(selectMinSalary);
  const maxSalary = useSelector(selectMaxSalary);
  const page = params.get("page");

  useEffect(() => {
    const abortController = new AbortController();
    const queryParams = {
      page: page,
      query: query,
      jobType: jobType,
      minSalary: minSalary,
      maxSalary: maxSalary,
      career: career,
      experience: JSON.stringify(experience),
      date: date,
      position: JSON.stringify(position),
      education: JSON.stringify(education),
    };
    const fetchData = async () => {
      try {
        let response = await getListJob(queryParams);
        setTotalPages(Math.ceil(response.data.total/12));
        setJobData(response.data.getJobDTOs);
        setTotal(response.data.total);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [
    page,
    query,
    jobType,
    career,
    position,
    experience,
    education,
    date,
    minSalary,
    maxSalary,
  ]);
  return (
    <div className="lg:w-9/12 md:w-full sm:w-full w-full float-right">
      <div className="content-page mx-3 mt-1">
        <div className="box-filters-job">
          <div className="row">
            <span className="text-small inline-block mt-1 ">
              Showing &nbsp;
              <strong>1-12 &nbsp;</strong>
              of &nbsp;
              <strong>{total} &nbsp;</strong>
              jobs
            </span>
          </div>
          <div className="flex flex-wrap">
            {jobData.map((job, index) => (
              <JobCard
                id={job.id}
                className="xl:w-1/3"
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
                businessId={job.businessId}
                logoUrl={job.logoUrl}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination mt-5 mb-10">
        <MyPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ListJob;
