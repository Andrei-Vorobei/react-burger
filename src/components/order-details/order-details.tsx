import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { memo } from 'react';

import { OrderImage } from '@components/order-image/order-image';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber: number | null | undefined;
};

export const OrderDetails: React.FC<TOrderDetailsProps> = memo(({ orderNumber }) => {
  return (
    <div>
      <div className={clsx('text text_type_digits-large', styles.centered)}>
        {orderNumber}
      </div>
      <div className={clsx('text text_type_main-medium mt-8 mb-15', styles.centered)}>
        идентификатор заказа
      </div>
      <div>
        <div className={clsx(styles.centered)}>
          <OrderImage Icon={CheckMarkIcon} />
        </div>
      </div>
      <div className={clsx('text text_type_main-small mt-15 mb-2', styles.centered)}>
        Ваш заказ начали готовить
      </div>
      <div
        className={clsx(
          'text text_type_main-default text_color_inactive',
          styles.centered
        )}
      >
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
});

OrderDetails.displayName = 'OrderDetails';
