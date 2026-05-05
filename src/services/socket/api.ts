import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TOrder = {
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

let socket: WebSocket | null = null;
const RECONNECT_PERIOD = 3000; // Пауза 3 секунды
let reconnectTimerId: ReturnType<typeof setTimeout> | null = null;
// Флаг, который показывает, что компонент больше не ждёт данных
let isUnsubscribed = false;

export const socketApi = createApi({
  reducerPath: 'socket',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getOrdersList: builder.query<TOrdersListResponse, string>({
      query: () => 'messages',
      onCacheEntryAdded: async (
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        // 1. Создаём функцию для установки соединения.
        const connect = (): void => {
          // Очищаем предыдущий таймер перед попыткой подключения
          if (reconnectTimerId !== null) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = null;
          }

          // Устанавливаем новое соединение
          socket = new WebSocket(
            'wss://new-stellarburgers.education-services.ru/orders/all'
          );
          // 1. Слушатель входящих сообщений (обновление кеша).
          socket.onmessage = (event: MessageEvent): void => {
            const data = JSON.parse(event.data) as TOrder;
            updateCachedData((draft) => {
              draft.orders.push(data);
            });
          };
          // 2. Логика перепodключения при закрытии.
          socket.onclose = (): void => {
            console.log(
              'Соединение разорвано. Проверка необходимости перепodключения...'
            );

            // Если isUnsubscribed === false, то компонент всё ещё ждёт данные
            if (!isUnsubscribed) {
              // Запускаем таймер и через 3 секунды пробуем снова
              reconnectTimerId = setTimeout(connect, RECONNECT_PERIOD);
            }
          };

          socket.onerror = (error: Event): void => {
            console.error('Ошибка WebSocket:', error);
          };
        };

        try {
          await cacheDataLoaded;

          connect();
        } catch (error) {
          console.error(error);
        }
        // Ожидаем, пока компонент отпишется от кеша
        try {
          await cacheEntryRemoved;
        } finally {
          // 1. Устанавливаем флаг: теперь мы не должны переподключаться.
          isUnsubscribed = true;

          // 2. Гарантированная очистка ресурсов:
          if (reconnectTimerId !== null) {
            clearTimeout(reconnectTimerId); // Отменяем ожидающее переподключение
          }
          socket?.close(); // Закрываем активный сокет
        }
      },
    }),
  }),
});

export const { useGetOrdersListQuery } = socketApi;
