"use client";
import { useState, useEffect } from "react";
import HelpFunctions from "@/utils/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSkillsByAdmin } from "@/app/api/provider/api";
import { useSearchParams } from "next/navigation";
import MyPagination from "@/components/myPagination";
import { useTriggerSkillMutation } from "@/Context/features/skill";

export default function ManageSkill() {
  const [triggerSkill] = useTriggerSkillMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [careerId, setCareerId] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleToggle = async (index, id) => {
    const updatedSkills = [...skills];
    if (updatedSkills[index].createdBy !== "admin") {
      updatedSkills[index] = {
        ...updatedSkills[index],
        createdBy: "admin",
      };
      const skill = { id: id, createdBy: "admin" };
      await triggerSkill(skill);
    } else {
        updatedSkills[index] = {
        ...updatedSkills[index],
        createdBy: "unknown",
      };
      const skill = { id: id, createdBy: "unknown" };
      await triggerSkill(skill);
    }
    setSkills(updatedSkills);
  };

  const notify = (success, mess) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (success) {
      toast.success(mess, toastOptions);
    } else {
      toast.error(mess, toastOptions);
    }
  };
  const fetchData = async () => {
    const params = {
      page: currentPage,
      careerId: careerId,
    };
    try {
      setIsLoading(true);
      const response = await getSkillsByAdmin({ params });
      setSkills(response.data.getSkillAdminDTOs);
      setTotalPages(Math.ceil(response.data.totalNumber / 10));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const trigger = (data) => {
    if (data) {
      fetchData();
    }
  };

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[300px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px] ml-[180px]">
          <h2>Manage Skill</h2>
          <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1370px]">
            <div className="bg-slate-100 px-2 py-3 font-medium rounded-md">
              <div className="grid grid-cols-12 gap-4 text-slate-700 text-start text-lg">
                <div className="col-span-3 pl-4">Skill Name</div>
                <div className="col-span-3">Career Name</div>
                <div className="col-span-2">Created Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">IsActive</div>
              </div>
            </div>
            {skills.length > 0 &&
              skills.map((item, index) => (
                <div className="px-2 py-3 text-base" key={index}>
                  <div className="grid grid-cols-12 gap-4 text-slate-700 text-start text-lg">
                    <div className="col-span-3 pl-4 text-black">
                      {item?.name}
                    </div>
                    <div className="col-span-3">{item?.careerName}</div>
                    <div className="col-span-2 italic">
                      {" "}
                      {HelpFunctions.convertToDayMonthYear(item?.createdDate)}
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`font-semibold ${
                          item?.createdBy === "admin"
                            ? "text-emerald-600"
                            : "text-red-600"
                        } `}
                      >
                        {item?.createdBy === "admin" ? "Active" : "Blocked"}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <label className={`toggle`}>
                        <input
                          type="checkbox"
                          checked={item?.createdBy === "admin" ? true : false}
                          onChange={() => handleToggle(index, item.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
            {totalPages !== undefined && totalPages > 1 && (
              <div className="pagination mt-5 mb-1 mx-auto">
                <MyPagination totalPages={totalPages} />
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
