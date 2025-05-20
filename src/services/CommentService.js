import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const postComment = async (token, id, content) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/api/article/${id}/comments`,
      { content },
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
