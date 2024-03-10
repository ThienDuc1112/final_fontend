import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5011/",
});

const createBusiness = (businessData) => {
  return axiosClient.post("/Business", businessData);
};
const getBusinessID = (userId) => {
  return axiosClient.get(`/BusinessID/${userId}`);
};
const getBusinessDetail = (id) => {
  return axiosClient.get(`/BusinessInforDetail/${id}`);
}
export { createBusiness, getBusinessID, getBusinessDetail };
