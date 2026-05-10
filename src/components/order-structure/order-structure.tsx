import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import { formatRelativeDate } from '@utils/helpers';

import type { TStructureIngredient } from '@components/order-modal/order-modal';
import type { TOrder } from '@services/socket/api';

import styles from './order-structure.module.css';

type TOrderStructureProps = {
  order: TOrder | null;
  structure: TStructureIngredient[];
  totalPrice: number;
};

export const OrderStructure: React.FC<TOrderStructureProps> = ({
  order,
  structure,
  totalPrice,
}) => {
  const renderImage = (image: string): React.ReactNode => {
    return (
      <div className={styles.ingredient_image_wrapper_container}>
        <div className={styles.ingredient_image_wrapper}>
          <img src={image} alt="ingredient" className={styles.ingredient_image} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text text_type_main-medium">{order?.name ?? 'Order Details'}</h1>
      <p
        className={clsx('text text_type_main-default text_color_inactive mt-3', {
          [styles.status_done]: order?.status === 'done',
        })}
      >
        {order &&
          (order.status === 'done'
            ? 'Выполнен'
            : order.status === 'pending'
              ? 'Готовится'
              : order.status === 'created'
                ? 'Создан'
                : 'Нет статуса')}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={clsx(styles.ingredients_list, 'custom-scroll')}>
        {structure?.map((item) => (
          <li
            key={item.ingredientId}
            className={clsx(styles.ingredient, 'text text_type_main-default')}
          >
            <div className={styles.image_and_name}>
              {renderImage(item.image)}
              <span className="text text_type_main-default">{item.name}</span>
            </div>
            <div className={styles.price}>
              <span
                className="text text_type_digits-default"
                style={{ width: 'max-content' }}
              >{`${item.count} x ${item.price}`}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={clsx(styles.date_and_price, 'mt-10')}>
        <span className="text text_type_main-default text_color_inactive">
          {order && formatRelativeDate(order.updatedAt ?? order.createdAt ?? '')}
        </span>
        <div className={clsx(styles.total_price, 'text text_type_digits-default')}>
          {totalPrice.toLocaleString()} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
