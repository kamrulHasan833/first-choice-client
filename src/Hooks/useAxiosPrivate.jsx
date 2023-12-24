import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://first-choice-server.vercel.app",
});
const useAxiosPrivate = () => {
  // Add a request interceptor
  axiosPrivate.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");

      config.headers.Authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  axiosPrivate.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default useAxiosPrivate;
