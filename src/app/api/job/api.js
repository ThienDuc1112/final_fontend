import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5011/",
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

export  {getJobDetail, getJobManagement, getListJob, getJobApp,getJobByBusiness}