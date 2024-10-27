import axios from 'axios';

const API_BASE_URL = 'https://my-course-backend-green.vercel.app';

export const fetchUserDetails = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/details`, { email }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Returns the response data directly if successful
  } catch (error) {
    // Handle errors appropriately and throw them for the calling function
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Unable to fetch user details");
  }
};
