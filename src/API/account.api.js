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

// Get all Banks
export const getBanks = async (params) => {
    const { user_id } = params;
    return axios.get(`${baseUrl}/banks/${user_id}`);
};




// Get all accounts of a specific bank
export const getAccounts = async (params) => {
    const { bank_id } = params;
    return axios.get(`${baseUrl}/accounts/${bank_id}`);
};

// Get a specific account
export const getAccount = async (params) => {
    const { _id } = params;
    return axios.get(`${baseUrl}/accounts/${_id}`);
};

// Delete specific bank 

// Delete specific account