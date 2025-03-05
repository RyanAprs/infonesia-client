import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
            "http://localhost:5000/api/auth/login",
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
          await axios.post(
            "http://localhost:5000/api/auth/register",
            userData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
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
        });
      },

      // Check if token is valid and update user data
      checkAuth: async () => {
        const token = get().token;
        if (!token) return false;

        set({ loading: true });

        try {
          const response = await fetch("https://your-api.com/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Token invalid");
          }

          set({
            isAuthenticated: true,
            loading: false,
          });

          return true;
        } catch (error) {
          console.log(error);
          set({
            token: null,
            isAuthenticated: false,
            loading: false,
          });

          return false;
        }
      },

      // Update user profile
      updateProfile: async (userData) => {
        const token = get().token;
        if (!token) throw new Error("Not authenticated");

        set({ loading: true, error: null });

        try {
          const response = await fetch("https://your-api.com/auth/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

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
