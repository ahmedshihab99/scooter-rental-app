// File: ../../services/GeofenceService.js

import axios from 'axios';

const GeofenceService = {
  // Fetch geofence data from the backend
  getAllGeofences: async () => {
    try {
      const response = await axios.get('http://localhost:8900/geofence');
      return response.data;
    } catch (error) {
      console.error('Error fetching geofence data:', error);
      throw error;
    }
  },

  // Add a new geofence to the backend
  addGeofence: async (geofence) => {
    try {
      const response = await axios.post('http://localhost:8900/geofence', geofence);
      return response.data;
    } catch (error) {
      console.error('Error adding geofence:', error);
      throw error;
    }
  },

  // Update existing geofence data on the backend
  updateGeofence: async (id, geofence) => {
    try {
      const response = await axios.put(`http://localhost:8900/geofence/${id}`, geofence);
      return response.data;
    } catch (error) {
      console.error('Error updating geofence:', error);
      throw error;
    }
  }
};

export default GeofenceService;