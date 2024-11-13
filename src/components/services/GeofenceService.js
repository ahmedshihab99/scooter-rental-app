// File: ../../services/GeofenceService.js

import axios from 'axios';

const GeofenceService = {
  // Fetch geofence data from the backend
  getAllGeofences: async () => {
    try {
      const response = await axios.get('http://10.0.0.31:7000/api/geofences');
      return response.data;
    } catch (error) {
      console.error('Error fetching geofence data:', error);
      throw error;
    }
  },

  // Add a new geofence to the backend
  addGeofence: async (geofence) => {
    try {
      const response = await axios.post('http://10.0.0.31:7000/api/geofences', geofence);
      return response.data;
    } catch (error) {
      console.error('Error adding geofence:', error);
      throw error;
    }
  },

  // Update existing geofence data on the backend
  updateGeofence: async (id, geofence) => {
    try {
      const response = await axios.put(`http://10.0.0.31:7000/api/geofences/${id}`, geofence);
      return response.data;
    } catch (error) {
      console.error('Error updating geofence:', error);
      throw error;
    }
  }
};

export default GeofenceService;