import axios from "axios";

const API_URL = "/api/auth";

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  register,
  getCurrentUser,
};

