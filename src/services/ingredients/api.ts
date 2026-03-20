import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import type { TIngredient } from '@utils/types';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

export const ingredientsApi = createApi({
  reducerPath: 'ingredients',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://new-stellarburgers.education-services.ru/api',
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<{ data: TIngredient[] }, string>({
      query: () => ({ url: '/ingredients', method: 'get' }),
    }),
    postOrder: builder.mutation<
      { order: { number: number }; name: string },
      { ingredients: string[] }
    >({
      query: (body) => ({
        url: '/orders',
        method: 'post',
        data: body,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, usePostOrderMutation } = ingredientsApi;
