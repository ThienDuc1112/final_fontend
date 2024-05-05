"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getJobApp } from "@/app/api/job/api";
import TokenService from "@/utils/Token.service";
import DropdownInput from "@/components/content/dropdownInput";
import InterviewCard from "@/components/business/interviewComponent";
import {useGetCandidateListQuery as GetCandidate} from "@/Context/features/application/applicationApiSlice";
import {
    selectLoading,
    selectSelectedJob,
    setLoading,
    selectJobId,
    setSelectedJob,
    setJobId,
  } from "@/Context/features/application/applicationSlice";

export default function ManageApplications() {
    const dispatch = useDispatch();
  const businessId = TokenService.getBusinessId();
  const [jobs, setJobs] = useState([]);
  const selectedJob = useSelector(selectSelectedJob);
  const jobId = useSelector(selectJobId);
  const loading = useSelector(selectLoading);
  const { data, isLoading, error } = GetCandidate({
    jobId: jobId
  });
  console.log(data);

  useEffect(() => {
    const abortController = new AbortController();
    const queryParams = {
      BusinessId: businessId,
    };
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        let response = await getJobApp(queryParams);
        setJobs(response.data);
        dispatch(setSelectedJob(response.data[0].name));
        dispatch(setJobId(response.data[0].id));
      } catch (error) {
        console.log("Error", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  return (
    <DefaultLayout>
      {isLoading || loading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[700px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px]">
          <div className="mx-5">
            <h2>Interviews Management</h2>
            <p className="text-base font-normal">
              {" "}
              Streamline Your Interviews Workflow{" "}
            </p>
            <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
              <div className="flex items-center justify-start gap-8">
                <div className="min-w-[400px]">
                <DropdownInput
                    MyLabel="Job Name"
                    DataList={jobs}
                    onDataSelect={(name, id) => {
                      dispatch(setSelectedJob(name));
                      dispatch(setJobId(id));
                    }}
                    required={false}
                    selectedOption={selectedJob}
                  />
                </div>
              </div>
              <div className="mt-3 gap-5">
              {data &&
                  data.map((item, index) => (
                <InterviewCard 
                key={index}
                candidate= {item}
                />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
