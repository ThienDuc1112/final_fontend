import Image from "next/image";
import JobCard from "@/components/content/jobCard";

let jobs = [
  {
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

const JobBanner = () => {
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
                      src="/images/Finance.svg"
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
              {jobs.map((job, index) => (
                <JobCard
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
      </div>
    </section>
  );
};

export default JobBanner;
