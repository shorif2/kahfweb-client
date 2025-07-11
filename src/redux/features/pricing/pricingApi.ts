import { apiSlice } from "../api/apiSlice";

export interface PricingFeature {
  _id?: string;
  text: string;
}

export interface PricingPackage {
  _id: string;
  packageType: "domain" | "bundle" | "hosting";
  title: string;
  price: number;
  period: string;
  isPopular: boolean;
  features: PricingFeature[];
  buttonText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PricingResponse {
  success: boolean;
  data: PricingPackage[];
  message?: string;
}

export interface SinglePricingResponse {
  success: boolean;
  data: PricingPackage;
  message?: string;
}

export const pricingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPackages: builder.query<PricingResponse, void>({
      query: () => "/api/pricing",
      providesTags: ["pricingPackages"],
    }),
    getActivePricingPackages: builder.query<PricingResponse, void>({
      query: () => "/api/pricing/active",
      providesTags: ["activePricingPackages"],
    }),
    createPricingPackage: builder.mutation<
      SinglePricingResponse,
      Partial<PricingPackage>
    >({
      query: (pricingData) => ({
        url: "/api/pricing",
        method: "POST",
        body: pricingData,
      }),
      invalidatesTags: ["pricingPackages", "activePricingPackages"],
    }),
    updatePricingPackage: builder.mutation<
      SinglePricingResponse,
      { id: string; data: Partial<PricingPackage> }
    >({
      query: ({ id, data }) => ({
        url: `/api/pricing/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["pricingPackages", "activePricingPackages"],
    }),
    togglePricingPackageStatus: builder.mutation<SinglePricingResponse, string>(
      {
        query: (packageId) => ({
          url: `/api/pricing/toggle/${packageId}`,
          method: "PATCH",
        }),
        invalidatesTags: ["pricingPackages", "activePricingPackages"],
      }
    ),
    deletePricingPackage: builder.mutation<SinglePricingResponse, string>({
      query: (packageId) => ({
        url: `/api/pricing/${packageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pricingPackages", "activePricingPackages"],
    }),
  }),
});

export const {
  useGetPricingPackagesQuery,
  useGetActivePricingPackagesQuery,
  useCreatePricingPackageMutation,
  useUpdatePricingPackageMutation,
  useTogglePricingPackageStatusMutation,
  useDeletePricingPackageMutation,
} = pricingApi;
