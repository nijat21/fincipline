import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_FINCIPLINE_API}/api`;

const setAuthorizationHeaders = () => {
    // Axios method that intercepts with every methods 
    axios.interceptors.request.use(config => {
        // retrieving the token from local storage
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    });
};

setAuthorizationHeaders();

// Get all accounts 
export const getAccounts = async (user_id) => {
    return axios.get(`${baseUrl}/accounts`, user_id);
};
