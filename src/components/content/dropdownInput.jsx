import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowDown } from "react-icons/io";

const DropdownInput = ({ Label, dataList }) => {
  return (
    <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
      <Label className="text-gray-600">{Label}</Label>
      <div className="relative">
        <div className="relative flex items-center">
          <div
            className="relative flex items-center justify-start border border-gray-100 w-full h-11
                 rounded-lg outline-none hover:border-blue-500 transition-all duration-300 focus:border-blue-500 bg-white"
          >
            <span className="absolute text-gray-300 text-sm left-4 pointer-events-none">
              Select ...
            </span>
          </div>
          <div className="absolute right-4 h-6 w-6 bg-blue-200 flex items-center justify-center rounded-full">
            <IoIosArrowDown className="text-blue-500 transform transition-transform duration-250 rotate-180" />
          </div>
        </div>

        <div className="bg-white rounded-lg mt-2 p-3 border border-gray-200 w-full z-20 text-gray-800 overflow-auto max-h-56 absolute">
          {dataList.map((element, index) => (
            <div key={index} className="py-2 px-3 transition-all rounded-md duration-300 hover:bg-blue-100 cursor-pointer flex items-center text-sm">
                {element.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

 export default DropdownInput;
