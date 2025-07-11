import { apiSlice } from "../api/apiSlice";
import { logout, setCredentials, setUser } from "./authSlice";

type LoginRequest = {
  email: string;
  password: string;
};

type user = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  email_verified: boolean;
};

type LoginResponse = {
  Success: boolean;
  message: string;
  user: user | null;
};
type registerResposne = {
  message: string;
};

type ForgetPasswordRequest = {
  email: string;
};

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, LoginRequest, user>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);
      //     dispatch(setUser(data.user));
      //   } catch (error) {
      //     console.error("Login failed:", error);
      //   }
      // },
    }),
    register: builder.mutation<registerResposne, LoginRequest, user>({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users", "summary"],
    }),
    forgetPassword: builder.mutation<
      { message: string },
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/api/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      { message: string },
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: "/api/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    updateClient: builder.mutation<any, user>({
      query: ({ userId, editFormData }) => ({
        url: `/api/users/user/${userId}`,
        method: "PATCH",
        body: editFormData,
      }),
      invalidatesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/logout",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logout());
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    allUsers: builder.query<any, void>({
      query: () => "/api/users/all-user",
      providesTags: ["Users"],
    }),
    getUser: builder.query<user, void>({
      query: () => "/api/users/user",
    }),
    blockUser: builder.mutation<any, { userId: string; status: string }>({
      query: ({ userId, status }) => ({
        url: `/api/users/block-user/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSignInMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useAllUsersQuery,
  useUpdateClientMutation,
  useBlockUserMutation,
} = authApi;
