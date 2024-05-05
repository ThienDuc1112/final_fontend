import axios from "axios";

const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const axiosClient = axios.create({
  baseURL: apiLink,
});

const createBusiness = (businessData) => {
  return axiosClient.post("/Business", businessData);
};
const getBusinessID = (userId) => {
  return axiosClient.get(`/BusinessID/${userId}`);
};
const getBusinessDetail = (id) => {
  return axiosClient.get(`/BusinessInforDetail/${id}`);
};
const getBusinessDetailById = (id) => {
  return axiosClient.get(`/BusinessDetail/${id}`);
};
const GetBusinessList = ({params}) => {
  return axiosClient.get(`/BusinessList`,{params: params});
};
export {
  createBusiness,
  getBusinessID,
  getBusinessDetail,
  getBusinessDetailById,
  GetBusinessList
};
