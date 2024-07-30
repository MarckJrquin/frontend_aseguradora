import axios from 'axios';

const API_URL = `/api/User`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;

// Function to get the token from localStorage
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
};

const getProfileData = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const updateProfileData = async (userData) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/profile`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updatePassword = async (passwordData) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/profile/password`, passwordData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteAccount = async () => {
    try {
        const token = getToken();
        const response = await axios.delete(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const allUsers = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const AuthService = {
    getProfileData,
    updateProfileData,
    updatePassword,
    deleteAccount,
    allUsers
}


export default AuthService;