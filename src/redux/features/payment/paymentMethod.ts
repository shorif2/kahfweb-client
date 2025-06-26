import { apiSlice } from "../api/apiSlice";
type paymentMethodResponse = {
  logo: string;
  isActive: boolean;
  currency: string;
  payAmount: number;
  instructions: string;
  accountNumber: number;
  name: string;
  qrCode: string;
};
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
    updatePaymentMethod: builder.mutation<any>({
      query: ({ currentMethod, id }) => ({
        url: `/api/payment-method/${id}`,
        method: "PATCH",
        body: currentMethod,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    deletePaymentMethod: builder.mutation<any>({
      query: (paymentMethodId) => ({
        url: `/api/payment-method/${paymentMethodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    getPaymentMethod: builder.query<paymentMethodResponse>({
      query: () => `/api/payment-method`,
      providesTags: ["paymentMethods"],
    }),
  }),
});

export const {
  useAddPaymentMethodMutation,
  useGetPaymentMethodQuery,
  useDeletePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
} = paymentMethodApi;
