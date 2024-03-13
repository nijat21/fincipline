import axios from "axios";
const baseUrl = `${import.meta.env.VITE_FINCIPLINE_API}/auth`;


export const signup = user => {
    return axios.post(`${baseUrl}/signup`, user);
};

export const login = user => {
    return axios.post(`${baseUrl}/login`, user);
};

export const verify = storedToken => {
    return axios.get(`${baseUrl}/verify`, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    });
};
