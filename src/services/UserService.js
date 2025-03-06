import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const getAllUser = async (token, role) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/user?role=${role}`, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.data || !response.data.data) {
      return [];
    }

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
