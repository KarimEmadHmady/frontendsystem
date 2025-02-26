// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ["Product", "Order", "User", "Category"],
//   endpoints: () => ({}),

// });


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // ✅ لازم تكون مضافة هنا
  }),
  endpoints: () => ({}),
});
