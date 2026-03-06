import { clsx } from 'clsx';

import { orderImage1, orderImage2, orderImage3 } from '@utils/constants';

import styles from './order-image.module.css';

type TOrderImage = {
  Icon?: React.FC<{ type: 'primary' | 'secondary'; className?: string }>;
};

export const OrderImage: React.FC<TOrderImage> = ({ Icon }) => {
  return (
    <div className={clsx(styles.images_container, styles.centered)}>
      <div className={clsx(styles.centered, styles.order_image, styles.position_center)}>
        <img src={orderImage1} alt="" />
      </div>
      <div className={clsx(styles.centered, styles.order_image, styles.position_center)}>
        <img src={orderImage2} alt="" />
      </div>
      <div className={clsx(styles.centered, styles.order_image, styles.position_center)}>
        <img src={orderImage3} alt="" />
      </div>
      {Icon && <Icon type="primary" className={styles.check_icon} />}
    </div>
  );
};
