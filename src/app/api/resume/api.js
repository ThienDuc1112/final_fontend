import axios from 'axios';

const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const axiosClient = axios.create({
    baseURL: apiLink, 
  });

const createResume = (resumeData) => {
return axiosClient.post("/DesignResume", resumeData);
} 

const getResumeByUser = (userId) => {
  return axiosClient.get(`/GetResume/${userId}`);
}

export {
    createResume,
    getResumeByUser
}

