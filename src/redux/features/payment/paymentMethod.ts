import { apiSlice } from "../api/apiSlice";
type paymentMethodResponse = {
  _id: string;
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
    addPaymentMethod: builder.mutation<
      paymentMethodResponse,
      Partial<paymentMethodResponse>
    >({
      query: (orderInfo) => ({
        url: "/api/payment-method",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    updatePaymentMethod: builder.mutation<
      paymentMethodResponse,
      { currentMethod: Partial<paymentMethodResponse>; id: string }
    >({
      query: ({ currentMethod, id }) => ({
        url: `/api/payment-method/${id}`,
        method: "PATCH",
        body: currentMethod,
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    deletePaymentMethod: builder.mutation<
      { success: boolean; data: paymentMethodResponse },
      string
    >({
      query: (paymentMethodId) => ({
        url: `/api/payment-method/${paymentMethodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    updateStatus: builder.mutation<paymentMethodResponse, string>({
      query: (paymentMethodId) => ({
        url: `/api/payment-method/update/${paymentMethodId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["paymentMethods"],
    }),
    getPaymentMethod: builder.query<
      { success: boolean; data: paymentMethodResponse[] },
      void
    >({
      query: () => `/api/payment-method`,
      providesTags: ["paymentMethods"],
    }),
    getActiveMethod: builder.query<
      { success: boolean; data: paymentMethodResponse[] },
      void
    >({
      query: () => `/api/payment-method/active`,
    }),
  }),
});

export const {
  useAddPaymentMethodMutation,
  useGetPaymentMethodQuery,
  useDeletePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useUpdateStatusMutation,
  useGetActiveMethodQuery,
} = paymentMethodApi;
