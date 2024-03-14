"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import MyPagination from "@/components/myPagination";
import { getJobApp } from "@/app/api/job/api";
import { useSearchParams } from "next/navigation";
import TokenService from "@/utils/Token.service";
import DropdownInput from "@/components/content/dropdownInput";
import { useGetApplicationListQuery as GetApp } from "@/Context/features/application/applicationApiSlice";
import ApplicationComponent from "@/components/business/applicationComponent";
import {
  selectLoading,
  selectSelectedJob,
  selectSelectedStatus,
  setLoading,
  selectJobId,
  setSelectedJob,
  setJobId,
  setSelectedStatus,
} from "@/Context/features/application/applicationSlice";
export default function ManageApplications() {
  const dispatch = useDispatch();
  const businessId = TokenService.getBusinessId();
  const status = [
    { id: 1, name: "All" },
    { id: 2, name: "Pending" },
    { id: 3, name: "Shortlisted" },
    { id: 4, name: "Interviewing" },
    { id: 5, name: "Accepted" },
    { id: 6, name: "Rejected" },
  ];
  const [jobs, setJobs] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const selectedJob = useSelector(selectSelectedJob);
  const jobId = useSelector(selectJobId);
  const selectedStatus = useSelector(selectSelectedStatus);
  const loading = useSelector(selectLoading);
  const { data, isLoading, error, refetch } = GetApp({
    jobId: jobId,
    status: selectedStatus,
  });
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

  useEffect(() => {
    refetch();
  }, [trigger]);

  return (
    <DefaultLayout>
      {loading || isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[200px] ml-[700px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative max-w-[1600px] mt-10 mb-[300px]">
          <div className="mx-5">
            <h2>Job Applications Management</h2>
            <p className="text-base font-normal">
              {" "}
              Streamline Your Job Application Workflow{" "}
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
                <div className="min-w-[300px]">
                  <DropdownInput
                    MyLabel="Status of Application"
                    DataList={status}
                    onDataSelect={(name, id) =>
                      dispatch(setSelectedStatus(name))
                    }
                    required={false}
                    selectedOption={selectedStatus}
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-5">
                {data &&
                  data.map((item, index) => (
                    <ApplicationComponent
                      appId={item.id}
                      item={item}
                      key={index}
                      onClick={(data) => {
                        if (data) {
                          setTrigger(!trigger);
                        }
                      }}
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
