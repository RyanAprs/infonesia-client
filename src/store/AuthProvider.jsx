import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;

const UseAuthManager = create(
  persist(
    (set, get) => ({
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      // Login
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const response = await axios.post(
            `${API_BASE_URI}/api/auth/login`,
            {
              email,
              password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.status === 200) {
            const data = response.data.data;
            localStorage.setItem("isLogin", "true");

            set({
              token: data.token,
              isAuthenticated: true,
              loading: false,
            });

            return data;
          } else {
            set({
              loading: false,
              isAuthenticated: false,
              token: null,
            });
          }
        } catch (error) {
          set({
            error: error.message,
            loading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Register
      register: async (userData) => {
        set({ loading: true, error: null });

        try {
          await axios.post(`${API_BASE_URI}/api/auth/register`, userData, {
            headers: { "Content-Type": "application/json" },
          });
          set({
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
      },

      // Check if token is valid and update user data
      checkProfile: async () => {
        const token = get().token;
        if (!token) return false;

        set({ loading: true });

        try {
          const response = await axios.get(`${API_BASE_URI}/api/user/current`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          return response.data.data;
        } catch (error) {
          console.log(error);

          return false;
        }
      },

      // Update user profile
      updateProfile: async (userData) => {
        const token = get().token;
        if (!token) throw new Error("Not authenticated");

        set({ loading: true, error: null });

        try {
          const response = await axios.put(
            `${API_BASE_URI}/api/user/current`,
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response);

          const data = response.data;

          if (!response.ok) {
            throw new Error(data.message || "Update failed");
          }

          set({
            user: { ...get().user, ...data.user },
            loading: false,
          });

          return data;
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "token",
    }
  )
);

export default UseAuthManager;
