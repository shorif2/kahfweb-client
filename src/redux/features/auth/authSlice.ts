// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  email_verified: boolean;
  status?: string;
  address: string;
  notes: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error?: string | null;
};

const userFromStorage = localStorage.getItem("user");
const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
