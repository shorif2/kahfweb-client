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
    }),
    getUser: builder.query<user, void>({
      query: () => "/api/users/user",
    }),
  }),
});

export const {
  useSignInMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useAllUsersQuery,
} = authApi;
