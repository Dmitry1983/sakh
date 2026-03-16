import { baseApi } from '../baseApi';
import { isEqual } from 'lodash';

export const heroBunnersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getHeroBunners: builder.query<any[], void>({
      query: () => '/customer/ads/hero-banners',
      structuralSharing: ((oldData: any, newData: any) => {
        return isEqual(oldData, newData) ? oldData : newData;
      }) as any,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'HeroBunners' as const, id })),
              { type: 'HeroBunners', id: 'LIST' },
            ]
          : [{ type: 'HeroBunners', id: 'LIST' }],
    }),
  }),
});

export const { useGetHeroBunnersQuery } = heroBunnersApi;
