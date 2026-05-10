import { OrderList } from '@components/order-list/order-list';
import { ProfileLinks } from '@components/profile-links/profile-links';

import styles from './profile-orders-page.module.css';

export const ProfileOrdersPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <OrderList />
        <ProfileLinks />
      </div>
    </div>
  );
};
