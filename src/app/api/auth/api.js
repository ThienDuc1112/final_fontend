import axios from "axios";

const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const axiosClient = axios.create({
    baseURL: apiLink, 
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
  