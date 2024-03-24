import Image from "next/image";
import Link from "next/link";

export default function CompanyInfo({
  businessId,
  logo,
  name,
  location,
  email,
  phone,
  career,
  businessSize,
}) {
  const path = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com";
  return (
    <div className="sidebar-border">
      <div className="sidebar-heading flex items-center gap-7">
        <div className="avatar-sidebar">
          <Image
            src={
              logo !== null && logo !== ""
                ? `${path}/${logo}`
                : "/images/logo.png"
            }
            width={85}
            height={85}
            alt="logo"
            style={{ borderRadius: "16px" }}
          />
        </div>
        <div className="sidebar-info">
          <Link
            href={`/businessDetail/${businessId}`}
            className="sidebar-company hover:text-blue-600"
          >
            NastTech Founded Quize ({name})
          </Link>
          <Link
            href={`/businessDetail/${businessId}`}
            className="link-underline mt-4"
          >
            See more jobs
          </Link>
        </div>
      </div>
      <div className="sidebar-list-job">
        <div className="box-map">
          <div className="flex flex-wrap">
            <div className="flex flex-col items-center justify-between">
              <Image
                src="/images/industry.svg"
                width={40}
                height={40}
                alt="logo"
              />
              <h3>Industry</h3>
              <p className="text-sm text-gray-500">{career}</p>
            </div>
            <div className="ml-[70px] flex flex-col items-center">
              <Image
                src="/images/group.svg"
                width={40}
                height={40}
                alt="logo"
              />
              <h3>Business Size</h3>
              <p className="text-sm text-gray-500">{businessSize}</p>
            </div>
          </div>
        </div>
        <ul className="ul-disc">
          <li>{location}</li>
          <li>Phone: {phone}</li>
          <li>Email: {email}</li>
        </ul>
      </div>
    </div>
  );
}
