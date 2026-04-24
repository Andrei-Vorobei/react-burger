import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { host, defaultOptions } from '@utils/constants';

class ServerError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

export function checkResponse<T>(response: AxiosResponse): T {
  const res = response.data;

  if (response.status >= 200 && response.status < 300) {
    return res;
  }

  throw new ServerError(res.message, res.status);
}

export async function request<T, O>(endpoint: string, options: O): Promise<T> {
  const response = await axios({
    url: `${host}/api/${endpoint}`,
    ...defaultOptions,
    ...options,
  });

  return await checkResponse(response);
}

export async function refreshToken(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const refreshData = await request<
    {
      accessToken: string;
      refreshToken: string;
    },
    {
      data?: string;
      headers?: Record<string, string>;
      method?: string;
    }
  >('auth/token', {
    data: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });

  Cookies.set('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
}

export async function fetchWithRefresh<
  T,
  O extends { headers?: Record<string, string> },
>(endpoint: string, options: O): Promise<T> {
  try {
    return await request<T, O>(endpoint, options);
  } catch (error: unknown) {
    if (
      error instanceof ServerError &&
      (error.statusCode === 401 ||
        (error.statusCode === 403 && localStorage.getItem('refreshToken')))
    ) {
      const refreshData = await refreshToken();

      return request<T, O>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
}

export async function baseQueryWithRefresh(
  args: {
    url: string;
    method?: string;
    headers?: Record<string, string>;
  },
  _api: unknown,
  _extraOptions: unknown
): Promise<{ data: unknown } | { error: ServerError }> {
  const { url, method = 'GET', ...rest } = args;
  const token = Cookies.get('accessToken');

  const headers: { 'Content-Type': string; authorization?: string } = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = token;
  }

  const options = {
    method,
    headers,
    ...rest,
  };

  const data = await fetchWithRefresh(url, options);
  return { data };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        data: JSON.stringify(credentials),
      }),
      transformResponse: (response) => {
        if (response.accessToken) {
          Cookies.set('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        data: JSON.stringify(credentials),
      }),
      transformResponse: (response) => {
        Cookies.set('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      transformResponse: (response) => response.user,
      providesTags: [{ type: 'User' }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        data: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      }),
      transformResponse: () => {
        Cookies.remove('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      },
    }),
    editeProfile: builder.mutation({
      query: (data) => ({
        url: 'auth/user',
        method: 'PATCH',
        data: JSON.stringify(data),
      }),
      transformResponse: (response) => response.user,
      invalidatesTags: [{ type: 'User' }],
    }),
    passwordForgot: builder.mutation({
      query: (email) => ({
        url: 'password-reset',
        method: 'POST',
        data: JSON.stringify(email),
      }),
      transformResponse: (response) => response,
    }),
    passwordReset: builder.mutation({
      query: (data) => ({
        url: 'password-reset/reset',
        method: 'POST',
        data: JSON.stringify(data),
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useEditeProfileMutation,
  usePasswordForgotMutation,
  usePasswordResetMutation,
} = authApi;
