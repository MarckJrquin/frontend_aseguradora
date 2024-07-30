import axios from 'axios';

const API_URL = `/api/Auth`;


// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const signin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { username, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const signout = async () => {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        handleError(error);
    }
}


const getCurrentUser = async () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        handleError(error);
    }
}


const refreshToken = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) throw new Error('No token found');

        const response = await axios.post(`${API_URL}/refresh-token`, { token: user.token });
        if (response.data.token) {
            user.token = response.data.token;
            localStorage.setItem('user', JSON.stringify(user));
        }
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const AuthService = {
    signin,
    signup,
    signout,
    getCurrentUser,
    refreshToken
}


export default AuthService;