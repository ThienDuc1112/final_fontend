"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "@/Context/features/search/searchSlice";
import Image from "next/image";
import JobCard from "@/components/content/jobCard";
import MyPagination from "@/components/myPagination";
let jobs = [
  {
    id: 1,
    companyName: "ABC Company",
    location: "New York, United Of State",
    title: "Software Engineer",
    type: "Full-time",
    skills: ["C#", "Java", ".NET", "API"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Software Engineer at ABC Company.",
  },
  {
    id: 2,
    companyName: "XYZ Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
  {
    id: 3,
    companyName: "FPt Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
  {
    id: 4,
    companyName: "XYZ Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
  {
    id: 1,
    companyName: "ABC Company",
    location: "New York, United Of State",
    title: "Software Engineer",
    type: "Full-time",
    skills: ["C#", "Java", ".NET", "API"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Software Engineer at ABC Company.",
  },
  {
    id: 1,
    companyName: "XYZ Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
  {
    id: 1,
    companyName: "FPt Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
  {
    id: 1,
    companyName: "XYZ Corporation",
    location: "New York, United Of State",
    title: "Web Developer",
    type: "Part-time",
    skills: ["HTML", "CSS", "JavaScript"],
    expirationDate: "2024-11-30",
    minSalary: 22,
    maxSalary: 45,
    description: "Job description for Web Developer at XYZ Corporation.",
  },
];

const ListJob = () => {
  const query = useSelector(selectQuery);
  const jobType = useSelector(selectJobType);
  const career = useSelector(selectCareer);
  const position = useSelector(selectPosition);
  const experience = useSelector(selectExperience);
  const education = useSelector(selectEducation);
  const date = useSelector(selectDate);
  const minSalary = useSelector(selectMinSalary);
  const maxSalary = useSelector(selectMaxSalary);

  useEffect(() => {
    console.log("Position:", position);
    console.log("Experience:", experience);
    console.log("Education:", education);
    console.log("Date:", date);
    console.log("Min Salary:", minSalary);
    console.log("Max Salary:", maxSalary);
  }, [position, experience, education, date, minSalary, maxSalary]);
  return (
    <div className="lg:w-9/12 md:w-full sm:w-full w-full float-right">
      <div className="content-page mx-3 mt-1">
        <div className="box-filters-job">
          <div className="row">
            <span className="text-small inline-block mt-1 ">
              Showing &nbsp;
              <strong>1-20 &nbsp;</strong>
              of &nbsp;
              <strong>888 &nbsp;</strong>
              jobs
            </span>
          </div>
          <div className="flex flex-wrap">
            {jobs.map((job, index) => (
              <JobCard
                id={job.id}
                className="xl:w-1/3"
                key={index}
                companyName={job.companyName}
                location={job.location}
                title={job.title}
                type={job.type}
                skills={job.skills}
                description={job.description}
                expirationDate={job.expirationDate}
                minSalary={job.minSalary}
                maxSalary={job.maxSalary}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination mt-5 mb-10">
        <MyPagination totalPages={3} />
      </div>
    </div>
  );
};

export default ListJob;
