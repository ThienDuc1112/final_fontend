import axios from 'axios';

const apiLink = "https://localhost:5000"

const axiosClient = axios.create({
    baseURL: apiLink, 
  });

 const getCart = async () => {
    return axiosClient.get(`/api/v1/Cart`);
 }

 const addCart = async (params) => {
    return axiosClient.post(`/api/v1/cart`, {params: params});
  };

 export {getCart, addCart}