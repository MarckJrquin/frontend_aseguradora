import axios from 'axios';

const API_URL = `/api/Quote`;

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

const createQuote = async (quoteData) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${API_URL}/create-quote`, quoteData, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const saveQuote = async (quoteData) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${API_URL}/save-quote`, quoteData, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getInsuranceTypes = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${API_URL}/insurance-types`, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getCoverages = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${API_URL}/coverages`, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getUserQuotes = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${API_URL}/user-quotes`, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getAllQuotes = async () => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get(`${API_URL}/all-quotes`, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const deleteQuote = async (id) => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.delete(`${API_URL}/delete-quote/${id}`, config);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const QuoteInsuranceService = {
    createQuote,
    saveQuote,
    getInsuranceTypes,
    getCoverages,
    getUserQuotes,
    getAllQuotes,
    deleteQuote
};


export default QuoteInsuranceService;