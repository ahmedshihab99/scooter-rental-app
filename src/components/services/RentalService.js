import axios from "axios";

const RentalService = {
  // Fetch pending rental requests
  getPendingRentals: async () => {
    try {
      const response = await axios.get("/api/rentals/pending");
      return response.data;
    } catch (error) {
      console.error("Error fetching pending rentals", error);
      throw error;
    }
  },

  // Approve a rental request
  approveRental: async (rentalId) => {
    try {
      const response = await axios.post(`/api/rentals/approve/${rentalId}`);
      return response.data;
    } catch (error) {
      console.error("Error approving rental", error);
      throw error;
    }
  },

  // Reject a rental request
  rejectRental: async (rentalId) => {
    try {
      const response = await axios.post(`/api/rentals/reject/${rentalId}`);
      return response.data;
    } catch (error) {
      console.error("Error rejecting rental", error);
      throw error;
    }
  },

  // Fetch active rentals
  getActiveRentals: async () => {
    try {
      const response = await axios.get("/api/rentals/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching active rentals", error);
      throw error;
    }
  }
};

export default RentalService;
