import { apiSlice } from "../api/apiSlice";
// import { logout, setCredentials, setUser } from "./authSlice";

// type LoginRequest = {
//   email: string;
//   password: string;
// };

type order = {
  _id: string;
  status: string;
  item: string;
  itemName: string;
  domain: string;
  expiryDate: string;
  price: number;
  user: any;
  orderDate: string;
};
type orderId = string;

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
      invalidatesTags: ["Orders", "allOrders", "recentOrder", "summary"],
    }),
    getOrders: builder.query<any>({
      query: (id) => `/api/order/user?id=${id}`,
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query<any, void>({
      query: () => `/api/order/all-orders`,
      providesTags: ["allOrders"],
    }),
    getRecentOrders: builder.query<any, void>({
      query: () => `/api/order/recent-orders`,
      providesTags: ["recentOrder"],
    }),
    getSummary: builder.query<any, void>({
      query: () => `/api/order/summary`,
      providesTags: ["summary"],
    }),
    updateOrder: builder.mutation<orderId, order>({
      query: ({ orderId, editFormData }) => ({
        url: `/api/order/${orderId}`,
        method: "PATCH",
        body: editFormData,
      }),
      invalidatesTags: ["allOrders"],
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
  useUpdateOrderMutation,
  useGetRecentOrdersQuery,
  useGetSummaryQuery,
} = authApi;
