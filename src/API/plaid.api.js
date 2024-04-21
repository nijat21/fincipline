import axios from "axios";
const baseUrl = `${import.meta.env.VITE_FINCIPLINE_API}/plaid`;

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


// Creating a Link token
export const createLinkToken = async (user) => {
    return axios.post(`${baseUrl}/create_link_token`, user);
};

// Convert Link token to public token
export const setAccessToken = async (input) => {
    return axios.post(`${baseUrl}/set_access_token`, input);
};

// /auth
export const retrieveAuth = async (params) => {
    const { user_id, bank_id } = params;
    return axios.get(`${baseUrl}/auth/${user_id}/${bank_id}`);
};

// Get the Bank balance
export const getBalance = async (params) => {
    const { user_id, bank_id } = params;
    return axios.get(`${baseUrl}/balance/${user_id}/${bank_id}`);
};

// Get the Bank transactions
export const getBankTransactions = async (params) => {
    const { user_id, bank_id } = params;
    return axios.get(`${baseUrl}/transactions/${user_id}/${bank_id}`);
};

// Get users all transactions
export const getAllTransactions = async (params) => {
    const { user_id } = params;
    return axios.get(`${baseUrl}/transactions/${user_id}`);
};