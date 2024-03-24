"use client";
import { useState, useEffect } from "react";
import { getAdminCareer } from "@/app/api/provider/api";
import HelpFunctions from "@/utils/functions";
import {
  useAddCareerMutation,
  useUpdateCareerMutation,
  useTriggerCareerMutation,
} from "@/Context/features/career/careerApiSlice";

export default function CareerManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [careers, setCareers] = useState([]);
  const [TriggerCareer] = useTriggerCareerMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAdminCareer();
        setCareers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (index, id) => {
    const updatedCareers = [...careers];
    if (updatedCareers[index].isAllowed ===false) {
      updatedCareers[index] = {
        ...updatedCareers[index],
        isAllowed: true,
      };
      const career = { id: id, isAllowed: true };
      await TriggerCareer(career);
    } else {
      updatedCareers[index] = {
        ...updatedCareers[index],
        isAllowed: false,
      };
      const career = { id: id, isAllowed: false };
      const response = await TriggerCareer(career);
      console.log(response)
    }
    setCareers(updatedCareers);
  };

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[300px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px] ml-[180px]">
          <h2>Manage Career</h2>
          <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1370px]">
            <div className="bg-slate-100 px-2 py-3 font-medium rounded-md">
              <div className="grid grid-cols-12 gap-4 text-slate-700 text-start text-lg">
                <div className="col-span-2 pl-4">Career Name</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Created Date</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">IsActive</div>
                <div className="col-span-1">Update</div>
              </div>
            </div>
            {careers.length > 0 &&
              careers.map((item, index) => (
                <div className="px-2 py-3 text-base" key={index}>
                  <div className="grid grid-cols-12 gap-4 text-slate-700 text-start text-lg">
                    <div className="col-span-2 pl-4 text-black">
                      {item?.name}
                    </div>
                    <div className="col-span-5">{item?.description}</div>
                    <div className="col-span-2 italic">
                      {" "}
                      {HelpFunctions.convertToDayMonthYear(item?.createdDate)}
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`font-semibold ${
                          item?.isAllowed === true
                            ? "text-emerald-600"
                            : "text-red-600"
                        } `}
                      >
                        {item?.isAllowed === true ? "Active" : "Blocked"}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <label className={`toggle`}>
                        <input
                          type="checkbox"
                          checked={item?.isAllowed}
                          onChange={() => handleToggle(index, item.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="col-span-1">Update</div>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
