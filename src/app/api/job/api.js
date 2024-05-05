import axios from "axios";
const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const axiosClient = axios.create({
  baseURL: apiLink,
});

const getJobDetail = (id) => {
  return axiosClient.get(`/Job/${id}`);
};
const getJobManagement = (params) => {
  return axiosClient.get("/GetJobManagement",{params: params});
};
const getListJob = (params) => {
  return axiosClient.get("/GetListJob", {params: params});
};

const getJobApp = (params) => {
  return axiosClient.get("/GetJobApp",{params: params});
}
const getJobByBusiness = (id) => {
  return axiosClient.get(`/GetJobsByBusiness/${id}`)
}

const getNewJob = () => {
  return axiosClient.get("/GetNewJobs");
}

export  {getJobDetail, getJobManagement, getListJob, getJobApp,getJobByBusiness, getNewJob}