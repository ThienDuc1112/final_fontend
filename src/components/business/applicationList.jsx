import Image from "next/image";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

export default function ApplicationList() {
  const data = [
    {
      id: 1,
      fullname: "John Doe",
      title: "Software Engineer",
      dateApplied: new Date("2024-03-15T12:00:00"),
      status: "Accepted",
    },
    {
      id: 2,
      fullname: "Jane Smith",
      title: "Product Manager",
      dateApplied: new Date("2024-03-15T12:00:00"),
      status: "Accepted",
    },
    {
      id: 3,
      fullname: "Alex Johnson",
      title: "UI/UX Designer",
      dateApplied: new Date("2024-03-15T12:00:00"),
      status: "Rejected",
    },
    {
      id: 4,
      fullname: "Sarah Thompson",
      title: "Data Analyst",
      dateApplied: new Date("2024-03-15T12:00:00"),
      status: "Pending",
    },
  ];

  function convertToDayMonthYear(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="rounded-sm border border-gray-200 bg-white px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1 min-w-[500px]">
      <div className="max-w-full overflow-x-auto px-3">
        <h3>Recent Application</h3>
        <div className="mt-3 grid grid-cols-2 gap-5">
          {data.map((item, index) => (
            <div key={index} className="rounded-lg border border-gray-200 p-5">
              <div className="flex justify-between">
                <div className="flex justify-start items-center">
                  <div className=" p-3">
                    <Image
                      src="/images/mya.jpg"
                      width={100}
                      height={80}
                      alt="avatar"
                      className="rounded-full "
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link href="">
                      <h3 className="text-black hover:text-blue-600">
                        {item.fullname}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 pt-1">
                      <FaBriefcase size={16} color="#575653" />
                      <p className="font-normal text-sm">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <IoMdTime size={18} color="#575653" />
                      <p className="font-normal text-sm">
                        {convertToDayMonthYear(item.dateApplied)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="max-h-5">
                  {item.status !== "Pending" ? (
                    <p
                      className={`p-2 rounded-lg font-medium mt-3 ${
                        item.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-600"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : ""
                      }`}
                    >
                      {item.status}
                    </p>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button className="hover:translate-y-[-3px] p-2 bg-blue-100">
                        <AiOutlineCheck color="#2563eb" />
                      </button>
                      <button className="hover:translate-y-[-3px] p-2 bg-red-100">
                        <AiOutlineCloseCircle color="#dc2626" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
