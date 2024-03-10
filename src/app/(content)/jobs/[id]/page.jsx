"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InforComponent from "@/components/content/inforComponent";
import CompanyInfo from "@/components/content/companyInfo";
import { Button } from "@/components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import LetterBox from "@/components/content/letterBox";
import MyDialog from "@/components/myDialog";
import SelectingResume from "@/components/content/selectingResume";
import { getJobDetail } from "@/app/api/job/api";

export default function Job({ params }) {
  const [career2, setCareer2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getJobDetail(params.id);
        console.log(response.data);
        setCareer2(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const career = {
    careerName: "Information Technology",
    businessId: 1,
    title: "Senior Backend Web Developer",
    numberRecruitment: 5,
    expirationDate: "2024-11-30",
    educationLevelMin: "Bachelor's degree",
    yearExpMin: "1-2 years",
    genderRequirement: "Any",
    languageRequirementId: 1,
    address: "123 Main St, New York",
    jobType: "Full-time",
    careerLevel: "Mid-level",
    salaryMin: 500,
    salaryMax: 800,
    description:
      "The IT Support Specialist is responsible for providing technical assistance and support to end-users within the organization. They will diagnose and resolve software and hardware issues, install and configure computer systems, and provide guidance on proper computer usage. The IT Support Specialist will also assist in maintaining the organization's network infrastructure and ensuring data security.",
    welfare: "Health insurance.Paid time off.",
    responsibilities:
      "Responding to user inquiries and providing technical support via phone, email, or in-person.Diagnosing and resolving software and hardware issues for end-users.Installing, configuring, and maintaining computer systems and software applications.Assisting in the setup and maintenance of network infrastructure, including routers, switches, and firewalls.",
    requiredSkills: "HTML, CSS, JavaScript",
    requirement:
      "Bachelor's degree in Computer Science, Information Technology, or a related field.Proven experience in providing technical support and troubleshooting software and hardware issues.Strong knowledge of computer systems, networks, and operating systems.",
    status: "Active",
    dayCreated: "2024-11-30",
    businessId: 2,
    fullName: "NFQ",
    email: "nfq@gmail.com",
    location: "123 Hawdcood, New Zealand",
    phoneNumber: "(67) 789567654",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAq1BMVEX/agP////8///7aAD+18b6agD9diz9YwD///377uf/ayn5ejP+dC//iUb807z5////hlP949f/j2T/dzv85NL+3tD/Yg/5l1/7bwL89Oj+o3n+roj/nnn8+/H/bzj/XQD8uJn/ahf7jlb8mmr8z7/6xq34cR/6x6P62cP9jlD4wZn86t35k2L4pnn89fH0qH31tY38gEP2o2n/TQD0ehf379r3dBH7v6r3r4wYgWSNAAAD8ElEQVR4nO3a4XqaOgAG4JAsJhRr2qqr2HJQOxhOi+Vs3Xr/VzZwpwgSLTI8DX2+9yeEwGcQEhJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ANhNRF20gHvkYQwXtOfMLUP2Bb/X3P6om67MCb87AhR9wiRXfOkinPmZ0TbWcTm0wlm8/SIRd3S44e0bcb6fV+C2dRJfxzG28vCQs86gXIEmX9V9QpTekc4O7hTxnY0m/jtZSHcqXllW1ItBekP6N+HkVJSqZS0v5EW4zgnZEnDXGZhrHppjrZMbrVo76/TJEwLLbOjvIfW0rx7GEnba5t3D5MKwpYeaSaE8dbtZDEiDA3mHyiMO+xGGFKr2pYeAcUwUlrKXdlFrrLk0TCeerYPcR8Z4XFls6do+s4sVbtpPwyl6mnevyjZFLs7upYZDy8O6YdcsOpWZxko5RUqkdbXM7SM93wjyr1zkYyOh6HT07vzwr90aallRp/bD0Ptm72fSFxdvxWmyY/q33ilMKsuhyFhUKrWNSUM0wwmif7e21Uu7or/GWpKmEf9GFP3Ggyn4Wv14sEuVCtNCRMteo7GpHoqsfGC5L/RC1sU6jUmjCVXY53L/b8SI2FM5fUjEVmvUiRjE8Po0eV+mIk/yHbEg952j/OpM2EkrbSMWNLssql0//2etlOHw6TPN3+V740+iy6HIcyf0fww6t36w+6GYeKHpwrvfDVYdjcMmUflAtRzOxtG3MZ7JWixB9CtMMSZuZTKUoDOhmFCrL+oYre/VNrsMJWXZtpd67+4B9IYE4Z6m1udsHoqsRhkA2aTw7wQzYBGP8Zh80dXaZrVnDBT3ddITvRb/WHUahjO80k8xvj5RprpqKY6McjE93u7cqNJ9ewzzZjhbfPhzvyMYfpDnSTpO3vvz+y83u28yTSnWEejV1EizhbmYneafZUw6UNOzZIG3xL8+zi/lvjqfGH+8WiNJ3ih5tG0d3Lj+Pd2/rS3zQmT3WozzeP8rTCxmWEsGpw8S2Nqy1jWqjI4rRHGzJax4qfTp50NbRlKRw2m0A1tGUmdRo9mY1pm2+eU9nbYphrcZAaFkZIqGq+eJhubUuo2Wqdx7KVp6cKsigVaDKM8+zq6+ymYuBp4at1oLkGsB/k6o0FCSK+06ii42g+T/Cruj9I7O3wpbVnoz9OPjq13GgTBr9k0Yb4gnPn85VvDBTShM8y/bnPCeK8orHy852G5QFZDacuB3i7rHRNy4fsi/+FE48V0TOwmHjgrLdWrFs6W8xVlL2le2nDoOo4sqtMUbhrmb/DKmd/lMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6E39SbeXkwqsj9AAAAAElFTkSuQmCC",
    businessSize: "100 - 500 employees",
  };

  function convertToDayMonthYear(day2) {
    const date = new Date(day2);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
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

  const handleConfirm = () => {
    console.log("Confirmed!");
  };

  return (
    <>
      {isLoading ? (
        <div>Is loading</div>
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
                  ></SelectingResume>
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
    </>
  );
}
