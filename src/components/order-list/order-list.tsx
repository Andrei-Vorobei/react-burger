import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router';

import { useGetIngredientsQuery } from '@services/ingredients/api';
import {
  useGetOrdersListQuery,
  useGetUserOrdersQuery,
  type TOrder,
} from '@services/socket/api';
import { formatRelativeDate } from '@utils/helpers';

import styles from './order-list.module.css';

export const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchesProfileOrders = useMatch('/profile/orders');
  const matchesFeed = useMatch('/feed');

  const { data: ordersData } = useGetOrdersListQuery('');
  const { data: userOrdersData } = useGetUserOrdersQuery('');
  const { data: { data: ingredients = [] } = { data: [] } } = useGetIngredientsQuery('');

  const currentOrders = useMemo(() => {
    if (matchesProfileOrders) {
      return userOrdersData?.orders ? [...userOrdersData.orders].reverse() : [];
    }
    if (matchesFeed) {
      return ordersData?.orders ?? [];
    }
    return [];
  }, [ordersData, userOrdersData, matchesProfileOrders, matchesFeed]);

  const calculateTotalPrice = (order: TOrder): number => {
    return order.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find((item) => item._id === ingredientId);
      return total + (ingredient ? ingredient.price : 0);
    }, 0);
  };

  const getIngredientImage = (id: string): string => {
    const ingredient = ingredients.find((item) => item._id === id);
    return ingredient ? ingredient.image_mobile : '';
  };

  const renderIngredients = (order: TOrder): React.ReactNode => {
    const ingredientsList = order.ingredients.slice(0, -1);
    let cutedIngredients = ingredientsList.length - 6;
    if (cutedIngredients < 0) {
      cutedIngredients = 0;
    }

    return ingredientsList.slice(0, 6).map((id, index) => {
      return (
        <li
          key={index}
          className={styles.ingredient_image_wrapper_container}
          style={{ zIndex: ingredientsList.length - index }}
        >
          <div key={index} className={styles.ingredient_image_wrapper}>
            <img
              src={getIngredientImage(id)}
              alt="ingredient"
              className={styles.ingredient_image}
            />
            {index === 5 && cutedIngredients > 0 && (
              <div className={styles.ingredient_cuted_number}>
                <span className="text text_type_digits-default">{`+${cutedIngredients}`}</span>
              </div>
            )}
          </div>
        </li>
      );
    });
  };

  return (
    <ul className={styles.orders_list}>
      {currentOrders.length ? (
        currentOrders.map((order) => (
          <li
            key={order._id}
            className={styles.order_card}
            onClick={() => {
              void navigate(
                `${matchesProfileOrders ? `/profile/orders/${order._id}` : `/feed/${order._id}`}`,
                { state: { background: location } }
              );
            }}
          >
            <div className={styles.number_and_date}>
              <div className="text text_type_main-medium">{`#${order.number}`}</div>
              <div className="text text_type_main-default text_color_inactive">
                {formatRelativeDate(order.updatedAt ?? order.createdAt)}
              </div>
            </div>
            <p className="text text_type_main-medium">{order.name}</p>
            {matchesProfileOrders && (
              <p
                className={clsx('text text_type_main-default', {
                  [styles.status_done]: order.status === 'done',
                })}
              >
                {order.status === 'done'
                  ? 'Выполнен'
                  : order.status === 'pending'
                    ? 'Готовится'
                    : order.status === 'created'
                      ? 'Создан'
                      : 'Нет статуса'}
              </p>
            )}
            <div className={clsx(styles.ingredients_and_price, 'mt-6')}>
              <ul className={styles.ingredients}>{renderIngredients(order)}</ul>
              <div className={styles.order_price}>
                <span className="text text_type_digits-default">
                  {calculateTotalPrice(order).toLocaleString()}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className={clsx(styles.no_orders, 'text text_type_main-large')}>
          Заказы не найдены
        </p>
      )}
    </ul>
  );
};
