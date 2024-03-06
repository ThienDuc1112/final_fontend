import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "https://localhost:5011/", 
  });

 const getBusinessSize = () => {
    return axiosClient.get("/Provider/GetBusinessSize");
 } ;

 const getCareer = () => {
   return axiosClient.get("/GetAllCareer");
 }

const getCareerLevel = () => {
   return axiosClient.get("/Provider/GetCareerLevel");
}
const getEducationLevel = () => {
   return axiosClient.get("/Provider/GetEducationLevel");
}
const getExperienceLevel = () => {
   return axiosClient.get("/Provider/GetExperienceYear");
}
const getJobType = () => {
   return axiosClient.get("/Provider/GetJobType");
}

const getLanguages = () => {
   return axiosClient.get("/GetLanguages");
}

const getCareersWithSkills = () => {
   return axiosClient.get("/GetCareersWithSkills");
}

 export {
    getBusinessSize,
    getCareer,
    getCareerLevel,
    getEducationLevel,
    getExperienceLevel,
    getJobType,
    getLanguages,
    getCareersWithSkills
 } 
 
  