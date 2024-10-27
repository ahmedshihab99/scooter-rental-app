import axios from "axios";

const API_URL = "/api/users"; // Assuming the backend has user endpoints


const getUserStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return null;
  }
};


const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user details for user ID ${userId}:`, error);
    return null;
  }
};

const rentScooter = async (userId, scooterId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/rent`, {
      scooterId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error renting scooter with ID ${scooterId} for user ID ${userId}:`, error);
    return null;
  }
};

const returnScooter = async (userId, scooterId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/return`, {
      scooterId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error returning scooter with ID ${scooterId} for user ID ${userId}:`, error);
    return null;
  }
};

export default {
  getUserDetails,
  getUserStatistics,
  rentScooter,
  returnScooter,
};

