import axios from "axios";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

export const getAllNews = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/article`, {
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
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const getAllNewsByCreator = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/article/user`, {
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
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/api/article/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export const createNews = async (token, newsData) => {
  try {
    const formData = new FormData();
    formData.append("title", newsData.title);
    formData.append("content", newsData.content);
    formData.append("summary", newsData.summary);
    formData.append("status", newsData.status);
    formData.append("authorId", newsData.authorId);
    formData.append("categoryId", newsData.categoryId);
    formData.append("tags", JSON.stringify(newsData.tags));

    if (newsData.bannerImage instanceof File) {
      formData.append("bannerImage", newsData.bannerImage);
    } else {
      console.warn("bannerImage is not a File object:", newsData.bannerImage);
    }

    const response = await axios.post(`${API_BASE_URI}/api/article`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating News:", error);
    throw error;
  }
};

export const updateNews = async (token, id, newsData) => {
  try {
    const formData = new FormData();
    formData.append("title", newsData.title);
    formData.append("content", newsData.content);
    formData.append("summary", newsData.summary);
    formData.append("status", newsData.status);
    formData.append("authorId", newsData.authorId);
    formData.append("categoryId", newsData.categoryId);
    formData.append("tags", JSON.stringify(newsData.tags));

    if (newsData.bannerImage instanceof File) {
      formData.append("bannerImage", newsData.bannerImage);
    } else {
      console.warn("bannerImage is not a File object:", newsData.bannerImage);
    }

    const response = await axios.put(
      `${API_BASE_URI}/api/article/${id}`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error Updating News:", error);
    throw error;
  }
};

export const deleteNews = async (token, id) => {
  try {
    const response = await axios.delete(`${API_BASE_URI}/api/article/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Error Updating News:", error);
    throw error;
  }
};
