import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { OrderStructure } from '@components/order-structure/order-structure';
import { useGetIngredientsQuery } from '@services/ingredients/api';
import {
  useGetOrdersListQuery,
  useGetUserOrdersQuery,
  type TOrder,
} from '@services/socket/api';
import { host } from '@utils/constants';

export type TStructureIngredient = {
  ingredientId: string;
  count: number;
  image: string;
  price: number;
  name: string;
};

import clsx from 'clsx';

import styles from './order-page.module.css';

export const OrderPage: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const { id } = useParams();

  const { data: ordersData } = useGetOrdersListQuery('');
  const orders = ordersData?.orders ?? [];
  const { data: userOrdersData } = useGetUserOrdersQuery('');
  const userOrders = userOrdersData?.orders ?? [];
  const { data: { data: ingredients = [] } = { data: [] } } = useGetIngredientsQuery('');

  useEffect(() => {
    let currentOrder: TOrder | null =
      orders.find((order) => order._id === id) ??
      userOrders.find((order) => order._id === id) ??
      null;

    if (!currentOrder) {
      axios({
        method: 'get',
        url: `${host}/api/orders/${id}`,
        headers: {
          Authorization: Cookies.get('accessToken'),
        },
      })
        .then((response) => {
          currentOrder = response.data;
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
        });
    }

    setCurrentOrder(currentOrder);
  }, [ordersData, userOrdersData, id]);

  const ingredientsStructure = useMemo(() => {
    const objOrder = currentOrder?.ingredients.reduce(
      (acc: Record<string, number>, ingredient) => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
        return acc;
      },
      {}
    );

    const ingredientsStructure = objOrder
      ? Object.entries(objOrder).map(([ingredientId, count]) => {
          const image =
            ingredients.find((i) => i._id === ingredientId)?.image_mobile ?? '';
          const price = ingredients.find((i) => i._id === ingredientId)?.price ?? 0;
          const name = ingredients.find((i) => i._id === ingredientId)?.name ?? '';
          return { ingredientId, count, image, price, name };
        })
      : [];
    return ingredientsStructure;
  }, [currentOrder, ingredients]);

  const totalPrice = useMemo((): number => {
    return (
      currentOrder?.ingredients.reduce((total, ingredientId) => {
        const ingredient = ingredients.find((item) => item._id === ingredientId);
        return total + (ingredient ? ingredient.price : 0);
      }, 0) ?? 0
    );
  }, [currentOrder, ingredients]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={clsx(styles.title, 'text text_type_main-medium mb-10')}>
          #{currentOrder?.number}
        </h1>
        <OrderStructure
          order={currentOrder}
          structure={ingredientsStructure}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};
