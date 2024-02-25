import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "https://localhost:5011/", 
  });

const createResume = (resumeData) => {
return axiosClient.post("/DesignResume", resumeData);
} 

export {
    createResume,
}

