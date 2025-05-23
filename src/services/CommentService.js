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

export const updateComment = async (token, id, content) => {
  try {
    const response = await axios.put(
      `${API_BASE_URI}/api/comment/${id}`,
      { content },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (token, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URI}/api/comment/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const replyComment = async (token, id, content) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/api/comments/${id}/reply`,
      { content },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
