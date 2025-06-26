import { apiSlice } from "../api/apiSlice";

export const paymentMethodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPaymentMethod: builder.mutation<any>({
      query: (orderInfo) => ({
        url: "/api/payment-method",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    getPaymentMethod: builder.query({
      query: () => `/api/payment-method`,
      // providesTags: ["paymentMethods"],
    }),
  }),
});

export const { useAddPaymentMethodMutation, useGetPaymentMethodQuery } =
  paymentMethodApi;
