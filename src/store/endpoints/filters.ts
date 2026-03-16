import { baseApi } from '../baseApi';
import { isEqual } from 'lodash';

export const filtersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFilters: builder.query<any[], void>({
      query: () => '/vendors/filters',
      transformResponse: (response: { data: any[]; total: number }) => {
        return response.data;
      },
      structuralSharing: ((oldData: any, newData: any) => {
        return isEqual(oldData, newData) ? oldData : newData;
      }) as any,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Filters' as const, id })),
              { type: 'Filters', id: 'LIST' },
            ]
          : [{ type: 'Filters', id: 'LIST' }],
    }),
  }),
});

export const { useGetFiltersQuery } = filtersApi;
