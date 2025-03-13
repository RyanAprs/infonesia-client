import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/user/current`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const updateCurrentUser = async (token, id, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URI}/api/user/${id}`,
      userData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateCurrentPasswored = async (token, id, userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URI}/api/user/${id}/current-password`,
      userData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
