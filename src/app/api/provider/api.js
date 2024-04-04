import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5011/",
});

const getBusinessSize = () => {
  return axiosClient.get("/Provider/GetBusinessSize");
};

const getCareer = () => {
  return axiosClient.get("/GetAllCareer");
};

const getAdminCareer = () => {
  return axiosClient.get("/GetAdminCareers");
};

const getCareerLevel = () => {
  return axiosClient.get("/Provider/GetCareerLevel");
};
const getEducationLevel = () => {
  return axiosClient.get("/Provider/GetEducationLevel");
};
const getExperienceLevel = () => {
  return axiosClient.get("/Provider/GetExperienceYear");
};
const getJobType = () => {
  return axiosClient.get("/Provider/GetJobType");
};

const getLanguages = () => {
  return axiosClient.get("/GetLanguages");
};

const getCareersWithSkills = () => {
  return axiosClient.get("/GetCareersWithSkills");
};

const getSkillsByAdmin = ({params}) => {
  return axiosClient.get("/GetSkillsByAdmin", {params: params });
};

const getLanguagesByAdmin = () => {
  return axiosClient.get("/GetAdminLanguages");
}

export {
  getBusinessSize,
  getCareer,
  getCareerLevel,
  getEducationLevel,
  getExperienceLevel,
  getJobType,
  getLanguages,
  getCareersWithSkills,
  getAdminCareer,
  getSkillsByAdmin,
  getLanguagesByAdmin
};
