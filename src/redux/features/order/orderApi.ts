import { apiSlice } from "../api/apiSlice";
// import { logout, setCredentials, setUser } from "./authSlice";

// type LoginRequest = {
//   email: string;
//   password: string;
// };

// type order = {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   email_verified: boolean;
// };

// type LoginResponse = {
//   Success: boolean;
//   message: string;
//   user: user | null;
// };
// type registerResposne = {
//   message: string;
// };
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any>({
      query: (orderInfo) => ({
        url: "/api/order",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query<any>({
      query: (id) => `/api/order/user?id=${id}`,
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query<any, void>({
      query: () => `/api/order/all-orders`,
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
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useLogoutMutation,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
} = authApi;
