"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InforComponent from "@/components/content/inforComponent";
import CompanyInfo from "@/components/content/companyInfo";
import { Button } from "@/components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import LetterBox from "@/components/content/letterBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectingResume from "@/components/content/selectingResume";
import { getJobDetail } from "@/app/api/job/api";

export default function Job({ params }) {
  const [career2, setCareer2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getJobDetail(params.id);
        setCareer2(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function convertToDayMonthYear(day2) {
    const date = new Date(day2);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const notify = (success, notifyMess) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (success) {
      toast.success(notifyMess, toastOptions);
    } else {
      toast.error(notifyMess, toastOptions);
    }
  };

  let requirements = null;
  if (career2 !== null) {
    requirements = career2.requirement.split("•");
    if (requirements[requirements.length - 1] === "") {
      requirements.pop();
    } else if (requirements[0] === "") {
      requirements.shift();
    }
    const requiredSkill = `Must have knowledge and skills about ${career2.requiredSkills}.`;
    requirements.push(requiredSkill);
  }

  let responsibilities = null;
  if (career2 !== null) {
    responsibilities = career2.responsibilities.split("•");
    if (responsibilities[responsibilities.length - 1] === "") {
      responsibilities.pop();
    } else if (responsibilities[0] === "") {
      responsibilities.shift();
    }
  }
  let welfares = null;
  if (career2 !== null) {
    welfares = career2.welfare.split("•");
    if (welfares[welfares.length - 1] === "") {
      welfares.pop();
    } else if (welfares[0] === "") {
      welfares.shift();
    }
  }

  const handleConfirm = (success, message) => {
    notify(success, message);
  };

  return (
    <section className="section-box mt-[10px] mb-5">
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[300px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <section className="section-box mt-[10px] mb-5">
            <div className="max-w-[1470px] mx-auto sm:px-4">
              <div className="py-5 flex items-center justify-center">
                <Image
                  src="/images/jobc3.png"
                  width={1320}
                  height={350}
                  layout="horizontal"
                  alt="logo"
                  style={{ width: "95%", height: "auto", borderRadius: "16px" }}
                />
              </div>
              <div className="flex flex-wrap mt-2.5 mx-[3%]">
                <div className="lg:w-2/3 md:w-full mt-3">
                  <h3 className="text-3xl">{career2.title}</h3>
                  <div className="mb-3 flex items-center">
                    <span className="card-briefcase">{career2.jobType}</span>
                    <span className="card-time">
                      {convertToDayMonthYear(career2.createdDate)}
                    </span>
                  </div>
                </div>
                <div class="lg:w-1/3 md:w-full text-right flex items-center gap-10">
                  <SelectingResume
                    color="blue"
                    name="Apply Now"
                    handleConfirm={handleConfirm}
                    jobId={params.id}
                  />
                  <Button variant="outline" size="xl">
                    Save Job
                  </Button>
                </div>
              </div>
              <div className="border-b pt-3 pb-3 mx-5"></div>
            </div>
          </section>
          <section className="section-box mt-[50px]">
            <div className="max-w-[1380px] mx-auto">
              <div className="flex flex-wrap">
                <div class="lg:w-8/12 md:w-full sm:w-full w-full">
                  <div className="job-overview">
                    <div className="border-b pb-4 mb-7 job-title">
                      Employment Information
                    </div>
                    <div className="flex flex-wrap">
                      <InforComponent
                        image="industry.svg"
                        title="Industry"
                        value={career2.careerName}
                      />
                      <InforComponent
                        image="job-level.svg"
                        title="Job Level"
                        value={career2.careerLevel}
                      />
                    </div>
                    {/* component */}
                    <div className="flex flex-wrap mt-6">
                      <InforComponent
                        image="salary.svg"
                        title="Wage"
                        value={` $${career2.salaryMin} - $${career2.salaryMax}`}
                      />
                      <InforComponent
                        image="experience.svg"
                        title="Experience"
                        value={career2.yearExpMin}
                      />
                    </div>
                    {/* component */}
                    <div className="flex flex-wrap mt-6">
                      <InforComponent
                        image="education.svg"
                        title="Education"
                        value={career2.educationLevelMin}
                      />
                      <InforComponent
                        image="deadline.svg"
                        title="Deadline"
                        value={convertToDayMonthYear(career2.expirationDate)}
                      />
                    </div>
                    {/* component */}
                    <div className="flex flex-wrap mt-6">
                      <InforComponent
                        image="gender.svg"
                        title="Gender"
                        value={career2.genderRequirement}
                      />
                      <InforComponent
                        image="location.svg"
                        title="Location"
                        value={career2.address}
                      />
                    </div>
                  </div>
                  <div className="content-single">
                    <h4>Job Description</h4>
                    <p>{career2.description}</p>
                    <h4>Essential Knowledge, Skills, and Experience</h4>
                    <ul>
                      {requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <h4>Responsibilities:</h4>
                    <ul>
                      {responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <h4>Job Benefits</h4>
                    <ul style={{ listStyle: "none", paddingLeft: "12px" }}>
                      {welfares.map((item, index) => (
                        <li key={index} className="mr-4">
                          <div className="flex items-center gap-4">
                            <FaCircleCheck color="#1bbf49" />
                            {item}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-b pt-3 pb-3 mx-2"></div>
                </div>
                <div class="lg:w-4/12 md:w-full sm:w-full w-full pl-10">
                  <CompanyInfo
                    logo={career2.getBusinessPartDTO.logoUrl}
                    name={career2.getBusinessPartDTO.fullName}
                    career={career2.careerName}
                    businessSize={career2.getBusinessPartDTO.businessSize}
                    location={career2.getBusinessPartDTO.address}
                    email={career2.getBusinessPartDTO.email}
                    phone={career2.getBusinessPartDTO.phoneNumber}
                  />
                </div>
              </div>
            </div>
          </section>
          <LetterBox />
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
