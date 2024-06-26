"use client";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  businessId,
  logoUrl,
}) => {
  const route = useRouter();
  const date = new Date(expirationDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com";
  return (
    <>
      <div className={`mt-1 w-full`}>
        <div className="card-list hover-up">
          <div className="flex justify-between">
            <div className="card-grid-2-image-left">
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
                <a
                  href={`/businessDetail/${businessId}`}
                  className="company-title"
                >
                  {companyName.length > 80
                    ? `${companyName.substring(0, 80)}...`
                    : companyName}
                </a>
                <div className="mt-1 flex card-location items-center items-baseline gap-1">
                  <MdLocationOn width={20} height={20} />
                  <p>{location}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-1 mr-9">
                {skills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="btn-tags-sm">
                    {skill}
                  </div>
                ))}
                <span className="flash"></span>
              </div>
            </div>
          </div>
          <div className="card-block-info px-4">
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

            <p className="text-sm mt-3 color-text-paragraph">
              {description.split(" ").slice(0, 40).join(" ")}...
            </p>
            <div className="mt-5 mx-2 flex flex-wrap items-center justify-between pb-3">
              <div className="xl:W-2/5 md:2/5 flex items-center gap-1 text-right">
                <span className="card-text-price">
                  ${minSalary} - ${maxSalary}
                </span>
                <span className="text-muted">/Hour</span>
              </div>
              <Button
                variant="blue"
                onClick={() => {
                  route.push(`/jobs/${id}`);
                }}
              >
                View Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
