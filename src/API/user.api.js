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


// uploading profile photo
export const upload = (image) => {
    return axios.post(`${baseUrl}/upload`, image);
};

// Update user info with new photo
export const updateImg = (reqBody) => {
    return axios.put(`${baseUrl}/updateImg`, reqBody);
};

// Edit User information => Change email and/or password



// Delete user and all bank accounts
export const deleteUser = (user_id) => {
    return axios.delete(`${baseUrl}/deleteUser/${user_id}`);
}


