import apiClient from "./apiClient"

const itemService = {
    // Get all items with optional filter parameters
    getAllItems: async(params) => {
        const response = await apiClient.get("/items", { params });
        return response.data;
    },

    // Get item by ID
    getItemById: async(id) => {
        const response = await apiClient.get(`/items/${id}`);
        return response.data;
    },

    // Create a new item
    createItem: async(itemData) => {
        const response = await apiClient.post("/items", itemData);
        return response.data;
    },

    // Update an existing item
    updateItem: async(id, itemData) => {
        const response = await apiClient.put(`/items/${id}`, itemData);
        return response.data;
    },

    // Delete an item
    deleteItem: async(id) => {
        const response = await apiClient.delete(`/items/${id}`);
        return response.data;
    },

    // Get items belonging to the logged-in user
    getUserItems: async() => {
        const response = await apiClient.get('/items/user');
        return response.data;
    },

    // Upload item images
    uploadItemImage: async(formData) => {
        const response = await apiClient.post('/items/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};

export default itemService;