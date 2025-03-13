import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const getAllCategory = async (token) => {
  const response = await axios.get(`${API_BASE_URI}/api/category`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.data || !response.data.data) {
    return [];
  }

  return response.data.data;
};

export const getCategoryById = async (token, id) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/category/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (token, categoryData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/api/category`,
      categoryData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (token, id, categoryData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URI}/api/category/${id}`,
      categoryData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (token, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URI}/api/category/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
