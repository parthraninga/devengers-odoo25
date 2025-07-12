import apiClient from "./apiClient"

const swapService = {
    // Get all swaps
    getAllSwaps: async() => {
        const response = await apiClient.get("/swaps");
        return response.data;
    },

    // Get swap by ID
    getSwapById: async(id) => {
        const response = await apiClient.get(`/swaps/${id}`);
        return response.data;
    },

    // Create a new swap request
    createSwap: async(swapData) => {
        const response = await apiClient.post("/swaps", swapData);
        return response.data;
    },

    // Update swap status (accept/reject/cancel)
    updateSwapStatus: async(id, status) => {
        const response = await apiClient.put(`/swaps/${id}/status`, { status });
        return response.data;
    },

    // Get swaps belonging to the logged-in user (both initiated and received)
    getUserSwaps: async() => {
        const response = await apiClient.get('/swaps/user');
        return response.data;
    }
};

export default swapService;