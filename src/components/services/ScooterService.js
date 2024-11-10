import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const API_URL = `${baseURL}/scooters`;



const getAllScooters = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching scooters:", error);
    return [];
  }
};

const getScooterById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching scooter with ID ${id}:`, error);
    return null;
  }
};

const updateScooterStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating scooter status with ID ${id}:`, error);
    return null;
  }
};

// Add this function to fetch scooter statistics
const getScooterStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scooter statistics:", error);
    return null;
  }
};

export default {
  getAllScooters,
  getScooterById,
  updateScooterStatus,
  getScooterStatistics,  // Ensure this function is exported
};

