import axios from "axios";

const FeedbackService = {
  submitFeedback: async (feedbackData) => {
    try {
      const response = await axios.post("/api/feedback", feedbackData);
      return response.data;
    } catch (error) {
      console.error("Error submitting feedback", error);
      throw error;
    }
  },
};

export default FeedbackService;
