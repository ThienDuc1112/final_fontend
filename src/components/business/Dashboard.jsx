import Table from "@/components/business/Table";
import { FaBriefcase } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 w-full mt-10 ml-10">
      <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
        <div className="flex justify-between gap-5">
          <div
            className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-blue-200/50 rounded-sm`}
          >
            <FaBriefcase size={24} color="#2563eb" />
          </div>

          <div className="flex items-stretch justify-between pl-[60px]">
            <div>
              <h4
                className={`text-title-md self-between font-bold text-blue-600 text-3xl pb-3 pl-4`}
              >
                15
              </h4>
              <span className="text-md font-medium">Total Job</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
        <div className="flex justify-between gap-5">
          <div
            className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-red-200/50 rounded-sm`}
          >
            <AiOutlineSolution size={24} color="#d12424" />
          </div>

          <div className="flex items-stretch justify-between pl-[60px]">
            <div>
              <h4
                className={`text-title-md self-between font-bold text-red-600 text-3xl pb-3 pl-4`}
              >
                15
              </h4>
              <span className="text-md font-medium">Applications</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
        <div className="flex justify-between gap-5">
          <div
            className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-violet-200/70 rounded-sm`}
          >
            <BsFillPersonVcardFill size={24} color="#7c3ead" />
          </div>

          <div className="flex items-stretch justify-between pl-[60px]">
            <div>
              <h4
                className={`text-title-md self-between font-bold text-violet-600 text-3xl pb-3 pl-4`}
              >
                5
              </h4>
              <span className="text-md font-medium">Interviews</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-md">
        <div className="flex justify-between gap-5">
          <div
            className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] bg-emerald-200/50 rounded-sm`}
          >
            <IoNotifications size={24} color="#059669" />
          </div>

          <div className="flex items-stretch justify-between pl-[60px]">
            <div>
              <h4
                className={`text-title-md self-between font-bold text-emerald-600 text-3xl pb-3 pl-4`}
              >
                15
              </h4>
              <span className="text-md font-medium">Notifications</span>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
      <div className="mt-4 flex gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table />
        <div>a</div>
      </div>
    </div>
  );
}
