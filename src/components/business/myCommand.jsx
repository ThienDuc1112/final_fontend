import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddToQueue } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MeetingRoom from "@/components/business/MeetingRoom";
import InterviewSchedule from "@/components/business/InterviewSchedule";

const DropdownInput = () => {
  const [show, setShow] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="mb-4 grid w-full max-w-[200px] items-center gap-1.5">
      <div className="relative">
        <div className="relative flex items-center">
          <div
            className="relative flex items-center justify-start border border-gray-600 w-full h-11
                 rounded-lg outline-none hover:border-2 transition-all duration-300 focus:border-2 bg-white"
            onClick={() => {
              setShow(!show);
            }}
          >
            <span
              className={`absolute text-sm left-4 pointer-events-none text-black font-bold max-w-[300px]`}
            >
              Action
            </span>
          </div>
          <div className="absolute right-4 h-6 w-6 bg-gray-200 flex items-center justify-center rounded-full">
            <IoIosArrowDown
              className={`text-gray-600 transform transition-transform duration-250 ${
                show ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {show && (
          <div className="bg-white rounded-lg mt-2 p-3 border border-gray-200 w-[300px] z-20 text-gray-800 overflow-auto max-h-56 absolute">
            <div
              onClick={() => {
                setShow(!show);
                setIsOpen(true);
              }}
              className="py-2 px-1 transition-all rounded-md duration-300 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <MdAddToQueue color="#4b5563" size={24} />
              <p className="text-gray-600 font-semibold">
                Creating Meeting Room
              </p>
            </div>
            <div
              onClick={() => {
                setShow(!show);
                setIsOpen2(true);
              }}
              className="py-2 px-1 transition-all rounded-md duration-300 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <FaRegCalendarCheck color="#4b5563" size={24} />
              <p className="text-gray-600 font-semibold">Seting Up Schedules</p>
            </div>
            <div
              onClick={() => {
                setShow(!show);
              }}
              className="py-2 px-1 transition-all rounded-md duration-300 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <AiOutlineCloseCircle color="#4b5563" size={24} />
              <p className="text-gray-600 font-semibold">
                Notifying of Passing Interview
              </p>
            </div>
            <div
              onClick={() => {
                setShow(!show);
              }}
              className="py-2 px-1 transition-all rounded-md duration-300 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <FaRegCircleCheck color="#4b5563" size={24} />
              <p className="text-gray-600 font-semibold">
                Notifying of Failed Interview
              </p>
            </div>
          </div>
        )}
      </div>
      <MeetingRoom open={isOpen} setOpen={setIsOpen} />
      <InterviewSchedule open={isOpen2} setOpen={setIsOpen2} />
    </div>
  );
};

export default DropdownInput;
