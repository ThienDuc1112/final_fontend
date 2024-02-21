"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InforComponent from "@/components/content/inforComponent";
import { Button } from "@/components/ui/button";

export default function Job({ params }) {
  const career = {
    careerName: "Information Technology",
    BusinessId: 1,
    title: "Senior Backend Web Developer",
    NumberRecruitment: 5,
    ExpirationDate: new Date("2022-12-31"),
    EducationLevelMin: "Bachelor's degree",
    yearExpMin: "1-2 years",
    GenderRequirement: "Any",
    LanguageRequirementId: 1,
    Address: "123 Main St, New York",
    JobType: "Full-time",
    careerLevel: "Mid-level",
    salaryMin: 500,
    salaryMax: 800,
    Description: "Job description for Web Developer position",
    Welfare: "Health insurance, Paid time off",
    Requirement: "Bachelor's degree in Computer Science or related field",
    RequiredSkills: "HTML, CSS, JavaScript",
    Responsibilities: "Develop and maintain web applications",
    Status: "Active",
  };
  return (
    <>
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
              <h3 className="text-3xl">{career.title}</h3>
            </div>
            <div class="lg:w-1/3 md:w-full text-right flex items-center gap-10">
              <Button variant="blue" size="xl" className="icon-send-letter">
                Apply Now
              </Button>
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
                    title="Industry:"
                    value={career.careerName}
                  />

                  <div className="md:w-1/2 flex items-center">
                    <div className="sidebar-icon-item">
                      <Image
                        src="/images/job-level.svg"
                        width={16}
                        height={16}
                        alt="logo"
                      />
                    </div>
                    <div className="sidebar-text-info ml-2.5 gap-5">
                      <span className="text-description industry-icon">
                        Job Level
                      </span>
                      <strong className="small-heading">
                        {career.careerLevel}
                      </strong>
                    </div>
                  </div>
                </div>
                {/* component */}
                <div className="flex flex-wrap mt-6">
                  <div className="md:w-1/2 flex items-center">
                    <div className="sidebar-icon-item">
                      <Image
                        src="/images/salary.svg"
                        width={16}
                        height={16}
                        alt="logo"
                      />
                    </div>
                    <div className="sidebar-text-info ml-2.5 gap-5">
                      <span className="text-description industry-icon">
                        Wage
                      </span>
                      <strong className="small-heading">
                        ${career.salaryMin} - ${career.salaryMax}
                      </strong>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex items-center">
                    <div className="sidebar-icon-item">
                      <Image
                        src="/images/experience.svg"
                        width={16}
                        height={16}
                        alt="logo"
                      />
                    </div>
                    <div className="sidebar-text-info ml-2.5 gap-5">
                      <span className="text-description industry-icon">
                        Experience
                      </span>
                      <strong className="small-heading">
                        {career.yearExpMin}
                      </strong>
                    </div>
                  </div>
                </div>
                {/* component */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
