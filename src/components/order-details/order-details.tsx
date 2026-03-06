import { CloseIcon, CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { OrderImage } from '@components/order-image/order-image';

import styles from './order-details.module.css';

type TOrderDetails = {
  onClose: () => void;
};

export const OrderDetails: React.FC<TOrderDetails> = ({ onClose }) => {
  return (
    <div className="pt-30 pl-25 pr-25 pb-30">
      <CloseIcon
        type="primary"
        onClick={() => onClose()}
        className={styles.close_icon}
      />
      <div>
        <div className={clsx('text text_type_digits-large', styles.centered)}>
          034536
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
    </div>
  );
};
