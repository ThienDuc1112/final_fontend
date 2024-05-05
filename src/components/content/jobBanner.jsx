'use client'
import {useState, useEffect} from 'react';
import Image from "next/image";
import JobCard from "@/components/content/jobCard";
import { getNewJob } from "@/app/api/job/api";

const JobBanner = () => {
const [jobs, setJobs] = useState([]);
useEffect(()=>{
  const fetchData = async () => {
    try{
      let response = await getNewJob();
      setJobs(response.data);
    }catch(error){
      console.log(error);
    }
  }
  fetchData();
},[])

  return (
    <section class="inline-block w-full overflow-visible mt-10">
      <div className="animate__animated animate__fadeIn mt-10">
        <div className="max-w-max md:max-w-[1750px] sm:max-w-[540px]">
          <div className="text-center">
            <h1 className="mb-2 animate__animated animate__fadeInUp header-text">
              Latest Jobs Post
            </h1>
            <p className="animate__animated animate__fadeInUp text-lg font-medium leading-6 color-text-paragraph-2">
              Explore different types of Jobs to apply
              <br />& discover new ones
            </p>
          </div>
          <div className="mt-3 mx-10">
            <div className="mt-10 text-left flex justify-center">
              <ul className="flex flex-wrap justify-start items-center nav-tab">
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/management.svg"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Management
                  </a>
                </li>
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/marketing.svg"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Marketing & Sale
                  </a>
                </li>
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/finance.svg"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Finance
                  </a>
                </li>
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/it.png"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Information Technology
                  </a>
                </li>
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/retail.svg"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Retail & Products
                  </a>
                </li>
                <li>
                  <a href="/jobs">
                    <Image
                      src="/images/content.svg"
                      width={20}
                      height={20}
                      alt="logo"
                    />
                    Content Writer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 mx-[7%]">
            <div className="flex flex-wrap">
              {jobs?.map((job, index) => (
                <JobCard
                id={job.id}
                className="xl:w-1/4"
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
      </div>
    </section>
  );
};

export default JobBanner;
