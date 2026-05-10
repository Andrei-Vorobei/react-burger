import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { baseUrlSocket, webSocketUrl } from '@utils/constants';

import { refreshToken } from '../auth/api';

import type { AxiosError, AxiosRequestConfig } from 'axios';

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

type TOrdersListResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  success: boolean;
};

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

let socketOrders: WebSocket | null = null;
let socketUserOrders: WebSocket | null = null;
const RECONNECT_PERIOD = 3000;
let reconnectTimerIdOrders: ReturnType<typeof setTimeout> | null = null;
let reconnectTimerIdUserOrders: ReturnType<typeof setTimeout> | null = null;
let isUnsubscribedOrders = false;
let isUnsubscribedUserOrders = false;

export const socketApi = createApi({
  reducerPath: 'socket',
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrlSocket,
  }),
  endpoints: (builder) => ({
    getOrdersList: builder.query<TOrdersListResponse, string>({
      query: () => ({
        url: '/orders/all',
        method: 'GET',
      }),
      onCacheEntryAdded: async (
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        const connect = (): void => {
          if (reconnectTimerIdOrders !== null) {
            clearTimeout(reconnectTimerIdOrders);
            reconnectTimerIdOrders = null;
          }

          socketOrders = new WebSocket(`${webSocketUrl}/all`);

          const listener = (event: MessageEvent): void => {
            const data = JSON.parse(event.data);

            updateCachedData(() => {
              return data;
            });
          };

          socketOrders.addEventListener('message', listener);
          socketOrders.onclose = (): void => {
            console.log(
              'Соединение разорвано. Проверка необходимости перепodключения...'
            );

            if (!isUnsubscribedOrders) {
              reconnectTimerIdOrders = setTimeout(connect, RECONNECT_PERIOD);
            }
          };

          socketOrders.onerror = (error: Event): void => {
            console.error('Ошибка WebSocket:', error);
          };
        };

        await cacheDataLoaded;
        connect();

        try {
          await cacheEntryRemoved;
        } finally {
          isUnsubscribedOrders = false;
          if (reconnectTimerIdOrders !== null) {
            clearTimeout(reconnectTimerIdOrders);
          }
          socketOrders?.close();
        }
      },
    }),
    getUserOrders: builder.query<TOrdersListResponse, string>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        headers: {
          authorization: Cookies.get('accessToken'),
        },
      }),
      onCacheEntryAdded: async (
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        const connect = (): void => {
          if (reconnectTimerIdUserOrders !== null) {
            clearTimeout(reconnectTimerIdUserOrders);
            reconnectTimerIdUserOrders = null;
          }
          const token = Cookies.get('accessToken');
          const wssUrl = new URL(webSocketUrl);
          wssUrl.searchParams.set('token', token?.replace('Bearer ', '') ?? '');
          socketUserOrders = new WebSocket(wssUrl.toString());

          socketUserOrders.onmessage = async (event): Promise<void> => {
            const data = JSON.parse(event.data);

            if (data.message === 'Invalid or missing token') {
              try {
                await refreshToken();
                socketUserOrders?.close();
                connect();
              } catch (error) {
                console.error('Не удалось обновить токен:', error);
              }
              return;
            }

            updateCachedData(() => {
              return data;
            });
          };

          socketUserOrders.onclose = (): void => {
            console.log(
              'Соединение разорвано. Проверка необходимости перепodключения...'
            );

            if (!isUnsubscribedUserOrders) {
              reconnectTimerIdUserOrders = setTimeout(connect, RECONNECT_PERIOD);
            }
          };

          socketUserOrders.onerror = (error: Event): void => {
            console.error('Ошибка WebSocket:', error);
          };
        };

        await cacheDataLoaded;
        connect();

        try {
          await cacheEntryRemoved;
        } finally {
          isUnsubscribedUserOrders = false;
          if (reconnectTimerIdUserOrders !== null) {
            clearTimeout(reconnectTimerIdUserOrders);
          }
          socketUserOrders?.close();
        }
      },
    }),
  }),
});

export const { useGetOrdersListQuery, useGetUserOrdersQuery } = socketApi;
