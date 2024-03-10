import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const JobCard = ({
  id,
  companyName,
  location,
  title,
  type,
  skills,
  description,
  expirationDate,
  minSalary,
  maxSalary,
  className,
  businessId,
  logoUrl,
}) => {
  const date = new Date(expirationDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com";
  return (
    <>
      <div className={`mt-1 ${className} lg:w-1/3 md:w-1/2 sm:w-full w-full`}>
        <div className="card-grid-2 hover-up">
          <div className="card-grid-2-image-left">
            <span className="flash"></span>
            <div className="image-box">
              <Image
                src={
                  logoUrl !== null && logoUrl !== ""
                    ? `${path}/${logoUrl}`
                    : "/images/job.png"
                }
                width={100}
                height={60}
                alt="logo"
                className="rounded-xl max-w-full"
              />
            </div>
            <div className="right-info">
              <a href="/jobs" className="company-title">
                {companyName}
              </a>
              <div className="mt-1 flex card-location items-center items-baseline gap-1">
                <MdLocationOn width={20} height={20} />
                <p>
                  {location.length > 4
                    ? location.split(" ").slice(0, 4).join(" ") + "..."
                    : location}
                </p>
              </div>
            </div>
          </div>
          <div className="card-block-info">
            <h4>
              <Link className="title" href={`/jobs/${id}`}>
                {title}
              </Link>
            </h4>
            <div className="flex justify-start items-center gap-3">
              <div className="mt-1 flex card-color items-center gap-1">
                <FaCalendarDays width={20} height={20} />
                <p>
                  Deadline: {day}/{month}/{year}
                </p>
              </div>
              <div className="mt-1 flex card-color items-center gap-1">
                <FaBriefcase width={20} height={20} />
                <p>{type}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="xl:w-4/5 md:w-3/5 flex flex-wrap items-center gap-1">
                {skills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="btn-tags-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm mt-3 color-text-paragraph">
              {description.split(" ").slice(0, 18).join(" ")}...
            </p>
            <div className="mt-5 mx-2 flex flex-wrap items-center justify-between">
              <div className="xl:W-2/5 md:2/5 flex items-center gap-1 text-right">
                <span className="card-text-price">
                  ${minSalary} - ${maxSalary}
                </span>
                <span className="text-muted">/Hour</span>
              </div>
              <Button variant="blue">Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
