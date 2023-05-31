import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create();

const localStore: Storage = window.localStorage;

const baseURL = "https://elearningnew.cybersoft.edu.vn/api/";

const TokenCyberSoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk";

let token: string = "";
export const checkToken = () => {
  const user = JSON.parse(localStorage.getItem("userEdemy") || "null");
  if (user === null) {
    token = "";
  } else {
    token = `Bearer ${user.accessToken}`;
    localStorage.setItem("token", token)
  }
};

http.interceptors.request.use((config: any) => {
    return {
        ...config,
        headers: {
            TokenCyberSoft,
            Authorization: token,
        },
        baseURL,
    };
});

http.interceptors.response.use(
  (response) => {
     return response;
  },
  (error) => {
     console.log({ error });
     if (error?.response?.status === 403) {
        toast.error("Bạn không có quyền truy cập");
     }
     if (error?.response?.status === 400) {
        toast.error(error.response?.data?.content);
     }
     if (error?.response?.status === 404) {
        toast.error(error.response?.data?.content);
     }
     if (error?.response?.status === 500) {
        toast.error(error.response?.data?.content);
     }
     if (error?.response?.status === 401) {
        toast.error(error.response?.data?.content);
     }
  }
);

export default http;

export const httpErrorCode = {
  403: "",
};
export const messError = {
  403: "Access denied!"
}