import apiClient from "./apiClient"

const userService = {
    getAllUsers: async() => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.get("/users/getAllUsers", 
            accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
        );

        return response.data;
    }, 

    getUserById: async(userId) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.get(`/users/user/${userId}`, 
            accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
        );

        return response.data;
    }, 

    getUserByNameAge: async(name, age) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.get(`/users/getUserByName?name=${name}&age=${age}`, 
            accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
        );

        return response.data;
    }, 

    getUserByEmail: async(email) => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await apiClient.get(`/users/getUserByEmail?email=${email}`, 
            accessToken ? { headers: {Authorization: `Bearer ${accessToken}`} } : {} 
        )

        return response.data;
    },

    getUserByMobile: async (mobile) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.get(`/users/getUserByMobile?mobile=${mobile}`, 
            accessToken ? { headers: {Authorization: `Bearer ${accessToken}`} } : {} 
        );
        return response.data;
    },

    updateUser: async(userId, userData) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.put(`/users/user/${userId}`, userData, 
            accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
        );

        return response.data;
    }, 

    deleteUser: async(userId) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await apiClient.delete(`/users/user/${userId}`, 
            accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
        );

        return response.data;
    }, 
    uploadSingleFile: async(userId, formData) => {
        const accessToken = localStorage.getItem("accessToken")
        const resposne = await apiClient.post(`/upload/profile/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data', 
                'Accept': 'application/json'
            }
        })

        return resposne.data;
    }, 

    uploadMultipleFile: async(userId, formData) => {
        const accessToken = localStorage.getItem("accessToken")
        const response = await apiClient.post(`/upload/gallery/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data', 
                'Accept': 'application/json'
            }
        });

        return response.data;
    }
}

export default userService;