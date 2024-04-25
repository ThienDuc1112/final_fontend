import Image from "next/image";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import HelperFunctions from "@/utils/functions";
import ApplicationComponent from "@/components/business/applicationComponent";

export default function ApplicationList({ data, setTrigger }) {
  return (
    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 sm:px-7.5 xl:pb-5 min-w-[500px]">
      <div className="max-w-full overflow-x-auto pt-3">
        <h3>Recent Application</h3>
        <div className="mt-3 grid grid-cols-2 gap-5">
          {data?.map((item, index) => (
            <ApplicationComponent
              appId={item.id}
              item={item}
              key={index}
              onClick={(data) => {
                if (data) {
                  setTrigger("data");
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
