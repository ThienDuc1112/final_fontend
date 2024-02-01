import axios from "axios";
const axiosClient = axios.create({
    baseURL: "https://localhost:5007/", // Replace with your actual API base URL
  });

  const registerCandidate = (userData) => {
    return axiosClient.post("/candidate/register", userData);
  }; 

  const registerEmployer = (userData) => {
    return axiosClient.post("/employer/register", userData);
  }; 

  export {
    registerCandidate,
    registerEmployer,
  }
  