"use client";
import { useState, useEffect } from "react";
import HelpFunctions from "@/utils/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLanguagesByAdmin } from "@/app/api/provider/api";
import CreateLanguageDialog from "@/components/admin/Dialog/createLanguageDialog";
import { useTriggerLanguageMutation } from "@/Context/features/skill/skillApiSlice";

export default function ManageLanguage() {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerLanguage] = useTriggerLanguageMutation();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getLanguagesByAdmin();
      setLanguages(response.data);
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
  const handleToggle = async (index, id) => {
    const updatedLanguages = [...languages];
    if (updatedLanguages[index].isAvailable === true) {
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        isAvailable: false,
      };
      await triggerLanguage(id);
    } else {
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        isAvailable: true,
      };
      await triggerLanguage(id);
    }
    setLanguages(updatedLanguages);
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

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[300px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px] ml-[180px]">
          <h2>Manage Language</h2>
          <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1100px]">
            <div className="flex justify-end mb-3">
              <div className="min-w-[100px] ">
                <CreateLanguageDialog notify={notify} trigger={trigger} />
              </div>
            </div>
            <div className="bg-slate-100 px-2 py-3 font-medium rounded-md">
              <div className="grid grid-cols-10 gap-4 text-slate-700 text-start text-lg">
                <div className="col-span-1 pl-4">STT</div>
                <div className="col-span-3">Language Name</div>
                <div className="col-span-2">Created Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">IsActive</div>
              </div>
            </div>
            {languages.length > 0 &&
              languages.map((item, index) => (
                <div className="px-2 py-3 text-base" key={index}>
                  <div className="grid grid-cols-10 gap-4 text-slate-700 text-start text-lg">
                    <div className="col-span-1 pl-4 text-black">
                      {index + 1}
                    </div>
                    <div className="col-span-3">{item?.languageName}</div>
                    <div className="col-span-2 italic">
                      {" "}
                      {HelpFunctions.convertToDayMonthYear(item?.createdDate)}
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`font-semibold ${
                          item?.isAvailable === true
                            ? "text-emerald-600"
                            : "text-red-600"
                        } `}
                      >
                        {item?.isAvailable === true ? "Active" : "Blocked"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <label className={`toggle`}>
                        <input
                          type="checkbox"
                          checked={item?.isAvailable === true ? true : false}
                          onChange={() => handleToggle(index, item.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
