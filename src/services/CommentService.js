import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const postComment = async (token, id, commentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/article/${id}/comments`,
      commentData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};
