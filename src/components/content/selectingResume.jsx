"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/business/Gallergy/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetAllResumeInfoQuery } from "@/Context/features/resume/resumeApiSlice";
import TokenService from "@/utils/Token.service";
import {
  useCreateApplicationMutation,
  useGetMatchingQuery,
} from "@/Context/features/application/applicationApiSlice";
import { useState, useEffect } from "react";

export default function SelectingResume({
  color,
  name,
  handleConfirm,
  jobId,
  businessUserId,
  type,
  receiveMatching,
  businessId
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const { userId, role } = TokenService.getUserProfile();
  const {
    data: resumeData,
    isError,
    isLoading,
    error,
  } = useGetAllResumeInfoQuery({ userId: userId });

  const [
    createApplication,
    { data: appData, isError: isError2, isLoading: isLoading2 },
  ] = useCreateApplicationMutation();

  const { data: matchingData, isLoading: isMatchingLoading } =
    useGetMatchingQuery({ resumeId: resumeId, jobId: jobId });

  const router = useRouter();

  function convertToDayMonthYear(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const handleCheck = () => {
    if (userId === undefined || userId === null) {
      router.push("/auth/login");
    }
  };

  const handleSubmit = async (resumeId) => {
    try {
      var app = {
        candidateId: userId,
        jobId: jobId,
        resumeId: resumeId,
        businessUserId: businessUserId,
        businessId: businessId
      };
      const response = await createApplication(app);
      console.log(response);
      handleConfirm(response.data.success, response.data.message);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (matchingData) {
      console.log(matchingData);
      receiveMatching(matchingData);
    }
  }, [matchingData]);

  const handleAnalyze = async (resumeId) => {
    setResumeId(resumeId);
    handleClose();
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog variant="blue" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {color === "blue" ? (
          <Button
            variant={color}
            size="xl"
            className="icon-send-letter"
            onClick={handleCheck}
          >
            {name}
          </Button>
        ) : (
          <Button variant={color}>{name}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Resume</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1200px]">
              {isLoading ? (
                <div className=" my-[200px]">is loading.....</div>
              ) : (
                <div>
                  {resumeData === null || resumeData.length === 0 ? (
                    <div className="div flex flex-col justify-center px-[300px] mb-5 py-[100px]">
                      <h2 className="pb-3 text-center">
                        You do not have any resume
                      </h2>
                      <Button
                        variant="blue"
                        onClick={() => router.push(`/resume/create`)}
                      >
                        Create new one
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                          <table className="w-full table-auto">
                            <thead>
                              <tr className="bg-gray-100 text-left ">
                                <th className="min-w-[100px] px-4 py-4 font-medium text-black text-xl">
                                  ID
                                </th>
                                <th className="min-w-[280px] px-4 py-4 font-medium text-black pl-11 text-xl">
                                  Resume Name
                                </th>
                                <th className="min-w-[180px] px-4 py-4 font-medium text-black text-xl">
                                  Created Date
                                </th>
                                <th className="px-4 py-4 font-medium text-black text-xl">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {resumeData.map((item, key) => (
                                <tr key={key}>
                                  <td className="border-b border-[#eee]px-4 py-5 ">
                                    <p className="text-black text-lg flex pl-4 justify-start">
                                      {key + 1}
                                    </p>
                                  </td>
                                  <td className="border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                                    <h5 className="font-medium text-black text-lg">
                                      {item.fullName}
                                    </h5>
                                  </td>
                                  <td className="border-b border-[#eee] px-4 py-5">
                                    <p
                                      className={`text-lg flex justify-center `}
                                    >
                                      {convertToDayMonthYear(item.createdDate)}
                                    </p>
                                  </td>
                                  <td className="border-b border-[#eee] px-4 py-5">
                                    <div className="flex items-center space-x-3.5">
                                      <Button
                                        variant="blue"
                                        onClick={() => {
                                          if (type === "apply") {
                                            handleSubmit(item.id);
                                          } else {
                                            handleAnalyze(item.id);
                                          }
                                        }}
                                      >
                                        Select
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
