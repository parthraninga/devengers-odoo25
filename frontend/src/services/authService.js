import apiClient from "./apiClient"

const authService = {
    addUser: async(userData) => {
        const response = await apiClient.post("/auth/addUser", userData);
        console.log(response);
        return response.data;
    }, 

    // 1. Email + Password login
    loginWithEmailPassword: async(email, password) => {
        const response = await apiClient.post("/auth/login/email-password", {
            email: email, 
            password: password
        })

        return response.data; 
    }, 

    // 2. Mobile + Password login
    loginWithMobilePassword: async(mobile, password) => {
        const response = await apiClient.post("/auth/login/mobile-password", {
            mobile: mobile, 
            password: password
        })  
        return response.data;
    },

    // 3. Email + OTP login
    sendEmailOTP: async(email) => {
        const response = await apiClient.post("/auth/login/email-otp/send", {
            email: email
        })
        return response.data;
    }, 
    verifyEmailOTP: async(email, otp) => {
        const response = await apiClient.post("/auth/login/email-otp/verify", {
            email: email,
            otp: otp
        })
        return response.data;
    },

    // 4. Mobile + OTP login
    sendMobileOTP: async(mobile) => {
        const response = await apiClient.post("/auth/login/mobile-otp/send", {
            mobile: mobile
        })
        return response.data;
    },
    verifyMobileOTP: async(mobile, otp) => {
        const response = await apiClient.post("/auth/login/mobile-otp/verify", {
            mobile: mobile,
            otp: otp
        })
        return response.data;
    },
    

    logoutUser: async(refreshToken) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.post("/auth/logout", {
            refreshToken: refreshToken
        }, 
            accessToken ? {headers: {Authorization: `Bearer ${accessToken}`}} : {}
        );

        return response;
    }, 

    forgetPassword: async(email) => {
        const response = await apiClient.post("/auth/forgetPassword", {
            email: email
        })

        return response.data;
    },

    resetPassword: async(email, newPassword, token = null) => {
    const url = token 
        ? `/auth/resetPassword?email=${email}&token=${token}` 
        : `/auth/resetPassword?email=${email}`;
    
    const response = await apiClient.post(url, {
        newPassword: newPassword
    });
    return response.data;
}, 

    refreshAccessToken: async(refreshToken) => {
        const response = await apiClient.post("/auth/refreshAccessToken", {
            refreshToken: refreshToken
        })
        return response.data;
    }
}

export default authService;