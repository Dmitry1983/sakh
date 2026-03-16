import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://delivery-app-api.sakhdev.ru/api';

const TAGS = ['HeroBunners', 'Filters'];

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  tagTypes: TAGS,
  endpoints: () => ({}),
});
