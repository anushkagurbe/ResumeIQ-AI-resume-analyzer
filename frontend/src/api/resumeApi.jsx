import axios from "axios";
import { AUTH_API } from "./authApi";

export let RESUME_API = axios.create({
    baseURL: import.meta.env.VITE_RESUME_API_URL
});

RESUME_API.interceptors.request.use((request)=>{
        console.log("request intercept");
        console.log(request);
        let accessToken = localStorage.getItem("accessToken");
        if(accessToken)
        {
            request.headers.Authorization = `Bearer ${accessToken}`
        }
        return request;
    },
    (error)=>{
        console.log(error);
        return Promise.reject(error);
    }
)


RESUME_API.interceptors.response.use((response)=>{
        console.log("response intercept");
        if(response)
        {
            return response;
        }
    },
    async (error)=>{
        console.log("response error interept");
        console.log("error");
        let failedRequest = error.config;

        if(error.response?.status !== 401)
        {
            return Promise.reject(error);
        }

        if(failedRequest._retry)
        {
            return Promise.reject(error);
        }

        failedRequest._retry = true;

        try
        {
            let refreshResponse = await AUTH_API.post("/refresh-token");
            let newAccessToken = refreshResponse.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            failedRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return RESUME_API(failedRequest);
        }   
        catch(refreshError)
        {
            localStorage.removeItem("accessToken");
            window.dispatchEvent(
                new Event("auth:logout")
            )

            return Promise.reject(refreshError);
        }
    }
)