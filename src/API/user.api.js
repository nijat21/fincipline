import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_FINCIPLINE_API}/user`;

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
export const uploadImg = async (image) => {
    return axios.post(`${baseUrl}/upload`, image);
};

// Update user info with new photo
export const updateImg = async (reqBody) => {
    return axios.put(`${baseUrl}/updateImg`, reqBody);
};

// Edit User information => Change email and/or password



// Delete user and all bank accounts
export const deleteUser = async (user_id) => {
    return axios.delete(`${baseUrl}/deleteUser/${user_id}`);
}


