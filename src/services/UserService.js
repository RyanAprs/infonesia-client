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
    throw error;
  }
};

export const getUserById = async (token, id) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(`${API_BASE_URI}/api/user`, userData, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const createJournalist = async (token, userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/api/user/journalist`,
      userData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (token, id, userData) => {
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

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (token, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URI}/api/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
