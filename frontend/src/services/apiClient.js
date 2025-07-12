import axios from "axios"
import authService from "./authService";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3001";

const apiClient = axios.create({
    baseURL: API_BASE_URL, 
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

// request interceptor to add accessToken to request headers
apiClient.interceptors.request.use(
    (config) =>{
        // get accessToken from localStorage
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken) { 
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

// response interceptor to handle token expiration
apiClient.interceptors.response.use(
    (response) => {
        return response;
    }, 
    async (error) => {
        const originalRequest = error.config;
        console.log("Request failed:", error.response?.status, error.response?.data);
        console.log("Is token expired?", error.response?.data?.code === "TOKEN_EXPIRED");


        if(error.response?.status === 401 && error.response.data.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    // called backend api to refreshAccessToken 
                    const response = await authService.refreshAccessToken(refreshToken);
                    const {accessToken} = response.data;
                    console.log("Got new accessToken received From refreshToken:", accessToken);
                    // save new accessToken to localStorage
                    localStorage.setItem("accessToken", accessToken);
                    
                    // update new accessToken to original request headers
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    
                    // retry the original request with new accessToken
                    return axios(originalRequest);
                } else {
                    // if no refreshToken, redirect to login page
                    localStorage.clear(); 
                    window.location.href = "/login"; // Redirect to login page
                    return Promise.reject(error);
                }

            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);

                // if refreshAccessToken fails, then go in login page
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/login"; // Redirect to login page

                return Promise.reject(refreshError);
            }
        }

        // all other errors
        return Promise.reject(error);
    }
)

export default apiClient;