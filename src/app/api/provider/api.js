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

 export {
    getBusinessSize,
    getCareer,
 } 
 
  