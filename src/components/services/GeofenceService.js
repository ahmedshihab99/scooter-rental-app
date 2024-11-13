// File: ../../services/GeofenceService.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/geofences`;

const GeofenceService = {
  // Fetch geofence data from the backend
  getAllGeofences: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching geofence data:', error);
      throw error;
    }
  },

  // Add a new geofence to the backend
  addGeofence: async (geofence) => {
    try {
      const response = await axios.post(API_URL, geofence);
      return response.data;
    } catch (error) {
      console.error('Error adding geofence:', error);
      throw error;
    }
  },

  // Update existing geofence data on the backend
  updateGeofence: async (id, geofence) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, geofence);
      return response.data;
    } catch (error) {
      console.error('Error updating geofence:', error);
      throw error;
    }
  }
};

export default GeofenceService;