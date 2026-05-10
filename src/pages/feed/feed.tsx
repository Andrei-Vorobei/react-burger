import clsx from 'clsx';
import { useMemo } from 'react';

import { OrderList } from '@components/order-list/order-list';
import { useGetOrdersListQuery } from '@services/socket/api';

import styles from './feed.module.css';

export const FeedPage: React.FC = () => {
  const { data } = useGetOrdersListQuery('');
  const orders = data?.orders ?? [];

  const ordersDone = useMemo(
    () => orders.filter((order) => order.status === 'done'),
    [orders]
  );

  const ordersPending = useMemo(
    () => orders.filter((order) => order.status === 'pending'),
    [orders]
  );

  return (
    <div className={styles.container}>
      <div className={styles.orders_page}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={styles.orders_content}>
          <OrderList />
          <div className={styles.orders_statistics}>
            <div className={styles.statistics_content}>
              <div className={styles.column}>
                <div className="text text_type_main-medium mb-6">Готовы:</div>
                <div className={styles.order_columns}>
                  <ul
                    className={clsx(styles.orders_done_list, styles.orders_number_list)}
                  >
                    {ordersDone.slice(0, 10).map((order) => (
                      <li key={order._id} className="text text_type_digits-default">
                        {order.number}
                      </li>
                    ))}
                  </ul>
                  {ordersDone.length > 10 && (
                    <ul
                      className={clsx(
                        styles.orders_done_list,
                        styles.orders_number_list
                      )}
                    >
                      {ordersDone.slice(10, 20).map((order) => (
                        <li key={order._id} className="text text_type_digits-default">
                          {order.number}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className={styles.column}>
                <div className="text text_type_main-medium mb-6">В работе:</div>
                {ordersPending.length > 0 ? (
                  <div className={styles.order_columns}>
                    <ul
                      className={clsx(
                        styles.orders_pending_list,
                        styles.orders_number_list
                      )}
                    >
                      {ordersPending.slice(0, 10).map((order) => (
                        <li key={order._id} className="text text_type_digits-default">
                          {order.number}
                        </li>
                      ))}
                    </ul>
                    {ordersPending.length > 10 && (
                      <ul
                        className={clsx(
                          styles.orders_pending_list,
                          styles.orders_number_list
                        )}
                      >
                        {ordersPending.slice(10, 20).map((order) => (
                          <li key={order._id} className="text text_type_digits-default">
                            {order.number}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="text text_type_main-medium mb-6">Нет заказов</div>
                )}
              </div>
            </div>
            <div className="text text_type_main-medium">
              Выполнено за все время:
              <div className="text text_type_digits-large">
                {data?.total.toLocaleString()}
              </div>
            </div>
            <div className="text text_type_main-medium">
              Выполнено за сегодня:
              <div className="text text_type_digits-large">
                {data?.totalToday.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
